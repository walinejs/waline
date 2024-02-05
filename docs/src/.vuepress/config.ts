import { addViteSsrNoExternal } from '@vuepress/helper';
import { redirectPlugin } from '@vuepress/plugin-redirect';
import { type UserConfig, defineUserConfig } from 'vuepress';
import { path } from 'vuepress/utils';

import theme from './theme.js';

export default <UserConfig>defineUserConfig({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Waline',
      description: '一款简洁、安全的评论系统。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Waline',
      description: 'A Simple, Safe Comment System.',
    },
  },

  markdown: {
    code: {
      lineNumbers: 20,
    },
  },

  theme,

  plugins: [redirectPlugin()],

  alias: {
    '@MigrationTool': path.resolve(__dirname, './components/MigrationTool.vue'),
    '@theme-hope/components/HomePage': path.resolve(
      __dirname,
      './components/HomePage',
    ),
    '@theme-hope/components/NormalPage': path.resolve(
      __dirname,
      './components/NormalPage',
    ),
  },

  extendsBundlerOptions: (bundlerOptions, app) => {
    addViteSsrNoExternal(bundlerOptions, app, '@fancyapps/ui');
  },
});
