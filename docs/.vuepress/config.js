const chokidar = require('chokidar');
const { path } = require('@vuepress/utils');
const getSidebar = require('./sidebar');

module.exports = {
  title: 'Waline',
  description: 'Simple Comment System inspired by Valine.',

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Waline',
      description: 'Simple Comment System inspired by Valine.',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Waline',
      description: '一款基于 Valine 衍生的简洁、安全的评论系统。',
    },
  },

  themeConfig: {
    editLinks: true,
    repo: 'https://github.com/lizheming/waline',
    logo: 'https://p5.ssl.qhimg.com/t01ec54674f5912eea9.png',
    docsDir: 'docs',
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        navbar: require('./nav/zh'),
        sidebar: getSidebar('基础配置', '高级功能', '更多玩法', ''),
      },
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
        navbar: require('./nav/en'),
        sidebar: getSidebar(
          'Basic Configure',
          'Advanced Functions',
          'More Features',
          '/en'
        ),
      },
    },
  },

  plugins: [
    (_) => ({
      clientAppEnhanceFiles: path.resolve(__dirname, 'appEnhance.js'),
    }),
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
};
