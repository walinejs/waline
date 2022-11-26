import { sidebar } from 'vuepress-theme-hope';

export const zhSidebarConfig = sidebar({
  '/guide/': [
    '/guide/get-started',
    {
      text: '客户端',
      icon: 'client',
      prefix: '/guide/client/',
      children: [
        'intro',
        'import',
        'syntax',
        'emoji',
        'reaction',
        'search',
        'label',
        'style',
        'i18n',
        'component',
        'spa',
        'comment',
        'pageview',
        'widget/',
      ],
    },
    {
      text: '服务端',
      icon: 'server',
      prefix: '/guide/server/',
      children: [
        'intro',
        'notification',
        'databases',
        'cloudbase',
        'deta',
        'railway',
        'baidu-cfc',
        'aliyun-fc',
        'vps-deploy',
      ],
    },
  ],
  '/': [
    {
      text: '指南',
      icon: 'guide',
      prefix: '/guide/',
      children: ['get-started', 'client/intro', 'server/intro'],
    },
    {
      text: '功能',
      icon: 'creative',
      prefix: '/features/',
      children: ['emoji'],
    },
    {
      text: '迁移',
      icon: 'migration',
      prefix: '/migration/',
      children: ['client', 'valine', 'tool'],
    },
    {
      text: '参考',
      icon: 'reference',
      prefix: '/reference/',
      children: ['component', 'client', 'env', 'server', 'api', 'contribution'],
    },
    {
      text: '高级',
      icon: 'advanced',
      prefix: '/advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});

export const enSidebarConfig = sidebar({
  '/en/guide/': [
    'get-started',
    {
      text: 'Client',
      icon: 'client',
      prefix: 'client/',
      children: [
        'intro',
        'import',
        'syntax',
        'emoji',
        'reaction',
        'search',
        'label',
        'style',
        'i18n',
        'component',
        'spa',
        'comment',
        'pageview',
        'widget/',
      ],
    },
    {
      text: 'Server',
      icon: 'server',
      prefix: 'server/',
      children: [
        'intro',
        'notification',
        'databases',
        'deta',
        'railway',
        'vps-deploy',
      ],
    },
  ],
  '/en/': [
    {
      text: 'Guide',
      icon: 'guide',
      prefix: 'guide/',
      children: ['get-started', 'client/intro', 'server/intro'],
    },
    {
      text: 'Features',
      icon: 'creative',
      prefix: 'features/',
      children: ['emoji'],
    },
    {
      text: 'Migration',
      icon: 'migration',
      prefix: 'migration/',
      children: ['client', 'valine', 'tool'],
    },
    {
      text: 'Reference',
      icon: 'reference',
      prefix: 'reference/',
      children: ['component', 'client', 'env', 'server', 'api', 'contribution'],
    },
    {
      text: 'Advanced',
      icon: 'advanced',
      prefix: '/advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});
