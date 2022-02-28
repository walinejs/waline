import { defineNavbarConfig } from 'vuepress-theme-hope';

export const enNavbarConfig = defineNavbarConfig([
  '/en/guide/get-started',
  {
    text: 'Learn More',
    icon: 'advanced',
    prefix: '/en/advanced/',
    children: ['intro', 'why', 'ecosystem', 'faq'],
  },
  {
    text: 'Migration',
    icon: 'migration',
    prefix: '/en/migration/',
    children: ['client', 'valine', 'tool'],
  },
  {
    text: 'Reference',
    icon: 'reference',
    prefix: '/en/reference/',
    children: ['client', 'instance', 'server', 'api', 'contribution'],
  },
]);

export const zhNavbarConfig = defineNavbarConfig([
  '/guide/get-started',
  {
    text: '了解更多',
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
]);
