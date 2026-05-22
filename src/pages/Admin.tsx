import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, ExternalLink, Github, ArrowLeft, Save, X, Lock,
  RotateCcw, Star, StarOff, BarChart2, Users, Eye, TrendingUp,
  Upload, FileText, Image, User, FolderOpen, RefreshCw, Mail, Clock,
} from 'lucide-react';
import { useProjects, ADMIN_PASSWORD, type Project } from '@/lib/projectsStore';

/* ─── Types ─────────────────────────────────────────────── */
type Tab = 'analytics' | 'projects' | 'profile' | 'files' | 'messages';

type Stats = {
  totalPageViews: number;
  uniqueVisitors: number;
  projectViews: Array<{ projectId: string | null; views: number }>;
  dailyViews: Array<{ date: string; views: number }>;
};

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  title: '', short: '', description: '', fullDescription: '',
  tech: [], frameworks: [], primaryFramework: '',
  live: '', repo: '', image: '', status: '',
  category: 'Web', type: 'web', featured: false,
};
const CATEGORIES = ['SaaS', 'E-Commerce', 'Real Estate', 'Mobile', 'App', 'Web'];
const FRAMEWORK_OPTIONS = ['React', 'Next.js', 'Angular', 'React Native', 'TypeScript', 'Redux', 'Firebase', 'Expo', 'JavaScript', 'Node.js', 'Vue'];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || Date.now().toString();
}

/* ─── Profile helpers (localStorage) ───────────────────── */
const PROFILE_KEY = 'mw_admin_profile';
type Profile = { name: string; title: string; bio: string; avatarUrl: string; cvUrl: string; cvName: string };
const DEFAULT_PROFILE: Profile = { name: 'Mohamed Wael', title: 'Frontend & Full-Stack Developer', bio: '', avatarUrl: '', cvUrl: '/Mohamed_Wael_CV.pdf', cvName: 'Mohamed_Wael_CV.pdf' };

function loadProfile(): Profile {
  try { const r = localStorage.getItem(PROFILE_KEY); return r ? JSON.parse(r) : DEFAULT_PROFILE; } catch { return DEFAULT_PROFILE; }
}
function saveProfile(p: Profile) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }

/* ─── Upload helper ─────────────────────────────────────── */
async function uploadFile(file: File, endpoint: string, field: string): Promise<{ url: string; name?: string }> {
  const fd = new FormData();
  fd.append(field, file);
  const res = await fetch(endpoint, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ url: string; name?: string }>;
}

