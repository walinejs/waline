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
        'locale',
        'highlighter',
        'image-preview',
        'search',
        'tex-renderer',
        'upload-image',
      ],
    },
    'reactivity',
    {
      text: '兼容',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/guide/': [
    {
      text: '快速上手',
      icon: 'creative',
      prefix: 'get-started/',
      children: ['', 'client', 'server'],
    },
    {
      text: '功能',
      icon: 'discover',
      prefix: 'features/',
      children: [
        'syntax',
        'emoji',
        'search',
        'reaction',
        'label',
        'i18n',
        'pageview',
        'comment',
        'widget/',
      ],
    },
    'database',
    {
      text: '部署',
      icon: 'deploy',
      prefix: 'deploy/',
      children: [
        'cloudbase',
        'deta',
        'railway',
        'baidu-cfc',
        'aliyun-fc',
        'vps',
      ],
    },
  ],
  '/': [
    {
      text: '指南',
      icon: 'creative',
      prefix: 'guide/',
      children: [
        {
          text: '快速上手',
          icon: 'creative',
          prefix: 'get-started/',
          children: ['', 'client', 'server'],
        },
        {
          text: '功能',
          icon: 'discover',
          prefix: 'features/',
          children: [
            'syntax',
            'emoji',
            'search',
            'reaction',
            'label',
            'i18n',
            'pageview',
            'comment',
            'widget/',
          ],
        },
        'database',
        {
          text: '部署',
          icon: 'deploy',
          prefix: 'deploy/',
          children: [
            'cloudbase',
            'deta',
            'railway',
            'baidu-cfc',
            'aliyun-fc',
            'vps',
          ],
        },
      ],
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
            'locale',
            'highlighter',
            'image-preview',
            'search',
            'tex-renderer',
            'upload-image',
          ],
        },
        'reactivity',
        {
          text: '兼容',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
    },
    {
      text: '参考',
      icon: 'reference',
      prefix: 'reference/',
      children: [
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
          children: ['api', 'config', 'env'],
        },
      ],
    },
    {
      text: '迁移',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['client', 'valine', 'tool'],
    },
    {
      text: '高级',
      icon: 'advanced',
      prefix: 'advanced/',
      collapsible: true,
      children: ['intro', 'design', 'ecosystem', 'faq', 'contribution'],
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
        'locale',
        'highlighter',
        'image-preview',
        'search',
        'tex-renderer',
        'upload-image',
      ],
    },
    'reactivity',
    {
      text: 'Compatibility',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/en/guide/': [
    {
      text: 'Get Started',
      icon: 'creative',
      prefix: 'get-started/',
      children: ['', 'client', 'server'],
    },
    {
      text: 'Features',
      icon: 'discover',
      prefix: 'features/',
      children: [
        'syntax',
        'emoji',
        'search',
        'reaction',
        'label',
        'i18n',
        'pageview',
        'comment',
        'widget/',
      ],
    },
    'database',
    {
      text: 'Deploy',
      icon: 'deploy',
      prefix: 'deploy/',
      children: ['deta', 'railway', 'vps'],
    },
  ],
  '/en/': [
    {
      text: 'Guide',
      icon: 'creative',
      prefix: 'guide/',
      children: [
        {
          text: 'Get Started',
          icon: 'creative',
          prefix: 'get-started/',
          children: ['', 'client', 'server'],
        },
        {
          text: 'Features',
          icon: 'discover',
          prefix: 'features/',
          children: [
            'syntax',
            'emoji',
            'search',
            'reaction',
            'label',
            'i18n',
            'pageview',
            'comment',
            'widget/',
          ],
        },
        'database',
        {
          text: 'Deploy',
          icon: 'deploy',
          prefix: 'deploy/',
          children: ['deta', 'railway', 'vps'],
        },
      ],
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
            'locale',
            'highlighter',
            'image-preview',
            'search',
            'tex-renderer',
            'upload-image',
          ],
        },
        'reactivity',
        {
          text: 'Compatibility',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
    },
    {
      text: 'Reference',
      icon: 'reference',
      prefix: 'reference/',
      children: [
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
          children: ['api', 'config', 'env'],
        },
      ],
    },
    {
      text: 'Migration',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['client', 'valine', 'tool'],
    },
    {
      text: 'Advanced',
      icon: 'advanced',
      prefix: '/advanced/',
      collapsible: true,
      children: ['intro', 'design', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});
