import { addViteOptimizeDeps } from '@mr-hope/vuepress-shared';
import { path } from '@vuepress/utils';
import type { Theme } from '@vuepress/core';
import type { HopeThemeOptions } from 'vuepress-theme-hope';

const defaultThemewithWaline: Theme<HopeThemeOptions> = (_options, app) => {
  addViteOptimizeDeps(app, '@waline/client');

  return {
    name: 'default-theme-with-waline',

    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout'),
    },

    extends: 'vuepress-theme-hope',
  };
};

export default defaultThemewithWaline;
