import chokidar = require('chokidar');
import { defineUserConfig } from '@vuepress/cli';
import taskLists = require('markdown-it-task-lists');
import { logger, path } from '@vuepress/utils';
import { getSidebar, enNavbarConfig, zhNavbarConfig } from './configuration';

import type { DefaultThemeOptions } from '@vuepress/theme-default';

export default defineUserConfig<DefaultThemeOptions>({
  title: 'Waline',
  description: 'A Simple Comment System inspired by Valine.',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/assets/icon/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/assets/icon/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'Waline' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Waline' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/assets/icon/apple-touch-icon.png` },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#0066AE' }],
    ['meta', { name: 'theme-color', content: '#0066AE' }],
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

  theme: path.resolve(__dirname, 'theme'),

  themeConfig: {
    logo: '/logo.png',
    repo: 'walinejs/waline',
    docsDir: 'docs',
    docsBranch: 'master',
    locales: {
      '/': {
        navbar: zhNavbarConfig,
        sidebar: getSidebar('', [
          '快速上手',
          '基础配置',
          '高级功能',
          '更多玩法',
        ]),
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        contributorsText: '贡献者',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新于',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        notFound: ['未找到页面'],
        backToHome: '返回主页',
        openInNewWindow: '在新窗口打开',
      },
      '/en/': {
        navbar: enNavbarConfig,
        sidebar: getSidebar('/en', [
          'Get Started',
          'Basic Config',
          'Advanced Functions',
          'More Features',
        ]),
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
        tip: 'Tip',
        warning: 'Note',
        danger: 'Warn',
      },
    },
  },

  plugins: [
    ['@vuepress/pwa'],
    [
      '@vuepress/pwa-popup',
      {
        locales: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
          '/en/': {
            message: 'New Content is available',
            buttonText: 'Refresh',
          },
        },
      },
    ],
    [
      '@vuepress/search',
      {
        locales: {
          '/': { placeholder: '搜索' },
          '/en/': { placeholder: 'Search' },
        },
        maxSuggestions: 10,
      },
    ],
    {
      name: 'waline',
      extendsMarkdown: (md) => {
        md.use(taskLists, { label: true, labelAfter: true });
      },
      clientAppEnhanceFiles: path.resolve(__dirname, 'appEnhance.ts'),
    },
  ],

  // watch navbar
  onWatched: (_, watchers, restart) => {
    const navbarWatcher = chokidar.watch('./nav/*.js', {
      cwd: __dirname,
      ignoreInitial: true,
    });

    navbarWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    const sidebarWatcher = chokidar.watch('./sidebar.js', {
      cwd: __dirname,
      ignoreInitial: true,
    });

    sidebarWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    watchers.push(navbarWatcher, sidebarWatcher);
  },
});
