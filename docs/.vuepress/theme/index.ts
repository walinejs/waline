import { addViteOptimizeDeps } from '@mr-hope/vuepress-shared';
import { path } from '@vuepress/utils';
import type { Theme } from '@vuepress/core';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

const defaultThemewithWaline: Theme<DefaultThemeOptions> = (_options, app) => {
  addViteOptimizeDeps(app, '@waline/client');

  return {
    name: 'default-theme-with-waline',

    alias: {
      '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
    },

    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
    },

    extends: '@vuepress/theme-default',
  };
};

export default defaultThemewithWaline;
