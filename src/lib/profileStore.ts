import { useState, useEffect } from 'react';
import { getSupabase } from './supabaseClient';

/* Profile (name, bio, avatar, CV link) lives in the `site_settings` table
 * under key 'profile'; uploaded files live in the public `site-files` bucket. */

export type Profile = { name: string; title: string; bio: string; avatarUrl: string; cvUrl: string; cvName: string };

export const DEFAULT_PROFILE: Profile = {
  name: 'Mohamed Wael', title: 'Frontend & Full-Stack Developer', bio: '', avatarUrl: '',
  cvUrl: '/Mohamed_Wael_CV.pdf', cvName: 'Mohamed_Wael_CV.pdf',
};

const FILES_BUCKET = 'site-files';

let cached: Profile | null = null;
let inflight: Promise<Profile> | null = null;
const listeners = new Set<(p: Profile) => void>();

function requireSupabase() {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  return sb;
}

export function fetchProfile(): Promise<Profile> {
  if (cached) return Promise.resolve(cached);
  const sb = getSupabase();
  if (!sb) return Promise.resolve(DEFAULT_PROFILE);
  if (inflight) return inflight;
  inflight = (async () => {
    const { data } = await sb.from('site_settings').select('value').eq('key', 'profile').maybeSingle();
    cached = { ...DEFAULT_PROFILE, ...((data?.value as Partial<Profile> | undefined) ?? {}) };
    return cached;
  })().catch(() => DEFAULT_PROFILE).finally(() => { inflight = null; });
  return inflight;
}

export async function saveProfile(p: Profile) {
  const sb = requireSupabase();
  const { error } = await sb.from('site_settings').upsert({ key: 'profile', value: p, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  cached = p;
  listeners.forEach(l => l(p));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(cached ?? DEFAULT_PROFILE);
  useEffect(() => {
    listeners.add(setProfile);
    void fetchProfile().then(setProfile);
    return () => { listeners.delete(setProfile); };
  }, []);
  return profile;
}

/** Browsers ignore `download` on cross-origin links, so ask Supabase Storage to send the file as an attachment. */
export function cvDownloadUrl(url: string, filename = 'Mohamed_Wael_CV.pdf') {
  if (!url.includes('/storage/v1/object/public/') || url.includes('download=')) return url;
  return `${url}${url.includes('?') ? '&' : '?'}download=${encodeURIComponent(filename)}`;
}

/** Uploads a file to the `site-files` bucket under `folder/` and returns its public URL. */
export async function uploadSiteFile(file: File, folder: 'cv' | 'images'): Promise<string> {
  const sb = requireSupabase();
  const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, '_');
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await sb.storage.from(FILES_BUCKET).upload(path, file, { contentType: file.type || undefined });
  if (error) throw new Error(error.message);
  return sb.storage.from(FILES_BUCKET).getPublicUrl(path).data.publicUrl;
}

export type SiteFile = { name: string; size: number; url: string };

export async function listSiteFiles(): Promise<SiteFile[]> {
  const sb = requireSupabase();
  const out: SiteFile[] = [];
  for (const folder of ['cv', 'images']) {
    const { data, error } = await sb.storage.from(FILES_BUCKET).list(folder, { sortBy: { column: 'created_at', order: 'desc' } });
    if (error) throw new Error(error.message);
    for (const f of data ?? []) {
      if (!f.id) continue; // skip placeholder/folder entries
      const path = `${folder}/${f.name}`;
      out.push({ name: path, size: (f.metadata as { size?: number } | null)?.size ?? 0, url: sb.storage.from(FILES_BUCKET).getPublicUrl(path).data.publicUrl });
    }
  }
  return out;
}
