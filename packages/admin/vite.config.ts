import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import svgr from 'vite-plugin-svgr';

import { version } from './package.json';

export default defineConfig({
  define: {
    VERSION: JSON.stringify(version),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
  },

  plugins: [react(), svgr(), cssInjectedByJsPlugin()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      fileName: 'admin',
      formats: ['es'],
    },
  },

  server: {
    port: 9010,
    proxy: {
      '/token': 'http://localhost:9090',
      '/user': 'http://localhost:9090',
    },
  },
});
