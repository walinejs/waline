import { path } from '@vuepress/utils';
import type { Theme } from '@vuepress/core';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

const defaultThemewithWaline: Theme<DefaultThemeOptions> = {
  name: 'default-theme-with-waline',

  layouts: path.resolve(__dirname, './layouts'),

  extends: '@vuepress/theme-default',
};

export default defaultThemewithWaline;
