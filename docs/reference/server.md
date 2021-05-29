# 服务端配置

## 环境变量

你可以通过下面的环境变量对 Waline 服务端进行配置。

| 环境变量名称        | 必填 | 备注                                                                |
| ------------------- | ---- | ------------------------------------------------------------------- |
| `LEAN_ID`           | ✅   | LeanCloud 应用的 App ID                                             |
| `LEAN_KEY`          | ✅   | LeanCloud 应用的 App Key                                            |
| `LEAN_MASTER_KEY`   | ✅   | LeanCloud 应用的 Master Key 用于后台修改数据                        |
| `LEAN_SERVER`       | ⚠    | LeanCloud 服务地址，国内版用户需要配置此项                          |
| `SITE_NAME`         |      | 博客名称                                                            |
| `SITE_URL`          |      | 博客地址                                                            |
| `IPQPS`             |      | 基于 IP 的评论发布频率限制，单位为秒。默认为 60 秒，设置为 0 不限制 |
| `SECURE_DOMAINS`    |      | 安全域名配置，支持逗号分隔配置多个域名                              |
| `DISABLE_USERAGENT` |      | 是否隐藏评论者的 UA，默认为否                                       |
| `AKISMET_KEY`       |      | Akismet 反垃圾评论服务 Key（默认开启，不用请设置为 false）          |
| `COMMENT_AUDIT`     |      | 评论发布审核开关，配置后建议在 Placehoder 上提供文案提示            |

::: warning

环境变量在更新后必须**重新部署**才能生效。

Vercel 需要在 <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> 中进行设置。

:::

## 主入口配置

以下选项需要在服务端入口文件 `index.js` 中进行配置。

::: warning

如果你使用模板，请额外注意你需要自行保存这些配置，因为它们会在拉取官方最新模板时被覆盖。

:::

### secureDomains

- 类型: `string | RegExp | string[] | RegExp[]`

安全域名配置。配置后非该域名来源的请求会返回 403 状态码。支持字符串、正则、数组类型，不配置表示允许所有域名来源。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- 为了方便本地开发，`localhost` 和 `127.0.0.1` 会被默认添加到安全域名列表中。
- 当存在该配置时，环境变量 `SECURE_DOMAINS` 不生效。
- 腾讯云开发需要同时在 `环境 -> 安全配置 -> WEB 安全域名` 中配置安全域名

:::

### forbiddenWords

- 类型: `string[]`

违禁词配置，包含违禁词的内容会直接标记为垃圾评论。

::: details 例子

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['习近平', '毛泽东'],
});
```

:::

### disallowIPList

- 类型: `string[]`

IP 黑名单配置，名单中的 IP 访问会直接返回 403 错误。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- 类型: `string`

评论回复邮件标题自定义，等同于环境变量 `MAIL_SUBJECT`。

### mailTemplate

- 类型: `string`

评论回复邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE`。

### mailSubjectAdmin

- 类型: `string`

新评论通知邮件标题自定义，等同于环境变量 `MAIL_SUBJECT_ADMIN`。

### mailTemplateAdmin

- 类型: `string`

新评论通知邮件内容自定义，等同于环境变量 `MAIL_TEMPLATE_ADMIN`。

### QQTemplate

- 类型: `string`

QQ 评论通知模板，等同于环境变量 `QQ_TEMPLATE`。

### TGTempalte

- 类型: `string`

Telegram 评论通知模板，等同于环境变量 `TG_TEMPLATE`。

## 评论 Hooks

Waline 提供了一些自定义 Hook，方便用户根据自身业务需求对 Waline 服务端行为进行定制。

自定义 Hook 在服务端入口文件 `index.js` 中进行配置。

### preSave(comment)

发布评论前执行的操作。传入评论数据，如果该方法返回内容，则接口会直接返回，不存储评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: '这是垃圾邮件!' };
    }
  },
});
```

:::

### postSave(comment, pComment)

评论发布后执行的操作。

方法执行时会传入评论数据，如果是回复评论的话还会传入父级评论。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} 回复了你的评论!`,
    });
  },
});
```

:::

### preUpdate(comment)

评论内容在后台被更新前执行的操作。如果该方法返回内容，则接口会直接返回，不更新评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return '你无法更新评论数据';
  },
});
```

:::

### afterUpdate(comment)

评论内容在后台被更新后执行的操作。方法执行时会传入评论数据。

::: details 例子

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`${comment.objectId} 评论已更新!`);
  },
});
```

:::

### preDelete(commentId)

评论被删除前执行的操作，方法执行时会传入需要操作的评论 Id。如果该方法返回内容，则接口会直接返回，不更新评论数据。

::: details 例子

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

### afterDelete(commentId)

评论被删除后执行的操作，方法执行时会传入需要操作的评论 Id。

::: details 例子

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
