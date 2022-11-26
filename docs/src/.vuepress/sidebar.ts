import { sidebar } from 'vuepress-theme-hope';

export const zhSidebarConfig = sidebar({
  '/cookbook/': [
    {
      text: '导入',
      icon: 'import',
      children: ['cdn', 'project'],
    },
    'syntax',
    {
      text: '自定义',
      icon: 'customize',
      children: [
        'emoji',
        'highlighter',
        'image-preview',
        'search',
        'tex',
        'upload-image',
      ],
    },
    {
      text: '兼容',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/guide/': [
    '/guide/get-started',
    {
      text: '客户端',
      icon: 'client',
      prefix: '/guide/client/',
      children: [
        'intro',
        'syntax',
        'reaction',
        'search',
        'label',
        'style',
        'i18n',
        'spa',
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
    'guide/get-started',
    {
      text: '功能',
      icon: 'creative',
      prefix: 'features/',
      children: ['emoji'],
    },
    {
      text: 'Cookbook',
      icon: 'guide',
      prefix: 'cookbook/',
      children: [
        {
          text: '导入',
          icon: 'import',
          children: ['cdn', 'project'],
        },
        'syntax',
        {
          text: '自定义',
          icon: 'customize',
          children: [
            'emoji',
            'highlighter',
            'image-preview',
            'search',
            'tex',
            'upload-image',
          ],
        },
        {
          text: '兼容',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
    },
    {
      text: '迁移',
      icon: 'migration',
      prefix: 'migration/',
      children: ['client', 'valine', 'tool'],
    },
    {
      text: '参考',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        {
          text: '客户端',
          prefix: 'client/',
          children: ['api', 'props'],
        },
        {
          text: '服务端',
          prefix: 'server/',
          children: ['api', 'config', 'env'],
        },
      ],
    },
    {
      text: '高级',
      icon: 'advanced',
      prefix: 'advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});

export const enSidebarConfig = sidebar({
  '/en/cookbook/': [
    {
      text: 'Import',
      icon: 'import',
      children: ['cdn', 'project'],
    },
    'syntax',
    {
      text: 'Customize',
      icon: 'customize',
      children: [
        'emoji',
        'highlighter',
        'image-preview',
        'search',
        'tex',
        'upload-image',
      ],
    },
    {
      text: 'Compatibility',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/en/guide/': [
    'get-started',
    {
      text: 'Client',
      icon: 'client',
      prefix: 'client/',
      children: [
        'intro',
        'syntax',
        'reaction',
        'search',
        'label',
        'style',
        'i18n',
        'spa',
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
    'guide/get-started',
    {
      text: 'Features',
      icon: 'creative',
      prefix: 'features/',
      children: ['emoji'],
    },
    {
      text: 'Cookbook',
      icon: 'guide',
      prefix: 'cookbook/',
      children: [
        {
          text: 'Import',
          icon: 'import',
          children: ['cdn', 'project'],
        },
        'syntax',
        {
          text: 'Customize',
          icon: 'customize',
          children: [
            'emoji',
            'highlighter',
            'image-preview',
            'search',
            'tex',
            'upload-image',
          ],
        },
        {
          text: 'Compatibility',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
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
      children: [
        {
          text: 'Client',
          prefix: 'client/',
          children: ['api', 'props'],
        },
        {
          text: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env'],
        },
      ],
    },
    {
      text: 'Advanced',
      icon: 'advanced',
      prefix: '/advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});
