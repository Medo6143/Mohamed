-- Run this once in Supabase → SQL Editor.
-- Creates the projects table, the storage bucket for project images,
-- and the security rules: everyone can read, only signed-in admins can write.

create table if not exists public.projects (
  id                text primary key,
  title             text not null,
  short             text not null default '',
  description       text not null default '',
  full_description  text not null default '',
  tech              text[] not null default '{}',
  frameworks        text[] not null default '{}',
  primary_framework text not null default '',
  live              text not null default '',
  repo              text not null default '',
  backend_repo      text not null default '',
  image             text not null default '',
  status            text not null default '',
  category          text not null default 'Web',
  type              text not null default 'web' check (type in ('web', 'mobile')),
  featured          boolean not null default false,
  position          integer not null default 0,
  created_at        timestamptz not null default now()
);

-- In case the table already existed from an older version
alter table public.projects add column if not exists position integer not null default 0;
alter table public.projects add column if not exists backend_repo text not null default '';

alter table public.projects enable row level security;

drop policy if exists "projects are public" on public.projects;
create policy "projects are public" on public.projects
  for select using (true);

drop policy if exists "admins can insert projects" on public.projects;
create policy "admins can insert projects" on public.projects
  for insert to authenticated with check (true);

drop policy if exists "admins can update projects" on public.projects;
create policy "admins can update projects" on public.projects
  for update to authenticated using (true) with check (true);

drop policy if exists "admins can delete projects" on public.projects;
create policy "admins can delete projects" on public.projects
  for delete to authenticated using (true);

-- Public bucket for project cover images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "project images are public" on storage.objects;
create policy "project images are public" on storage.objects
  for select using (bucket_id = 'project-images');

drop policy if exists "admins can upload project images" on storage.objects;
create policy "admins can upload project images" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-images');

-- ── Site settings (profile: name, bio, avatar, CV link) ──
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "settings are public" on public.site_settings;
create policy "settings are public" on public.site_settings
  for select using (true);

drop policy if exists "admins can write settings" on public.site_settings;
create policy "admins can write settings" on public.site_settings
  for all to authenticated using (true) with check (true);

-- Public bucket for the CV and other uploaded files
insert into storage.buckets (id, name, public)
values ('site-files', 'site-files', true)
on conflict (id) do nothing;

drop policy if exists "site files are public" on storage.objects;
create policy "site files are public" on storage.objects
  for select using (bucket_id = 'site-files');

drop policy if exists "admins can upload site files" on storage.objects;
create policy "admins can upload site files" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-files');
