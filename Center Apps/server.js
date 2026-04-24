require('dotenv').config({ path: require('path').join(__dirname, '.env.development.local') });
require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_FILE = path.join(__dirname, 'content.json');
const DEFAULT_CONTENT_FILE = path.join(__dirname, 'content.default.json');
const USE_POSTGRES = !!process.env.POSTGRES_URL;
const ALLOWED_LOCALES = ['en', 'no', 'ja'];

function getDefaultContent(locale = 'en') {
  const safe = ALLOWED_LOCALES.includes(locale) ? locale : 'en';
  const file = safe === 'en' ? 'content.default.json' : `content.default.${safe}.json`;
  const filePath = path.join(__dirname, file);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    if (safe !== 'en') return getDefaultContent('en');
    throw e;
  }
}

function sectionId(section, locale) {
  return `${section}_${locale}`;
}

function readContent() {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Could not read content.json:', e.message);
  }
  const defaultContent = getDefaultContent('en');
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
  } catch (e) {
    console.warn('Could not write content.json:', e.message);
  }
  return defaultContent;
}

function writeContent(content) {
  if (!content || typeof content !== 'object') {
    throw new Error('Invalid content: must be an object');
  }
  const required = ['home', 'what', 'why', 'how'];
  for (const key of required) {
    if (!(key in content)) {
      throw new Error(`Invalid content: missing top-level key "${key}"`);
    }
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.get('/api/content', async (req, res) => {
  try {
    const localeParam = req.query.locale || 'en';
    const locale = ALLOWED_LOCALES.includes(localeParam) ? localeParam : 'en';
    if (USE_POSTGRES) {
      const { sql } = await import('@vercel/postgres');
      const s1 = sectionId('home', locale);
      const s2 = sectionId('what', locale);
      const s3 = sectionId('why', locale);
      const s4 = sectionId('how', locale);
      const { rows } = await sql`
        SELECT section, payload FROM content
        WHERE section IN (${s1}, ${s2}, ${s3}, ${s4})
      `;
      const result = { ...getDefaultContent(locale) };
      for (const row of rows) {
        if (row && row.section && row.payload != null) {
          const base = row.section.replace(/_(en|no|ja)$/, '');
          result[base] = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
        }
      }
      return res.json(result);
    }
    const content = readContent();
    res.json(content);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/content/default', (req, res) => {
  try {
    const localeParam = req.query.locale || 'en';
    const locale = ALLOWED_LOCALES.includes(localeParam) ? localeParam : 'en';
    const content = getDefaultContent(locale);
    res.json(content);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/content', async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Body must be a JSON object' });
    }
    const locale = body.locale;
    if (USE_POSTGRES) {
      if (!locale || !ALLOWED_LOCALES.includes(locale)) {
        return res.status(400).json({ error: 'Missing or invalid "locale" (use en, no, or ja)' });
      }
    }
    const required = ['home', 'what', 'why', 'how'];
    for (const key of required) {
      if (!(key in body)) {
        return res.status(400).json({ error: `Missing top-level key: ${key}` });
      }
    }
    if (USE_POSTGRES) {
      const { sql } = await import('@vercel/postgres');
      const client = await sql.connect();
      try {
        for (const section of required) {
          const payload = body[section];
          const id = sectionId(section, locale);
          await client.sql`
            INSERT INTO content (section, payload, updated_at)
            VALUES (${id}, ${JSON.stringify(payload)}::jsonb, now())
            ON CONFLICT (section) DO UPDATE SET
              payload = EXCLUDED.payload,
              updated_at = now()
          `;
        }
        return res.json({ ok: true });
      } finally {
        client.release();
      }
    }
    writeContent(body);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`App: http://localhost:${PORT}/`);
  console.log(`CMS: http://localhost:${PORT}/cms.html`);
  console.log(`API /api/content: ${USE_POSTGRES ? 'Postgres' : 'content.json'}`);
});
