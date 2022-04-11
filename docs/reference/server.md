---
title: 服务端配置
icon: config
---

## 环境变量

你可以通过下面的环境变量对 Waline 服务端进行配置。

::: warning

环境变量在更新后必须**重新部署**才能生效。

Vercel 需要在 <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> 中进行设置。

:::

### 主要配置

| 环境变量名称        | 必填 | 备注                                                                                                                    |
| ------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| `LEAN_ID`           | ✅   | LeanCloud 应用的 App ID                                                                                                 |
| `LEAN_KEY`          | ✅   | LeanCloud 应用的 App Key                                                                                                |
| `LEAN_MASTER_KEY`   | ✅   | LeanCloud 应用的 Master Key 用于后台修改数据                                                                            |
| `LEAN_SERVER`       | ⚠    | LeanCloud 服务地址，国内版用户需要配置此项                                                                              |
| `SITE_NAME`         |      | 博客名称                                                                                                                |
| `SITE_URL`          |      | 博客地址                                                                                                                |
| `IPQPS`             |      | 基于 IP 的评论发布频率限制，单位为秒。默认为 60 秒，设置为 0 不限制                                                     |
| `SECURE_DOMAINS`    |      | 安全域名配置，支持逗号分隔配置多个域名                                                                                  |
| `DISABLE_USERAGENT` |      | 是否隐藏评论者的 UA，默认为否                                                                                           |
| `AKISMET_KEY`       |      | Akismet 反垃圾评论服务 Key (默认开启，不用请设置为 false)                                                               |
| `COMMENT_AUDIT`     |      | 评论发布审核开关，配置后建议在 Placehoder 上提供文案提示                                                                |
| `LOGIN`             |      | 当设置为 `LOGIN=force` 时会要求登录才能评论                                                                             |
| `AVATAR_PROXY`      |      | 头像的代理地址，默认为 `https://avatar.75cdn.workers.dev`，设置 `false` 关闭代理                                        |
| `GRAVATAR_STR`      |      | Gravatar 头像的地址，默认为 <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span>，基于 nunjucks 语法 |
| `OAUTH_URL`         |      | OAuth 第三方登录服务地址，默认为 `https://user.75.team`，也可以使用 [auth](https://github.com/walinejs/auth) 自建       |

### Markdown

| 环境变量名称         | 备注                                                              |
| -------------------- | ----------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | MarkdownIt 配置                                                   |
| `MARKDOWN_HIGHLIGHT` | 是否启用高亮，默认启用                                            |
| `MARKDOWN_EMOJI`     | 是否启用 Emoji 缩写支持，默认启用                                 |
| `MARKDOWN_SUB`       | 是否启用下角标支持，默认启用                                      |
| `MARKDOWN_SUP`       | 是否启用上角标支持，默认启用                                      |
| `MARKDOWN_TEX`       | 是否启用数学公式支持，默认启用                                    |
| `MARKDOWN_TEX`       | 解析 Tex 的服务, 默认为 `'mathjax'` (可填入 `false` \| `'katex'`) |
| `MARKDOWN_MATHJAX`   | MathJax 选项                                                      |
| `MARKDOWN_KATEX`     | Katex 选项                                                        |

### 邮件

用户注册和评论的邮件通知都会用到邮件服务。配置邮件服务相关变量后，用户注册会增加邮箱验证码确认相关的操作，用来防止恶意的注册。

| 环境变量名称   | 备注                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| `SMTP_SERVICE` | SMTP 邮件发送服务提供商                                                             |
| `SMTP_HOST`    | SMTP 服务器地址，一般可以在邮箱的设置中找到。                                       |
| `SMTP_PORT`    | SMTP 服务器端口，一般可以在邮箱的设置中找到。                                       |
| `SMTP_USER`    | SMTP 邮件发送服务的用户名，一般为登录邮箱。                                         |
| `SMTP_PASS`    | SMTP 邮件发送服务的密码，一般为邮箱登录密码，部分邮箱(例如 163)是单独的 SMTP 密码。 |
| `SENDER_NAME`  | 自定义发送邮件的发件人                                                              |
| `SENDER_EMAIL` | 自定义发送邮件的发件地址                                                            |

:::tip
可以在[这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json)查看支持的服务商。`SMTP_SERVICE` 和 (`SMTP_HOST`、`SMTP_PORT`) 任选其一即可，如果没有在列表中知道对应的 `SMTP_SERVICE` 的话则需要配 `SMTP_HOST` 和 `SMTP_PORT`。
:::

### 数据库

- **MongoDB**:

  | 环境变量名称       | 必填 | 默认值    | 备注                             |
  | ------------------ | ---- | --------- | -------------------------------- |
  | `MONGO_HOST`       |      | 127.0.0.1 | MongoDB 服务的地址，支持数组格式 |
  | `MONGO_PORT`       |      | 27017     | MongoDB 服务的端口，支持数组格式 |
  | `MONGO_DB`         | ✅   |           | MongoDB 数据库名称               |
  | `MONGO_USER`       | ✅   |           | MongoDB 服务的用户名             |
  | `MONGO_PASSWORD`   | ✅   |           | MongoDB 服务的密码               |
  | `MONGO_REPLICASET` |      |           | MongoDB 集群                     |
  | `MONGO_AUTHSOURCE` |      |           | MongoDB 认证源                   |
  | `MONGO_OPT_SSL`    |      |           | 是否使用 SSL 进行连接            |

- **MySQL**:

  | 环境变量名称     | 必填 | 默认值    | 备注                 |
  | ---------------- | ---- | --------- | -------------------- |
  | `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 服务的地址     |
  | `MYSQL_PORT`     |      | 3306      | MySQL 服务的端口     |
  | `MYSQL_DB`       | ✅   |           | MySQL 数据库库名     |
  | `MYSQL_USER`     | ✅   |           | MySQL 数据库的用户名 |
  | `MYSQL_PASSWORD` | ✅   |           | MySQL 数据库的密码   |
  | `MYSQL_PREFIX`   |      | `wl_`     | MySQL 数据表的表前缀 |
  | `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 数据表的字符集 |

- **SQLite**:

  | 环境变量名称    | 必填 | 默认值 | 备注                                              |
  | --------------- | ---- | ------ | ------------------------------------------------- |
  | `SQLITE_PATH`   | ✅   |        | SQLite 数据库文件的路径，该路径不包含文件名本身   |
  | `SQLITE_DB`     |      | waline | SQLite 数据库文件名，若文件名变化需要修改该字段值 |
  | `SQLITE_PREFIX` |      | `wl_`  | SQLite 数据表的表前缀                             |
  | `JWT_TOKEN`     | ✅   |        | 用户登录密钥，随机字符串即可                      |

- **PostgreSQL**:

  | 环境变量名称  | 必填 | 默认值    | 备注                      |
  | ------------- | ---- | --------- | ------------------------- |
  | `PG_HOST`     |      | 127.0.0.1 | PostgreSQL 服务的地址     |
  | `PG_PORT`     |      | 3211      | PostgreSQL 服务的端口     |
  | `PG_DB`       | ✅   |           | PostgreSQL 数据库库名     |
  | `PG_USER`     | ✅   |           | PostgreSQL 数据库的用户名 |
  | `PG_PASSWORD` | ✅   |           | PostgreSQL 数据库的密码   |
  | `PG_PREFIX`   |      | `wl_`     | PostgreSQL 数据表的表前缀 |

- **CloudBase**:

  | 环境变量名称 | 必填 | 默认值 | 备注                                                                        |
  | ------------ | ---- | ------ | --------------------------------------------------------------------------- |
  | `TCB_ENV`    | ✅   |        | 腾讯云开发环境 ID                                                           |
  | `TCB_ID`     | ✅   |        | 腾讯云 API 密钥 ID，[在此](https://console.cloud.tencent.com/cam/capi)获取  |
  | `TCB_KEY`    | ✅   |        | 腾讯云 API 密钥 Key，[在此](https://console.cloud.tencent.com/cam/capi)获取 |
  | `JWT_TOKEN`  |      |        | 用户登录密钥，如果没有配任何环境变量的话需要配置此变量，随机字符串即可      |

- **GitHub**:

  | 环境变量名称 | 必填 | 默认值 | 备注                                                                     |
  | ------------ | ---- | ------ | ------------------------------------------------------------------------ |
  | GITHUB_TOKEN | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)             |
  | GITHUB_REPO  | ✅   |        | 仓库名称，例如 `walinejs/waline`                                         |
  | GITHUB_PATH  |      |        | 数据存储目录，例如 `data` 表示存储在 `data` 目录下，默认存在仓库根目录下 |

## 主入口配置

以下选项需要在服务端入口文件 `index.js` 中进行配置。

::: warning

如果你使用模板，请额外注意你需要自行保存这些配置，因为它们会在拉取官方最新模板时被覆盖。

:::

### secureDomains

- 类型: `string | RegExp | string[] | RegExp[]`

安全域名配置。配置后非该域名来源的请求会返回 403 状态码。支持字符串、正则、数组类型，不配置表示允许所有域名来源。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- 为了方便本地开发，`localhost` 和 `127.0.0.1` 会被默认添加到安全域名列表中。
- 当存在该配置时，环境变量 `SECURE_DOMAINS` 不生效。
- 腾讯云开发需要同时在 `环境 -> 安全配置 -> WEB 安全域名` 中配置安全域名

:::

### forbiddenWords

- 类型: `string[]`

违禁词配置，包含违禁词的内容会直接标记为垃圾评论。

::: details 例子

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['习近平', '毛泽东'],
});
```

:::

### disallowIPList

- 类型: `string[]`

IP 黑名单配置，名单中的 IP 访问会直接返回 403 错误。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- 类型: `string`

评论回复邮件标题自定义，等同于环境变量 `MAIL_SUBJECT`。

### mailTemplate

- 类型: `string`

评论回复邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE`。

