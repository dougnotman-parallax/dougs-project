#!/usr/bin/env node
/**
 * Seed: reads content.default.json and content.default.{no,ja}.json, upserts
 * home_en, home_no, home_ja, what_en, ... into the Vercel Postgres `content` table.
 * Requires: POSTGRES_URL. Run: vercel env pull .env.development.local && npm run seed
 */
import dotenv from 'dotenv';
import { createPool } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(projectRoot, '.env.development.local') });
dotenv.config({ path: path.join(projectRoot, '.env.local') });

const SECTIONS = ['home', 'what', 'why', 'how'];
const LOCALES = ['en', 'no', 'ja'];

function getDefaultContent(locale) {
  const file = locale === 'en' ? 'content.default.json' : `content.default.${locale}.json`;
  const filePath = path.join(projectRoot, file);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    if (locale !== 'en') return getDefaultContent('en');
    throw e;
  }
}

function sectionId(section, locale) {
  return `${section}_${locale}`;
}

async function main() {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error('Missing POSTGRES_URL. Set it to your Vercel Postgres (or Neon) connection string.');
    process.exit(1);
  }

  const pool = createPool({ connectionString });

  try {
    await pool.sql`
      CREATE TABLE IF NOT EXISTS content (
        section    text PRIMARY KEY,
        payload    jsonb NOT NULL,
        updated_at timestamptz DEFAULT now()
      )
    `;
    for (const locale of LOCALES) {
      const defaultContent = getDefaultContent(locale);
      for (const section of SECTIONS) {
        const payload = defaultContent[section];
        if (payload === undefined) {
          console.warn(`Section "${section}" missing for locale "${locale}", skipping.`);
          continue;
        }
        const id = sectionId(section, locale);
        await pool.sql`
          INSERT INTO content (section, payload, updated_at)
          VALUES (${id}, ${JSON.stringify(payload)}::jsonb, now())
          ON CONFLICT (section) DO UPDATE SET
            payload = EXCLUDED.payload,
            updated_at = now()
        `;
        console.log(`Upserted ${id}`);
      }
    }
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
