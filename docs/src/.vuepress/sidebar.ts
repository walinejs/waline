import { sidebar } from 'vuepress-theme-hope';

export const zhSidebarConfig = sidebar({
  '/': [
    {
      text: '指南',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: '参考',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: '客户端',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: '服务端',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: '迁移',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/advanced/': 'structure',

  '/cookbook/': 'structure',

  '/guide/': 'structure',
});

export const enSidebarConfig = sidebar({
  '/en/': [
    {
      text: 'Guide',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Reference',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: 'Client',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: 'server',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Migration',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/en/advanced/': 'structure',

  '/en/cookbook/': 'structure',

  '/en/guide/': 'structure',
});
