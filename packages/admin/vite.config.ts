import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// @ts-ignore
import reiconify from 'vite-plugin-reiconify';
import { version } from './package.json';

export default defineConfig({
  define: {
    VERSION: JSON.stringify(version),
  },

  plugins: [react(), reiconify()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      formats: ['es'],
      fileName: 'admin',
    },
    // cssCodeSplit: true,
  },

  server: {
    port: 9010,
    proxy: {
      '/token': 'http://localhost:9090',
      '/user': 'http://localhost:9090',
    },
  },
});
