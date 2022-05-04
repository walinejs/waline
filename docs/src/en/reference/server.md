---
title: Server Config
---

## Environment Variables

You can configure the Waline server through the following environment variables.

::: warning

You MUST **redeploy** after updating Environment variables to take effect.

Vercel needs to be set in `Settings` - `Environment Variables`.

:::

### Basic

| Environment Variables   | Required | Description                                                                                                                                 |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `LEAN_ID`               | ✅       | LeanCloud Application ID                                                                                                                    |
| `LEAN_KEY`              | ✅       | LeanCloud Application Key                                                                                                                   |
| `LEAN_MASTER_KEY`       | ✅       | LeanCloud Application Master Key                                                                                                            |
| `LEAN_SERVER`           | ⚠        | LeanCloud server address if you're leancloud china user                                                                                     |
| `SITE_NAME`             |          | site name                                                                                                                                   |
| `SITE_URL`              |          | site url                                                                                                                                    |
| `SECURE_DOMAINS`        |          | Secure Domains config. Supports multiple domain with Comma separated                                                                        |
| `DISABLE_USERAGENT`     |          | wether hide the user agent of commentor. Default value is `false`                                                                           |
| `DISABLE_REGION`        |          | wether hide commentor's region. Default value is `false`                                                                                    |
| `DISABLE_AUTHOR_NOTIFY` |          | wether disable author notification                                                                                                          |
| `AKISMET_KEY`           |          | Akismet antispam service key, default is open, set `false` if you wanna close it.                                                           |
| `COMMENT_AUDIT`         |          | Comment audit switcher. We recommend to tip on the placeholder text if it's true.                                                           |
| `LOGIN`                 |          | User need login before comment when `LOGIN=force`                                                                                           |
| `AVATAR_PROXY`          |          | Avatar proxy service url, default is `https://avatar.75cdn.workers.dev`. You can set `false` to close it                                    |
| `GRAVATAR_STR`          |          | Gravatar render string，default is <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span>，base on nunjucks template       |
| `OAUTH_URL`             |          | OAuth Social Login Service URL，default is `https://user.75.team`. Also you can custom build with [auth](https://github.com/walinejs/auth). |
| `WEBHOOK`               |          | You can set a Webhook URL that will be triggered when you have new comment.                                                                 |
| `LEVELS`                |          | Give each user a rating label based on the number of comments                                                                               |

### Markdown

| Environment Variables | Description                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`     | MarkdownIt Config                                                                |
| `MARKDOWN_HIGHLIGHT`  | Whether enable highlight, enable by default                                      |
| `MARKDOWN_EMOJI`      | Whether enable emoji, enable by default                                          |
| `MARKDOWN_SUB`        | Whether enable subscript, enable by default                                      |
| `MARKDOWN_SUP`        | Whether enable superscript, enable by default                                    |
| `MARKDOWN_TEX`        | Service to parse math, `'mathjax'` by default (also can be `false` \| `'katex'`) |
| `MARKDOWN_MATHJAX`    | MathJax Options                                                                  |
| `MARKDOWN_KATEX`      | Katex Options                                                                    |

### Level Label

According to the set rating conditions and the number of user comments, a level label will be added to the commenter. This feature is disabled by default and can be enabled by configuring the environment variable `LEVELS`. The configuration is in the form of a comma concatenation of a given number, for example `0,10,20,50,100,200` means:

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
new Waline({
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

### Database

- **MongoDB**:

  | Environment Variable | Required | Default   | Description                                  |
  | -------------------- | -------- | --------- | -------------------------------------------- |
  | `MONGO_HOST`         |          | 127.0.0.1 | MongoDB server address, support array format |
  | `MONGO_PORT`         |          | 27017     | MongoDB server port, support array format    |
  | `MONGO_DB`           | ✅       |           | MongoDB database name                        |
  | `MONGO_USER`         | ✅       |           | MongoDB server username                      |
  | `MONGO_PASSWORD`     | ✅       |           | MongoDB server password                      |
  | `MONGO_REPLICASET`   |          |           | MongoDB replica set                          |
  | `MONGO_AUTHSOURCE`   |          |           | MongoDB auth source                          |
  | `MONGO_OPT_SSL`      |          |           | use SSL connection                           |

- **MySQL**:

  | Environment Variable | Required | Default   | Description           |
  | -------------------- | -------- | --------- | --------------------- |
  | `MYSQL_HOST`         |          | 127.0.0.1 | MySQL server address  |
  | `MYSQL_PORT`         |          | 3306      | MySQL server port     |
  | `MYSQL_DB`           | ✅       |           | MySQL database name   |
  | `MYSQL_USER`         | ✅       |           | MySQL server username |
  | `MYSQL_PASSWORD`     | ✅       |           | MySQL server password |
  | `MYSQL_PREFIX`       |          | `wl_`     | MySQL table prefix    |
  | `MYSQL_CHARSET`      |          | `utf8mb4` | MySQL table charset   |

- **SQLite**:

  | Environment Variable | Required | Default | Description                                                         |
  | -------------------- | -------- | ------- | ------------------------------------------------------------------- |
  | `SQLITE_PATH`        | ✅       |         | SQLite storage file path, not include file name                     |
  | `SQLITE_DB`          |          | waline  | SQLite storage file name, change it if your filenamed is not waline |
  | `SQLITE_PREFIX`      |          | `wl_`   | SQLite table prefix                                                 |
  | `JWT_TOKEN`          | ✅       |         | Random String for login token generator                             |

- **PostgreSQL**:

  | Environment Variable | Required | Default   | Description                |
  | -------------------- | -------- | --------- | -------------------------- |
  | `PG_HOST`            |          | 127.0.0.1 | PostgreSQL server address  |
  | `PG_PORT`            |          | 3211      | PostgreSQL server port     |
  | `PG_DB`              | ✅       |           | PostgreSQL database name   |
  | `PG_USER`            | ✅       |           | PostgreSQL server username |
  | `PG_PASSWORD`        | ✅       |           | PostgreSQL server password |
  | `PG_PREFIX`          |          | `wl_`     | PostgreSQL table prefix    |

- **GitHub**:

  | Environment Variable | Required | Default | Description                                                                                                      |
  | -------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
  | GITHUB_TOKEN         | ✅       |         | [Personal access tokens](https://github.com/settings/tokens)                                                     |
  | GITHUB_REPO          | ✅       |         | repository name, such as `walinejs/waline`                                                                       |
  | GITHUB_PATH          |          |         | The data storage directory, such as `data` means it is stored in the `data` directory, root directory by default |

## Main entrance

The following options need to be configured in the server entry file `index.js`.

::: warning

If you are using template, please note that you need to save these configurations yourself, because they will be overwritten when you pull the latest official template.

:::

### secureDomains

- Type: `string | RegExp | string[] | RegExp[]`

Secure domain settings. Requests from other domain will receive 403 status code. It supports String, Regexp, and Array type. Leaving this config means that all domain referrer are allowed.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- To make local development easier, `localhost` and `127.0.0.1` will be added to the list of secure domain names by default.
- Env variable `SECURE_DOMAINS` won't work when this option is set.

:::

### forbiddenWords

- Type: `string[]`

If a comment match forbidden word, it will be marked as spam.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Type: `string[]`

If a comment ip match this list, 403 status code is returned.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Type: `string`

Customize the title of the comment reply email, which is equivalent to environment variable `MAIL_SUBJECT`.

### mailTemplate

- Type: `string`

Customize the content of the comment reply email, which is equivalent to environment variable `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Type: `string`

Customize the title of the new comment notification email, which is equivalent to the environment variable `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Type: `string`

Customize the content of the new comment notification email, which is equivalent to the environment variable `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Type: `string`

The QQ comment notification template, which is equivalent to the environment variable `QQ_TEMPLATE`.

### TGTempalte

- Type: `string`

Telegram comment notification template, which is equivalent to the environment variable `TG_TEMPLATE`.

## Comment Hooks

Besides environment variable configuration, Waline also provides some custom hooks to facilitate the processing of custom requirements. It only needs to be configured in the server entry file `index.js`.

### preSave(comment)

Waline provides some custom hooks to let users customize Waline server behavior according to their own needs.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

The action performed after the comment is posted.

When the method is executed, the comment data will be passed as the first param, and if it's a reply to the comment, the parent comment will be passed as the second param.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Action before a comment content is updated in the dashboard. If the method returns content, the interface will return directly without updating the comment data.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### afterUpdate(comment)

Action after a comment content is updated in the dashboard. Comment data will be passed in when the method is executed.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Action before a comment is deleted. When the method is executed, the comment Id to be operated will be passed in. If the method returns content, the interface will return directly without updating the comment data.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### afterDelete(commentId)

Action after a comment is deleted, the comment Id will be passed as the only param.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
