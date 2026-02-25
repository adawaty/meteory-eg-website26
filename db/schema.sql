-- Meteory Fire Safety - Neon Postgres schema
-- Used by Vercel Serverless Functions in /api (leads + auth)

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  app_name TEXT,
  facility_type TEXT,
  area NUMERIC,
  hazard_level TEXT,
  total_units INTEGER,

  status TEXT NOT NULL DEFAULT 'New',
  data JSONB
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
