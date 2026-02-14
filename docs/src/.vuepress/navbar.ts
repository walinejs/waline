import { navbar } from 'vuepress-theme-hope';

export const zhNavbarConfig = navbar([
  '/guide/get-started/',
  '/cookbook/',
  {
    text: '迁移',
    icon: 'migration',
    prefix: '/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: '参考',
    icon: 'reference',
    prefix: '/reference/',
    children: [
      'api/',
      {
        text: '客户端',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: '服务端',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: '高级',
    icon: 'advanced',
    prefix: '/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const enNavbarConfig = navbar([
  '/en/guide/get-started/',
  '/en/cookbook/',
  {
    text: 'Migration',
    icon: 'migration',
    prefix: '/en/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Reference',
    icon: 'reference',
    prefix: '/en/reference/',
    children: [
      'api/',
      {
        text: 'Client',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'server',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Advanced',
    icon: 'advanced',
    prefix: '/en/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const deNavbarConfig = navbar([
  '/de/guide/get-started/',
  '/de/cookbook/',
  {
    text: 'Migration',
    icon: 'migration',
    prefix: '/de/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Referenz',
    icon: 'reference',
    prefix: '/de/reference/',
    children: [
      'api/',
      {
        text: 'Client',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Server',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Erweitert',
    icon: 'advanced',
    prefix: '/de/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const esNavbarConfig = navbar([
  '/es/guide/get-started/',
  '/es/cookbook/',
  {
    text: 'Migración',
    icon: 'migration',
    prefix: '/es/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Referencia',
    icon: 'reference',
    prefix: '/es/reference/',
    children: [
      'api/',
      {
        text: 'Cliente',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Servidor',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Avanzado',
    icon: 'advanced',
    prefix: '/es/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const jpNavbarConfig = navbar([
  '/jp/guide/get-started/',
  '/jp/cookbook/',
  {
    text: '移行',
    icon: 'migration',
    prefix: '/jp/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'リファレンス',
    icon: 'reference',
    prefix: '/jp/reference/',
    children: [
      'api/',
      {
        text: 'クライアント',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'サーバー',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: '上級',
    icon: 'advanced',
    prefix: '/jp/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const frNavbarConfig = navbar([
  '/fr/guide/get-started/',
  '/fr/cookbook/',
  {
    text: 'Migration',
    icon: 'migration',
    prefix: '/fr/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Référence',
    icon: 'reference',
    prefix: '/fr/reference/',
    children: [
      'api/',
      {
        text: 'Client',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Serveur',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Avancé',
    icon: 'advanced',
    prefix: '/fr/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const itNavbarConfig = navbar([
  '/it/guide/get-started/',
  '/it/cookbook/',
  {
    text: 'Migrazione',
    icon: 'migration',
    prefix: '/it/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Riferimento',
    icon: 'reference',
    prefix: '/it/reference/',
    children: [
      'api/',
      {
        text: 'Client',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Server',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Avanzato',
    icon: 'advanced',
    prefix: '/it/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const ptBRNavbarConfig = navbar([
  '/pt-BR/guide/get-started/',
  '/pt-BR/cookbook/',
  {
    text: 'Migração',
    icon: 'migration',
    prefix: '/pt-BR/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Referência',
    icon: 'reference',
    prefix: '/pt-BR/reference/',
    children: [
      'api/',
      {
        text: 'Cliente',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Servidor',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Avançado',
    icon: 'advanced',
    prefix: '/pt-BR/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const ruNavbarConfig = navbar([
  '/ru/guide/get-started/',
  '/ru/cookbook/',
  {
    text: 'Миграция',
    icon: 'migration',
    prefix: '/ru/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Справочник',
    icon: 'reference',
    prefix: '/ru/reference/',
    children: [
      'api/',
      {
        text: 'Клиент',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Сервер',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Расширенное',
    icon: 'advanced',
    prefix: '/ru/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const viVNNavbarConfig = navbar([
  '/vi-VN/guide/get-started/',
  '/vi-VN/cookbook/',
  {
    text: 'Di chuyển',
    icon: 'migration',
    prefix: '/vi-VN/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: 'Tham khảo',
    icon: 'reference',
    prefix: '/vi-VN/reference/',
    children: [
      'api/',
      {
        text: 'Client',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: 'Server',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: 'Nâng cao',
    icon: 'advanced',
    prefix: '/vi-VN/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const zhTWNavbarConfig = navbar([
  '/zh-TW/guide/get-started/',
  '/zh-TW/cookbook/',
  {
    text: '遷移',
    icon: 'migration',
    prefix: '/zh-TW/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: '參考',
    icon: 'reference',
    prefix: '/zh-TW/reference/',
    children: [
      'api/',
      {
        text: '客戶端',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: '伺服器',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: '進階',
    icon: 'advanced',
    prefix: '/zh-TW/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);

export const koKRNavbarConfig = navbar([
  '/ko-KR/guide/get-started/',
  '/ko-KR/cookbook/',
  {
    text: '마이그레이션',
    icon: 'migration',
    prefix: '/ko-KR/migration/',
    children: ['v3', 'v2', 'valine', 'tool'],
  },
  {
    text: '참조',
    icon: 'reference',
    prefix: '/ko-KR/reference/',
    children: [
      'api/',
      {
        text: '클라이언트',
        prefix: 'client/',
        children: ['api', 'props', 'file', 'style'],
      },
      {
        text: '서버',
        prefix: 'server/',
        children: ['api', 'config', 'env', 'plugin'],
      },
    ],
  },
  {
    text: '고급',
    icon: 'advanced',
    prefix: '/ko-KR/advanced/',
    children: ['intro', 'design', 'ecosystem', 'faq', 'contribution', 'privacy'],
  },
]);
