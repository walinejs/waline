const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  SQLITE_PATH,
  PG_DB,
  PG_PASSWORD,
  MONGO_DB,
  MONGO_PASSWORD,
  FORBIDDEN_WORDS,
  TCB_ENV,
  TENCENTCLOUD_SECRETKEY,
  TCB_KEY,
  SECURE_DOMAINS,
  DISABLE_USERAGENT,
  AVATAR_PROXY,
  GITHUB_TOKEN,
  DETA_PROJECT_KEY,
  OAUTH_URL,

  MARKDOWN_CONFIG = '{}',
  MARKDOWN_HIGHLIGHT,
  MARKDOWN_EMOJI,
  MARKDOWN_SUB,
  MARKDOWN_SUP,
  // mathjax will be the default option for tex
  MARKDOWN_TEX = 'mathjax',
  MARKDOWN_MATHJAX = '{}',
  MARKDOWN_KATEX = '{}',

  MAIL_SUBJECT,
  MAIL_TEMPLATE,
  MAIL_SUBJECT_ADMIN,
  MAIL_TEMPLATE_ADMIN,
  QQ_TEMPLATE,
  TG_TEMPLATE,
  WX_TEMPLATE,
  DISCORD_TEMPLATE,
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;

if (LEAN_KEY) {
  storage = 'leancloud';
} else if (MONGO_DB) {
  storage = 'mongodb';
  jwtKey = jwtKey || MONGO_PASSWORD;
} else if (PG_DB) {
  storage = 'postgresql';
  jwtKey = jwtKey || PG_PASSWORD;
} else if (SQLITE_PATH) {
  storage = 'mysql';
} else if (MYSQL_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || MYSQL_PASSWORD;
} else if (GITHUB_TOKEN) {
  storage = 'github';
  jwtKey = jwtKey || GITHUB_TOKEN;
} else if (think.env === 'cloudbase' || TCB_ENV) {
  storage = 'cloudbase';
  jwtKey = jwtKey || TENCENTCLOUD_SECRETKEY || TCB_KEY || TCB_ENV;
} else if (DETA_PROJECT_KEY) {
  storage = 'deta';
  jwtKey = jwtKey || DETA_PROJECT_KEY;
}

if (think.env === 'cloudbase' && storage === 'sqlite') {
  throw new Error("You can't use SQLite in CloudBase platform.");
}

const forbiddenWords = FORBIDDEN_WORDS ? FORBIDDEN_WORDS.split(/\s*,\s*/) : [];

const isFalse = (content) =>
  content && ['0', 'false'].includes(content.toLowerCase());

const markdown = {
  config: JSON.parse(MARKDOWN_CONFIG),
  plugin: {
    emoji: !isFalse(MARKDOWN_EMOJI),
    sub: !isFalse(MARKDOWN_SUB),
    sup: !isFalse(MARKDOWN_SUP),
    tex: isFalse(MARKDOWN_TEX) ? false : MARKDOWN_TEX,
    mathjax: JSON.parse(MARKDOWN_MATHJAX),
    katex: JSON.parse(MARKDOWN_KATEX),
  },
};

if (isFalse(MARKDOWN_HIGHLIGHT)) markdown.config.highlight = false;

let avatarProxy = 'https://avatar.75cdn.workers.dev/';
if (AVATAR_PROXY) {
  avatarProxy = !isFalse(AVATAR_PROXY) ? AVATAR_PROXY : '';
}

const oauthUrl = OAUTH_URL || 'https://user.75.team';

module.exports = {
  workers: 1,
  storage,
  jwtKey,
  forbiddenWords,
  disallowIPList: [],
  secureDomains: SECURE_DOMAINS ? SECURE_DOMAINS.split(/\s*,\s*/) : undefined,
  disableUserAgent: DISABLE_USERAGENT && !isFalse(DISABLE_USERAGENT),
  avatarProxy,
  oauthUrl,
  markdown,
  mailSubject: MAIL_SUBJECT,
  mailTemplate: MAIL_TEMPLATE,
  mailSubjectAdmin: MAIL_SUBJECT_ADMIN,
  mailTemplateAdmin: MAIL_TEMPLATE_ADMIN,
  QQTemplate: QQ_TEMPLATE,
  TGTemplate: TG_TEMPLATE,
  WXTemplate: WX_TEMPLATE,
  DiscordTemplate: DISCORD_TEMPLATE,
};
