---
title: 댓글 알림
icon: notice
order: 10
---

사용자가 웹사이트에 댓글을 작성하거나 다른 사용자의 댓글에 답글을 달면, Waline은 블로거와 답글 대상 작성자에게 이메일 또는 WeChat 알림을 보낼 수 있습니다.

- 블로거를 위한 다양한 유형의 알림을 지원합니다.
- 방문자의 댓글에 답글이 달리면 해당 방문자에게 이메일을 발송합니다.

<!-- more -->

## 이메일 알림

이메일 알림을 사용하려면 다음 환경 변수를 설정해야 합니다:

- `SMTP_SERVICE`: SMTP 메일 전송 서비스 제공자

  ::: tip

  [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json)에서 지원하는 모든 제공자를 확인할 수 있습니다. 목록에 없는 제공자를 사용하는 경우 `SMTP_HOST`와 `SMTP_PORT`를 설정해야 합니다.
  - `SMTP_HOST`: SMTP 서버 주소, 일반적으로 메일함 설정 페이지에서 확인할 수 있습니다.
  - `SMTP_PORT`: SMTP 서버 포트, 일반적으로 메일함 설정 페이지에서 확인할 수 있습니다.

  :::

- `SMTP_USER`: SMTP 메일 전송 서비스 계정, 이메일 주소입니다.
- `SMTP_PASS`: SMTP 메일 전송 서비스 비밀번호, 이메일 비밀번호입니다.
- `SMTP_SECURE`: SMTP SSL 연결 여부, `true` 또는 `false`.
- `SITE_NAME`: 사이트 이름, 알림 메시지에 표시됩니다.
- `SITE_URL`: 사이트 URL, 알림 메시지에 표시됩니다.

다음 환경 변수는 선택 사항입니다:

- `SENDER_NAME`: 알림의 사용자 지정 발신자 이름
- `SENDER_EMAIL`: 알림의 사용자 지정 발신자 이메일, 일부 SMTP 서비스에서 필수입니다.
- `MAIL_SUBJECT`: 사용자 지정 댓글 답글 이메일 제목
- `MAIL_TEMPLATE`: 사용자 지정 답글 이메일 내용
- `MAIL_SUBJECT_ADMIN`: 사용자 지정 새 댓글 알림 이메일 제목
- `MAIL_TEMPLATE_ADMIN`: 사용자 지정 새 댓글 알림 이메일 내용
- `AUTHOR_EMAIL`: 블로거의 이메일, 작성된 댓글이 블로거가 쓴 것인지 판단하는 데 사용됩니다. 블로거가 작성한 댓글인 경우 알림이 발송되지 않습니다.

## WeChat 알림

