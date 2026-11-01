---
title: コメント通知
icon: notice
order: 10
---

ウェブサイトにユーザーがコメントを投稿したとき、またはユーザーがコメントに返信したとき、Waline はブロガーと返信されたコメントの投稿者に対して、メールや WeChat での通知に対応しています。

- ブロガー向けに複数の種類の通知に対応しています。
- 訪問者のコメントに返信が付くと、その訪問者にメールを送信します。

<!-- more -->

## メール通知

メール通知には、次の環境変数を設定する必要があります：

- `SMTP_SERVICE`: SMTP メール配信サービスのプロバイダー

  ::: tip

  対応しているプロバイダーは [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json) で確認できます。プロバイダーが一覧にない場合は、`SMTP_HOST` と `SMTP_PORT` を設定する必要があります。

  - `SMTP_HOST`: SMTP サーバーのアドレス。通常はメールボックスの設定ページで確認できます。
  - `SMTP_PORT`: SMTP サーバーのポート。通常はメールボックスの設定ページで確認できます。

  :::

- `SMTP_USER`: SMTP メール配信サービスのアカウント。あなたのメールアドレスです。
- `SMTP_PASS`: SMTP メール配信サービスのパスワード。あなたのメールパスワードです。
- `SMTP_SECURE`: SMTP を SSL で接続するかどうか。`true` または `false` を指定します。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。

次の環境変数は任意です：

- `SENDER_NAME`: 通知に表示する送信者名のカスタマイズ
- `SENDER_EMAIL`: 通知に表示する送信者のメールアドレスのカスタマイズ。一部の SMTP サービスでは必須です。
- `MAIL_SUBJECT`: コメント返信メールのタイトルのカスタマイズ
- `MAIL_TEMPLATE`: 返信メール本文のカスタマイズ
- `MAIL_SUBJECT_ADMIN`: 新規コメント通知メールのタイトルのカスタマイズ
- `MAIL_TEMPLATE_ADMIN`: 新規コメント通知メール本文のカスタマイズ
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。

## WeChat 通知

