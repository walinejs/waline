import { existsSync, readFileSync } from 'node:fs';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'tsdown';
import type { UserConfig } from 'tsdown';

import pkg from './package.json' with { type: 'json' };

const vuePluginOptions = {
  isProduction: true,
  template: { compilerOptions: { comments: false } },
  script: {
    fs: {
      fileExists: (file: string): boolean => existsSync(file),
      readFile: (file: string): string => readFileSync(file, 'utf-8'),
    },
  },
};

const define = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __VUE_OPTIONS_API__: JSON.stringify(false),
  __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  VERSION: JSON.stringify(pkg.version),
};

const alwaysBundle = [
  '@vueuse/core',
  '@waline/api',
  '@webc.site/math',
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
    plugins: [vue(vuePluginOptions)],
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
    plugins: [vue(vuePluginOptions)],
  },
  {
    ...commonOptions,
    entry: './src/entries/component.ts',
    dts: false,
    plugins: [vue(vuePluginOptions)],
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
  {
    ...commonOptions,
    entry: {
      'locale/de': './src/config/i18n/de.ts',
      'locale/en': './src/config/i18n/en.ts',
      'locale/es': './src/config/i18n/es.ts',
      'locale/fr': './src/config/i18n/fr.ts',
      'locale/id': './src/config/i18n/id.ts',
      'locale/it': './src/config/i18n/it.ts',
      'locale/jp': './src/config/i18n/jp.ts',
      'locale/ko-KR': './src/config/i18n/ko-KR.ts',
      'locale/pt-BR': './src/config/i18n/pt-BR.ts',
      'locale/ru': './src/config/i18n/ru.ts',
      'locale/vi-VN': './src/config/i18n/vi-VN.ts',
      'locale/zh-CN': './src/config/i18n/zh-CN.ts',
      'locale/zh-TW': './src/config/i18n/zh-TW.ts',
    },
  },
]);
