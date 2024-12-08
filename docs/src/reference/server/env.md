---
title: 服务端环境变量
icon: config
---

你可以通过下面的环境变量对 Waline 服务端进行配置。

::: warning

环境变量在更新后必须**重新部署**才能生效。

Vercel 需要在 <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> 中进行设置。

:::

<!-- more -->

## 主要配置

| 环境变量名称      | 必填 | 备注                                                        |
| ----------------- | ---- | ----------------------------------------------------------- |
| `LEAN_ID`         | ✅   | LeanCloud 应用的 App ID                                     |
| `LEAN_KEY`        | ✅   | LeanCloud 应用的 App Key                                    |
| `LEAN_MASTER_KEY` | ✅   | LeanCloud 应用的 Master Key 用于后台修改数据                |
| `LEAN_SERVER`     | ⚠   | LeanCloud 服务地址，国内版用户需要配置此项                  |
| `SITE_NAME`       |      | 博客名称                                                    |
| `SITE_URL`        |      | 博客地址                                                    |
| `LOGIN`           |      | 当设置为 LOGIN=force 时会要求登录才能评论                   |
| `SERVER_URL`      |      | 设置 Waline Server 的地址，适合在自动生成的地址不正确时填写 |

## 显示

| 环境变量名称            | 默认值                                                                  | 备注                                     |
| ----------------------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| `DISABLE_USERAGENT`     | `false`                                                                 | 是否隐藏评论者的 UA，默认为否            |
| `DISABLE_REGION`        | `false`                                                                 | 是否隐藏评论者的归属地                   |
| `DISABLE_AUTHOR_NOTIFY` | `false`                                                                 | 是否禁止新评论通知                       |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                      | 头像的代理地址，设置 `false` 关闭代理    |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Gravatar 头像的地址，基于 nunjucks 语法  |
| `LEVELS`                |                                                                         | 设置后会根据评论数为每个用户提供等级标签 |

::: tip 等级标签

根据设置的等级条件以及用户的评论数，会为评论者增加等级标签。该功能默认关闭，可以通过配置环境变量 `LEVELS` 开启该功能。配置的形式为一串给定的数的逗号拼接，例如 `0,10,20,50,100,200` 表示的就是：

| 等级 | 条件               | 默认等级标签 |
| ---- | ------------------ | ------------ |
| 0    | 0 <= count < 10    | 潜水         |
| 1    | 10 <= count < 20   | 冒泡         |
| 2    | 20 <= count < 50   | 吐槽         |
| 3    | 50 <= count < 100  | 活跃         |
| 4    | 100 <= count < 200 | 话痨         |
| 5    | 200 <= count       | 传说         |

