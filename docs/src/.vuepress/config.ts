import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { path } from '@vuepress/utils';
import { defineUserConfig } from 'vuepress';
import theme from './theme';

export default defineUserConfig({
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

  theme,

  plugins: [
    docsearchPlugin({
      appId: 'W34KABV4KM',
      apiKey: 'd189586c601d439f9247bdaf95b3555f',
      indexName: 'waline',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
  ],

  // TODO: Remove this when vuepress-theme-hope fix related issue
  extendsBundlerOptions: (config, app) => {
    config.viteOptions.optimizeDeps = config.viteOptions.optimizeDeps ?? {};

    config.viteOptions.optimizeDeps.include =
      config.viteOptions.optimizeDeps.include ?? [];

    config.viteOptions.optimizeDeps.include.push('bcryptjs');
    config.viteOptions.optimizeDeps.include.push('lodash.throttle');
  },
});
