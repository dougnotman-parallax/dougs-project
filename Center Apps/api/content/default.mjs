import { getDefaultContent, ALLOWED_LOCALES } from '../lib/default-content.mjs';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request) {
  const url = request?.url ? new URL(request.url) : null;
  const localeParam = url?.searchParams?.get('locale') ?? 'en';
  const locale = ALLOWED_LOCALES.includes(localeParam) ? localeParam : 'en';

  try {
    const data = getDefaultContent(locale);
    return jsonResponse(data);
  } catch (err) {
    console.error('GET /api/content/default error:', err.message);
    return jsonResponse({ home: {}, what: {}, why: {}, how: {} });
  }
}
