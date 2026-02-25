# Meteory Fire Safety (EN/AR)

A bilingual (English/Arabic) multipage corporate website for **Meteory-eg.com** with full RTL support, product catalog, projects, services, safety calculator, and lead-generation forms.

## Tech

- Frontend: React + Vite + Tailwind v4 + shadcn/ui + wouter
- Serverless backend (optional but recommended): **Vercel Functions** (`/api/*`)
- Database (optional but recommended): **Neon Postgres**

## Local development

```bash
pnpm install
```

### Option A (recommended): run frontend + local API bridge

This repo includes a small local server that mounts the Vercel-style functions so the frontend can call `/api/*` during `pnpm dev`.

Terminal 1:

```bash
DATABASE_URL='...' ADMIN_PASSWORD='...' pnpm tsx scripts/dev-api.ts
```

Terminal 2:

```bash
pnpm dev
```

### Option B: point frontend to a deployed API

Set `VITE_API_BASE_URL` to your deployed domain.

> Note: The contact form / calculator lead submission calls `POST /api/leads`.

## Deploy (GitHub → Vercel)

1. Push this repo to GitHub.
2. Create a **Neon** project and copy the `DATABASE_URL`.
3. Run the SQL in `db/schema.sql` in Neon’s SQL editor.
4. Create a new **Vercel** project and import the GitHub repo.
5. Add environment variables in Vercel:

- `DATABASE_URL` = your Neon connection string
- `ADMIN_PASSWORD` = password for `/admin` dashboard login

6. Deploy.

## Admin dashboard

- Route: `/#/admin`
- Login: `/#/login`

The admin pages rely on:
- `GET/POST/DELETE /api/auth`
- `GET/PATCH /api/leads`

## Environment variables

### Frontend (optional)
- `VITE_API_BASE_URL` (optional): if set, the frontend will call `{VITE_API_BASE_URL}/api/*` instead of same-origin.

### Serverless (Vercel)
- `DATABASE_URL` (required for leads API)
- `ADMIN_PASSWORD` (required for auth API)

