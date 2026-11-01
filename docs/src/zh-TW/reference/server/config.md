---
title: 伺服器設定
icon: config
---

你可以在伺服器入口檔案 `index.js` 中設定下列選項。

::: warning

如果你使用範本，請特別注意你需要自行保存這些設定，因為它們會在拉取官方最新範本時被覆蓋。

建議將官方最新範本上傳到自己的儲存庫，並進行修改。

:::

## 基本設定

### plugins

- 型別： `plugin[]`

詳見 [外掛系統](./plugin.md)

### secureDomains

- 型別：`string | RegExp | string[] | RegExp[]`

安全網域設定。設定後非該網域來源的請求會傳回 403 狀態碼。支援字串、正規表示式、陣列型別，未設定表示允許所有網域來源。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- 為了方便本機開發，`localhost` 和 `127.0.0.1` 會被預設加入安全網域清單中。
- 當存在此設定時，環境變數 `SECURE_DOMAINS` 不會生效。
- 騰訊雲開發需要同時在 `環境 -> 安全配置 -> WEB 安全域名` 中設定安全網域

:::

### forbiddenWords

- 型別：`string[]`

違禁詞設定，包含違禁詞的內容會直接標記為垃圾留言。

::: details 範例

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['習近平', '毛澤東'],
});
```

:::

### disallowIPList

- 型別：`string[]`

IP 黑名單設定，名單中的 IP 存取會直接傳回 403 錯誤。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- 型別：`string`

留言回覆郵件標題自訂，等同於環境變數 `MAIL_SUBJECT`。

### mailTemplate

- 型別：`string`

留言回覆郵件內容自訂，等同於環境變數 `MAIL_TEMPLATE`。

### mailSubjectAdmin

- 型別：`string`

新留言通知郵件標題自訂，等同於環境變數 `MAIL_SUBJECT_ADMIN`。

### mailTemplateAdmin

- 型別：`string`

新留言通知郵件內容自訂，等同於環境變數 `MAIL_TEMPLATE_ADMIN`。

### QQTemplate

- 型別：`string`

QQ 留言通知範本，等同於環境變數 `QQ_TEMPLATE`。

### TGTemplate

- 型別：`string`

Telegram 留言通知範本，等同於環境變數 `TG_TEMPLATE`。

### SCTemplate

- 型別：`string`

Server醬 留言通知範本，等同於環境變數 `SC_TEMPLATE`。

### model

- 型別：`class`

詳見 [自訂資料庫服務](../../cookbook/customize/database.md)

### encryptPassword

- 型別：`function`

詳見 [自訂使用者系統](../../cookbook/customize/userdb.md)

### locales

- 型別：`Record<string, Record<string, string>>`

詳見 [自訂語言支援](../../cookbook/customize/locale.md)

## 留言 Hooks

Waline 提供了一些自訂 Hook，方便使用者依自身業務需求對 Waline 伺服器行為進行客製。

自訂 Hook 在伺服器入口檔案 `index.js` 中進行設定。

### preSave(comment)

發表留言前執行的操作。傳入留言資料，如果該方法傳回內容，則 API 會直接傳回，不儲存留言資料。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: '這是垃圾留言！' };
    }
  },
});
```

:::

### postSave(comment, pComment)

留言發表後執行的操作。

方法執行時會傳入留言資料，如果是回覆留言的話還會傳入父層留言。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} 回覆了你的留言！`,
    });
  },
});
```

:::

### preUpdate(comment)

留言內容在管理後台被更新前執行的操作。如果該方法傳回內容，則 API 會直接傳回，不更新留言資料。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return '你無法更新留言資料';
  },
});
```

:::

### postUpdate(comment)

留言內容在管理後台被更新後執行的操作。方法執行時會傳入留言資料。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`${comment.objectId} 留言已更新！`);
  },
});
```

:::

### preDelete(commentId)

留言被刪除前執行的操作，方法執行時會傳入需要操作的留言 Id。如果該方法傳回內容，則 API 會直接傳回，不更新留言資料。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### postDelete(commentId)

留言被刪除後執行的操作，方法執行時會傳入需要操作的留言 Id。

::: details 範例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::

### avatarUrl(comment)

取得頭像時執行的操作，方法執行時會傳入需要操作的 comment 物件。

::: details 範例

這是一個自動替換使用 QQ 頭像的範例函式

```js
// index.js
const Waline = require('@waline/vercel');
module.exports = Waline({
  async avatarUrl(comment) {
    const reg = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    if (reg.test(mail)) {
      const q = mail.replace(/@qq\.com/i, '').toLowerCase();
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
    }
  },
});
```

此方法會傳入一個 `comment` 物件，你可以透過 `comment.mail` 取得電子郵件。若傳回值為 string 型別，則會直接呼叫傳回值作為頭像位址，否則正常產生 MD5。

:::
