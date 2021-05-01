module.exports = [
  {
    text: '指南',
    link: '/get-started.html',
  },
  {
    text: '配置',
    children: [
      {
        text: '前端',
        ariaLabel: '前端',
        children: [
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
        children: [
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
    children: [
      {
        text: '从 Valine 迁移',
        link: '/migration.html',
      },
      {
        text: '迁移助手',
        link: '/migration/tool.html',
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      {
        text: 'API',
        link: '/api.html',
      },
      {
        text: '开发指南',
        link: '/development.html',
      },
      {
        text: 'FAQ',
        link: '/faq.html',
      },
    ],
  },
];
