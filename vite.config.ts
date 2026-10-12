import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 'prompt': a new version waits until the user taps Osveži, so a reload never
      // wipes a half-typed transaction. UpdatePrompt.tsx shows the banner.
      registerType: 'prompt',
      injectRegister: false,
      manifest: {
        name: 'Novčanik',
        short_name: 'Novčanik',
        description: 'Besplatna aplikacija za kućni budžet i praćenje troškova.',
        theme_color: '#f97316',
        background_color: '#111417',
        display: 'standalone',
        start_url: '/',
        lang: 'sr',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  server: {
    port: 7100,
  },
})
