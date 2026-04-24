import type { PDFDocumentProxy } from "pdfjs-dist";

/** Trim, collapse whitespace, strip common typographic/ASCII quotes. */
export function normalizeRetrieved(s: string): string {
  let t = s.trim().replace(/\s+/g, " ");
  t = t.replace(/^["'\u201c\u201d\u2018\u2019]+|["'\u201c\u201d\u2018\u2019]+$/g, "").trim();
  return t;
}

/**
 * Phrases and tokens from the citation excerpt for PDF text-layer matching.
 * Longer n-grams first (handled by sort) so customTextRenderer can prefer longer matches per span.
 */
export function buildHighlightPhrases(retrieved: string): string[] {
  const norm = normalizeRetrieved(retrieved);
  if (!norm) return [];

  const words = norm.split(/\s+/).filter(Boolean);
  const set = new Set<string>();
  const limit = Math.min(words.length, 24);

  for (let n = 4; n >= 2; n--) {
    for (let i = 0; i + n <= limit; i++) {
      const phrase = words.slice(i, i + n).join(" ");
      if (phrase.length >= 4) set.add(phrase);
    }
  }

  for (const w of words) {
    if (w.length >= 4) set.add(w);
  }

  const arr = [...set];
  arr.sort((a, b) => b.length - a.length);
  return arr;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Wrap longest-first non-overlapping case-insensitive matches in <mark>.
 */
export function highlightTextRun(str: string, phrases: string[]): string {
  if (!phrases.length) return escapeHtml(str);

  const lower = str.toLowerCase();
  const ranges: [number, number][] = [];

  for (const phrase of phrases) {
    if (phrase.length < 2) continue;
    const p = phrase.toLowerCase();
    let idx = 0;
    while ((idx = lower.indexOf(p, idx)) !== -1) {
      ranges.push([idx, idx + phrase.length]);
      idx += 1;
    }
  }

  if (!ranges.length) return escapeHtml(str);

  ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged: [number, number][] = [];
  for (const [s, e] of ranges) {
    const last = merged[merged.length - 1];
    if (!last || s > last[1]) merged.push([s, e]);
    else last[1] = Math.max(last[1], e);
  }

  let out = "";
  let last = 0;
  for (const [s, e] of merged) {
    out += escapeHtml(str.slice(last, s));
    out += `<mark class="pdf-citation-highlight-mark">${escapeHtml(str.slice(s, e))}</mark>`;
    last = e;
  }
  out += escapeHtml(str.slice(last));
  return out;
}

/** react-pdf CustomTextRenderer: HTML string per PDF text item. */
export function makePdfHighlightTextRenderer(phrases: string[]) {
  return (props: { str?: string }) => highlightTextRun(props.str ?? "", phrases);
}

/** Score pages by weighted substring hits (for jumping to the best page). */
export async function findBestPageForPhrases(
  pdf: PDFDocumentProxy,
  phrases: string[],
): Promise<number | null> {
  if (!phrases.length) return null;

  let bestPage = 1;
  let bestScore = 0;

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    const flat = tc.items
      .map((item) => (item && typeof item === "object" && "str" in item ? String((item as { str: string }).str) : ""))
      .join("");
    const lower = flat.toLowerCase();
    let score = 0;
    for (const phrase of phrases) {
      if (phrase.length < 2) continue;
      const pl = phrase.toLowerCase();
      let idx = 0;
      while ((idx = lower.indexOf(pl, idx)) !== -1) {
        score += phrase.length;
        idx += pl.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestPage = p;
    }
  }

  return bestScore > 0 ? bestPage : null;
}
