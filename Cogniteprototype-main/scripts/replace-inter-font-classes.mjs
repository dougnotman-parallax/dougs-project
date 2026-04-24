/**
 * One-off / repeatable: map Figma Inter arbitrary classes → Aura (font-sans + weight).
 */
import fs from "node:fs";
import path from "node:path";

function walkTsx(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walkTsx(p, out);
    else if (/\.(tsx|ts|jsx|js)$/.test(name.name)) out.push(p);
  }
  return out;
}

const REPLACEMENTS = [
  [/font-\['Inter:Semi-bold',sans-serif\]/g, "font-sans font-semibold"],
  [/font-\['Inter:Semi_Bold',sans-serif\]\s+font-semibold/g, "font-sans font-semibold"],
  [/font-\['Inter:600',sans-serif\]\s+font-semibold/g, "font-sans font-semibold"],
  [/font-\['Inter:600',sans-serif\]/g, "font-sans"],
  [/font-\['Inter:500',sans-serif\]\s+font-medium/g, "font-sans font-medium"],
  [/font-\['Inter:500',sans-serif\]/g, "font-sans font-medium"],
  [/font-\['Inter:400',sans-serif\]/g, "font-sans font-normal"],
  [/font-\['Inter:Medium',sans-serif\]\s+font-medium/g, "font-sans font-medium"],
  [/font-\['Inter:Medium',sans-serif\]/g, "font-sans font-medium"],
  [/font-\['Inter:Regular',sans-serif\]\s+font-normal/g, "font-sans font-normal"],
  [/font-\['Inter:Regular',sans-serif\]/g, "font-sans font-normal"],
  [/font-\['Inter:Italic',sans-serif\]\s+font-normal\s+italic/g, "font-sans font-normal italic"],
  [/font-\['Inter:Italic',sans-serif\]/g, "font-sans italic"],
  [/font-\['Inter',sans-serif\]/g, "font-sans"],
];

const root = path.join(process.cwd(), "src");
let changed = 0;
for (const file of walkTsx(root)) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  for (const [re, rep] of REPLACEMENTS) after = after.replace(re, rep);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log(`Updated ${changed} files (Inter → font-sans).`);
