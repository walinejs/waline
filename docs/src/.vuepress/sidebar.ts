import { defineSidebarConfig } from 'vuepress-theme-hope';

export const zhSidebarConfig = defineSidebarConfig({
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
        'style',
        'avatar',
        'i18n',
        'spa',
        'count',
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
        'inspirecloud',
        'baidu-cfc',
        'aliyun-fc',
        'vps-deploy',
      ],
    },
  ],
  '/': [
    {
      text: '指南',
      icon: 'creative',
      prefix: '/guide/',
      children: ['get-started', 'client/intro', 'server/intro'],
    },
    {
      text: '更多',
      icon: 'advanced',
      prefix: '/advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq'],
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
      children: ['client', 'instance', 'server', 'api', 'contribution'],
    },
  ],
});

export const enSidebarConfig = defineSidebarConfig({
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
        'style',
        'avatar',
        'i18n',
        'spa',
        'count',
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
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started', 'client/intro', 'server/intro'],
    },
    {
      text: 'Lear More',
      icon: 'advanced',
      prefix: 'advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq'],
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
      children: ['client', 'instance', 'server', 'api', 'contribution'],
    },
  ],
});
