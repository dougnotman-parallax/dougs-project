# Build interactive dashboard

This is a code bundle for Build interactive dashboard. The original project is available at https://www.figma.com/design/YTF130SbFMmzg7h9WGrTyB/Build-interactive-dashboard.

## Local environment setup

### Prerequisites

- **Node.js** 18+ (20 or 22 recommended). If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root (see `.nvmrc`).
- **npm** (or pnpm; the project has pnpm overrides in `package.json`).

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be at **http://localhost:5173/** (or the next free port if 5173 is in use).

3. **Build for production** (optional)
   ```bash
   npm run build
   ```

### Notes

- Figma asset imports (`figma:asset/...`) are resolved to `src/assets/` locally via a Vite plugin so the app runs outside Figma.
- If you see a moderate npm audit warning, you can run `npm audit` for details; use `npm audit fix` with care as it can change dependency versions.
