import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: './src/index.ts',
    minify: true,
    fixedExtension: false,
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'node22'],
    publint: true,
  },
]);
