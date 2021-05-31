import type { NavbarConfig } from '@vuepress/theme-default';

export const zhNavbarConfig: NavbarConfig = [
  {
    text: '指南',
    link: '/guide/get-started.html',
  },
  {
    text: '了解更多',
    children: [
      {
        text: '介绍',
        link: '/advanced/intro.html',
      },
      {
        text: '源始',
        link: '/advanced/why.html',
      },
      {
        text: '生态系统',
        link: '/advanced/ecosystem.html',
      },
      {
        text: '常见问题',
        link: '/advanced/faq.html',
      },
    ],
  },
  {
    text: '迁移',
    children: [
      {
        text: '迁移至 @waline/client@v1',
        link: '/migration/client.html',
      },
      {
        text: '从 Valine 迁移',
        link: '/migration/valine.html',
      },
      {
        text: '迁移助手',
        link: '/migration/tool.html',
      },
    ],
  },
  {
    text: '参考',
    children: [
      {
        text: '客户端配置',
        link: '/reference/client.html',
      },
      {
        text: '客户端实例',
        link: '/reference/instance.html',
      },
      {
        text: '服务端配置',
        link: '/reference/server.html',
      },
      {
        text: 'API',
        link: '/reference/api.html',
      },
      {
        text: '贡献指南',
        link: '/reference/contribution.html',
      },
    ],
  },
];
