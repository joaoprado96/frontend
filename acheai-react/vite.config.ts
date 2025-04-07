import react from '@vitejs/plugin-react-swc';

import { defineConfig } from 'vite';

import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import _ from 'lodash';
import svgr from 'vite-plugin-svgr';

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: (config) => {
          return config.url.pathname.includes('/api');
        },
        handler: 'NetworkFirst',

        options: {
          cacheName: 'api-cache',
          cacheableResponse: {
            statuses: _.range(200, 299),
          },
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ svgr(), react(), VitePWA(pwaConfig)],
  resolve: {
    alias: {
      '@': '/src',
      '#': '/src/components',
      '!': '/src/hooks',
    },
  },
});
