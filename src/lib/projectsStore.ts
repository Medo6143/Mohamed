import { useState, useCallback, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';

export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  fullDescription: string;
  tech: string[];
  frameworks: string[];
  primaryFramework: string;
  live: string;
  repo: string;
  backendRepo: string;
  image: string;
  status: string;
  category: string;
  type: 'web' | 'mobile';
  featured: boolean;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'stockly',
    title: 'Stockly — ستوكلي',
    short: 'AI Inventory App for Small Shops',
    description: 'Flutter app for pharmacies & grocery stores in Egypt: snap a supplier invoice and AI extracts items, quantities and prices, matches them to your products and updates stock. Barcode quick-sale, offline-first sync, Arabic/English RTL, Paymob subscriptions, .NET 10 backend with Blazor admin panel.',
    fullDescription: 'Stockly (ستوكلي) is an AI-powered inventory management app built for small shops in Egypt — pharmacies and grocery stores. The shop owner photographs a supplier invoice; the backend sends it to an LLM via OpenRouter which extracts the supplier, invoice number, line items, quantities and prices, validates the total (a difference above 2% raises a warning) and fuzzy-matches each line to the shop\'s products in Arabic and English with a confidence score. One confirmation updates stock, and the system remembers supplier naming for next time. Quick sale scans barcodes with the camera or a USB/Bluetooth reader and decrements stock instantly. The app is offline-first: invoices and sales are stored locally with Drift and synced without duplicates when the connection returns. It supports multiple units per product (strip / box / carton), a full stock-movement ledger, a summary dashboard with low-stock, negative-stock, expiring items and today\'s sales, full RTL Arabic and English, light and dark themes, and subscription plans paid by card, Vodafone Cash or kiosk through Paymob. The mobile app uses Flutter with Riverpod, go_router, Dio, Drift and freezed. The backend is .NET 10 with EF Core, MediatR, Identity + JWT, Hangfire and Polly on PostgreSQL 16, Redis 7 and MinIO, plus a Blazor admin panel for managing shops, plans, scan limits, AI cost and payments. 1,918 backend tests and 1,427 mobile tests with 97% logic coverage.',
    tech: ['Flutter', 'Riverpod', 'Drift', '.NET 10', 'EF Core', 'PostgreSQL', 'Redis', 'MinIO', 'OpenRouter LLM', 'Paymob', 'Blazor', 'Hangfire'],
    frameworks: ['Flutter', '.NET', 'Blazor'],
    primaryFramework: 'Flutter',
    live: 'https://stockly-site.vercel.app/',
    repo: 'https://github.com/Medo6143/STOCKLY_MOBILE',
    backendRepo: 'https://github.com/Medo6143/STPOCKLY_BACKEND',
    image: '/projects/stockly.webp',
    status: '',
    category: 'Mobile',
    type: 'mobile',
    featured: true,
  },
  {
    id: 'smart-clinic',
    title: 'Smart Clinic',
    short: 'Healthcare SaaS Platform',
    description: '3 portals (Patient, Doctor, Clinic ERP) with 70+ features, bilingual RTL/LTR, ICD-10 E-Prescription, AI-driven follow-ups via OpenRouter LLM, Paymob payments, real-time Firestore chat, offline-capable PWA.',
    fullDescription: 'Smart Clinic is a multi-platform healthcare management SaaS platform targeting Egypt & MENA. Built with Next.js 14 and Firebase, it features three fully distinct portals: a Patient web app, a Doctor portal, and a full Clinic ERP dashboard. The system includes 70+ features including hierarchical RBAC, a bilingual RTL/LTR UI system, an ICD-10 compliant E-Prescription module, AI-driven patient follow-ups powered by OpenRouter LLM API, Paymob payment gateway integration, real-time Firestore chat, and an offline-capable PWA with push notifications. The architecture is multi-tenant with shared Firebase backend. The UI is pixel-accurate across all breakpoints with a reusable component library.',
    tech: ['Next.js 14', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'OpenRouter LLM', 'Paymob', 'PWA'],
    frameworks: ['Next.js', 'React', 'TypeScript', 'Firebase'],
    primaryFramework: 'Next.js',
    live: 'https://smartclinic-two.vercel.app/',
    repo: 'https://github.com/Medo6143/smart-clinic-dashbord',
    backendRepo: '',
    image: '/projects/smart-clinic.webp',
    status: 'In Progress — 40%',
    category: 'SaaS',
    type: 'web',
    featured: true,
  },
  {
    id: 'owwab',
    title: 'Owwab — أواب',
    short: 'Islamic Companion App',
    description: 'Production-grade Islamic companion app for Android. Reliable Azan alerts with foreground service, floating Tasbeeh overlay, accurate prayer times, and smooth Quran reader. Engineered for battery efficiency and offline-first reliability.',
    fullDescription: 'Owwab (أواب) is a production-grade Islamic companion app built for Android using React Native and native Kotlin/Java. The app features reliable Azan alerts powered by a foreground service that works even when the phone is locked, a floating Tasbeeh overlay that overlays on top of other apps, accurate prayer times calculated from device location, and a smooth Quran reader. The app is engineered for battery efficiency using native Android services and offline-first architecture ensuring it works without internet. Built with Redux for state management and Expo for cross-platform tooling.',
    tech: ['React Native', 'Kotlin', 'Redux', 'Expo', 'Android'],
    frameworks: ['React Native', 'Redux', 'Expo'],
    primaryFramework: 'React Native',
    live: '',
    repo: '',
    backendRepo: '',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1400&q=90&fit=crop',
    status: '',
    category: 'Mobile',
    type: 'mobile',
    featured: true,
  },
  {
    id: 'eleve-store',
    title: 'Èlevè Store',
    short: 'Premium E-Commerce Platform',
    description: 'High-end Next.js 14 storefront with animated hero carousel, advanced category filtering, Redux Toolkit cart/wishlist/session persistence, Paymob payment gateway, and a fully-featured admin CMS dashboard.',
    fullDescription: 'Èlevè is a premium e-commerce platform built on Next.js 14 (App Router) with a focus on performance and visual excellence. It features an animated hero carousel, advanced category/price/brand filtering, and Redux Toolkit for cart, wishlist, and session persistence. The checkout integrates the Paymob payment gateway for Egyptian market payments. A separate fully-responsive admin dashboard was built with CMS capabilities, full CRUD operations for products/categories/orders, and seed data tooling for rapid QA cycles. The project demonstrates production-level Next.js architecture with SSR, image optimization, and route groups.',
    tech: ['Next.js 14', 'Redux Toolkit', 'Firebase', 'Paymob', 'TypeScript', 'Tailwind CSS'],
    frameworks: ['Next.js', 'React', 'Redux', 'TypeScript', 'Firebase'],
    primaryFramework: 'Next.js',
    live: 'https://store-eleve.vercel.app/',
    repo: 'https://github.com/Medo6143/STORE_ELEVE',
    backendRepo: '',
    image: '/projects/eleve-store.webp',
    status: '',
    category: 'E-Commerce',
    type: 'web',
    featured: true,
  },
  {
    id: 'resume-ai',
    title: 'ResumeAI',
    short: 'AI Resume Builder SaaS',
    description: '35+ CV templates, ATS analyzer, drag-and-drop reordering, PDF + Word export, Voice Interview & AI Mock Interview modules. Angular SSR for SEO — measurably improved Lighthouse scores.',
    fullDescription: 'ResumeAI is an AI-powered resume builder SaaS built with Angular and TypeScript. It offers 35+ fully customizable CV templates with live preview, drag-and-drop section reordering, and multi-format export (PDF via html2canvas + jsPDF, Word via docx.js). The AI-powered ATS Analyzer scores resumes against job descriptions and provides keyword recommendations. The Voice Interview and AI Mock Interview modules use OpenRouter LLM API to simulate real job interviews. The app is optimized for performance and SEO using Angular SSR, lazy-loaded routes, and code-splitting — with measurably improved Lighthouse scores. Bilingual RTL/LTR support for Arabic and English speakers.',
    tech: ['Angular', 'TypeScript', 'Firebase', 'OpenRouter LLM', 'Tailwind CSS', 'Angular SSR'],
    frameworks: ['Angular', 'TypeScript', 'Firebase'],
    primaryFramework: 'Angular',
    live: 'https://resume-ai2-qbyk.vercel.app/login',
    repo: 'https://github.com/Medo6143/ResumeAi2/',
    backendRepo: '',
    image: '/projects/resume-ai.webp',
    status: '',
    category: 'SaaS',
    type: 'web',
    featured: true,
  },
  {
    id: 'aqar-masr',
    title: 'Aqar Masr',
    short: 'Real Estate Platform',
    description: 'Real estate listing platform for the Egyptian market built with Next.js. Property browsing, advanced search/filter, inquiry system. Full Arabic RTL UI.',
    fullDescription: 'Aqar Masr is a real estate listing platform built specifically for the Egyptian property market. Built with Next.js for performance and SEO, it features property browsing with advanced search and filter (price, location, type, area), an inquiry system for connecting buyers and sellers, and a full Arabic RTL UI with responsive design. The platform targets the growing Egyptian real estate market with a focus on usability and Arabic-language experience.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
    frameworks: ['Next.js', 'Firebase'],
    primaryFramework: 'Next.js',
    live: 'https://aqarmasr-or81.vercel.app/',
    repo: '',
    backendRepo: '',
    image: '/projects/aqar-masr.webp',
    status: '',
    category: 'Real Estate',
    type: 'web',
    featured: true,
  },
  {
    id: 'hulul-tech',
    title: 'Hulul Tech — حلول تك',
    short: 'Company Website — Saudi Market',
    description: 'Bilingual (Arabic/English) company website for a Riyadh-based digital agency offering web, mobile, and branding services. Built with Next.js, with a free-consultation funnel, WhatsApp contact, and a contact form.',
    fullDescription: 'Hulul Tech (حلول تك) is the company website for a Riyadh-based digital agency that builds websites, mobile apps, and brand identities for businesses in Saudi Arabia. Built with Next.js, it is fully bilingual with an Arabic RTL default and an English version, and is organized into Services, Work, Process, and About pages. The homepage walks visitors through the agency\'s three services, Saudi digital-market statistics, a five-step delivery process, and how project pricing is determined, all leading to a free-consultation call to action. Visitors can get in touch through WhatsApp, a short project-request form, or an email contact form, and the site includes a cookie-consent banner with granular preferences.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'i18n (AR/EN)', 'RTL'],
    frameworks: ['Next.js', 'React'],
    primaryFramework: 'Next.js',
    live: 'https://hulul-cw7m.vercel.app/',
    repo: '',
    backendRepo: '',
    image: '/projects/hulul-tech.webp',
    status: '',
    category: 'Web',
    type: 'web',
    featured: true,
  },
  {
    id: 'amazon-clone',
    title: 'Amazon Clone',
    short: 'Full-Stack E-Commerce App',
    description: 'Full-featured e-commerce app with auth, product management, shopping cart, and order tracking. Built as Team Lead during DevWave internship.',
    fullDescription: 'A full-stack Amazon clone built with React and Firebase, developed as Team Lead during the DevWave internship. Features include Firebase Authentication, product management, shopping cart with real-time updates, order tracking, and a clean product listing UI. As Team Lead, responsibilities included dividing tasks among team members, tracking progress via Trello, conducting code reviews, and ensuring Git best practices throughout.',
    tech: ['React', 'Firebase', 'Redux', 'Bootstrap'],
    frameworks: ['React', 'Redux', 'Firebase'],
    primaryFramework: 'React',
    live: 'https://amazon-clone-seven-opal.vercel.app/',
    repo: 'https://github.com/Medo6143/Amazon_Clone',
    backendRepo: '',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=1400&q=90&fit=crop',
    status: '',
    category: 'E-Commerce',
    type: 'web',
    featured: false,
  },
  {
    id: 'chatme',
    title: 'ChatME',
    short: 'Real-Time Chat App',
    description: 'Real-time chat application built with React, Firebase, and Socket.io.',
    fullDescription: 'ChatME is a real-time chat application built with React, Firebase, and Socket.io. It features user authentication, real-time message delivery, chat rooms, and a clean messaging UI. The app demonstrates full-stack React development with real-time data synchronization.',
    tech: ['React', 'Firebase', 'Socket.io'],
    frameworks: ['React', 'Firebase'],
    primaryFramework: 'React',
    live: 'https://chat-me-six-zeta.vercel.app/',
    repo: 'https://github.com/medo6143/ChatME',
    backendRepo: '',
    image: '/projects/chatme.webp',
    status: '',
    category: 'App',
    type: 'web',
    featured: false,
  },
  {
    id: 'ecommerce-store',
    title: 'Ecommerce Store',
    short: 'React Shopping Store',
    description: 'E-commerce store built with React and Redux Toolkit for state management.',
    fullDescription: 'A clean e-commerce store built with React and Redux Toolkit. Features product listing, category filtering, shopping cart with Redux state management, and a responsive design. Deployed on Vercel.',
    tech: ['React', 'Redux'],
    frameworks: ['React', 'Redux'],
    primaryFramework: 'React',
    live: 'https://ecommerce-store55.vercel.app/',
    repo: 'https://github.com/medo6143/ecommerce-store',
    backendRepo: '',
    image: '/projects/ecommerce-store.webp',
    status: '',
    category: 'E-Commerce',
    type: 'web',
    featured: false,
  },
  {
    id: 'movies-app',
    title: 'Movies App',
    short: 'Movie Discovery App',
    description: 'Movie discovery app built with React, consuming a REST movies API.',
    fullDescription: 'A movie discovery app built with React that consumes a public movies REST API. Features include movie browsing, search functionality, genre filtering, movie detail pages, and a responsive grid layout. Built to practice API integration and React state management patterns.',
    tech: ['React', 'REST API'],
    frameworks: ['React'],
    primaryFramework: 'React',
    live: 'https://movies-app-lilac-eta.vercel.app/',
    repo: 'https://github.com/Medo6143/Movies_app__',
    backendRepo: '',
    image: '/projects/movies-app.webp',
    status: '',
    category: 'App',
    type: 'web',
    featured: false,
  },
  {
    id: 'karame-elsham',
    title: 'Karame El Sham',
    short: 'Restaurant Landing Page',
    description: 'Restaurant website and landing page built with React.',
    fullDescription: 'A restaurant website built with React featuring a modern landing page design. Includes a menu showcase, location information, and reservation call-to-action. Built with performance and visual appeal in mind.',
    tech: ['React'],
    frameworks: ['React'],
    primaryFramework: 'React',
    live: 'https://karame-elsham.vercel.app/',
    repo: 'https://github.com/Medo6143/Karame_ELSHAM',
    backendRepo: '',
    image: '/projects/karame-elsham.webp',
    status: '',
    category: 'Web',
    type: 'web',
    featured: false,
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    short: 'Interior Design Showcase',
    description: 'Interior design portfolio and showcase site built with React.',
    fullDescription: 'An interior design showcase website built with React. Features a portfolio-style gallery, project showcases, and a modern aesthetic suitable for design businesses. Demonstrates CSS layout skills and responsive design.',
    tech: ['React'],
    frameworks: ['React'],
    primaryFramework: 'React',
    live: 'https://inrerior-design.vercel.app/',
    repo: 'https://github.com/Medo6143/Inrerior_Design-',
    backendRepo: '',
    image: '/projects/interior-design.webp',
    status: '',
    category: 'Web',
    type: 'web',
    featured: false,
  },
  {
    id: 'image-search',
    title: 'Image Search',
    short: 'Image Search Engine',
    description: 'Image search application built with vanilla JavaScript consuming an image API.',
    fullDescription: 'A lightweight image search application built with vanilla JavaScript. Integrates with a public image API to fetch and display search results in a masonry-style grid. Features infinite scroll, keyword search, and image preview. Demonstrates clean JavaScript without frameworks.',
    tech: ['JavaScript', 'REST API'],
    frameworks: ['JavaScript'],
    primaryFramework: 'JavaScript',
    live: 'https://medo6143.github.io/image-search/',
    repo: 'https://github.com/medo6143/image-search',
    backendRepo: '',
    image: '/projects/image-search.webp',
    status: '',
    category: 'App',
    type: 'web',
    featured: false,
  },
  {
    id: 'game-xo',
    title: 'Game XO',
    short: 'Tic-Tac-Toe Game',
    description: 'Tic-Tac-Toe game built with vanilla JavaScript.',
    fullDescription: 'A classic Tic-Tac-Toe (XO) game built with vanilla JavaScript. Features two-player mode, win detection, draw detection, score tracking, and a clean minimal UI. Built as a JavaScript fundamentals project.',
    tech: ['JavaScript'],
    frameworks: ['JavaScript'],
    primaryFramework: 'JavaScript',
    live: 'https://medo6143.github.io/game_xo/',
    repo: 'https://github.com/medo6143/game_xo',
    backendRepo: '',
    image: '/projects/game-xo.png',
    status: '',
    category: 'App',
    type: 'web',
    featured: false,
  },
  {
    id: 'best-food',
    title: 'Best Food',
    short: 'Food Ordering App',
    description: 'Food ordering and delivery app built with React.',
    fullDescription: 'A food ordering application built with React. Features a restaurant menu, cart functionality, order customization, and a clean food-centric UI. Demonstrates React component architecture and state management for a real-world ordering flow.',
    tech: ['React'],
    frameworks: ['React'],
    primaryFramework: 'React',
    live: 'https://best-food-react-4060sdcuh-mohameds-projects-ea923384.vercel.app/',
    repo: 'https://github.com/medo6143/best-food',
    backendRepo: '',
    image: '/projects/best-food.webp',
    status: '',
    category: 'Web',
    type: 'web',
    featured: false,
  },
];

