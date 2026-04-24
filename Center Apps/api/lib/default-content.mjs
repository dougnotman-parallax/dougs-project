import fs from 'fs';
import path from 'path';

const ALLOWED_LOCALES = ['en', 'no', 'ja'];

/**
 * Resolve default content for a locale from JSON files at project root.
 * Uses process.cwd() so it works on Vercel where the full project is deployed.
 * (Matches the behavior that worked before: content.default.json at repo root.)
 */
export function getDefaultContent(locale = 'en') {
  const safeLocale = ALLOWED_LOCALES.includes(locale) ? locale : 'en';
  const fileName = safeLocale === 'en' ? 'content.default.json' : `content.default.${safeLocale}.json`;
  const filePath = path.join(process.cwd(), fileName);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    if (safeLocale !== 'en') {
      return getDefaultContent('en');
    }
    throw e;
  }
}

export { ALLOWED_LOCALES };
