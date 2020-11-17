module.exports = {
  title: 'Waline',
  description: 'Simple Comment System inspired by Valine',
  themeConfig: {
    editLinks: true,
    repo: "https://github.com/lizheming/waline",
    logo: "https://p5.ssl.qhimg.com/t01ec54674f5912eea9.png",
    docsDir: "docs",
    editLinkText: "在 Github 上编辑此页",
    nav: [
      {
        text: '开始',
        link: '/quick-start'
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
                link: '/client/basic.html'
              },
              {
                text: '多语言',
                link: '/client/i18n.html'
              },
              {
                text: '阅读统计',
                link: '/client/visitor.html'
              }
            ],
          },
          {
            text: '服务端',
            ariaLabel: '服务端',
            items: [
              {
                text: '基础配置',
                link: '/server/basic.html'
              },
              {
                text: '评论通知',
                link: '/server/notification.html'
              },
              {
                text: '多数据库',
                link: '/server/databases.html'
              },
              {
                text: '其它部署',
                link: '/server/vps-deploy.html'
              }
            ]
          }
        ]
      },
      {
        text: '迁移',
        link: '/migration'
      },
      {
        text: '了解更多',
        ariaLabel: '了解更多',
        items: [
          {
            text: 'API',
            link: '/api'
          },
          {
            text: '开发指南',
            link: '/development'
          },
          {
            text: 'FAQ',
            link: '/faq'
          }
        ]
      }
    ],
    sidebar: [
      '/quick-start',
      {
        title: '基础配置',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          '/client/basic',
          '/server/basic'
        ]
      },
      {
        title: '更多功能',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          '/server/notification',
          '/client/visitor',
          '/client/emoji',
          '/client/i18n',
          '/client/avatar',
        ]
      },
      {
        title: '高级玩法',
        children: [
          '/migration',
          '/server/databases',
          '/server/vps-deploy',
          '/development',
          '/api',
          '/faq'
        ]
      }
    ]
  },
  plugin: [
    _ => ({
      enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js')
    })
  ]
}
