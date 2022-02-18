---
title: Comment Notification
icon: notice
---

When a user posts a comment on the website or a user responds to a comment, Waline supports email or WeChat notification to the blogger and the author who responded to the comment. There are many types of blogger notifications, and only email notifications are supported for replying to comment authors.

<!-- more -->

## Email Notification

Email notification needs the following environment variables to be configured:

- `SMTP_SERVICE`: SMTP Mail delivery service provider

  ::: tip

  You can find all support provider in [here](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). If your provider is not listed, you must config `SMTP_HOST` and `SMTP_PORT`.

  - `SMTP_HOST`: SMTP server address, it can be found in mailbox's setting page generally.
  - `SMTP_PORT`: SMTP server port, it can be found in mailbox's setting page generally.

  :::

- `SMTP_USER`: SMTP Mail delivery service account, it's your email address.
- `SMTP_PASS`: SMTP Mail delivery service password, it's your email password.
- `SITE_NAME`: Your site name, will be displayed in notification message.
- `SITE_URL`: Your site url, will be displayed in notification message.

The following environment variables are optional:

- `SENDER_NAME`: Custom sender's name in notification
- `SENDER_EMAIL`: Custom sender's name in notification
- `MAIL_SUBJECT`: Custom comment reply email title
- `MAIL_TEMPLATE`: Custom reply email content
- `MAIL_SUBJECT_ADMIN`: Custom new comment notification email title
- `MAIL_TEMPLATE_ADMIN`: Custom new comment notification email content
- `AUTHOR_EMAIL`: The blogger’s email, used to judge whether posted comment is posted by the blogger. If it is posted by the blogger, there will be no reminder notification.

## Wechat Notification

We use [Mr. Server](http://sc.ftqq.com/3.version) to wechat notification. You need to set `SC_KEY` in env which applied in Mr. Server.

- `SC_KEY`: Token applied in Mr. Server, It's required for this service.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.

## QQ Notification

We use [Mr. Qmsg](https://qmsg.zendee.cn) to send QQ notification. You need to set `QMSG_KEY` in env which applied in Mr. Qmsg.

- `QMSG_KEY`: KEY applied in Mr. Qmsg, It's required for this service.
- `QQ_ID`: The QQ ID of the receiver(s), except for QQ group. If there are more than one QQ ID, use commas to separate multiple values, e.g. `1244453393,2952937634` (should all be included in your Mr. Qmsg's QQ ID list).
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
- `QQ_TEMPLATE`: Notification template used by QQ. Variables and specific formats can be found in the notification template below. If not configured, the default template is used.

## Telegram Notification

We use Telegram bot to send Telegram notification. You need to set the following env.

- `TG_BOT_TOKEN`: Telegram bot token to access the HTTP API. Create a bot with [@BotFather](https://t.me/BotFather) to get this token. It's required for this service.
- `TG_CHAT_ID`: The `chat_id` of the receiver. It can be an user, a channel or a group. [@userinfobot](https://t.me/userinfobot) will display this `chat_id` when you forward a message to it. It's required for this service.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
- `TG_TEMPLATE`: Notification template used by Telegram. Variables and specific formats can be found in the notification template below. If not configured, the default template is used.


## PushPlus Notification

[pushplus](http://www.pushplus.plus/) is a message push platform which supports many channels like wechat, wechat work, ding talk, sms or email. You need to set the following env. You can go to [pushplus documentation](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) to get more parameter format detail. 

- PUSH_PLUS_KEY：	user token. It's required for this service.
- PUSH_PLUS_TOPIC：group id. Send yourself if it's empty. And It's unuseful if `PUSH_PLUS_CHANNEL` equals `webhook`.
- PUSH_PLUS_TEMPLATE：Send template
- PUSH_PLUS_CHANNEL：Send channel
- PLUSH_PLUS_WEBHOOK：webhook is required if `PUSH_PLUS_CHANNEL` equals `webhook` or `cp`.
- PUSH_PLUS_CALLBACKURL：callback url after send responsed.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
## Notification Template

Waline supports configuring your customized notification templates for each platform separately to achieve stronger customization capabilities and i18n compatibility.

### Supported variables

The template passes parameters through `self`, `parent` and `site` objects, which contain the following variables respectively:

- `self`: The comment itself

  | variable        | description          |
  | --------------- | -------------------- |
  | nick            | Commenter's nickname |
  | mail            | Commenter's email    |
  | link            | Commenter's website  |
  | url             | Article address      |
  | comment         | Comment cotent       |
  | _commentLink_\* | Links in comments    |

  \*: commentLink is only provided in Telegram notifications and will be automatically encapsulated in Markdown format.

- `parent`: Comment which is replied (parent comment).

  | variable | description          |
  | -------- | -------------------- |
  | nick     | Commenter's nickname |
  | mail     | Commenter's email    |
  | link     | Commenter's website  |
  | type     | Commenter's type     |
  | comment  | Comment content      |

- `site`: Website configuration

  | variable | description          |
  | -------- | -------------------- |
  | name     | Site name            |
  | url      | Site URL             |
  | postUrl  | Comment full address |

### Default template

The default template is attached here for your reference:

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
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Addtional Info

1. Vercel’s environment variable size is limited to `4KB`, so if your template is long, you should config if in main entry file, see [issue#106](https://github.com/walinejs/waline/issues/106).
1. The specific information of variables may change during the development process. The variable descriptions here are for reference only. Please refer to the specific code examples for specific content.