除了可以自定义等级判断规则之外，我们还可以在客户端自定义等级标签，详见 [等级标签](../../guide/features/i18n.md#自定义语言)。

默认只提供了 6 级文案，但并不表示只能有 6 个级别。具体的等级上限是根据你设置的等级判断规则来的。增加新的等级建议自己配置上等级对应的文案，没有提供文案的话默认展示的就是 `Level 10` 这样的默认文案。

:::

## 安全

| 环境变量名称          | 默认值         | 备注                                                                                         |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | 基于 IP 的评论发布频率限制，单位为秒。设置为 0 不限制                                        |
| `SECURE_DOMAINS`      |                | 安全域名配置，支持逗号分隔配置多个域名                                                       |
| `AKISMET_KEY`         | `70542d86693e` | Akismet 反垃圾评论服务 Key (默认开启，不用请设置为 false)                                    |
| `COMMENT_AUDIT`       | `false`        | 评论发布审核开关。开启后评论需要经过管理员审核后才能显示，所以建议在评论框默认文字上提供提示 |
| `RECAPTCHA_V3_KEY`    |                | reCAPTCHA V3 key，须与客户端同时配置                                                         |
| `RECAPTCHA_V3_SECRET` |                | reCAPTCHA V3 secret，服务端使用，不可泄漏                                                    |
| `TURNSTILE_KEY`       |                | Turnstile key，须与客户端同时配置                                                            |
| `TURNSTILE_SECRET`    |                | Turnstile secret，服务端使用，不可泄漏                                                       |

::: tip Recaptcha 和 Turnstile

Turnstile Key 和 Secret 可在 <https://www.cloudflare.com/zh-cn/products/turnstile/> 申请。

Recaptcha Key 和 Secret 可在 <https://www.google.com/recaptcha> 申请。

配置时安全域名需要同时添加网站地址和 Waline 服务端地址（不包含传输协议，即 `http://` 或 `https://`）。

:::

## Markdown

| 环境变量名称         | 默认值    | 备注                                              |
| -------------------- | --------- | ------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`      | MarkdownIt 配置                                   |
| `MARKDOWN_HIGHLIGHT` | `true`    | 是否启用高亮                                      |
| `MARKDOWN_EMOJI`     | `true`    | 是否启用 Emoji 缩写支持                           |
| `MARKDOWN_SUB`       | `true`    | 是否启用下角标支持                                |
| `MARKDOWN_SUP`       | `true`    | 是否启用上角标支持                                |
| `MARKDOWN_TEX`       | `mathjax` | 解析 TeX 的服务，支持 `mathjax`、`katex`、`false` |
| `MARKDOWN_MATHJAX`   | `{}`      | MathJax 选项                                      |
| `MARKDOWN_KATEX`     | `{}`      | KaTeX 选项                                        |

## 邮件

用户注册和评论的邮件通知都会用到邮件服务。配置邮件服务相关变量后，用户注册会增加邮箱验证码确认相关的操作，用来防止恶意的注册。

| 环境变量名称   | 备注                     |
| -------------- | ------------------------ |
| `SMTP_SERVICE` | SMTP 邮件发送服务提供商  |
| `SMTP_HOST`    | SMTP 服务器地址          |
| `SMTP_PORT`    | SMTP 服务器端口。        |
| `SMTP_USER`    | SMTP 用户名              |
| `SMTP_PASS`    | SMTP 密码                |
| `SMTP_SECURE`  | 是否使用 SSL 连接 SMTP   |
| `SENDER_NAME`  | 自定义发送邮件的发件人   |
| `SENDER_EMAIL` | 自定义发送邮件的发件地址 |

::: tip

可以在 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看支持的服务商。`SMTP_SERVICE` 和 (`SMTP_HOST`、`SMTP_PORT`) 任选其一即可，如果没有在列表中知道对应的 `SMTP_SERVICE` 的话则需要配 `SMTP_HOST` 和 `SMTP_PORT`，它们一般可以在邮箱的设置中找到。

SMTP 的用户名通常均支持用户的完整邮箱，而密码大多同邮箱密码。

请特别注意部分邮箱 (如 163、qq 邮箱) 使用单独的 SMTP 密码。

:::

## 数据库

### MongoDB

| 环境变量名称       | 必填 | 默认值    | 备注                             |
| ------------------ | ---- | --------- | -------------------------------- |
| `MONGO_DB`         | ✅   |           | MongoDB 数据库名称               |
| `MONGO_USER`       | ✅   |           | MongoDB 服务的用户名             |
| `MONGO_PASSWORD`   | ✅   |           | MongoDB 服务的密码               |
| `MONGO_HOST`       |      | 127.0.0.1 | MongoDB 服务的地址，支持数组格式 |
| `MONGO_PORT`       |      | 27017     | MongoDB 服务的端口，支持数组格式 |
| `MONGO_REPLICASET` |      |           | MongoDB 集群                     |
| `MONGO_AUTHSOURCE` |      |           | MongoDB 认证源                   |
| `MONGO_OPT_SSL`    |      | `false`   | 是否使用 SSL 进行连接            |

### MySQL

| 环境变量名称     | 必填 | 默认值    | 备注                          |
| ---------------- | ---- | --------- | ----------------------------- |
| `MYSQL_DB`       | ✅   |           | MySQL 数据库库名              |
| `MYSQL_USER`     | ✅   |           | MySQL 数据库的用户名          |
| `MYSQL_PASSWORD` | ✅   |           | MySQL 数据库的密码            |
| `MYSQL_HOST`     |      | 127.0.0.1 | MySQL 服务的地址              |
| `MYSQL_PORT`     |      | 3306      | MySQL 服务的端口              |
| `MYSQL_PREFIX`   |      | `wl_`     | MySQL 数据表的表前缀          |
| `MYSQL_CHARSET`  |      | `utf8mb4` | MySQL 数据表的字符集          |
| `MYSQL_SSL`      |      | `false`   | 是否使用 SSL MYSQL 连接数据库 |

### TiDB

[在 TiDB 上创建数据库](../../guide/deploy/tidb.md)

| 环境变量名称    | 必填 | 默认值    | 备注                |
| --------------- | ---- | --------- | ------------------- |
| `TIDB_DB`       | ✅   |           | TiDB 数据库库名     |
| `TIDB_USER`     | ✅   |           | TiDB 数据库的用户名 |
| `TIDB_PASSWORD` | ✅   |           | TiDB 数据库的密码   |
| `TIDB_HOST`     |      | 127.0.0.1 | TiDB 服务的地址     |
| `TIDB_PORT`     |      | 4000      | TiDB 服务的端口     |
| `TIDB_PREFIX`   |      | `wl_`     | TiDB 数据表的表前缀 |
| `TIDB_CHARSET`  |      | `utf8mb4` | TiDB 数据表的字符集 |

### SQLite

| 环境变量名称    | 必填 | 默认值 | 备注                                              |
| --------------- | ---- | ------ | ------------------------------------------------- |
| `SQLITE_PATH`   | ✅   |        | SQLite 数据库文件的路径，该路径不包含文件名本身   |
| `JWT_TOKEN`     | ✅   |        | 用户登录密钥，随机字符串即可                      |
| `SQLITE_DB`     |      | waline | SQLite 数据库文件名，若文件名变化需要修改该字段值 |
| `SQLITE_PREFIX` |      | `wl_`  | SQLite 数据表的表前缀                             |

### PostgreSQL

| 环境变量名称        | 必填 | 默认值    | 备注                                |
| ------------------- | ---- | --------- | ----------------------------------- |
| `PG_DB`             | ✅   |           | PostgreSQL 数据库库名               |
| `PG_USER`           | ✅   |           | PostgreSQL 数据库的用户名           |
| `PG_PASSWORD`       | ✅   |           | PostgreSQL 数据库的密码             |
| `PG_HOST`           |      | 127.0.0.1 | PostgreSQL 服务的地址               |
| `PG_PORT`           |      | 3211      | PostgreSQL 服务的端口               |
| `PG_PREFIX`         |      | `wl_`     | PostgreSQL 数据表的表前缀           |
| `PG_SSL`            |      | `false`   | 是否使用 SSL 连接 PostgreSQL 数据库 |
| `POSTGRES_DATABASE` |      |           | 同 `PG_DB`                          |
| `POSTGRES_USER`     |      |           | 同 `PG_USER`                        |
| `POSTGRES_PASSWORD` |      |           | 同 `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |      | 127.0.0.1 | 同 `PG_HOST`                        |
| `POSTGRES_PORT`     |      | 3211      | 同 `PG_PORT`                        |
| `POSTGRES_PREFIX`   |      | `wl_`     | 同 `PG_PREFIX`                      |
| `POSTGRES_SSL`      |      | `false`   | 同 `POSTGRES_SSL`                   |

### CloudBase

| 环境变量名称 | 必填 | 默认值 | 备注                                                                   |
| ------------ | ---- | ------ | ---------------------------------------------------------------------- |
| `TCB_ENV`    | ✅   |        | 腾讯云开发环境 ID                                                      |
| `TCB_ID`     | ✅   |        | 腾讯云 API 密钥 ID                                                     |
| `TCB_KEY`    | ✅   |        | 腾讯云 API 密钥 Key                                                    |
| `JWT_TOKEN`  |      |        | 用户登录密钥，如果没有配任何环境变量的话需要配置此变量，随机字符串即可 |

::: tip

对于腾讯云 API 密钥 ID 与 Key，可以在 [此处](https://console.cloud.tencent.com/cam/capi) 申请。

:::

### GitHub

| 环境变量名称   | 必填 | 默认值 | 备注                                                                     |
| -------------- | ---- | ------ | ------------------------------------------------------------------------ |
| `GITHUB_TOKEN` | ✅   |        | [Personal access tokens](https://github.com/settings/tokens)             |
| `GITHUB_REPO`  | ✅   |        | 仓库名称，例如 `walinejs/waline`                                         |
| `GITHUB_PATH`  |      |        | 数据存储目录，例如 `data` 表示存储在 `data` 目录下，默认存在仓库根目录下 |

## 高级配置

| 环境变量名称                    | 默认值                      | 备注                                                                                                                                                                |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | OAuth 第三方登录服务地址，可以 [自建 auth](https://github.com/walinejs/auth) 这是能让用户使用 GitHub, Twitter, Facebook, Google, 微博等第三方账户登录最简单的方式。 |
| `WEBHOOK`                       |                             | 评论成功后会向 WEBHOOK 配置的地址发送一条 POST 请求                                                                                                                 |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Waline admin 地址                                                                                                                                                   |
| `IP2REGION_DB`                  |                             | 自定义 IP 查询库路径                                                                                                                                                |
