import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { path } from 'vuepress/utils';

import theme from './theme.js';

export default defineUserConfig({
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

  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['@fancyapps/ui'],
      },
    },
  }),

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str === '@waline/api/types'
          ? path.resolve(__dirname, '../../../packages/api/dist/api.d.ts')
          : str,
    },
  },

  theme,

  alias: {
    '@MigrationTool': path.resolve(__dirname, './components/MigrationTool.vue'),
  },
});
