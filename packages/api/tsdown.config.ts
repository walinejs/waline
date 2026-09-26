import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: './src/index.ts',
    minify: true,
    fixedExtension: false,
    target: ['node22', 'baseline-widely-available'],
    publint: true,
  },
]);
