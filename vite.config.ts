import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Create a shortcut for importing files from the `src` directory
    },
  },
  server: {
    port: 5173, // Specify the port the dev server runs on
    strictPort: true, // Ensure the server fails if the port is unavailable
    hmr: {
      port: 5173, // Use the same port for Hot Module Replacement (HMR)
    },
  },
})