WeChat 通知には [Mr. Server](http://sc.ftqq.com/3.version) を利用しています。Mr. Server で申請した `SC_KEY` を環境変数に設定する必要があります。

- `SC_KEY`: Mr. Server で申請したトークン。このサービスには必須です。
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。

## QQ 通知

QQ 通知の送信には [Mr. Qmsg](https://qmsg.zendee.cn) を利用しています。Mr. Qmsg で申請した `QMSG_KEY` を環境変数に設定する必要があります。

- `QMSG_KEY`: Mr. Qmsg で申請した KEY。このサービスには必須です。
- `QMSG_HOST`: Mr. QmsgPrivate で申請した HOST。任意です。このホストを使う場合は必須です。デフォルトは `https://qmsg.zendee.cn` です。
- `QQ_ID`: 受信者の QQ ID（QQ グループを除く）。複数ある場合はカンマで区切ります（例：`1244453393,2952937634`）。いずれも Mr. Qmsg の QQ ID リストに含まれている必要があります。
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。
- `QQ_TEMPLATE`: QQ で使用する通知テンプレート。変数と具体的な形式は後述の通知テンプレートで確認できます。設定しない場合はデフォルトのテンプレートが使われます。

## Telegram 通知

Telegram 通知の送信には Telegram ボットを利用しています。次の環境変数を設定する必要があります。

- `TG_BOT_TOKEN`: HTTP API にアクセスするための Telegram ボットトークン。[@BotFather](https://t.me/BotFather) でボットを作成すると取得できます。このサービスには必須です。
- `TG_CHAT_ID`: 受信者の `chat_id`。ユーザー、チャンネル、グループのいずれかです。[@userinfobot](https://t.me/userinfobot) にメッセージを転送すると、この `chat_id` が表示されます。このサービスには必須です。
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。
- `TG_TEMPLATE`: Telegram で使用する通知テンプレート。変数と具体的な形式は後述の通知テンプレートで確認できます。設定しない場合はデフォルトのテンプレートが使われます。

## PushPlus 通知

[pushplus](http://www.pushplus.plus/) は、WeChat、WeCom、DingTalk、SMS、メールなど多数のチャネルに対応したメッセージプッシュプラットフォームです。次の環境変数を設定する必要があります。パラメータの形式の詳細は [pushplus のドキュメント](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) を参照してください。

- `PUSH_PLUS_KEY`： ユーザートークン。このサービスには必須です。
- `PUSH_PLUS_TOPIC`：グループ ID。空の場合は自分宛てに送信されます。`PUSH_PLUS_CHANNEL` が `webhook` の場合は使用されません。
- `PUSH_PLUS_TEMPLATE`：送信テンプレート
- `PUSH_PLUS_CHANNEL`：送信チャネル
- `PUSH_PLUS_WEBHOOK`：`PUSH_PLUS_CHANNEL` が `webhook` または `cp` の場合は webhook が必須です。
- `PUSH_PLUS_CALLBACKURL`：送信応答後のコールバック URL。
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。

## Discord 通知

Discord 通知の送信には Discord Webhook を利用しています。次の環境変数を設定する必要があります。

- `DISCORD_WEBHOOK`: Discord Webhook の URL。[Discord Webhook URL の作成方法](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) はこちら。
- `DISCORD_TEMPLATE`: 送信テンプレート
- `AUTHOR_EMAIL`: ブロガーのメールアドレス。投稿されたコメントがブロガー自身によるものかどうかの判定に使われます。ブロガー自身が投稿した場合は通知が送信されません。
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。

## Lark 通知

Lark のグループ通知の送信には Lark Webhook を利用しています。次の環境変数が必要です。

- `LARK_WEBHOOK`: Lark グループボットの [Webhook の使い方](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: Lark のドキュメントで説明されているとおり、このシークレットはリクエストの署名に使われ、悪用を防ぎます（任意）。
- `LARK_TEMPLATE`: メッセージテンプレート
- `SITE_NAME`: サイト名。通知メッセージに表示されます。
- `SITE_URL`: サイトの URL。通知メッセージに表示されます。

## 通知テンプレート

Waline はプラットフォームごとに独自の通知テンプレートを個別に設定でき、より強力なカスタマイズと i18n 対応を実現します。

### 使用できる変数

テンプレートには `self`、`parent`、`site` の各オブジェクトを通じてパラメータが渡されます。それぞれ次の変数を含みます：

- `self`: コメント自体

  | 変数            | 説明                                 |
  | --------------- | ------------------------------------ |
  | nick            | コメントしたユーザーのニックネーム   |
  | mail            | コメントしたユーザーのメールアドレス |
  | link            | コメントしたユーザーのウェブサイト   |
  | url             | 記事のアドレス                       |
  | comment         | コメント本文                         |
  | browser         | ブラウザ名                           |
  | os              | OS 名                                |
  | avatar          | アバター                             |
  | _commentLink_\* | コメント内のリンク                   |

  \*: commentLink は Telegram 通知でのみ提供され、Markdown 形式で自動的にラップされます。

- `parent`: 返信対象のコメント（親コメント）。

  | 変数    | 説明                                 |
  | ------- | ------------------------------------ |
  | nick    | コメントしたユーザーのニックネーム   |
  | mail    | コメントしたユーザーのメールアドレス |
  | link    | コメントしたユーザーのウェブサイト   |
  | browser | ブラウザ名                           |
  | os      | OS 名                                |
  | avatar  | アバター                             |
  | comment | コメント本文                         |

- `site`: ウェブサイトの設定

  | 変数    | 説明                     |
  | ------- | ------------------------ |
  | name    | サイト名                 |
  | url     | サイトの URL             |
  | postUrl | コメントの完全なアドレス |

### デフォルトのテンプレート

参考までに、デフォルトのテンプレートを掲載します：

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
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
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
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
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

### 補足情報

1. Vercel の環境変数のサイズは `4KB` に制限されているため、テンプレートが長い場合はメインのエントリーファイルで設定してください。詳しくは [issue#106](https://github.com/walinejs/waline/issues/106) を参照してください。
1. 変数の具体的な内容は開発の過程で変更される可能性があります。ここでの変数の説明は参考情報です。具体的な内容は実際のコード例を参照してください。
