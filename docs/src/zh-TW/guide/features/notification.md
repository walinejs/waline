---
title: 留言通知
icon: notice
order: 10
---

當網站有使用者發布留言或者使用者回覆留言時，Waline 支援對站長和回覆留言的作者進行通知。

- 站長通知支援多種方式，包括 QQ、微信、郵件等。
- 當訪客的留言收到回覆時，我們會對訪客進行郵件通知。

<!-- more -->

## 郵件通知

郵件通知需要設定以下環境變數:

- `SMTP_SERVICE`: SMTP 郵件寄送服務供應商。

  ::: tip

  你可以在 [這裡](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json) 查看所有支援的服務商。

  如果你的服務商不受支援，你必須填寫 `SMTP_HOST` 和 `SMTP_PORT`。

  - `SMTP_HOST`: SMTP 伺服器位址，一般可以在電子郵件的設定中找到。
  - `SMTP_PORT`: SMTP 伺服器連接埠，一般可以在電子郵件的設定中找到。

  :::

- `SMTP_USER`: SMTP 郵件寄送服務的使用者名稱，一般為登入電子郵件。
- `SMTP_PASS`: SMTP 郵件寄送服務的密碼，一般為電子郵件登入密碼，部分電子郵件 (例如 163) 是獨立的 SMTP 密碼。
- `SMTP_SECURE`: 是否使用 SSL 連接 SMTP。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。
- `AUTHOR_EMAIL`: 站長電子郵件，用來接收新留言通知。如果是站長自己發布的留言則不進行提醒通知。

以下是選填的環境變數:

- `SENDER_NAME`: 自訂寄送郵件的寄件者
- `SENDER_EMAIL`: 自訂寄送郵件的寄件位址
- `MAIL_SUBJECT`: 自訂留言回覆郵件標題
- `MAIL_TEMPLATE`: 自訂留言回覆郵件內容
- `MAIL_SUBJECT_ADMIN`: 自訂新留言通知郵件標題
- `MAIL_TEMPLATE_ADMIN`: 自訂新留言通知郵件內容

## 微信通知

