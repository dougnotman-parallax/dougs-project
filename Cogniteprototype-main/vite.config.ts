import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const assetsDir = path.resolve(__dirname, './src/assets')

/** Resolve figma:asset/<id>.png to ./src/assets/<id>.png (dev and production build, e.g. Vercel) */
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-resolver',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (!id.startsWith('figma:asset/')) return null
      const filename = id.slice('figma:asset/'.length)
      const resolved = path.resolve(assetsDir, filename)
      return resolved
    },
  }
}

export default defineConfig({
  server: {
    // Open the app in the default browser when you start `npm run dev`
    open: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.pdf'],
})
