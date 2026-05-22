import { useState, useCallback, useEffect } from 'react';
import { getSupabase } from './supabaseClient';

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
  image: string;
  status: string;
  category: string;
  type: 'web' | 'mobile';
  featured: boolean;
};

const DEFAULT_PROJECTS: Project[] = [
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
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90&fit=crop',
    status: '',
    category: 'Real Estate',
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
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1400&q=90&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400&q=90&fit=crop',
    status: '',
    category: 'Web',
    type: 'web',
    featured: false,
  },
];

const STORAGE_KEY = 'mw_portfolio_projects_v2';

function load(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch { /* ignore */ }
  return DEFAULT_PROJECTS;
}

function persist(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/* ── Supabase helpers (optional — only active when env vars are set) ── */
type SupabaseProject = {
  id: string; title: string; short: string; description: string;
  full_description: string; tech: string[]; frameworks: string[];
  primary_framework: string; live: string; repo: string; image: string;
  status: string; category: string; type: string; featured: boolean;
};

function toLocal(r: SupabaseProject): Project {
  return {
    id: r.id, title: r.title, short: r.short ?? '', description: r.description ?? '',
    fullDescription: r.full_description ?? '', tech: r.tech ?? [], frameworks: r.frameworks ?? [],
    primaryFramework: r.primary_framework ?? '', live: r.live ?? '', repo: r.repo ?? '',
    image: r.image ?? '', status: r.status ?? '', category: r.category ?? 'Web',
    type: (r.type as 'web' | 'mobile') ?? 'web', featured: r.featured ?? false,
  };
}

function toRemote(p: Project): SupabaseProject {
  return {
    id: p.id, title: p.title, short: p.short, description: p.description,
    full_description: p.fullDescription, tech: p.tech, frameworks: p.frameworks,
    primary_framework: p.primaryFramework, live: p.live, repo: p.repo,
    image: p.image, status: p.status, category: p.category, type: p.type, featured: p.featured,
  };
}

async function fetchFromSupabase(): Promise<Project[] | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('projects').select('*').order('created_at');
  if (error || !data || data.length === 0) return null;
  return (data as SupabaseProject[]).map(toLocal);
}

async function syncToSupabase(projects: Project[]) {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('projects').upsert(projects.map(toRemote), { onConflict: 'id' });
  } catch { /* silent */ }
}

/* ── Hook ── */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(load);
  const [synced, setSynced] = useState(false);

  // On mount, try to pull from Supabase (overrides localStorage if table has data)
  useEffect(() => {
    if (synced) return;
    fetchFromSupabase().then(remote => {
      if (remote && remote.length > 0) {
        persist(remote);
        setProjects(remote);
      }
      setSynced(true);
    }).catch(() => setSynced(true));
  }, [synced]);

  const save = useCallback((updated: Project[]) => {
    persist(updated);
    setProjects(updated);
    void syncToSupabase(updated);
  }, []);

  const addProject = useCallback((p: Project) => {
    save([...projects, p]);
  }, [projects, save]);

  const updateProject = useCallback((id: string, p: Partial<Project>) => {
    save(projects.map(x => x.id === id ? { ...x, ...p } : x));
  }, [projects, save]);

  const removeProject = useCallback((id: string) => {
    save(projects.filter(x => x.id !== id));
  }, [projects, save]);

  const resetToDefaults = useCallback(() => {
    save(DEFAULT_PROJECTS);
  }, [save]);

  return { projects, addProject, updateProject, removeProject, resetToDefaults };
}

export const ADMIN_PASSWORD = 'mw2026';
