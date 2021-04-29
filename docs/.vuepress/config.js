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
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: getSidebar(
          'Basic Configure',
          'Advanced Functions',
          'More Features',
          '/en'
        ),
      },
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: getSidebar('基础配置', '高级功能', '更多玩法', ''),
      },
    },
  },
  plugin: [
    (_) => ({
      enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
    }),
  ],
};

function getSidebar(groupA, groupB, groupC, lang) {
  return [
    lang + '/quick-start',
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [lang + '/client/basic', lang + '/server/basic'],
    },
    {
      title: groupB,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        lang + '/server/notification',
        lang + '/server/socials',
        lang + '/client/count',
        lang + '/client/visitor',
        lang + '/client/emoji',
        lang + '/client/i18n',
        lang + '/client/avatar',
        lang + '/client/recentcomment',
      ],
    },
    {
      title: groupC,
      children: [
        lang + '/migration',
        lang + '/server/databases',
        !lang ? '/server/cloudbase' : undefined,
        lang + '/server/vps-deploy',
        lang + '/development',
        lang + '/client/other',
        lang + '/api',
        lang + '/faq',
      ].filter((v) => v),
    },
  ];
}
