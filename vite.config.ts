import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Novčanik',
        short_name: 'Novčanik',
        description: 'Praćenje ličnih finansija',
        theme_color: '#f97316',
        background_color: '#111417',
        display: 'standalone',
        start_url: '/',
        lang: 'sr',
      },
    }),
  ],
  server: {
    port: 7100,
  },
})
