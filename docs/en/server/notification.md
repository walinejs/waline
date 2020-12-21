# Comment Notification

When a user posts a comment on the website or a user responds to a comment, Waline supports email or WeChat notification to the blogger and the author who responded to the comment. There are many types of blogger notifications, and only email notifications are supported for replying to comment authors.

## Email Notification

Email notification needs to configure the following in the environment variables:

- `AUTHOR_EMAIL`：The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SMTP_SERVICE`：SMTP Mail delivery service provider，You can find all support provider in [here](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). If your provider is not on the list, you can also configure `SMTP_HOST` and `SMTP_PORT` to custom it.
- `SMTP_HOST`：SMTP server address, it can be found in mailbox's setting page generally. It's required if you have not configure `SMTP_SERVICE`.
- `SMTP_PORT`：SMTP server port, it can be found in mailbox's setting page generally. It's required if you have not configure `SMTP_SERVICE`.
- `SMTP_USER`：SMTP Mail delivery service account, it's always your email address.
- `SMTP_PASS`：SMTP Mail delivery service password, it's always your mailbox login password.
- `SITE_NAME`：Your site name, it will be displayed in notification message.
- `SITE_URL`：Your site url, it will be displayed in notification message.

## Wechat Notification

We use [Server Chan](http://sc.ftqq.com/3.version) to wechat notification. You need to set `SC_KEY` in env which applied in Server Chan.

- `SC_KEY`：Token applied in Server Chan, It's required for this service.
- `AUTHOR_EMAIL`：The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`：Your site name, it will be displayed in notification message.
- `SITE_URL`：Your site url, it will be displayed in notification message.

## Telegram Notification

We use Telegram bot to send comment notification. You need to set the following env first.

- `TG_BOT_TOKEN`：Telegram bot token to access the HTTP API. Create a bot with [@BotFather](https://t.me/BotFather) to get this token.
- `TG_CHAT_ID`：The `chat_id` of the receiver. It can be an user, a channel or a group. [@userinfobot](https://t.me/userinfobot) will display this `chat_id` when you forward a message to it.
- `AUTHOR_EMAIL`：The blogger’s email is used to distinguish whether the posted comment is posted by the blogger himself. If it is posted by the blogger, there will be no reminder notification.
- `SITE_NAME`：Your site name, it will be displayed in notification message.
- `SITE_URL`：Your site url, it will be displayed in notification message.
