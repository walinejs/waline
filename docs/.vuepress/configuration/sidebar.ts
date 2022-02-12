import type { HopeThemeSidebarArrayConfig } from 'vuepress-theme-hope';

export const getGuideSidebar = (lang, titles): HopeThemeSidebarArrayConfig =>
  [
    [lang + '/guide/get-started.md'],
    [
      lang + '/guide/client/intro.md',
      lang + '/guide/client/import.md',
      lang + '/guide/client/syntax.md',
      lang + '/guide/client/emoji.md',
      lang + '/guide/client/style.md',
      lang + '/guide/client/avatar.md',
      lang + '/guide/client/i18n.md',
      lang + '/guide/client/spa.md',
      lang + '/guide/client/count.md',
      lang + '/guide/client/widget/README.md',
    ],
    [
      lang + '/guide/server/intro.md',
      lang + '/guide/server/notification.md',
      lang + '/guide/server/databases.md',
      !lang ? '/guide/server/cloudbase.md' : undefined,
      lang + '/guide/server/deta.md',
      lang + '/guide/server/railway.md',
      !lang ? '/guide/server/inspirecloud.md' : undefined,
      !lang ? '/guide/server/baidu-cfc.md' : undefined,
      !lang ? '/guide/server/aliyun-fc.md' : undefined,
      lang + '/guide/server/vps-deploy.md',
    ].filter((v) => v),
  ].map((item, index) => ({
    text: titles[index],
    children: item,
  }));

export const getDefaultSidebar = (lang, titles): HopeThemeSidebarArrayConfig =>
  [
    [
      lang + '/guide/get-started.md',
      lang + '/guide/client/intro.md',
      lang + '/guide/server/intro.md',
    ],
    [
      lang + '/advanced/intro.md',
      lang + '/advanced/why.md',
      lang + '/advanced/ecosystem.md',
      lang + '/advanced/faq.md',
    ],
    [
      lang + '/migration/client.md',
      lang + '/migration/valine.md',
      lang + '/migration/tool.md',
    ],
    [
      lang + '/reference/client.md',
      lang + '/reference/instance.md',
      lang + '/reference/server.md',
      lang + '/reference/api.md',
      lang + '/reference/contribution.md',
    ],
  ].map((item, index) => ({
    isGroup: true,
    text: titles[index],
    children: item,
  }));
