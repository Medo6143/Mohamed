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

## Supabase (projects + admin)

Projects are stored in Supabase; the admin panel writes to it and the site reads from it.

1. Create a project on supabase.com.
2. SQL Editor → run [`supabase/schema.sql`](supabase/schema.sql) (table, image bucket, security rules).
3. Authentication → Users → **Add user** (your admin email + password).
4. Authentication → Sign In / Providers → turn **off** "Allow new users to sign up".
5. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
   (Project Settings → API). Add the same two variables in Vercel.
6. Open `/admin`, sign in, and click **Import default projects** once.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- Radix UI / shadcn
- Wouter (routing)
- Supabase (database, auth, storage)

## Admin Panel

Visit `/admin` and sign in with the Supabase user you created.
