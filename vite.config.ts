import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
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
