import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'tsdown';
import type { UserConfig } from 'tsdown';

import pkg from './package.json' with { type: 'json' };

const define = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __VUE_OPTIONS_API__: JSON.stringify(false),
  __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  VERSION: JSON.stringify(pkg.version),
};

const alwaysBundle = [
  '@vueuse/core',
  '@waline/api',
  'autosize',
  'marked',
  'marked-highlight',
  'recaptcha-v3',
  'vue',
];

const onlyBundle = [
  '@vue/reactivity',
  '@vue/runtime-core',
  '@vue/runtime-dom',
  '@vue/shared',
  '@vueuse/shared',
  ...alwaysBundle,
];

const commonOptions: UserConfig = {
  clean: false,
  fixedExtension: false,
  minify: true,
  sourcemap: true,
  target: ['node22', 'baseline-widely-available'],
  define,
  treeshake: {
    moduleSideEffects: false,
  },
  publint: true,
};

export default defineConfig([
  {
    ...commonOptions,
    entry: { waline: './src/entries/full.ts' },
    format: ['esm', 'umd'],
    globalName: 'Waline',
    alias: {
      vue: 'vue/dist/vue.runtime.esm-bundler.js',
    },
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
    ],
    deps: {
      alwaysBundle,
      onlyBundle,
    },
  },
  {
    ...commonOptions,
    entry: { slim: './src/entries/full.ts' },
    target: ['node22', 'baseline-widely-available'],
    define,
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
    ],
  },
  {
    ...commonOptions,
    entry: './src/entries/component.ts',
    dts: false,
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
    ],
  },
  {
    ...commonOptions,
    entry: { component: './src/entries/component-type.d.ts' },

    target: ['node22', 'baseline-widely-available'],
    dts: {
      dtsInput: true,
      emitDtsOnly: true,
    },
  },
  {
    ...commonOptions,
    entry: './src/entries/comment.ts',
    format: ['esm', 'umd'],
    globalName: 'WalineComment',
    deps: {
      alwaysBundle: ['@waline/api'],
    },
  },
  {
    ...commonOptions,
    entry: './src/entries/pageview.ts',
    format: ['esm', 'umd'],
    globalName: 'WalinePageview',
    deps: {
      alwaysBundle: ['@waline/api'],
    },
  },
]);
