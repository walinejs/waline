---
title: 自訂語言
icon: i18n
---

本教學指引你自訂 Waline 的多語言與顯示文字。

<!-- more -->

## 自訂客戶端語言與文字

`@waline/client` 提供了 `locale` 選項，你可以透過它自訂多語言與顯示文字。

預設情況下，它會使用內建的多語言文字，並在語言不受支援時，回退到 `en-US`（美式英文）。

你可以傳遞一份完整的多語言設定給 `locale` 選項來新增語言支援，或者只設定其中幾項來覆寫現有的 UI 文字。

### locale 選項

- 等級相關:
  - `level${number}`: 第 number 等級的文字

  ::: tip

  例如你設定了 6 個等級，可以這樣定義它們:

  ```ts
  Waline.init({
    locale: {
      level0: '煉體',
      level1: '煉氣',
      level2: '築基',
      level3: '金丹',
      level4: '元嬰',
      level5: '化神',
    },
  });
  ```

  :::

- 反應相關:
  - `reactionTitle`: 反應標題
  - `reaction0`: 反應 1 文字
  - `reaction1`: 反應 2 文字
  - `reaction2`: 反應 3 文字
  - `reaction3`: 反應 4 文字
  - `reaction4`: 反應 5 文字
  - `reaction5`: 反應 6 文字
  - `reaction6`: 反應 7 文字
  - `reaction7`: 反應 8 文字
  - `reaction8`: 反應 9 文字

- UI 相關:
  - `nick`: 暱稱
  - `mail`: 電子郵件
  - `link`: 網址
  - `placeholder`: 留言框預設文字
  - `sofa`: 留言區為空時顯示的文字
  - `submit`: 送出按鈕文字
  - `comment`: 留言按鈕文字
  - `refresh`: 重新整理按鈕文字
  - `more`: 載入更多按鈕文字
  - `uploading`: 上傳時顯示的文字
  - `login`: 登入按鈕文字
  - `admin`: 管理員的標籤
  - `sticky`: 置頂文字
  - `word`: 字
  - `anonymous`: 匿名使用者預設名稱
  - `optional`: 標示可選項的文字
  - `gifSearchPlaceholder`: 表情符號包搜尋預留位置文字
  - `oldest`: 最早的留言
  - `latest`: 最新的留言
  - `hottest`: 最熱門的留言

  ::: info

  此分類內的文字會顯示在頁面上。

  :::

- 提示訊息相關:
  - `nickError`: 暱稱不符合條件的錯誤訊息
  - `mailError`: 電子郵件不符合條件的錯誤訊息
  - `wordHint`: 留言字數的錯誤提示，其中 `$0` `$1` `$2` 會被自動替換為字數允許下限、字數允許上限、目前字數。

- 留言時間相關:
  - `seconds`: 秒前
  - `minutes`: 分鐘前
  - `hours`: 小時前
  - `days`: 天前
  - `now`: 剛剛

- 管理相關:
  - `approved`: 審核通過
  - `waiting`: 等待審核
  - `spam`: 垃圾留言
  - `unsticky`: 取消置頂

- 無障礙相關:
  - `like`: 喜歡文字
  - `cancelLike`: 取消喜歡文字
  - `reply`: 回覆按鈕的標籤文字
  - `cancelReply`: 取消回覆按鈕的標籤文字
  - `preview`: 預覽按鈕的標籤文字
  - `emoji`: 表情符號按鈕的標籤文字
  - `gif`: 表情符號包按鈕的標籤文字
  - `uploadImage`: 上傳圖片按鈕的標籤文字
  - `profile`: 個人檔案頁標籤文字
  - `logout`: 登出按鈕的標籤文字

  ::: info

  上述文字僅用於增強無障礙服務，不會顯示在頁面中。

  :::

### 範例

