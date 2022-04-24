import { path } from '@vuepress/utils';
import { defineHopeConfig } from 'vuepress-theme-hope';
import themeConfig from './themeConfig';

export default defineHopeConfig({
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_3180165_rlbqujdkar.css',
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Waline',
      description: '一款基于 Valine 衍生的简洁、安全的评论系统。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Waline',
      description: 'A Simple Comment System inspired by Valine.',
    },
  },

  alias: {
    '@MigrationTool': path.resolve(__dirname, './components/MigrationTool.vue'),
    '@theme-hope/components/HomePage': path.resolve(
      __dirname,
      './components/HomePage'
    ),
    '@theme-hope/components/NormalPage': path.resolve(
      __dirname,
      './components/NormalPage'
    ),
  },

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  themeConfig,
});
