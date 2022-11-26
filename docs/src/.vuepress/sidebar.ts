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
        'tex',
        'upload-image',
      ],
    },
    'reactive',
    {
      text: '兼容',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/': [
    'guide/get-started',
    'guide/server',
    {
      text: '功能',
      icon: 'creative',
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
            'tex',
            'upload-image',
          ],
        },
        'reactive',
        {
          text: '兼容',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
    },
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
        'locale',
        'highlighter',
        'image-preview',
        'search',
        'tex',
        'upload-image',
      ],
    },
    'reactive',
    {
      text: 'Compatibility',
      icon: 'time',
      children: ['legacy', 'emoji-compact'],
    },
  ],
  '/en/': [
    'guide/get-started',
    'guide/server',
    {
      text: 'Features',
      icon: 'creative',
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
            'tex',
            'upload-image',
          ],
        },
        'reactive',
        {
          text: 'Compatibility',
          icon: 'time',
          children: ['legacy', 'emoji-compact'],
        },
      ],
    },
    {
      text: '部署Deploy',
      icon: 'deploy',
      prefix: 'deploy/',
      children: ['deta', 'railway', 'vps'],
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
      text: 'Advanced',
      icon: 'advanced',
      prefix: '/advanced/',
      children: ['intro', 'why', 'ecosystem', 'faq', 'contribution'],
    },
  ],
});
