import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Site lives at https://<user>.github.io/birthday/
  // The GitHub Pages workflow passes BASE_PATH=/<repo-name>/ automatically;
  // set BASE_PATH=/ when hosting at a domain root (e.g. Netlify / Vercel).
  base: process.env.BASE_PATH || '/birthday/',
})
