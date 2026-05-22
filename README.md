# Mohamed Wael — Portfolio

Personal portfolio built with React 19 + Vite + TypeScript + Tailwind CSS v4.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |

## Deploy to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `.` (root of this folder)
4. Deploy ✅

## Optional: Supabase (Cloud Data Sync)

Copy `.env.example` to `.env` and fill in your Supabase credentials.
This lets project data sync across all browsers instead of using localStorage.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- Radix UI / shadcn
- Wouter (routing)
- Supabase (optional)

## Admin Panel

Visit `/admin` — password: `mw2026`
