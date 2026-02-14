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

export const deSidebarConfig = sidebar({
  '/de/': [
    {
      text: 'Anleitung',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Referenz',
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
          text: 'Server',
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

  '/de/advanced/': 'structure',

  '/de/cookbook/': 'structure',

  '/de/guide/': 'structure',
});

export const esSidebarConfig = sidebar({
  '/es/': [
    {
      text: 'Guía',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Referencia',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: 'Cliente',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: 'Servidor',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Migración',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/es/advanced/': 'structure',

  '/es/cookbook/': 'structure',

  '/es/guide/': 'structure',
});

export const jpSidebarConfig = sidebar({
  '/jp/': [
    {
      text: 'ガイド',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'リファレンス',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: 'クライアント',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: 'サーバー',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: '移行',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/jp/advanced/': 'structure',

  '/jp/cookbook/': 'structure',

  '/jp/guide/': 'structure',
});

export const frSidebarConfig = sidebar({
  '/fr/': [
    {
      text: 'Guide',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Référence',
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
          text: 'Serveur',
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

  '/fr/advanced/': 'structure',

  '/fr/cookbook/': 'structure',

  '/fr/guide/': 'structure',
});

export const itSidebarConfig = sidebar({
  '/it/': [
    {
      text: 'Guida',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Riferimento',
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
          text: 'Server',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Migrazione',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/it/advanced/': 'structure',

  '/it/cookbook/': 'structure',

  '/it/guide/': 'structure',
});

export const ptBRSidebarConfig = sidebar({
  '/pt-BR/': [
    {
      text: 'Guia',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Referência',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: 'Cliente',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: 'Servidor',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Migração',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/pt-BR/advanced/': 'structure',

  '/pt-BR/cookbook/': 'structure',

  '/pt-BR/guide/': 'structure',
});

export const ruSidebarConfig = sidebar({
  '/ru/': [
    {
      text: 'Руководство',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Справочник',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: 'Клиент',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: 'Сервер',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Миграция',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/ru/advanced/': 'structure',

  '/ru/cookbook/': 'structure',

  '/ru/guide/': 'structure',
});

export const viVNSidebarConfig = sidebar({
  '/vi-VN/': [
    {
      text: 'Hướng dẫn',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: 'Tham khảo',
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
          text: 'Server',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: 'Di chuyển',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/vi-VN/advanced/': 'structure',

  '/vi-VN/cookbook/': 'structure',

  '/vi-VN/guide/': 'structure',
});

export const zhTWSidebarConfig = sidebar({
  '/zh-TW/': [
    {
      text: '指南',
      icon: 'creative',
      prefix: 'guide/',
      children: ['get-started/', 'features/', 'database', 'deploy/'],
    },
    'cookbook/',
    {
      text: '參考',
      icon: 'reference',
      prefix: 'reference/',
      children: [
        'api/',
        {
          text: '客戶端',
          icon: 'client',
          prefix: 'client/',
          children: ['api', 'props', 'file', 'style'],
        },
        {
          text: '伺服器',
          icon: 'server',
          prefix: 'server/',
          children: ['api', 'config', 'env', 'plugin'],
        },
      ],
    },
    {
      text: '遷移',
      icon: 'migration',
      prefix: 'migration/',
      collapsible: true,
      children: ['v3', 'v2', 'valine', 'tool'],
    },
    'advanced/',
  ],

  '/zh-TW/advanced/': 'structure',

  '/zh-TW/cookbook/': 'structure',

  '/zh-TW/guide/': 'structure',
});
