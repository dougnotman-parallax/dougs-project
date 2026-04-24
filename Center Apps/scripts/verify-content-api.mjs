#!/usr/bin/env node
/**
 * Verifies CMS load/save flow: GET /api/content, optional PUT, GET again.
 * Usage: node scripts/verify-content-api.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */
const BASE = process.argv[2] || 'http://localhost:3000';

async function get(locale = 'en') {
  const url = `${BASE}/api/content` + (locale ? '?locale=' + encodeURIComponent(locale) : '');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET failed: ${res.status} ${res.statusText}`);
  return res.json();
}

async function put(body) {
  const res = await fetch(`${BASE}/api/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PUT failed: ${res.status} ${res.statusText} ${t}`);
  }
  return res.json();
}

async function main() {
  console.log('Verifying CMS load/save flow at', BASE);
  const required = ['home', 'what', 'why', 'how'];

  // 1. Load
  const content = await get();
  for (const key of required) {
    if (!(key in content)) throw new Error(`GET missing key: ${key}`);
  }
  console.log('GET /api/content: OK (home, what, why, how present)');

  // 2. Save (round-trip: same payload; API expects { locale, home, what, why, how })
  await put({ locale: 'en', home: content.home, what: content.what, why: content.why, how: content.how });
  console.log('PUT /api/content: OK');

  // 3. Load again and confirm
  const after = await get();
  for (const key of required) {
    if (!(key in after)) throw new Error(`GET after save missing key: ${key}`);
  }
  console.log('GET after save: OK');
  console.log('CMS load/save flow verified.');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
