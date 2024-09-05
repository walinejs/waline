---
title: Server Environment Variables
icon: config
---

You can customize Waline Server through the following environment variables.

::: warning

You MUST **redeploy** after updating Environment variables to make changes applied.

You should set through `Settings` - `Environment Variables` when using Vercel.

:::

<!-- more -->

## Basic

| Environment Variables | Required | Description                                                                                |
| --------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `LEAN_ID`             | ✅       | LeanCloud Application ID                                                                   |
| `LEAN_KEY`            | ✅       | LeanCloud Application Key                                                                  |
| `LEAN_MASTER_KEY`     | ✅       | LeanCloud Application Master Key                                                           |
| `LEAN_SERVER`         | ⚠       | LeanCloud server address if you're leancloud china user                                    |
| `SITE_NAME`           |          | site name                                                                                  |
| `SITE_URL`            |          | site url                                                                                   |
| `LOGIN`               |          | User need login before comment when `LOGIN=force`                                          |
| `SERVER_URL`          |          | the url of the Waline Server, useful when the automatically generated address is incorrect |

## Display

| Environment Variables   | Default                                                                 | Description                                                       |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | wether hide the user agent of commenter. Default value is `false` |
| `DISABLE_REGION`        |                                                                         | wether hide commenter's region. Default value is `false`          |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | wether disable author notification                                |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                      | Avatar proxy service url. You can set `false` to disable it       |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar render string，base on nunjucks template                 |
| `LEVELS`                |                                                                         | Give each user a rating label based on the number of comments     |

::: tip Level Label

According number of user comments, a level label will be added to the commenter based on rating Conditions. This feature is disabled by default and can be enabled by setting the environment variable `LEVELS`. The configuration is in the form of a comma concatenation of a given number, for example `0,10,20,50,100,200` means:

| Grades | Conditions         | Default Grade Labels |
| ------ | ------------------ | -------------------- |
| 0      | 0 <= count < 10    | Dwarves              |
| 1      | 10 <= count < 20   | Hobbits              |
| 2      | 20 <= count < 50   | Ents                 |
| 3      | 50 <= count < 100  | Wizards              |
| 4      | 100 <= count < 200 | Elves                |
| 5      | 200 <= count       | Maiar                |

In addition to customizing the level judgment rules, we can also customize the level label. Configure the text in the client as follows:

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

By default, only 6 levels of copywriting are provided, but it does not mean that there can only be 6 levels. The specific level cap is based on the level judgment rules you set. To add a new level, it is recommended to configure the label text corresponding to the level by yourself. If no label text is provided, the default label text such as `Level 10` will be displayed by default.

:::

## Safety

| Environment Variables | Default        | Description                                                                                                              |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `IPQPS`               | `60`           | IP-based comment posting frequency limit in seconds. Set to 0 for no limit                                               |
| `SECURE_DOMAINS`      |                | Secure Domains config. Supports multiple domain with Comma separated                                                     |
| `AKISMET_KEY`         | `70542d86693e` | Akismet antispam service key, set `false` if you wanna close it.                                                         |
| `COMMENT_AUDIT`       | `false`        | Comment audit switcher. When enabled, every comment needs to be approved by admin, so hint in placeholder is recommended |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3 key,should set along with client                                                                            |
| `RECAPTCHA_V3_SECRET` |                | reCAPTCHA V3 secret for server.                                                                                          |
| `TURNSTILE_KEY`       |                | Turnstile key,should set along with client                                                                               |
| `TURNSTILE_SECRET`    |                | Turnstile secret for server                                                                                              |

::: tip Recaptcha and Turnstile

Turnstile Key and Secret can be requested at <https://www.cloudflare.com/products/turnstile/>.

Recaptcha Key and Secret can be requested at <https://www.google.com/recaptcha>.

When setting security domains, you need to add the site address and the Waline server address at the same time.

:::

## Markdown

| Environment Variables | Default   | Description                                                        |
| --------------------- | --------- | ------------------------------------------------------------------ |
| `MARKDOWN_CONFIG`     | `{}`      | MarkdownIt Config                                                  |
| `MARKDOWN_HIGHLIGHT`  | `true`    | Whether enable highlight                                           |
| `MARKDOWN_EMOJI`      | `true`    | Whether enable emoji                                               |
| `MARKDOWN_SUB`        | `true`    | Whether enable subscript                                           |
| `MARKDOWN_SUP`        | `true`    | Whether enable superscript                                         |
| `MARKDOWN_TEX`        | `mathjax` | Service to parse math, `mathjax` `katex` and `false` are supported |
| `MARKDOWN_MATHJAX`    | `{}`      | MathJax Options                                                    |
| `MARKDOWN_KATEX`      | `{}`      | KaTeX Options                                                      |

## Mail Service

The email service is used for email notification of user registration and comments. After configuring the variables related to the mail service, user registration will add operations related to email verification code confirmation to prevent malicious registration.

| Environment variable name | Remarks                    |
| ------------------------- | -------------------------- |
| `SMTP_SERVICE`            | SMTP mail service provider |
| `SMTP_HOST`               | SMTP server address        |
| `SMTP_PORT`               | SMTP server port           |
| `SMTP_USER`               | SMTP username              |
| `SMTP_PASS`               | SMTP Password.             |
| `SMTP_SECURE`             | SMTP connect with SSL      |
| `SENDER_NAME`             | Customize sender name      |
| `SENDER_EMAIL`            | Customize sender email     |

