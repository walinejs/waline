# Comment Notification

When a user posts a comment on the website or a user responds to a comment, Waline supports email or WeChat notification to the blogger and the author who responded to the comment. There are many types of blogger notifications, and only email notifications are supported for replying to comment authors.

## Email Notification

Email notification needs to configure the following in the environment variables:

- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SMTP_SERVICE`: SMTP Mail delivery service provider，You can find all support provider in [here](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). If your provider is not on the list, you can also configure `SMTP_HOST` and `SMTP_PORT` to custom it.
- `SMTP_HOST`: SMTP server address, it can be found in mailbox's setting page generally. It's required if you have not configure `SMTP_SERVICE`.
- `SMTP_PORT`: SMTP server port, it can be found in mailbox's setting page generally. It's required if you have not configure `SMTP_SERVICE`.
- `SMTP_USER`: SMTP Mail delivery service account, it's always your email address.
- `SMTP_PASS`: SMTP Mail delivery service password, it's always your mailbox login password.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
- `SENDER_NAME`: Optional custom notification name from user.
- `SENDER_EMAIL`: Optional custom notification email from user.
- `MAIL_SUBJECT`: Comment reply email title customization.
- `MAIL_TEMPLATE`: Comment reply email content customization.
- `MAIL_SUBJECT_ADMIN`: New comment notification email title customization.
- `MAIL_TEMPLATE_ADMIN`: New comment notification email content customization.

## Wechat Notification

We use [Server Chan](http://sc.ftqq.com/3.version) to wechat notification. You need to set `SC_KEY` in env which applied in Server Chan.

- `SC_KEY`: Token applied in Server Chan, It's required for this service.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.

## QQ Notification

We use [Qmsg Chan](https://qmsg.zendee.cn) to send QQ notification. You need to set `QMSG_KEY` in env which applied in Qmsg Chan.

- `QMSG_KEY`: KEY applied in Qmsg Chan, It's required for this service.
- `QQ_ID`: The QQ ID of the receiver(s), except for QQ group. If there are more than one QQ ID, use commas to separate multiple values, e.g. `1244453393,2952937634` (should all be included in your Qmsg Chan's QQ ID list).
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
- `QQ_TEMPLATE`: Notification template used by QQ. Variables and specific formats can be found in the notification template below. If not configured, the default template is used.

## Telegram Notification

We use Telegram bot to send Telegram notification. You need to set the following env first.

- `TG_BOT_TOKEN`: Telegram bot token to access the HTTP API. Create a bot with [@BotFather](https://t.me/BotFather) to get this token. It's required for this service.
- `TG_CHAT_ID`: The `chat_id` of the receiver. It can be an user, a channel or a group. [@userinfobot](https://t.me/userinfobot) will display this `chat_id` when you forward a message to it. It's required for this service.
- `AUTHOR_EMAIL`: The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`: Your site name, it will be displayed in notification message.
- `SITE_URL`: Your site url, it will be displayed in notification message.
- `TG_TEMPLATE`: Notification template used by Telegram. Variables and specific formats can be found in the notification template below. If not configured, the default template is used.

## Notification Template

Waline supports configuring your customized notification templates for each platform separately to achieve stronger customization capabilities and i18n compatibility.

### Supported variables

The template passes parameters through `self`, `parent` and `site` objects, which contain the following variables respectively:

- self: The comment itself

  | variable        | description          |
  | --------------- | -------------------- |
  | nick            | Commenter's nickname |
  | mail            | Commenter's email    |
  | link            | Commenter's website  |
  | url             | Article address      |
  | comment         | Comment cotent       |
  | _commentLink_\* | Links in comments    |

  \*: commentLink is only provided in Telegram notifications and will be automatically encapsulated in Markdown format.

- parent: Comment which is replied (parent comment).

  | variable | description          |
  | -------- | -------------------- |
  | nick     | Commenter's nickname |
  | mail     | Commenter's email    |
  | link     | Commenter's website  |
  | type     | Commenter's type     |
  | comment  | Comment content      |

- site: Website configuration

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

1. Vercel’s environment variable size is limited to `4KB`, so if your template storage needs are large, you can directly use the code configuration, see [issue#106](https://github.com/lizheming/waline/issues/106).
2. The specific information of variables may change during the development process. The variable descriptions here are for reference only. Please refer to the specific code examples for specific content.
