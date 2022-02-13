import type { HopeThemeNavbarConfig } from 'vuepress-theme-hope';

export const zhNavbarConfig: HopeThemeNavbarConfig = [
  '/guide/get-started.md',
  {
    text: '了解更多',
    icon: 'advance',
    children: [
      '/advanced/intro.md',
      '/advanced/why.md',
      '/advanced/ecosystem.md',
      '/advanced/faq.md',
    ],
  },
  {
    text: '迁移',
    icon: 'migration',
    children: [
      '/migration/client.md',
      '/migration/valine.md',
      '/migration/tool.md',
    ],
  },
  {
    text: '参考',
    icon: 'reference',
    children: [
      '/reference/client.md',
      '/reference/instance.md',
      '/reference/server.md',
      '/reference/api.md',
      '/reference/contribution.md',
    ],
  },
];
