# 评论通知

当网站有用户发布评论或者用户回复评论时，Waline 支持对博主和回复评论作者进行通知。

博主通知支持多种方式，包括 QQ、微信、邮件等，回复评论作者仅支持邮件通知。

## 邮件通知

邮件通知需要在环境变量中配置以下几个:

- `AUTHOR_EMAIL`: 博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SMTP_SERVICE`: SMTP 邮件发送服务提供商，可以在 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看所有支持的运营商。如果没在列表中的可以自行配置 `SMTP_HOST` 和 `SMTP_PORT`。
- `SMTP_HOST`: SMTP 服务器地址，一般可以在邮箱的设置中找到。如未配置 `SMTP_SERVICE` 该项必填。
- `SMTP_PORT`: SMTP 服务器端口，一般可以在邮箱的设置中找到。如未配置 `SMTP_SERVICE` 该项必填。
- `SMTP_USER`: SMTP 邮件发送服务的用户名，一般为登录邮箱。
- `SMTP_PASS`: SMTP 邮件发送服务的密码，一般为邮箱登录密码，部分邮箱（例如 163）是单独的 SMTP 密码。
- `SITE_NAME`: 网站名称，用于在消息中显示。
- `SITE_URL`: 网站地址，用于在消息中显示。
- `SENDER_NAME`: 自定义发送邮件的发件人，选填。
- `SENDER_EMAIL`: 自定义发送邮件的发件地址，选填。
- `MAIL_SUBJECT`: 评论回复邮件标题自定义
- `MAIL_TEMPLATE`: 评论回复邮件内容自定义
- `MAIL_SUBJECT_ADMIN`: 新评论通知邮件标题自定义
- `MAIL_TEMPLATE_ADMIN`: 新评论通知邮件内容自定义

## 微信通知

微信通知使用了 [Server 酱](http://sc.ftqq.com/3.version) 提供的服务，需要在环境变量中配置在 Server 酱中申请的 `SC_KEY`。

- `SC_KEY`: Server 酱提供的 Token，必填。
- `AUTHOR_EMAIL`: 博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`: 网站名称，用于在消息中显示。
- `SITE_URL`: 网站地址，用于在消息中显示。

## QQ 通知

QQ 通知使用了 [Qmsg 酱](https://qmsg.zendee.cn) 提供的服务，需要在环境变量中配置在 Qmsg 酱中申请的 `QMSG_KEY`。

- `QMSG_KEY`: Qmsg 酱提供的 KEY，必填。
- `QQ_ID`: 接收消息的 QQ 号（不支持 QQ 群），可以添加多个，以半角逗号分割，如: `1244453393,2952937634`（必须均在您的 Qmsg 酱 QQ 号列表中）。
- `AUTHOR_EMAIL`: 博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`: 网站名称，用于在消息中显示。
- `SITE_URL`: 网站地址，用于在消息中显示。
- `QQ_TEMPLATE`: QQ 使用的通知模板，变量与具体格式可参见下文的通知模板。未配置则使用默认模板。

## Telegram 通知

Telegram 通知通过 Telegram bot 机器人实现，需要配置以下几个环境变量:

- `TG_BOT_TOKEN`: Telegram 机器人用于访问 HTTP API 的 token，通过 [@BotFather](https://t.me/BotFather) 创建机器人获取，必填。
- `TG_CHAT_ID`: 接收消息对象的 `chat_id`，可以是单一用户、频道、群组，通过 [@userinfobot](https://t.me/userinfobot) 获取，必填。
- `AUTHOR_EMAIL`: 博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`: 网站名称，用于在消息中显示。
- `SITE_URL`: 网站地址，用于在消息中显示。
- `TG_TEMPLATE`: Telegram 使用的通知模板，变量与具体格式可参见下文的通知模板。未配置则使用默认模板。

## 通知模板

Waline 支持为每个平台分别配置您自定义的通知模板，从而实现更强大的自定义能力与 i18n 兼容性。

### 支持的变量

模板通过 `self` 、 `parent` 和 `site` 对象传递参数，其中分别包含以下变量:

- self: 该条评论本身

  | 变量            | 备注         |
  | --------------- | ------------ |
  | nick            | 评论者名     |
  | mail            | 评论者邮箱   |
  | link            | 评论者网址   |
  | url             | 文章地址     |
  | comment         | 评论内容     |
  | _commentLink_\* | 评论中的链接 |

  \*: commentLink 仅在 Telegram 通知中提供，会自动封装成 Markdown 的格式

- parent: 该条评论的回复对象（父评论）

  | 变量    | 备注       |
  | ------- | ---------- |
  | nick    | 评论者名   |
  | mail    | 评论者邮箱 |
  | link    | 评论者网址 |
  | type    | 评论者类型 |
  | comment | 评论内容   |

- site: 网站配置

  | 变量    | 备注         |
  | ------- | ------------ |
  | name    | 站点名       |
  | url     | 站点网址     |
  | postUrl | 评论完整地址 |

### 默认模板

此处附上默认的模板，方便您参考:

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱_: `{{self.mail}}`
  _审核_: {{self.status}}

  仅供评论预览，点击 [查看完整內容]({{site.postUrl}})
  ````

### 附加说明

1. Vercel 的环境变量大小限制为 `4KB` ，因而如果您的模板存储需求比较大，可以直接使用代码配置，参见 [issue#106](https://github.com/lizheming/waline/issues/106) ；
2. 变量具体信息在开发过程中可能会发生变化，此处的变量说明仅供参考，具体的内容请以具体的代码示例为准。