/* ── Supabase-backed store ──
 * Supabase is the single source of truth: the admin writes to it and the
 * public site reads from it. DEFAULT_PROJECTS is only a fallback while
 * Supabase isn't configured, the table is still empty, or the request fails.
 */
type SupabaseProject = {
  id: string; title: string; short: string; description: string;
  full_description: string; tech: string[]; frameworks: string[];
  primary_framework: string; live: string; repo: string; backend_repo?: string | null; image: string;
  status: string; category: string; type: string; featured: boolean;
  position?: number;
};

const FIELD_MAP: Record<keyof Project, keyof SupabaseProject> = {
  id: 'id', title: 'title', short: 'short', description: 'description',
  fullDescription: 'full_description', tech: 'tech', frameworks: 'frameworks',
  primaryFramework: 'primary_framework', live: 'live', repo: 'repo', backendRepo: 'backend_repo', image: 'image',
  status: 'status', category: 'category', type: 'type', featured: 'featured',
};

function toLocal(r: SupabaseProject): Project {
  return {
    id: r.id, title: r.title, short: r.short ?? '', description: r.description ?? '',
    fullDescription: r.full_description ?? '', tech: r.tech ?? [], frameworks: r.frameworks ?? [],
    primaryFramework: r.primary_framework ?? '', live: r.live ?? '', repo: r.repo ?? '', backendRepo: r.backend_repo ?? '',
    image: r.image ?? '', status: r.status ?? '', category: r.category ?? 'Web',
    type: (r.type as 'web' | 'mobile') ?? 'web', featured: r.featured ?? false,
  };
}

