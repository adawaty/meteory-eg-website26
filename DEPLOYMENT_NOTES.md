# Deployment + Neon Notes (Meteory)

This file contains **live credentials**. Do not commit it to Git.

## Neon project

- Project name: `meteory-eg-prod`
- Project ID: `twilight-darkness-92218630`
- Branch: `main` (`br-wild-violet-akxkmxwl`)
- Database: `neondb`

### DATABASE_URL (serverless)

Use this as `DATABASE_URL` in Vercel environment variables:

```
postgresql://neondb_owner:npg_mMeqNKD2Rf0L@ep-aged-cell-akp8tnkr-pooler.c-3.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
```

## Schema applied

The schema from `db/schema.sql` has already been applied to Neon (table: `public.leads`).

## Backend functions

Vercel Functions are in:
- `api/auth.ts`
- `api/leads.ts`

Required Vercel env vars:
- `DATABASE_URL` (from above)
- `ADMIN_PASSWORD` (set your own)

## Verified

- Insert lead via `POST /api/leads` ✅
- Admin login via `POST /api/auth` ✅
- List leads via `GET /api/leads` with admin cookie ✅
- Update lead status via `PATCH /api/leads` with admin cookie ✅

## Local end-to-end test command

```
DATABASE_URL='...' ADMIN_PASSWORD='...' pnpm tsx scripts/e2e-neon-test.ts
```
