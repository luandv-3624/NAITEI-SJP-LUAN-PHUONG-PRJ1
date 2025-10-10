import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'auth-wall.jpg',
          'logo.png',
        ],
        workbox: {
          globPatterns: ['**/*'],
        },
        manifest: {
          name: 'Space Booking',
          short_name: 'SB',
          description: '時間と同じく、世界に可逆性はない',
          theme_color: '#ffffff',
          start_url: '/bookings',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tests': path.resolve(__dirname, './tests'),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './tests/setup.ts'),
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PUBLIC_API_BASE_URL,
          changeOrigin: true,
        },
        '/socket.io': {
          target: env.VITE_PUBLIC_API_BASE_URL,
          ws: true,
          rewriteWsOrigin: true,
        },
      },
      allowedHosts: [env.VITE_PUBLIC_DOMAIN],
    },
  };
});
