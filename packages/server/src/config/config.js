const {
  JWT_TOKEN,
  LEAN_KEY,
  MYSQL_DB,
  MYSQL_PASSWORD,
  TIDB_DB,
  TIDB_PASSWORD,
  SQLITE_PATH,
  PG_DB,
  POSTGRES_DATABASE,
  PG_PASSWORD,
  POSTGRES_PASSWORD,
  MONGO_DB,
  MONGO_PASSWORD,
  FORBIDDEN_WORDS,
  TCB_ENV,
  TENCENTCLOUD_SECRETKEY,
  TCB_KEY,
  SECURE_DOMAINS,
  DISABLE_USERAGENT,
  DISABLE_REGION,
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
  SC_TEMPLATE,
  DISCORD_TEMPLATE,
  LARK_TEMPLATE,

  LEVELS,
  COMMENT_AUDIT,
} = process.env;

let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;

if (LEAN_KEY) {
  storage = 'leancloud';
} else if (MONGO_DB) {
  storage = 'mongodb';
  jwtKey = jwtKey || MONGO_PASSWORD;
} else if (PG_DB || POSTGRES_DATABASE) {
  storage = 'postgresql';
  jwtKey = jwtKey || PG_PASSWORD || POSTGRES_PASSWORD;
} else if (SQLITE_PATH) {
  storage = 'sqlite';
} else if (MYSQL_DB) {
  storage = 'mysql';
  jwtKey = jwtKey || MYSQL_PASSWORD;
} else if (TIDB_DB) {
  storage = 'tidb';
  jwtKey = jwtKey || TIDB_PASSWORD;
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

let avatarProxy = '';

if (AVATAR_PROXY) {
  avatarProxy = !isFalse(AVATAR_PROXY) ? AVATAR_PROXY : '';
}

const oauthUrl = OAUTH_URL || 'https://oauth.lithub.cc';

module.exports = {
  workers: 1,
  storage,
  jwtKey,
  forbiddenWords,
  disallowIPList: [],
  secureDomains: SECURE_DOMAINS ? SECURE_DOMAINS.split(/\s*,\s*/) : undefined,
  disableUserAgent: DISABLE_USERAGENT && !isFalse(DISABLE_USERAGENT),
  disableRegion: DISABLE_REGION && !isFalse(DISABLE_REGION),
  levels:
    !LEVELS || isFalse(LEVELS)
      ? false
      : LEVELS.split(/\s*,\s*/).map((v) => Number(v)),

  audit: COMMENT_AUDIT && !isFalse(COMMENT_AUDIT),
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
  SCTemplate: SC_TEMPLATE,
  DiscordTemplate: DISCORD_TEMPLATE,
  LarkTemplate: LARK_TEMPLATE,
};
