import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { version } from './package.json';

export default defineConfig({
  // config options
  root: resolve(__dirname, 'template'),
  define: {
    VERSION: JSON.stringify(version),
  },
  plugins: [vue()],
});
