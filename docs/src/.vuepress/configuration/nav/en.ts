import type { HopeThemeNavbarConfig } from 'vuepress-theme-hope';

export const enNavbarConfig: HopeThemeNavbarConfig = [
  '/en/guide/get-started.md',
  {
    text: 'Learn More',
    icon: 'advance',
    children: [
      '/en/advanced/intro.md',
      '/en/advanced/why.md',
      '/en/advanced/ecosystem.md',
      '/en/advanced/faq.md',
    ],
  },
  {
    text: 'Migration',
    icon: 'migration',
    children: [
      '/en/migration/client.md',
      '/en/migration/valine.md',
      '/en/migration/tool.md',
    ],
  },
  {
    text: 'Reference',
    icon: 'reference',
    children: [
      '/en/reference/client.md',
      '/en/reference/instance.md',
      '/en/reference/server.md',
      '/en/reference/api.md',
      '/en/reference/contribution.md',
    ],
  },
];
