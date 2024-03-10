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
    children: [
      'intro',
      'design',
      'ecosystem',
      'faq',
      'contribution',
      'privacy',
    ],
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
    children: [
      'intro',
      'design',
      'ecosystem',
      'faq',
      'contribution',
      'privacy',
    ],
  },
]);
