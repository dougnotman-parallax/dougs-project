import { sql } from '@vercel/postgres';
import { getDefaultContent, ALLOWED_LOCALES } from './lib/default-content.mjs';

const REQUIRED_KEYS = ['home', 'what', 'why', 'how'];

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sectionId(section, locale) {
  return `${section}_${locale}`;
}

export async function GET(request) {
  const url = request?.url ? new URL(request.url) : null;
  const localeParam = url?.searchParams?.get('locale') ?? 'en';
  const locale = ALLOWED_LOCALES.includes(localeParam) ? localeParam : 'en';

  try {
    const sections = REQUIRED_KEYS.map((s) => sectionId(s, locale));
    const { rows } = await sql`
      SELECT section, payload
      FROM content
      WHERE section IN (${sections[0]}, ${sections[1]}, ${sections[2]}, ${sections[3]})
    `;
    const defaultContent = getDefaultContent(locale);
    const result = { ...defaultContent };
    for (const row of rows) {
      if (row?.section && row.payload != null) {
        const baseSection = row.section.replace(/_(en|no|ja)$/, '');
        result[baseSection] = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
      }
    }
    return jsonResponse(result);
  } catch (err) {
    console.error('GET /api/content error:', err.message);
    try {
      return jsonResponse(getDefaultContent(locale));
    } catch (e) {
      console.error('GET /api/content fallback error:', e.message);
      const safe = { home: {}, what: {}, why: {}, how: {} };
      return jsonResponse(safe);
    }
  }
}

export async function PUT(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }
  if (!body || typeof body !== 'object') {
    return jsonResponse({ error: 'Body must be a JSON object' }, 400);
  }
  const locale = body.locale;
  if (!locale || !ALLOWED_LOCALES.includes(locale)) {
    return jsonResponse({ error: 'Missing or invalid "locale" (use en, no, or ja)' }, 400);
  }
  for (const key of REQUIRED_KEYS) {
    if (!(key in body)) {
      return jsonResponse({ error: `Missing top-level key: ${key}` }, 400);
    }
  }
  try {
    const client = await sql.connect();
    try {
      for (const section of REQUIRED_KEYS) {
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
      return jsonResponse({ ok: true });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('PUT /api/content error:', err.message);
    return jsonResponse({ error: err.message }, 500);
  }
}
