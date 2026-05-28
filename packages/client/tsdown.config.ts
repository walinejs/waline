import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'tsdown';

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

export default defineConfig([
  {
    entry: { waline: './src/entries/full.ts' },
    fixedExtension: false,
    format: ['esm', 'umd'],
    globalName: 'Waline',
    minify: true,
    sourcemap: true,
    target: ['node22', 'baseline-widely-available'],
    define,
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
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    entry: { slim: './src/entries/full.ts' },
    fixedExtension: false,
    minify: true,
    sourcemap: true,
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
    entry: './src/entries/component.ts',
    fixedExtension: false,
    minify: true,
    sourcemap: true,
    target: ['node22', 'baseline-widely-available'],
    define,
    dts: false,
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    entry: { component: './src/entries/component-type.d.ts' },
    fixedExtension: false,
    minify: true,
    target: ['node22', 'baseline-widely-available'],
    dts: {
      dtsInput: true,
      emitDtsOnly: true,
    },
  },
  {
    entry: './src/entries/comment.ts',
    fixedExtension: false,
    format: ['esm', 'umd'],
    globalName: 'WalineComment',
    minify: true,
    sourcemap: true,
    target: ['node22', 'baseline-widely-available'],
    define,
    deps: {
      alwaysBundle: ['@waline/api'],
    },
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    entry: './src/entries/pageview.ts',
    fixedExtension: false,
    format: ['esm', 'umd'],
    globalName: 'WalinePageview',
    minify: true,
    sourcemap: true,
    target: ['node22', 'baseline-widely-available'],
    define,
    deps: {
      alwaysBundle: ['@waline/api'],
    },
    treeshake: {
      moduleSideEffects: false,
    },
  },
]);
