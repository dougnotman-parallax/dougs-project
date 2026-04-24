/**
 * Tailwind v4 primary config lives in CSS (`src/styles/tailwind.css`, `theme.css`).
 * This file exists so shadcn/ui CLI and editors that expect a root config keep working.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