WeChat 알림을 위해 [Mr. Server](http://sc.ftqq.com/3.version)를 사용합니다. Mr. Server에서 발급받은 `SC_KEY`를 환경 변수에 설정해야 합니다.

- `SC_KEY`: Mr. Server에서 발급받은 토큰, 이 서비스에 필수입니다.
- `AUTHOR_EMAIL`: 블로거의 이메일, 작성된 댓글이 블로거가 쓴 것인지 판단하는 데 사용됩니다. 블로거가 작성한 댓글인 경우 알림이 발송되지 않습니다.
- `SITE_NAME`: 사이트 이름, 알림 메시지에 표시됩니다.
- `SITE_URL`: 사이트 URL, 알림 메시지에 표시됩니다.

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

## PushPlus 알림

[pushplus](http://www.pushplus.plus/)는 WeChat, 기업용 WeChat, DingTalk, SMS, 이메일 등 다양한 채널을 지원하는 메시지 푸시 플랫폼입니다. 다음 환경 변수를 설정해야 합니다. 더 자세한 매개변수 형식은 [pushplus 문서](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3)를 참조하세요.

- `PUSH_PLUS_KEY`：사용자 토큰, 이 서비스에 필수입니다.
- `PUSH_PLUS_TOPIC`：그룹 ID, 비어 있으면 자신에게 발송됩니다. `PUSH_PLUS_CHANNEL`이 `webhook`인 경우 사용되지 않습니다.
- `PUSH_PLUS_TEMPLATE`：발송 템플릿
- `PUSH_PLUS_CHANNEL`：발송 채널
- `PUSH_PLUS_WEBHOOK`：`PUSH_PLUS_CHANNEL`이 `webhook` 또는 `cp`인 경우 webhook이 필수입니다.
- `PUSH_PLUS_CALLBACKURL`：발송 응답 후 콜백 URL.
- `AUTHOR_EMAIL`: 블로거의 이메일, 작성된 댓글이 블로거가 쓴 것인지 판단하는 데 사용됩니다. 블로거가 작성한 댓글인 경우 알림이 발송되지 않습니다.
- `SITE_NAME`: 사이트 이름, 알림 메시지에 표시됩니다.
- `SITE_URL`: 사이트 URL, 알림 메시지에 표시됩니다.

## Discord 알림

Discord 알림을 보내기 위해 Discord Webhook을 사용합니다. 다음 환경 변수를 설정해야 합니다.

- `DISCORD_WEBHOOK`: Discord Webhook URL, [Discord Webhook URL 생성 방법](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
- `DISCORD_TEMPLATE`: 발송 템플릿
- `AUTHOR_EMAIL`: 블로거의 이메일, 작성된 댓글이 블로거가 쓴 것인지 판단하는 데 사용됩니다. 블로거가 작성한 댓글인 경우 알림이 발송되지 않습니다.
- `SITE_NAME`: 사이트 이름, 알림 메시지에 표시됩니다.
- `SITE_URL`: 사이트 URL, 알림 메시지에 표시됩니다.

## Lark 알림

Lark 그룹 알림을 보내기 위해 Lark Webhook을 사용합니다. 다음 환경 변수가 필요합니다.

- `LARK_WEBHOOK`: Lark 그룹 봇 [Webhook 사용법](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: Lark 문서에 설명된 대로, 악용 방지를 위해 요청에 서명하는 데 사용되는 시크릿입니다（선택 사항).
- `LARK_TEMPLATE`: 메시지 템플릿
- `SITE_NAME`: 사이트 이름, 알림 메시지에 표시됩니다.
- `SITE_URL`: 사이트 URL, 알림 메시지에 표시됩니다.

## 알림 템플릿

Waline은 각 플랫폼별로 사용자 지정 알림 템플릿을 설정하여 더 강력한 사용자 지정 기능과 i18n 호환성을 제공합니다.

### 지원되는 변수

템플릿은 `self`, `parent`, `site` 객체를 통해 매개변수를 전달하며, 각각 다음 변수를 포함합니다:

- `self`: 댓글 자체

  | 변수            | 설명                 |
  | --------------- | -------------------- |
  | nick            | 댓글 작성자 닉네임   |
  | mail            | 댓글 작성자 이메일   |
  | link            | 댓글 작성자 웹사이트 |
  | url             | 글 주소              |
  | comment         | 댓글 내용            |
  | browser         | 브라우저 이름        |
  | os              | 운영 체제 이름       |
  | avatar          | 아바타               |
  | _commentLink_\* | 댓글 내 링크         |

  \*: commentLink는 Telegram 알림에서만 제공되며 자동으로 Markdown 형식으로 캡슐화됩니다.

- `parent`: 답글 대상 댓글 (부모 댓글)

  | 변수    | 설명                 |
  | ------- | -------------------- |
  | nick    | 댓글 작성자 닉네임   |
  | mail    | 댓글 작성자 이메일   |
  | link    | 댓글 작성자 웹사이트 |
  | browser | 브라우저 이름        |
  | os      | 운영 체제 이름       |
  | avatar  | 아바타               |
  | comment | 댓글 내용            |

- `site`: 웹사이트 설정

  | 변수    | 설명           |
  | ------- | -------------- |
  | name    | 사이트 이름    |
  | url     | 사이트 URL     |
  | postUrl | 댓글 전체 주소 |

### 기본 템플릿

기본 템플릿은 참고용으로 아래에 첨부합니다:

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

### 추가 정보

1. Vercel의 환경 변수 크기는 `4KB`로 제한되므로, 템플릿이 긴 경우 메인 엔트리 파일에서 설정해야 합니다. [issue#106](https://github.com/walinejs/waline/issues/106)을 참조하세요.
1. 변수의 구체적인 정보는 개발 과정에서 변경될 수 있습니다. 여기의 변수 설명은 참고용이며, 구체적인 내용은 실제 코드 예제를 참조하세요.
