import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        markets: resolve(__dirname, 'markets.html'),
        roadmap: resolve(__dirname, 'roadmap.html'),
      },
    },
  },
  server: { port: 3001 },
});
