import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Note: @cloudflare/vite-plugin is NOT used here because it targets Workers standalone mode.
// Cloudflare Pages handles routing & static assets automatically via wrangler.jsonc.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
