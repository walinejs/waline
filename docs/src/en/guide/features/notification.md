---
title: Comment Notification
icon: notice
order: 10
---

When a user posts a comment on the website or a user responds to a comment, Waline supports email or WeChat notification to the blogger and the author who responded to the comment.

- We support multiple types notifications for blogger
- We will email a visitor once his comment gets a reply.

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
- `SMTP_SECURE`: SMTP connect with SSL, either `true` or `false`.
- `SITE_NAME`: Your site name, will be displayed in notification message.
- `SITE_URL`: Your site url, will be displayed in notification message.

The following environment variables are optional:

- `SENDER_NAME`: Custom sender's name in notification
- `SENDER_EMAIL`: Custom sender's name in notification, required for some SMTP services.
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
- `QMSG_HOST`: HOST applied in Mr. QmsgPrivate, Optional. It's required for this host. Defalut is `https://qmsg.zendee.cn`
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

- `PUSH_PLUS_KEY`： user token. It's required for this service.
- `PUSH_PLUS_TOPIC`：group id. Send yourself if it's empty. And It's unuseful if `PUSH_PLUS_CHANNEL` equals `webhook`.
- `PUSH_PLUS_TEMPLATE`：Send template
- `PUSH_PLUS_CHANNEL`：Send channel
- `PUSH_PLUS_WEBHOOK`：webhook is required if `PUSH_PLUS_CHANNEL` equals `webhook` or `cp`.
- `PUSH_PLUS_CALLBACKURL`：callback url after send response.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.

## Discord Notification

We use Discord Webhook to send Discord notification. You need to set the following env.

- `DISCORD_WEBHOOK`: Discord Webhook url, [How to create Discord Webhook url](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: Send template
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.

## Lark Notification

We use Lark Webhook to send its group notifications. The following env variables are required.

- `LARK_WEBHOOK`: Lark Group Bot [Webhook Usages](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: As clarified by the doc from Lark, this secret is used to sign your request to avoid abuse（Optional).
- `LARK_TEMPLATE`: Message template
- `SITE_NAME`: Your site name which will be displayed in notification messages.
- `SITE_URL`: Your site url which will be displayed in notification messages.

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
  | comment         | Comment content      |
  | browser         | Browser name         |
  | os              | Operate system name  |
  | avatar          | avatar               |
  | _commentLink_\* | Links in comments    |

  \*: commentLink is only provided in Telegram notifications and will be automatically encapsulated in Markdown format.

- `parent`: Comment which is replied (parent comment).

  | variable | description          |
  | -------- | -------------------- |
  | nick     | Commenter's nickname |
  | mail     | Commenter's email    |
  | link     | Commenter's website  |
  | browser  | Browser name         |
  | os       | Operate system name  |
  | avatar   | avatar               |
  | comment  | Comment content      |

- `site`: Website configuration

  | variable | description          |
  | -------- | -------------------- |
  | name     | Site name            |
  | url      | Site URL             |
  | postUrl  | Comment full address |

### Default template

The default template is attached here for your reference:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a
      style="text-decoration:none;color: #12ADDB;"
      href="{{site.url}}"
      target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div
      style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"
    >
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div
      style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"
    >
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a
      style="text-decoration:none;color: #12ADDB;"
      href="{{site.url}}"
      target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div
    style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;"
  >
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a
      style="text-decoration:none; color:#12addb"
      href="{{site.postUrl}}"
      target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

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

### Additional Info

1. Vercel’s environment variable size is limited to `4KB`, so if your template is long, you should config if in main entry file, see [issue#106](https://github.com/walinejs/waline/issues/106).
1. The specific information of variables may change during the development process. The variable descriptions here are for reference only. Please refer to the specific code examples for specific content.
