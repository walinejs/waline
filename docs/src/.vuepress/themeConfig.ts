import { defineThemeConfig } from 'vuepress-theme-hope';

import { enNavbarConfig, zhNavbarConfig } from './navbar';
import { enSidebarConfig, zhSidebarConfig } from './sidebar';

export default defineThemeConfig({
  hostname: 'https://waline.js.org',

  iconPrefix: 'iconfont icon-',
  logo: '/logo.png',
  repo: 'walinejs/waline',
  docsDir: 'docs/src',
  docsBranch: 'main',

  pageInfo: ['ReadingTime'],

  contributors: false,
  fullScreen: false,
  themeColor: false,

  locales: {
    '/': {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,

      footer: 'GPL-2.0 协议 | Copyright © 2020-present lizheming',
      displayFooter: true,
    },
    '/en/': {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,

      footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
      displayFooter: true,
    },
  },

  plugins: {
    blog: false,

    comment: {
      type: 'waline',
      serverURL: 'https://waline.vercel.app',
      walineLocales: {
        '/': {
          admin: '可爱的管理员',
        },
      },
    },

    docsearch: {
      appId: 'W34KABV4KM',
      apiKey: 'd189586c601d439f9247bdaf95b3555f',
      indexName: 'waline',
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
        '/en/': {
          placeholder: 'Search',
        },
      },
    },

    mdEnhance: {
      codegroup: true,
      sub: true,
      sup: true,
      tasklist: true,
      tex: true,
    },

    pwa: {
      favicon: '/favicon.ico',
      themeColor: '#0e6db1',
      cachePic: true,

      apple: {
        icon: '/assets/icon/apple-icon-152.png',
        statusBarColor: 'white',
      },
      msTile: {
        image: '/assets/icon/ms-icon-144.png',
        color: '#ffffff',
      },

      manifest: {
        name: 'Waline',
        short_name: 'Waline',
        description: 'A simple comment system with backend support',
        icons: [
          {
            src: '/assets/icon/chrome-mask-512.png',
            sizes: '512x512',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-mask-192.png',
            sizes: '192x192',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: '快速上手',
            short_name: '快速上手',
            url: '/guide/get-started',
            icons: [
              {
                src: '/assets/icon/guide-maskable.png',
                sizes: '192x192',
                purpose: 'maskable',
                type: 'image/png',
              },
              {
                src: '/assets/icon/guide-monochrome.png',
                sizes: '192x192',
                purpose: 'monochrome',
                type: 'image/png',
              },
            ],
          },
          {
            name: 'Guide Started',
            short_name: 'Guide Started',
            url: '/en/guide/get-started',
            icons: [
              {
                src: '/assets/icon/guide-maskable.png',
                sizes: '192x192',
                purpose: 'maskable',
                type: 'image/png',
              },
              {
                src: '/assets/icon/guide-monochrome.png',
                sizes: '192x192',
                purpose: 'monochrome',
                type: 'image/png',
              },
            ],
          },
        ],
      },
    },
  },
});
