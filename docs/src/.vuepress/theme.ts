import { hopeTheme } from 'vuepress-theme-hope';

import { enNavbarConfig, zhNavbarConfig } from './navbar.js';
import { enSidebarConfig, zhSidebarConfig } from './sidebar.js';

export default hopeTheme(
  {
    hostname: 'https://waline.js.org',
    favicon: '/favicon.ico',

    logo: '/logo.png',
    repo: 'walinejs/waline',
    docsDir: 'docs/src',
    docsBranch: 'main',

    pageInfo: ['ReadingTime', 'PageView'],

    contributors: false,

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

    iconAssets: '//at.alicdn.com/t/c/font_3180165_u7vein90ekb.css',

    plugins: {
      blog: false,

      comment: {
        provider: 'Waline',
        login: 'force',
        serverURL: 'https://walinejs.comment.lithub.cc',
        recaptchaV3Key: '6Lfz4-shAAAAANgsYRR0datkzv6zLIaKrSqfHsiG',
        pageview: true,
        reaction: true,
        locales: {
          '/': {
            admin: '可爱的管理员',
            level0: '锻体',
            level1: '炼气',
            level2: '筑基',
            level3: '金丹',
            level4: '元婴',
            level5: '化神',
          },
          '/en': {
            admin: 'GM',
            level0: 'Dwarves',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Wizards',
            level4: 'Elves',
            level5: 'Maiar',
          },
        },
      },

      components: {
        components: ['BiliBili', 'YouTube'],
      },

      docsearch: {
        appId: 'W34KABV4KM',
        apiKey: 'd189586c601d439f9247bdaf95b3555f',
        indexName: 'waline',
      },

      mdEnhance: {
        codetabs: true,
        figure: true,
        mathjax: true,
        sub: true,
        sup: true,
        tasklist: true,
      },
    },
  },
  { custom: true },
);