::: tip

Supported service providers can be found [here](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). You can choose one of `SMTP_SERVICE` and (`SMTP_HOST`, `SMTP_PORT`). If you don't know the corresponding `SMTP_SERVICE` in the list, you need to configure `SMTP_HOST` and `SMTP_PORT`, which can probably be found in the mailbox settings.

The user name of SMTP usually supports the complete mailbox of the user, and the password is mostly the same as the mailbox password.

Please pay special attention that some mailboxes use separate SMTP passwords.

:::

## Database

### MongoDB

| Environment Variable | Required | Default   | Description                                  |
| -------------------- | -------- | --------- | -------------------------------------------- |
| `MONGO_DB`           | ✅       |           | MongoDB database name                        |
| `MONGO_USER`         | ✅       |           | MongoDB server username                      |
| `MONGO_PASSWORD`     | ✅       |           | MongoDB server password                      |
| `MONGO_HOST`         |          | 127.0.0.1 | MongoDB server address, support array format |
| `MONGO_PORT`         |          | 27017     | MongoDB server port, support array format    |
| `MONGO_REPLICASET`   |          |           | MongoDB replica set                          |
| `MONGO_AUTHSOURCE`   |          |           | MongoDB auth source                          |
| `MONGO_OPT_SSL`      |          | `false`   | use SSL connection                           |

### MySQL

| Environment Variable | Required | Default   | Description                |
| -------------------- | -------- | --------- | -------------------------- |
| `MYSQL_DB`           | ✅       |           | MySQL database name        |
| `MYSQL_USER`         | ✅       |           | MySQL server username      |
| `MYSQL_PASSWORD`     | ✅       |           | MySQL server password      |
| `MYSQL_HOST`         |          | 127.0.0.1 | MySQL server address       |
| `MYSQL_PORT`         |          | 3306      | MySQL server port          |
| `MYSQL_PREFIX`       |          | `wl_`     | MySQL table prefix         |
| `MYSQL_CHARSET`      |          | `utf8mb4` | MySQL table charset        |
| `MYSQL_SSL`          |          | `false`   | whether use SSL connection |

### TiDB

[Create a database on TiDB](../../../en/guide/deploy/tidb.md)

| Environment Variable | Required | Default   | Description          |
| -------------------- | -------- | --------- | -------------------- |
| `TIDB_DB`            | ✅       |           | TiDB database name   |
| `TIDB_USER`          | ✅       |           | TiDB server username |
| `TIDB_PASSWORD`      | ✅       |           | TiDB server password |
| `TIDB_HOST`          |          | 127.0.0.1 | TiDB server address  |
| `TIDB_PORT`          |          | 4000      | TiDB server port     |
| `TIDB_PREFIX`        |          | `wl_`     | TiDB table prefix    |
| `TIDB_CHARSET`       |          | `utf8mb4` | TiDB table charset   |

### SQLite

| Environment Variable | Required | Default | Description                                                        |
| -------------------- | -------- | ------- | ------------------------------------------------------------------ |
| `SQLITE_PATH`        | ✅       |         | SQLite storage file path, not include file name                    |
| `JWT_TOKEN`          | ✅       |         | Random String for login token generator                            |
| `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filename is not waline |
| `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                |

### PostgreSQL

| Environment Variable | Required | Default   | Description                         |
| -------------------- | -------- | --------- | ----------------------------------- |
| `PG_DB`              | ✅       |           | PostgreSQL database name            |
| `PG_USER`            | ✅       |           | PostgreSQL server username          |
| `PG_PASSWORD`        | ✅       |           | PostgreSQL server password          |
| `PG_HOST`            |          | 127.0.0.1 | PostgreSQL server address           |
| `PG_PORT`            |          | 3211      | PostgreSQL server port              |
| `PG_PREFIX`          |          | `wl_`     | PostgreSQL table prefix             |
| `PG_SSL`             |          | `false`   | set to `true` to use SSL connection |
| `POSTGRES_DATABASE`  |          |           | alias for `PG_DB`                   |
| `POSTGRES_USER`      |          |           | alias for `PG_USER`                 |
| `POSTGRES_PASSWORD`  |          |           | alias for `PG_PASSWORD`             |
| `POSTGRES_HOST`      |          | 127.0.0.1 | alias for `PG_HOST`                 |
| `POSTGRES_PORT`      |          | 3211      | alias for `PG_PORT`                 |
| `POSTGRES_PREFIX`    |          | `wl_`     | alias for `PG_PREFIX`               |
| `POSTGRES_SSL`       |          | `false`   | alias for `POSTGRES_SSL`            |

### GitHub

| Environment Variable | Required | Default | Description                                                                                                      |
| -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`        | ✅       |         | repository name, such as `walinejs/waline`                                                                       |
| GITHUB_PATH          |          |         | The data storage directory, such as `data` means it is stored in the `data` directory, root directory by default |

## Advanced

| Environment Variables           | Default                     | Description                                                                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth Social Login Service URL. You can [build your own auth](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | You can set a Webhook URL that will be triggered when you have new comment.                      |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline admin link                                                                                |
| `IP2REGION_DB`                  |                             | customized IP query library path                                                                 |
