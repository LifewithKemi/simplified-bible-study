import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'simplified-bible-study' below with your exact GitHub repository name
export default defineConfig({
  base: '/simplified-bible-study/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