function toRemote(p: Partial<Project>): Partial<SupabaseProject> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(p)) {
    const col = FIELD_MAP[k as keyof Project];
    if (col && v !== undefined) out[col] = v;
  }
  return out as Partial<SupabaseProject>;
}

const CACHE_KEY = 'mw_projects_cache_v3';
const IMAGE_BUCKET = 'project-images';

function readCache(): Project[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : null;
  } catch { return null; }
}

function writeCache(projects: Project[]) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(projects)); } catch { /* ignore */ }
}

/* Shared state so every useProjects() instance sees the same data */
let dbProjects: Project[] | null = null;   // null = not loaded yet
let loadError: string | null = null;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function setDb(next: Project[]) {
  dbProjects = next;
  writeCache(next);
  listeners.forEach(l => l());
}

function requireSupabase() {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  return sb;
}

export function refreshProjects(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return Promise.resolve();
  if (inflight) return inflight;
  inflight = (async () => {
    const { data, error } = await sb.from('projects').select('*')
      .order('position', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) {
      loadError = error.message;
      listeners.forEach(l => l());
      return;
    }
    loadError = null;
    setDb((data as SupabaseProject[]).map(toLocal));
  })().finally(() => { inflight = null; });
  return inflight;
}

function uniqueId(base: string) {
  const taken = new Set((dbProjects ?? []).map(p => p.id));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

async function addProject(p: Project) {
  const sb = requireSupabase();
  const row = { ...toRemote({ ...p, id: uniqueId(p.id) }), position: dbProjects?.length ?? 0 };
  const { data, error } = await sb.from('projects').insert(row).select().single();
  if (error) throw new Error(error.message);
  setDb([...(dbProjects ?? []), toLocal(data as SupabaseProject)]);
}

async function updateProject(id: string, patch: Partial<Project>) {
  const sb = requireSupabase();
  const { id: _ignored, ...rest } = patch;
  const { data, error } = await sb.from('projects').update(toRemote(rest)).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  const updated = toLocal(data as SupabaseProject);
  setDb((dbProjects ?? []).map(x => x.id === id ? updated : x));
}

async function removeProject(id: string) {
  const sb = requireSupabase();
  const { error } = await sb.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  setDb((dbProjects ?? []).filter(x => x.id !== id));
}

/** Writes the built-in DEFAULT_PROJECTS into Supabase (insert or overwrite by id). */
async function seedDefaults() {
  const sb = requireSupabase();
  const rows = DEFAULT_PROJECTS.map((p, i) => ({ ...toRemote(p), position: i }));
  const { error } = await sb.from('projects').upsert(rows, { onConflict: 'id' });
  if (error) throw new Error(error.message);
  await refreshProjects();
}

/** Uploads an image to the `project-images` bucket and returns its public URL. */
export async function uploadProjectImage(file: File): Promise<string> {
  const sb = requireSupabase();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return sb.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/* ── Hook ── */
export function useProjects() {
  const [, force] = useState(0);

  useEffect(() => {
    const l = () => force(n => n + 1);
    listeners.add(l);
    if (dbProjects === null) void refreshProjects();
    return () => { listeners.delete(l); };
  }, []);

  const loading = isSupabaseConfigured && dbProjects === null && loadError === null;

  // What the public site shows: DB data if there is any, otherwise a fallback.
  let projects: Project[];
  if (!isSupabaseConfigured) projects = DEFAULT_PROJECTS;
  else if (dbProjects && dbProjects.length > 0) projects = dbProjects;
  else if (dbProjects === null && loadError === null) projects = readCache() ?? [];
  else projects = DEFAULT_PROJECTS;

  const refresh = useCallback(() => refreshProjects(), []);

  return {
    projects,
    /** Exactly what is stored in Supabase (no fallback) — used by the admin. */
    dbProjects: dbProjects ?? [],
    loading,
    error: loadError,
    refresh,
    addProject,
    updateProject,
    removeProject,
    seedDefaults,
  };
}
