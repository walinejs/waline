module.exports = (groupA, groupB, groupC, lang) => {
  return [
    lang + '/quick-start.md',
    {
      isGroup: true,
      text: groupA,
      sidebarDepth: 2,
      children: [lang + '/client/basic.md', lang + '/server/basic.md'],
    },
    {
      isGroup: true,
      text: groupB,
      sidebarDepth: 2,
      children: [
        lang + '/server/notification.md',
        lang + '/server/socials.md',
        lang + '/client/count.md',
        lang + '/client/visitor.md',
        lang + '/client/emoji.md',
        lang + '/client/i18n.md',
        lang + '/client/avatar.md',
        lang + '/client/recentcomment.md',
      ],
    },
    {
      isGroup: true,
      text: groupC,
      collapsable: true,
      children: [
        lang + '/migration.md',
        lang + '/server/databases.md',
        !lang ? '/server/cloudbase.md' : undefined,
        lang + '/server/vps-deploy.md',
        lang + '/development.md',
        lang + '/client/other.md',
        lang + '/api.md',
        lang + '/faq.md',
      ].filter((v) => v),
    },
  ];
};
