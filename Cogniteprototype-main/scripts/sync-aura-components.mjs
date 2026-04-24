/**
 * Pulls all items from the Aura shadcn registry into src/ (no npm install).
 * Skips per-component globals.css merges — only the @aura/css item writes src/styles.css.
 * Rewrites relative cn() imports to @/lib/utils.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REGISTRY_BASE = "https://cognitedata.github.io/aura/r";

function fixImports(code) {
  return (
    code
      // cn / utils
      .replace(/from\s+['"](?:\.\.\/)+lib\/utils['"]/g, "from '@/lib/utils'")
      // any stray single-level
      .replace(/from\s+['"]\.\/lib\/utils['"]/g, "from '@/lib/utils'")
  );
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

async function main() {
  const registry = await fetchJson(`${REGISTRY_BASE}/registry.json`);
  let wrote = 0;
  let skippedStyles = 0;

  for (const entry of registry.items) {
    const item = await fetchJson(`${REGISTRY_BASE}/${entry.name}.json`);
    const files = item.files ?? [];

    for (const file of files) {
      if (!file.content) continue;

      const rel = file.target ?? file.path;
      const isAuraCssBundle =
        rel.replace(/\\/g, "/").endsWith("styles.css") || rel.replace(/\\/g, "/").endsWith("globals.css");

      if (isAuraCssBundle && entry.name !== "css") {
        skippedStyles++;
        continue;
      }

      const outPath = path.join(ROOT, rel);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      const ext = path.extname(outPath);
      const body =
        ext === ".tsx" || ext === ".ts" || ext === ".jsx" || ext === ".js" ? fixImports(file.content) : file.content;
      await fs.writeFile(outPath, body, "utf8");
      wrote++;
    }
  }

  console.log(`Aura sync: wrote ${wrote} files (skipped ${skippedStyles} redundant style bundles).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
