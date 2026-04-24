-- MoonShot CMS content table (Vercel Postgres).
-- Run once when setting up the database (or use scripts/seed-content.mjs which creates the table).
--
-- Localization: section values are {section}_{locale}, e.g. home_en, home_no, home_ja,
-- what_en, ... (locales: en, no, ja). GET /api/content?locale= returns the four sections
-- for that locale; PUT sends { locale, home, what, why, how } and writes section_locale rows.

CREATE TABLE IF NOT EXISTS content (
  section    text PRIMARY KEY,
  payload    jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);
