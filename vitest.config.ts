import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: './scripts/thinkjs-mock.js',
  },
});