/* ─── Main component ─────────────────────────────────────── */
export default function Admin() {
  const [, setLocation] = useLocation();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState<Tab>('analytics');

  if (!authed) {
    return <LoginScreen pw={pw} setPw={setPw} error={pwError} onSubmit={(e) => {
      e.preventDefault();
      if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(''); }
      else setPwError('Incorrect password');
    }} onBack={() => setLocation('/')} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass-panel border-b border-border px-6 py-3 flex items-center gap-4">
        <button onClick={() => setLocation('/')} className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={13} /> Portfolio
        </button>
        <span className="text-border">|</span>
        <span className="text-xs font-mono font-bold text-cyan">Admin Panel</span>
        <div className="flex-1" />
        <nav className="flex gap-1">
          {([
            ['analytics', BarChart2, 'Analytics'],
            ['projects', FolderOpen, 'Projects'],
            ['profile', User, 'Profile'],
            ['files', Upload, 'Files'],
            ['messages', Mail, 'Messages'],
          ] as [Tab, React.FC<{size?: number}>, string][]).map(([key, Icon, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${tab === key ? 'bg-cyan/15 text-cyan' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon size={12} /> {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-10">
        <AnimatePresence mode="wait">
          {tab === 'analytics' && <TabAnalytics key="analytics" />}
          {tab === 'projects' && <TabProjects key="projects" />}
          {tab === 'profile' && <TabProfile key="profile" />}
          {tab === 'files' && <TabFiles key="files" />}
          {tab === 'messages' && <TabMessages key="messages" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Login Screen ────────────────────────────────────────── */
function LoginScreen({ pw, setPw, error, onSubmit, onBack }: {
  pw: string; setPw: (v: string) => void; error: string;
  onSubmit: (e: React.FormEvent) => void; onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-panel border border-border rounded-2xl p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mx-auto mb-6">
          <Lock size={22} className="text-cyan" />
        </div>
        <h1 className="text-2xl font-mono font-bold text-foreground mb-1">Admin Panel</h1>
        <p className="text-sm text-muted-foreground font-mono mb-8">Enter your password to continue</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Password" className="form-input text-center" autoFocus />
          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
          <button type="submit" className="w-full py-3 bg-cyan text-background font-mono font-bold rounded hover:bg-cyan/90 transition-colors">[Enter]</button>
        </form>
        <button onClick={onBack} className="mt-6 text-xs text-muted-foreground font-mono hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto">
          <ArrowLeft size={12} /> Back to portfolio
        </button>
      </motion.div>
    </div>
  );
}

/* ─── Tab: Analytics ─────────────────────────────────────── */
function TabAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { projects } = useProjects();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) setStats(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const projectTitle = (id: string | null) =>
    id ? (projects.find(p => p.id === id)?.title ?? id) : 'Unknown';

  const maxDailyViews = stats?.dailyViews.reduce((m, d) => Math.max(m, d.views), 1) ?? 1;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-mono font-bold"><span className="text-cyan">&gt;</span> Analytics</h2>
        <button onClick={load} className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {loading && !stats ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground font-mono text-sm animate-pulse">Loading analytics...</div>
      ) : stats ? (
        <div className="space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Page Views', value: stats.totalPageViews, icon: Eye, color: 'text-cyan' },
              { label: 'Unique Visitors', value: stats.uniqueVisitors, icon: Users, color: 'text-violet' },
              { label: 'Projects Viewed', value: stats.projectViews.reduce((s, p) => s + Number(p.views), 0), icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'Top Project Views', value: stats.projectViews[0]?.views ?? 0, icon: BarChart2, color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="glass-panel border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon size={14} className={s.color} />
                  <span className="text-[10px] font-mono text-muted-foreground">{s.label}</span>
                </div>
                <div className={`text-3xl font-mono font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Daily bar chart */}
          {stats.dailyViews.length > 0 && (
            <div className="glass-panel border border-border rounded-xl p-6">
              <h3 className="text-xs font-mono text-muted-foreground mb-5 tracking-widest">// daily page views (last 14 days)</h3>
              <div className="flex items-end gap-1.5 h-28">
                {stats.dailyViews.map(d => (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group" title={`${d.date}: ${d.views} views`}>
                    <div className="w-full bg-cyan/20 hover:bg-cyan/40 transition-colors rounded-t"
                      style={{ height: `${Math.max(4, (Number(d.views) / maxDailyViews) * 100)}%` }} />
                    <span className="text-[8px] font-mono text-muted-foreground rotate-45 origin-left whitespace-nowrap hidden group-hover:block absolute -bottom-5 bg-background border border-border px-1 rounded z-10">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project views table */}
          {stats.projectViews.length > 0 && (
            <div className="glass-panel border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <h3 className="text-xs font-mono text-muted-foreground tracking-widest">// project views ranking</h3>
              </div>
              <div className="divide-y divide-border/50">
                {stats.projectViews.slice(0, 10).map((pv, i) => {
                  const pct = maxDailyViews > 0 ? (Number(pv.views) / (stats.projectViews[0]?.views || 1)) * 100 : 0;
                  return (
                    <div key={pv.projectId} className="flex items-center gap-4 px-5 py-3">
                      <span className="text-xs font-mono text-muted-foreground w-6">#{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-foreground">{projectTitle(pv.projectId)}</span>
                          <span className="text-xs font-mono text-cyan">{pv.views} views</span>
                        </div>
                        <div className="h-1 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-cyan/60 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stats.totalPageViews === 0 && (
            <div className="text-center py-12 font-mono text-muted-foreground">
              <p className="text-4xl mb-3 opacity-20">{'{ }'}</p>
              <p className="text-sm">No analytics data yet</p>
              <p className="text-xs mt-1">Visit the portfolio to start tracking</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 font-mono text-muted-foreground text-sm">Failed to load analytics</div>
      )}
    </motion.div>
  );
}

/* ─── Tab: Projects ──────────────────────────────────────── */
function TabProjects() {
  const { projects, addProject, updateProject, removeProject, resetToDefaults } = useProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Project, 'id'>>(EMPTY_PROJECT);
  const [techInput, setTechInput] = useState('');
  const [fwInput, setFwInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function openEdit(p: Project) {
    setEditing(p); setForm({ ...p }); setTechInput(p.tech.join(', ')); setFwInput(p.frameworks.join(', ')); setAdding(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
  function openAdd() {
    setEditing(null); setForm(EMPTY_PROJECT); setTechInput(''); setFwInput(''); setAdding(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
  function closeForm() { setEditing(null); setAdding(false); }

  async function handleImageUpload(file: File) {
    setImgUploading(true);
    try {
      const result = await uploadFile(file, '/api/uploads/image', 'image');
      setForm(f => ({ ...f, image: result.url }));
    } catch { alert('Image upload failed. Please try a URL instead.'); }
    finally { setImgUploading(false); }
  }

  function handleSave() {
    const techArr = techInput.split(',').map(s => s.trim()).filter(Boolean);
    const fwArr = fwInput.split(',').map(s => s.trim()).filter(Boolean);
    const data = { ...form, tech: techArr, frameworks: fwArr };
    if (editing) updateProject(editing.id, data);
    else addProject({ ...data, id: slugify(form.title) });
    setSaved(true); closeForm();
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-mono font-bold"><span className="text-cyan">&gt;</span> Projects</h2>
        <div className="flex items-center gap-3">
          {saved && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Save size={11} /> Saved
            </motion.span>
          )}
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-cyan text-background font-mono font-bold text-xs rounded hover:bg-cyan/90 transition-colors">
            <Plus size={13} /> Add Project
          </button>
        </div>
      </div>

      {/* Form */}
      <AnimatePresence>
        {(editing || adding) && (
          <motion.div ref={formRef} key="form"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="glass-panel border border-cyan/30 rounded-2xl p-7 mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-mono font-bold"><span className="text-cyan">&gt;</span> {editing ? 'Edit' : 'Add'} Project</h3>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title *"><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" /></Field>
              <Field label="Short subtitle"><input className="form-input" value={form.short} onChange={e => setForm(f => ({ ...f, short: e.target.value }))} placeholder="e.g. Healthcare SaaS Platform" /></Field>
              <Field label="Image URL or upload">
                <div className="flex gap-2">
                  <input className="form-input flex-1" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://... or upload below" />
                  <button onClick={() => imgInputRef.current?.click()} disabled={imgUploading}
                    className="px-3 py-2 glass-panel border border-border rounded text-xs font-mono text-muted-foreground hover:text-cyan hover:border-cyan/30 transition-all disabled:opacity-50 flex items-center gap-1.5">
                    {imgUploading ? <RefreshCw size={11} className="animate-spin" /> : <Image size={11} />}
                    {imgUploading ? '...' : 'Upload'}
                  </button>
                  <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                </div>
              </Field>
              <Field label="Primary Framework">
                <select className="form-input" value={form.primaryFramework} onChange={e => setForm(f => ({ ...f, primaryFramework: e.target.value }))}>
                  <option value="">Select...</option>
                  {FRAMEWORK_OPTIONS.map(fw => <option key={fw}>{fw}</option>)}
                </select>
              </Field>
              <Field label="Tech stack (comma-separated)"><input className="form-input" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, TypeScript, Firebase, ..." /></Field>
              <Field label="Frameworks / filter tags (comma-separated)"><input className="form-input" value={fwInput} onChange={e => setFwInput(e.target.value)} placeholder="React, Next.js, ..." /></Field>
              <Field label="Live URL"><input className="form-input" value={form.live} onChange={e => setForm(f => ({ ...f, live: e.target.value }))} placeholder="https://..." /></Field>
              <Field label="GitHub Repo URL"><input className="form-input" value={form.repo} onChange={e => setForm(f => ({ ...f, repo: e.target.value }))} placeholder="https://github.com/..." /></Field>
              <Field label="Category">
                <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Type">
                <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'web' | 'mobile' }))}>
                  <option value="web">Web App</option><option value="mobile">Mobile App</option>
                </select>
              </Field>
              <Field label="Status (optional)"><input className="form-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} placeholder="e.g. In Progress — 40%" /></Field>
              <div className="flex items-center gap-2 self-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-mono text-muted-foreground">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-cyan" />
                  Featured project
                </label>
              </div>
            </div>
            <Field label="Short description (card)" className="mt-4">
              <textarea className="form-input resize-none" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description for the project card..." />
            </Field>
            <Field label="Full description (detail page)" className="mt-4">
              <textarea className="form-input resize-none" rows={5} value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} placeholder="Full project description shown on the detail page..." />
            </Field>
            {form.image && (
              <div className="mt-4">
                <p className="text-[10px] font-mono text-muted-foreground mb-1.5">Image preview:</p>
                <img src={form.image} alt="preview" className="h-28 w-full object-cover rounded-lg opacity-70" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={!form.title}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan text-background font-mono font-bold text-xs rounded hover:bg-cyan/90 transition-colors disabled:opacity-50">
                <Save size={13} /> {editing ? 'Save Changes' : 'Add Project'}
              </button>
              <button onClick={closeForm} className="px-5 py-2.5 border border-border text-muted-foreground font-mono text-xs rounded hover:text-foreground transition-colors">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: projects.length, color: 'text-cyan' },
          { label: 'Featured', value: projects.filter(p => p.featured).length, color: 'text-violet' },
          { label: 'Others', value: projects.filter(p => !p.featured).length, color: 'text-muted-foreground' },
        ].map(s => (
          <div key={s.label} className="glass-panel border border-border rounded-xl p-4 text-center">
            <div className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] font-mono text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">// all projects</span>
          <button onClick={() => { if (window.confirm('Reset to defaults?')) resetToDefaults(); }}
            className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw size={10} /> Reset
          </button>
        </div>
        <div className="divide-y divide-border/40">
          {projects.map(project => (
            <div key={project.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] group">
              <div className="w-12 h-9 rounded overflow-hidden shrink-0 bg-secondary">
                {project.image && <img src={project.image} alt="" className="w-full h-full object-cover opacity-70" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold truncate">{project.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary/60 text-muted-foreground border border-border/50">{project.primaryFramework}</span>
                  {project.featured && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">★</span>}
                </div>
                <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">{project.short}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-cyan transition-colors"><ExternalLink size={12} /></a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><Github size={12} /></a>}
                <button onClick={() => updateProject(project.id, { featured: !project.featured })} className="p-1.5 text-muted-foreground hover:text-yellow-400 transition-colors">
                  {project.featured ? <Star size={12} className="text-yellow-400 fill-yellow-400" /> : <StarOff size={12} />}
                </button>
                <button onClick={() => openEdit(project)} className="p-1.5 text-muted-foreground hover:text-cyan transition-colors"><Pencil size={12} /></button>
                {deleteConfirm === project.id
                  ? <><button onClick={() => { removeProject(project.id); setDeleteConfirm(null); }} className="text-[10px] font-mono text-red-400 hover:text-red-300 px-2">confirm</button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-[10px] font-mono text-muted-foreground px-1">✕</button></>
                  : <button onClick={() => setDeleteConfirm(project.id)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={12} /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Tab: Profile ────────────────────────────────────────── */
function TabProfile() {
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [saved, setSaved] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  function save() {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleAvatarUpload(file: File) {
    setAvatarUploading(true);
    try {
      const result = await uploadFile(file, '/api/uploads/image', 'image');
      setProfile(p => ({ ...p, avatarUrl: result.url }));
    } catch { alert('Image upload failed.'); }
    finally { setAvatarUploading(false); }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-mono font-bold"><span className="text-cyan">&gt;</span> Profile</h2>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-cyan text-background font-mono font-bold text-xs rounded hover:bg-cyan/90 transition-colors">
          <Save size={12} /> {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="glass-panel border border-border rounded-2xl p-7 space-y-6">
        {/* Avatar */}
        <div className="flex items-start gap-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-secondary flex items-center justify-center">
              {profile.avatarUrl
                ? <img src={profile.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                : <User size={32} className="text-muted-foreground" />}
            </div>
            <button onClick={() => avatarInputRef.current?.click()} disabled={avatarUploading}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-cyan text-background rounded-full flex items-center justify-center hover:bg-cyan/90 transition-colors disabled:opacity-50">
              {avatarUploading ? <RefreshCw size={11} className="animate-spin" /> : <Upload size={11} />}
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])} />
          </div>
          <div className="flex-1 space-y-3">
            <Field label="Display Name">
              <input className="form-input" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Mohamed Wael" />
            </Field>
            <Field label="Title / Role">
              <input className="form-input" value={profile.title} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} placeholder="Frontend & Full-Stack Developer" />
            </Field>
          </div>
        </div>
        <Field label="Bio">
          <textarea className="form-input resize-none" rows={4} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Short bio shown in your About section..." />
        </Field>
        {profile.avatarUrl && (
          <div>
            <p className="text-[10px] font-mono text-muted-foreground mb-1">Avatar URL:</p>
            <p className="text-xs font-mono text-cyan break-all">{profile.avatarUrl}</p>
          </div>
        )}
        <div className="pt-2 border-t border-border text-[10px] font-mono text-muted-foreground">
          Profile info is saved locally in your browser
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Tab: Files ─────────────────────────────────────────── */
function TabFiles() {
  const [profile, setProfileState] = useState<Profile>(loadProfile);
  const [cvUploading, setCvUploading] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const [imgFiles, setImgFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  async function loadFiles() {
    setLoadingFiles(true);
    try {
      const res = await fetch('/api/uploads/list');
      if (res.ok) {
        const data = await res.json() as { files: Array<{ name: string; size: number }> };
        setImgFiles(data.files);
      }
    } finally { setLoadingFiles(false); }
  }

  useEffect(() => { loadFiles(); }, []);

  async function handleCvUpload(file: File) {
    setCvUploading(true);
    try {
      const result = await uploadFile(file, '/api/uploads/cv', 'cv') as { url: string; originalName?: string };
      const updated = { ...profile, cvUrl: result.url, cvName: result.originalName ?? file.name };
      saveProfile(updated);
      setProfileState(updated);
      alert(`CV uploaded! It's now live at: ${result.url}`);
    } catch { alert('CV upload failed. Please try again.'); }
    finally { setCvUploading(false); loadFiles(); }
  }

  const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-lg font-mono font-bold mb-8"><span className="text-cyan">&gt;</span> Files & Uploads</h2>

      {/* CV Section */}
      <div className="glass-panel border border-border rounded-2xl p-7 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/20 flex items-center justify-center shrink-0">
            <FileText size={22} className="text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-mono font-bold text-foreground mb-1">CV / Resume</h3>
            <p className="text-xs font-mono text-muted-foreground mb-4">Upload a new PDF to instantly update the CV download link across the whole portfolio.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => cvInputRef.current?.click()} disabled={cvUploading}
                className="flex items-center gap-2 px-4 py-2 bg-cyan text-background font-mono font-bold text-xs rounded hover:bg-cyan/90 transition-colors disabled:opacity-50">
                {cvUploading ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                {cvUploading ? 'Uploading...' : 'Upload New CV (PDF)'}
              </button>
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-3 py-2">
                <Eye size={11} /> View Current CV
              </a>
              <input ref={cvInputRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && handleCvUpload(e.target.files[0])} />
            </div>
            <div className="mt-4 p-3 rounded-lg bg-secondary/40 border border-border/50">
              <p className="text-[10px] font-mono text-muted-foreground">Current CV file:</p>
              <p className="text-xs font-mono text-cyan mt-0.5">{profile.cvName}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5 break-all">{profile.cvUrl}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded files list */}
      <div className="glass-panel border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">// uploaded files ({imgFiles.length})</span>
          <button onClick={loadFiles} className="text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw size={12} className={loadingFiles ? 'animate-spin' : ''} />
          </button>
        </div>
        {imgFiles.length === 0
          ? <div className="p-8 text-center text-xs font-mono text-muted-foreground">No files uploaded yet</div>
          : <div className="divide-y divide-border/40 max-h-80 overflow-y-auto">
            {imgFiles.map(f => (
              <div key={f.name} className="flex items-center gap-3 px-5 py-2.5">
                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center shrink-0">
                  {f.name.endsWith('.pdf') ? <FileText size={14} className="text-red-400" /> : <Image size={14} className="text-cyan" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-mono truncate">{f.name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground">{formatSize(f.size)}</p>
                </div>
                <a href={`/api/uploads/files/${f.name}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan hover:underline flex items-center gap-1 shrink-0">
                  <ExternalLink size={10} /> Open
                </a>
              </div>
            ))}
          </div>}
      </div>
    </motion.div>
  );
}

/* ─── Tab: Messages ───────────────────────────────────────── */
type ContactMsg = { id: number; name: string; email: string; subject: string; message: string; created_at: string };

function TabMessages() {
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  async function fetchMsgs() {
    setLoading(true);
    try {
      const res = await fetch('/api/contact/submissions');
      const data = await res.json() as { submissions: ContactMsg[] };
      setMsgs(data.submissions ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }

  useEffect(() => { void fetchMsgs(); }, []);

  function fmt(iso: string) {
    try { return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch { return iso; }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold">Contact Messages</h2>
          <p className="text-xs font-mono text-muted-foreground mt-1">Messages sent through the contact form</p>
        </div>
        <button onClick={() => void fetchMsgs()} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-secondary hover:bg-secondary/80 rounded border border-border/50 transition-colors">
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      {loading
        ? <div className="flex justify-center py-16"><RefreshCw size={20} className="animate-spin text-muted-foreground" /></div>
        : msgs.length === 0
          ? <div className="text-center py-20 glass-panel rounded-xl border border-border/50">
              <Mail size={28} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-mono text-muted-foreground">No messages yet</p>
              <p className="text-xs font-mono text-muted-foreground/60 mt-1">Messages from your contact form will appear here</p>
            </div>
          : <div className="space-y-3">
              {msgs.map(m => (
                <div key={m.id} className="glass-panel border border-border/50 rounded-xl overflow-hidden hover:border-cyan/30 transition-colors">
                  <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => setExpanded(expanded === m.id ? null : m.id)}>
                    <div className="w-9 h-9 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0 font-mono font-bold text-xs text-cyan">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-mono font-bold text-foreground">{m.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{m.email}</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground truncate">{m.subject || m.message}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground shrink-0">
                      <Clock size={10} />
                      {fmt(m.created_at)}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expanded === m.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                        className="overflow-hidden border-t border-border/30">
                        <div className="px-5 py-4 space-y-3">
                          {m.subject && (
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground block mb-1">Subject</span>
                              <p className="text-sm font-mono">{m.subject}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground block mb-1">Message</span>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap bg-secondary/40 rounded-lg p-4 border border-border/30">{m.message}</p>
                          </div>
                          <a href={`mailto:${m.email}?subject=Re: ${m.subject ?? ''}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-cyan/10 text-cyan hover:bg-cyan/20 border border-cyan/20 rounded transition-colors">
                            <Mail size={11} /> Reply via Email
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>}
    </motion.div>
  );
}

/* ─── Field helper ───────────────────────────────────────── */
function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-mono text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}