微信通知使用了 [Server 醬](http://sc.ftqq.com/3.version) 提供的服務，需要在環境變數中設定在 Server 醬中申請的 `SC_KEY`。

- `SC_KEY`: Server 醬提供的 Token，必填。
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。
- `SC_TEMPLATE`: Server 醬使用的通知範本，變數與具體格式可參見下文的通知範本。未設定則使用預設範本。

## 企業微信應用通知

由於 [Server 醬](http://sc.ftqq.com/3.version) 提供的推播服務對傳送訊息數量有限制，如果訊息數量較多時，建議使用企業微信應用通知。

要使用企業微信應用通知，需要設定環境變數 `QYWX_AM` 。

第一個值是企業 id，第二個值是應用 secret，第三個值是@all(或者成員 id)，第四個值是 AgentID，第五個值是圖片 id，中間以逗號隔開。最終格式範例:

```
ww479cadfqfe8c151f,MPKN9gX97w4e4b4h4u7u4i4i4i4iO6mN_dDedBFzqC5c,@all,1000002,2S8H-JWEdsadFDSFSDDijbrtkldfhjslafhs5zEU1GyUkU
```

[參考文件 1](https://note.youdao.com/ynoteshare/index.html?id=351e08a72378206f9dd64d2281e9b83b&type=note&_time=1642141216026) | [參考文件 2](https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)

- `QYWX_AM`: 用於傳送企業應用訊息的變數，必填。
- `QYWX_PROXY`: 指定企業微信介面的反向代理伺服器位址（可信 IP），未設定則不使用代理。
- `QYWX_PROXY_PORT`: 指定企業微信介面的反向代理伺服器連接埠（預設 80）
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。
- `WX_TEMPLATE`: QYWX_AM 使用的通知範本，變數與具體格式可參見下文 QQ 的通知範本。未設定則使用預設範本。

## QQ 通知

QQ 通知使用了 [Qmsg 醬](https://qmsg.zendee.cn) 提供的服務，需要在環境變數中設定在 Qmsg 醬中申請的 `QMSG_KEY`。

- `QMSG_KEY`: Qmsg 醬提供的 KEY，必填。
- `QMSG_HOST`: Qmsg 醬提供的私有化 HOST，選填。預設為 `https://qmsg.zendee.cn`。
- `QQ_ID`: 接收訊息的 QQ 號 (不支援 QQ 群)，可以新增多個，以半形逗號分隔，如: `1244453393,2952937634` (必須均在您的 Qmsg 醬 QQ 號清單中)。
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。
- `QQ_TEMPLATE`: QQ 使用的通知範本，變數與具體格式可參見下文的通知範本。未設定則使用預設範本。

## Telegram 通知

Telegram 通知透過 Telegram bot 機器人實現，需要設定以下幾個環境變數:

- `TG_BOT_TOKEN`: Telegram 機器人用於存取 HTTP API 的 token，透過 [@BotFather](https://t.me/BotFather) 建立機器人取得，必填。
- `TG_CHAT_ID`: 接收訊息對象的 `chat_id`，可以是單一使用者、頻道、群組，透過 [@userinfobot](https://t.me/userinfobot) 取得，必填。
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。
- `TG_TEMPLATE`: Telegram 使用的通知範本，變數與具體格式可參見下文的通知範本。未設定則使用預設範本。

## PushPlus 通知

[pushplus](http://www.pushplus.plus/) 整合了微信、企業微信、釘釘、簡訊、郵件等管道的訊息推播平台。需要設定以下幾個環境變數，具體的參數格式見 [pushplus 文件](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3)：

- `PUSH_PLUS_KEY`： 使用者權杖，即 `token`，必填。
- `PUSH_PLUS_TOPIC`：群組編碼，不填僅傳送給自己；channel 為 webhook 時無效
- `PUSH_PLUS_TEMPLATE`：傳送範本
- `PUSH_PLUS_CHANNEL`：傳送管道
- `PUSH_PLUS_WEBHOOK`：webhook 編碼，僅在 channel 使用 webhook 管道和 CP 管道時需要填寫
- `PUSH_PLUS_CALLBACKURL`：傳送結果回呼位址
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。

## Discord 通知

Discord 通知透過 Discord Webhook 實現，需要設定以下幾個環境變數：

- `DISCORD_WEBHOOK`：Discord Webhook 位址，[如何建立 Discord Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)？
- `DISCORD_TEMPLATE`：傳送範本
- `AUTHOR_EMAIL`: 站長電子郵件，用來區分發布的留言是否為站長本身發布。如果是站長發布的則不進行提醒通知。
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。

## 飛書通知

飛書群組機器人支援透過 Webhook 傳送訊息，需設定以下幾個環境變數。

- `LARK_WEBHOOK`: 飛書群組機器人 [使用指南](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN)
- `LARK_SECRET`: 請參考上方的飛書文件，該金鑰用於請求簽章以避免介面被濫用（選填）
- `LARK_TEMPLATE`: 訊息範本
- `SITE_NAME`: 網站名稱，用於在訊息中顯示。
- `SITE_URL`: 網站網址，用於在訊息中顯示。

## 通知範本

Waline 支援為每個平台分別設定您自訂的通知範本，以實現更強大的自訂能力與多語言相容性。

### 支援的變數

範本透過 `self` 、 `parent` 和 `site` 物件傳遞參數，其中分別包含以下變數:

- `self`: 該則留言本身

  | 變數            | 備註           |
  | --------------- | -------------- |
  | nick            | 留言者名稱     |
  | mail            | 留言者電子郵件 |
  | link            | 留言者網址     |
  | url             | 文章位址       |
  | comment         | 留言內容       |
  | browser         | 瀏覽器         |
  | os              | 作業系統       |
  | addr            | 歸屬地         |
  | avatar          | 大頭貼位址     |
  | _commentLink_\* | 留言中的連結   |

  \*: commentLink 僅在 Telegram 通知中提供，會自動封裝成 Markdown 的格式

- `parent`: 該則留言的回覆對象(父留言)

  | 變數    | 備註           |
  | ------- | -------------- |
  | nick    | 留言者名稱     |
  | mail    | 留言者電子郵件 |
  | link    | 留言者網址     |
  | browser | 瀏覽器         |
  | os      | 作業系統       |
  | addr    | 歸屬地         |
  | avatar  | 大頭貼位址     |
  | comment | 留言內容       |

- site: 網站設定

  | 變數    | 備註         |
  | ------- | ------------ |
  | name    | 網站名稱     |
  | url     | 網站網址     |
  | postUrl | 留言完整位址 |

### 預設範本

此處附上預設的範本，方便您參考:

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新留言啦
  {{self.nick}} 留言道:
  {{self.comment}}
  電子郵件: {{self.mail}}
  狀態: {{self.status}}
  僅供留言預覽，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新留言啦_

  _{{self.nick}}_ 回覆說:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _電子郵件_: `{{self.mail}}`
  _審核_: {{self.status}}

  僅供留言預覽，點擊 [查看完整內容]({{site.postUrl}})
  ````

- SC_TEMPLATE:

  ```plain
  {{site.name|safe}} 有新留言啦
  【留言者暱稱】：{{self.nick}}
  【留言者電子郵件】：{{self.mail}}
  【內容】：{{self.comment}}
  【位址】：{{site.postUrl}}
  ```

### 附加說明

1. 設定 `DISABLE_AUTHOR_NOTIFY` 環境變數可以關閉站長的新留言通知功能；
1. Vercel 的環境變數大小限制為 `4KB` ，所以如果您的範本很長，請使用程式碼設定，參見 [issue#106](https://github.com/walinejs/waline/issues/106) ；
1. 變數具體資訊在開發過程中可能會發生變化，此處的變數說明僅供參考，具體的內容請以具體的程式碼範例為準。