### mailSubjectAdmin

- 类型: `string`

新评论通知邮件标题自定义，等同于环境变量 `MAIL_SUBJECT_ADMIN`。

### mailTemplateAdmin

- 类型: `string`

新评论通知邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE_ADMIN`。

### QQTemplate

- 类型: `string`

QQ 评论通知模板，等同于环境变量 `QQ_TEMPLATE`。

### TGTempalte

- 类型: `string`

Telegram 评论通知模板，等同于环境变量 `TG_TEMPLATE`。

## 评论 Hooks

Waline 提供了一些自定义 Hook，方便用户根据自身业务需求对 Waline 服务端行为进行定制。

自定义 Hook 在服务端入口文件 `index.js` 中进行配置。

### preSave(comment)

发布评论前执行的操作。传入评论数据，如果该方法返回内容，则接口会直接返回，不存储评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: '这是垃圾邮件!' };
    }
  },
});
```

:::

### postSave(comment, pComment)

评论发布后执行的操作。

方法执行时会传入评论数据，如果是回复评论的话还会传入父级评论。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} 回复了你的评论!`,
    });
  },
});
```

:::

### preUpdate(comment)

评论内容在后台被更新前执行的操作。如果该方法返回内容，则接口会直接返回，不更新评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return '你无法更新评论数据';
  },
});
```

:::

### afterUpdate(comment)

评论内容在后台被更新后执行的操作。方法执行时会传入评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`${comment.objectId} 评论已更新!`);
  },
});
```

:::

### preDelete(commentId)

评论被删除前执行的操作，方法执行时会传入需要操作的评论 Id。如果该方法返回内容，则接口会直接返回，不更新评论数据。

::: details 例子

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

评论被删除后执行的操作，方法执行时会传入需要操作的评论 Id。

::: details 例子

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

### avatarUrl(comment)

获取头像时执行的操作，方法执行时会传入需要操作的 comment 对象。

::: details 例子

这是一个实现自动替换使用 QQ 头像的示例函数

```js
// index.js
const Waline = require('@waline/vercel');
module.exports = Waline({
  async avatarUrl(comment) {
    const reg = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    if (reg.test(mail)) {
      const q = mail.replace(/@qq\.com/i, '').toLowerCase();
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
    }
  },
});
```

此方法或传入一个 `comment` 对象，你可以通过 `comment.mail` 获取邮箱。若返回值为 string 类型，则会直接调用返回值作为头像地址，否则正常生成 MD5。

:::
