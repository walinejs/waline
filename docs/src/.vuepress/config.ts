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
    '/de/': {
      lang: 'de-DE',
      title: 'Waline',
      description: 'Ein einfaches, sicheres Kommentarsystem.',
    },
    '/es/': {
      lang: 'es-ES',
      title: 'Waline',
      description: 'Un sistema de comentarios simple y seguro.',
    },
    '/jp/': {
      lang: 'ja-JP',
      title: 'Waline',
      description: 'シンプルで安全なコメントシステム。',
    },
    '/fr/': {
      lang: 'fr-FR',
      title: 'Waline',
      description: 'Un système de commentaires simple et sûr.',
    },
    '/it/': {
      lang: 'it',
      title: 'Waline',
      description: 'Un sistema di commenti semplice e sicuro.',
    },
    '/pt-BR/': {
      lang: 'pt-BR',
      title: 'Waline',
      description: 'Um sistema de comentários simples e seguro.',
    },
    '/ru/': {
      lang: 'ru-RU',
      title: 'Waline',
      description: 'Простая и безопасная система комментариев.',
    },
    '/vi-VN/': {
      lang: 'vi-VN',
      title: 'Waline',
      description: 'Một hệ thống bình luận đơn giản và an toàn.',
    },
    '/zh-TW/': {
      lang: 'zh-TW',
      title: 'Waline',
      description: '一款簡潔、安全的評論系統。',
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
