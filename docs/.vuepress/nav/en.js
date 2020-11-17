module.exports = [
  {
    text: 'Guide',
    link: '/quick-start'
  },
  {
    text: 'Config Reference',
    ariaLabel: 'Config Reference',
    items: [
      {
        text: 'Client',
        ariaLabel: 'Client',
        items: [
          {
            text: 'Basic Configure',
            link: '/client/basic.html'
          },
          {
            text: 'Internationalization',
            link: '/client/i18n.html'
          },
          {
            text: 'Reading Statistics',
            link: '/client/visitor.html'
          }
        ],
      },
      {
        text: 'Server',
        ariaLabel: 'Server',
        items: [
          {
            text: 'Basic Configure',
            link: '/server/basic.html'
          },
          {
            text: 'Comment Notification',
            link: '/server/notification.html'
          },
          {
            text: 'Othere Databases',
            link: '/server/databases.html'
          },
          {
            text: 'Independent Deployment',
            link: '/server/vps-deploy.html'
          }
        ]
      }
    ]
  },
  {
    text: 'Migration',
    link: '/migration'
  },
  {
    text: 'Learn More',
    ariaLabel: 'Learn More',
    items: [
      {
        text: 'API',
        link: '/api'
      },
      {
        text: 'Contributing Guide',
        link: '/development'
      },
      {
        text: 'FAQ',
        link: '/faq'
      }
    ]
  }
];