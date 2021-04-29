module.exports = [
  {
    text: '开始',
    link: '/quick-start',
  },
  {
    text: '配置',
    ariaLabel: '配置',
    items: [
      {
        text: '前端',
        ariaLabel: '前端',
        items: [
          {
            text: '基础配置',
            link: '/client/basic.html',
          },
          {
            text: '多语言',
            link: '/client/i18n.html',
          },
          {
            text: '阅读统计',
            link: '/client/visitor.html',
          },
        ],
      },
      {
        text: '服务端',
        ariaLabel: '服务端',
        items: [
          {
            text: '基础配置',
            link: '/server/basic.html',
          },
          {
            text: '评论通知',
            link: '/server/notification.html',
          },
          {
            text: '多数据库',
            link: '/server/databases.html',
          },
          {
            text: '其它部署',
            link: '/server/vps-deploy.html',
          },
        ],
      },
    ],
  },
  {
    text: '迁移',
    ariaLabel: '迁移',
    items: [
      {
        text: 'Valine 迁移指南',
        link: '/migration',
      },
      {
        text: '迁移助手',
        link: '/migration/tool',
      },
    ],
  },
  {
    text: '了解更多',
    ariaLabel: '了解更多',
    items: [
      {
        text: 'API',
        link: '/api',
      },
      {
        text: '开发指南',
        link: '/development',
      },
      {
        text: 'FAQ',
        link: '/faq',
      },
    ],
  },
];
