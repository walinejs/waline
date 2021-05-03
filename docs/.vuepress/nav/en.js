module.exports = [
  {
    text: 'Guide',
    link: '/en/get-started.html',
  },
  {
    text: 'Config',
    children: [
      {
        text: 'Client',
        ariaLabel: 'Client',
        children: [
          {
            text: 'Basic Config',
            link: '/en/client/basic.html',
          },
          {
            text: 'Internationalization',
            link: '/en/client/i18n.html',
          },
          {
            text: 'Reading Statistics',
            link: '/en/client/visitor.html',
          },
        ],
      },
      {
        text: 'Server',
        children: [
          {
            text: 'Basic Config',
            link: '/en/server/basic.html',
          },
          {
            text: 'Comment Notification',
            link: '/en/server/notification.html',
          },
          {
            text: 'Using Databases',
            link: '/en/server/databases.html',
          },
          {
            text: 'Independent Deployment',
            link: '/en/server/vps-deploy.html',
          },
        ],
      },
    ],
  },
  {
    text: 'Migration',
    children: [
      {
        text: 'Migrate from Valine',
        link: '/en/migration.html',
      },
      {
        text: 'Migration Helper',
        link: '/en/migration/tool.html',
      },
    ],
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'API',
        link: '/en/api.html',
      },
      {
        text: 'Contributing Guide',
        link: '/en/development.html',
      },
      {
        text: 'FAQ',
        link: '/en/faq.html',
      },
    ],
  },
];