```js
// 中文預設
const locale = {
  nick: '暱稱',
  nickError: '暱稱不能少於 3 個字元',
  mail: '電子郵件',
  mailError: '請填寫正確的郵件地址',
  link: '網址',
  optional: '可選',
  placeholder: '歡迎留言',
  sofa: '來發留言吧~',
  submit: '送出',
  like: '喜歡',
  cancelLike: '取消喜歡',
  reply: '回覆',
  cancelReply: '取消回覆',
  comment: '留言',
  refresh: '重新整理',
  more: '載入更多...',
  preview: '預覽',
  emoji: '表情符號',
  uploadImage: '上傳圖片',
  seconds: '秒前',
  minutes: '分鐘前',
  hours: '小時前',
  days: '天前',
  now: '剛剛',
  uploading: '正在上傳',
  login: '登入',
  logout: '登出',
  admin: '站長',
  sticky: '置頂',
  word: '字',
  wordHint: '留言字數應在 $0 到 $1 字之間！\n目前字數：$2',
  anonymous: '匿名',
  level0: '潛水',
  level1: '冒泡',
  level2: '吐槽',
  level3: '活躍',
  level4: '話癆',
  level5: '傳說',
  gif: '表情符號包',
  gifSearchPlaceholder: '搜尋表情符號包',
  profile: '個人資料',
  approved: '通過',
  waiting: '待審核',
  spam: '垃圾',
  unsticky: '取消置頂',
  oldest: '按倒序',
  latest: '按正序',
  hottest: '按熱度',
  reactionTitle: '你認為這篇文章怎麼樣？',
};

Waline.init({
  el: '#waline',
  serverURL: 'YOUR_SERVER_URL',
  path: location.pathname,
  // ...
  locale,
});
```

## 自訂伺服器端文字

`@waline/vercel` 提供了 `locales` 選項，你可以透過它自訂文字。

預設情況下，它會使用內建的多語言文字，並在語言不受支援時，回退到 `en-US`（美式英文）對應的文字。

你可以傳遞一份完整的多語言設定給 `locales` 選項來新增語言支援，或者只設定其中幾項來覆寫現有的文字。

::: tip

所有自訂文字最終都會使用 nunjucks 模板引擎進行渲染，支援撰寫較複雜的邏輯運算式。例如：

```
註冊確認郵件傳送失敗，請{%- if isAdmin -%}檢查一下網站的郵件相關設定{% else %}確認你的電子郵件輸入無誤並聯絡管理員{%- endif -%}。
```

:::

### locale 選項

- 提示訊息相關：
  - `import data format not support!`：檔案格式不支援
  - `USER_EXIST`：使用者已存在
  - `USER_NOT_EXIST`：使用者不存在
  - `USER_REGISTERED`：使用者已註冊
  - `TOKEN_EXPIRED`：金鑰已過期
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`：二步驟驗證失敗
  - `Duplicate Content`：傳送的內容先前已經送過
  - `Comment too fast`：留言太快了，請慢一點！

- 登入郵件通知相關：
  - `[{{name | safe}}] Registration Confirm Mail`：`【{{name | safe}}】註冊確認郵件`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`：`請點擊 <a href=\"{{url}}\">{{url}}</a> 確認註冊，連結有效時間為 1 小時。如果並非你在註冊，請忽略這封郵件。`
  - `[{{name | safe}}] Reset Password`：`【{{name | safe}}】重設密碼`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`：`請儘快點擊連結 <a href=\"{{url}}\">{{url}}</a> 登入並修改你的密碼！`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`：`註冊確認郵件傳送失敗，請{%- if isAdmin -%}檢查一下網站的郵件相關設定{% else %}確認你的電子郵件輸入無誤並聯絡管理員{%- endif -%}。`

- 郵件通知相關：
  - `MAIL_SUBJECT`：`{{parent.nick | safe}}，『{{site.name | safe}}』上的留言收到了回覆`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> 您在<a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a>上的留言有了新的回覆 </h2>{{parent.nick}}同學，您曾發表留言： <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong>回覆說：</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p>您可以點擊<a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>查看回覆的完整內容</a>，歡迎再次光臨<a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>。</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`{{site.name | safe}} 上有新留言了`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> 您在<a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a>上的文章有了新的留言 </h2> <p><strong>{{self.nick}}</strong>回覆說：</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p>您可以點擊<a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>查看回覆的完整內容</a></p><br/> </div>`

### 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'zh-CN': {
      USER_EXIST: '使用者已存在',
    },
    'en-US': {
      USER_EXIST: 'user exist!',
    },
  },
});
```
