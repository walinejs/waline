import { hopeTheme } from 'vuepress-theme-hope';

import {
  deNavbarConfig,
  enNavbarConfig,
  esNavbarConfig,
  frNavbarConfig,
  itNavbarConfig,
  jpNavbarConfig,
  koKRNavbarConfig,
  ptBRNavbarConfig,
  ruNavbarConfig,
  viVNNavbarConfig,
  zhNavbarConfig,
  zhTWNavbarConfig,
} from './navbar.js';
import {
  deSidebarConfig,
  enSidebarConfig,
  esSidebarConfig,
  frSidebarConfig,
  itSidebarConfig,
  jpSidebarConfig,
  koKRSidebarConfig,
  ptBRSidebarConfig,
  ruSidebarConfig,
  viVNSidebarConfig,
  zhSidebarConfig,
  zhTWSidebarConfig,
} from './sidebar.js';

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

      '/de/': {
        navbar: deNavbarConfig,
        sidebar: deSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/es/': {
        navbar: esNavbarConfig,
        sidebar: esSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/jp/': {
        navbar: jpNavbarConfig,
        sidebar: jpSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/fr/': {
        navbar: frNavbarConfig,
        sidebar: frSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/it/': {
        navbar: itNavbarConfig,
        sidebar: itSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,

        navbarLocales: {
          langName: 'Italiano',
          selectLangAriaLabel: 'Seleziona lingua',
        },
      },

      '/pt-BR/': {
        navbar: ptBRNavbarConfig,
        sidebar: ptBRSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/ru/': {
        navbar: ruNavbarConfig,
        sidebar: ruSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/vi-VN/': {
        navbar: viVNNavbarConfig,
        sidebar: viVNSidebarConfig,

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/zh-TW/': {
        navbar: zhTWNavbarConfig,
        sidebar: zhTWSidebarConfig,

        footer: 'GPL-2.0 協議 | Copyright © 2020-present lizheming',
        displayFooter: true,
      },

      '/ko-KR/': {
        navbar: koKRNavbarConfig,
        sidebar: koKRSidebarConfig,

        footer: 'GPL-2.0 라이선스 | Copyright © 2020-present lizheming',
        displayFooter: true,
      },
    },

    markdown: {
      codeTabs: true,
      figure: true,
      math: {
        type: 'mathjax',
      },
      sub: true,
      sup: true,
      tasklist: true,
    },

    plugins: {
      comment: {
        provider: 'Waline',
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
          '/en/': {
            admin: 'GM',
            level0: 'Dwarves',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Wizards',
            level4: 'Elves',
            level5: 'Maiar',
          },
          '/de/': {
            admin: 'GM',
            level0: 'Zwerge',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Zauberer',
            level4: 'Elfen',
            level5: 'Maiar',
          },
          '/es/': {
            admin: 'GM',
            level0: 'Enanos',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Magos',
            level4: 'Elfos',
            level5: 'Maiar',
          },
          '/jp/': {
            admin: 'GM',
            level0: 'ドワーフ',
            level1: 'ホビット',
            level2: 'エント',
            level3: '魔法使い',
            level4: 'エルフ',
            level5: 'マイアー',
          },
          '/fr/': {
            admin: 'GM',
            level0: 'Nains',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Magiciens',
            level4: 'Elfes',
            level5: 'Maiar',
          },
          '/it/': {
            admin: 'GM',
            level0: 'Nani',
            level1: 'Hobbit',
            level2: 'Ents',
            level3: 'Maghi',
            level4: 'Elfi',
            level5: 'Maiar',
          },
          '/pt-BR/': {
            admin: 'GM',
            level0: 'Anões',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Magos',
            level4: 'Elfos',
            level5: 'Maiar',
          },
          '/ru/': {
            admin: 'GM',
            level0: 'Гномы',
            level1: 'Хоббиты',
            level2: 'Энты',
            level3: 'Волшебники',
            level4: 'Эльфы',
            level5: 'Майар',
          },
          '/vi-VN/': {
            admin: 'GM',
            level0: 'Người lùn',
            level1: 'Hobbits',
            level2: 'Ents',
            level3: 'Phù thủy',
            level4: 'Yêu tinh',
            level5: 'Maiar',
          },
          '/zh-TW/': {
            admin: '可愛的管理員',
            level0: '鍛體',
            level1: '煉氣',
            level2: '築基',
            level3: '金丹',
            level4: '元嬰',
            level5: '化神',
          },
          '/ko-KR/': {
            admin: 'GM',
            level0: '난쟁이',
            level1: '호빗',
            level2: '엔트',
            level3: '마법사',
            level4: '엘프',
            level5: '마이아',
          },
        },
      },

      components: {
        components: ['BiliBili', 'VidStack'],
      },

      docsearch: {
        appId: 'W34KABV4KM',
        apiKey: 'd189586c601d439f9247bdaf95b3555f',
        indexName: 'waline',
      },

      icon: {
        assets: '//at.alicdn.com/t/c/font_3180165_6o97v6oir2j.css',
      },
    },
  },
  { custom: true },
);
