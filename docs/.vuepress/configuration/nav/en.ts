import type { NavbarConfig } from '@vuepress/theme-default';

export const enNavbarConfig: NavbarConfig = [
  {
    text: 'Guide',
    link: '/en/guide/get-started.html',
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'Ecosystem',
        link: '/en/advanced/ecosystem.html',
      },
      {
        text: 'FAQ',
        link: '/en/advanced/faq.html',
      },
      {
        text: 'Original Goal',
        link: '/en/advanced/why.html',
      },
    ],
  },
  {
    text: 'Migration',
    children: [
      {
        text: 'Migrate from Valine',
        link: '/en/migration/valine.html',
      },
      {
        text: 'Migration Helper',
        link: '/en/migration/tool.html',
      },
    ],
  },
  {
    text: 'Reference',
    children: [
      {
        text: 'Client Config',
        link: '/en/reference/client.html',
      },
      {
        text: 'Server Config',
        link: '/en/reference/server.html',
      },
      {
        text: 'API',
        link: '/en/reference/api.html',
      },
      {
        text: 'Contribution Guide',
        link: '/en/reference/contribution.html',
      },
    ],
  },
];
