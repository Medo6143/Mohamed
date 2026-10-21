-- Adds the Stockly project to the live Supabase database.
-- Run once in Supabase → SQL Editor (after schema.sql, which adds the backend_repo column).
-- Existing rows are pushed down one position so Stockly shows first.

alter table public.projects add column if not exists backend_repo text not null default '';

update public.projects set position = position + 1;

insert into public.projects
  (id, title, short, description, full_description, tech, frameworks, primary_framework,
   live, repo, backend_repo, image, status, category, type, featured, position)
values (
  'stockly',
  'Stockly — ستوكلي',
  'AI Inventory App for Small Shops',
  'Flutter app for pharmacies & grocery stores in Egypt: snap a supplier invoice and AI extracts items, quantities and prices, matches them to your products and updates stock. Barcode quick-sale, offline-first sync, Arabic/English RTL, Paymob subscriptions, .NET 10 backend with Blazor admin panel.',
  'Stockly (ستوكلي) is an AI-powered inventory management app built for small shops in Egypt — pharmacies and grocery stores. The shop owner photographs a supplier invoice; the backend sends it to an LLM via OpenRouter which extracts the supplier, invoice number, line items, quantities and prices, validates the total (a difference above 2% raises a warning) and fuzzy-matches each line to the shop''s products in Arabic and English with a confidence score. One confirmation updates stock, and the system remembers supplier naming for next time. Quick sale scans barcodes with the camera or a USB/Bluetooth reader and decrements stock instantly. The app is offline-first: invoices and sales are stored locally with Drift and synced without duplicates when the connection returns. It supports multiple units per product (strip / box / carton), a full stock-movement ledger, a summary dashboard with low-stock, negative-stock, expiring items and today''s sales, full RTL Arabic and English, light and dark themes, and subscription plans paid by card, Vodafone Cash or kiosk through Paymob. The mobile app uses Flutter with Riverpod, go_router, Dio, Drift and freezed. The backend is .NET 10 with EF Core, MediatR, Identity + JWT, Hangfire and Polly on PostgreSQL 16, Redis 7 and MinIO, plus a Blazor admin panel for managing shops, plans, scan limits, AI cost and payments. 1,918 backend tests and 1,427 mobile tests with 97% logic coverage.',
  array['Flutter','Riverpod','Drift','.NET 10','EF Core','PostgreSQL','Redis','MinIO','OpenRouter LLM','Paymob','Blazor','Hangfire'],
  array['Flutter','.NET','Blazor'],
  'Flutter',
  'https://stockly-site.vercel.app/',
  'https://github.com/Medo6143/STOCKLY_MOBILE',
  'https://github.com/Medo6143/STPOCKLY_BACKEND',
  '/projects/stockly.webp',
  '',
  'Mobile',
  'mobile',
  true,
  0
)
on conflict (id) do update set
  title = excluded.title, short = excluded.short, description = excluded.description,
  full_description = excluded.full_description, tech = excluded.tech, frameworks = excluded.frameworks,
  primary_framework = excluded.primary_framework, live = excluded.live, repo = excluded.repo,
  backend_repo = excluded.backend_repo, image = excluded.image, category = excluded.category,
  type = excluded.type, featured = excluded.featured, position = excluded.position;
