import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  server: {
    open: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:4068',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
