# 评论通知

当网站有用户发布评论或者用户回复评论时，Waline 支持对博主和回复评论作者进行邮件、微信通知。博主通知支持多种，回复评论作者仅支持邮件通知。

## 邮件通知

邮件通知需要在环境变量中配置以下几个：

- `AUTHOR_EMAIL`：博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SMTP_SERVICE`：SMTP 邮件发送服务提供商，可以在 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看所有支持的运营商。如果没在列表中的可以自行配置 `SMTP_HOST` 和 `SMTP_PORT`。
- `SMTP_HOST`：SMTP 服务器地址，一般可以在邮箱的设置中找到。如果未配置 `SMTP_SERVICE` 的话该项必填。
- `SMTP_PORT`：SMTP 服务器端口，一般可以在邮箱的设置中找到。如果未配置 `SMTP_SERVICE` 的话该项必填。
- `SMTP_USER`：SMTP 邮件发送服务的用户名，一般为登录邮箱。
- `SMTP_PASS`：SMTP 邮件发送服务的密码，一般为邮箱登录密码，部分邮箱（例如163）是单独的 SMTP 密码。
- `SITE_NAME`：网站名称，用于在消息中显示。
- `SITE_URL`：网站地址，用于在消息中显示。

## 微信通知

微信通知使用了 [Server 酱](http://sc.ftqq.com/3.version) 提供的服务，需要在环境变量中配置在 Server 酱中申请的 `SC_KEY`。

- `SC_KEY`：Server 酱提供的 Token，必填。
- `AUTHOR_EMAIL`：博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`：网站名称，用于在消息中显示。
- `SITE_URL`：网站地址，用于在消息中显示。

## QQ 通知

QQ 通知使用了 [Qmsg 酱](https://qmsg.zendee.cn) 提供的服务，需要在环境变量中配置在 Qmsg 酱中申请的 `QMSG_KEY`。

- `QMSG_KEY`：Qmsg 酱提供的 KEY，必填。
- `QQ_ID`：接收消息的 QQ 号（不支持 QQ 群），可以添加多个，以半角逗号分割，如：`1244453393,2952937634`（必须均在您的 Qmsg 酱 QQ 号列表中）。
- `AUTHOR_EMAIL`：博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`：网站名称，用于在消息中显示。
- `SITE_URL`：网站地址，用于在消息中显示。

## Telegram 通知

Telegram 通知通过 Telegram bot 机器人实现，需要配置以下几个环境变量：

- `TG_BOT_TOKEN`：Telegram 机器人用于访问 HTTP API 的 token，通过 [@BotFather](https://t.me/BotFather) 创建机器人获取，必填。
- `TG_CHAT_ID`：接收消息对象的 `chat_id`，可以是单一用户、频道、群组，通过 [@userinfobot](https://t.me/userinfobot) 获取，必填。
- `AUTHOR_EMAIL`：博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是博主发布的则不进行提醒通知。
- `SITE_NAME`：网站名称，用于在消息中显示。
- `SITE_URL`：网站地址，用于在消息中显示。
