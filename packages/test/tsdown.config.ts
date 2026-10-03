import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: 'esm',
  clean: true,
  dts: false,
  platform: 'node',
  banner: { js: '#!/usr/bin/env node' },
});
