import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { version } from '../package.json';

// vite.config.js
export default defineConfig({
  // config options
  root: resolve(__dirname, '../template'),
  define: {
    SHOULD_VALIDATE: true,
    VERSION: JSON.stringify(version),
  },
  plugins: [vue()],
});
