---
title: サーバー設定
icon: config
---

以下のオプションは、サーバーのエントリーファイル `index.js` で設定する必要があります。

::: warning

テンプレートを使用している場合は注意が必要です。公式テンプレートの最新版を取得すると設定が上書きされるため、これらの設定はご自身で保存してください。

公式テンプレートからリポジトリを作成し、そこで変更を加えることをおすすめします。

:::

## 基本オプション

### plugins

- 型：`plugin[]`

詳細は [プラグインシステム](./plugin.md) を参照してください。

### secureDomains

- 型：`string | RegExp | string[] | RegExp[]`

セキュアドメインの設定です。他のドメインからのリクエストは 403 ステータスコードを受け取ります。String、Regexp、Array 型をサポートしています。この設定を省略すると、すべてのドメインからのリファラーが許可されます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- ローカル開発を容易にするため、`localhost` と `127.0.0.1` はデフォルトでセキュアドメイン名のリストに追加されます。
- このオプションを設定した場合、環境変数 `SECURE_DOMAINS` は機能しません。

:::

### forbiddenWords

- 型：`string[]`

コメントが禁止ワードに一致すると、スパムとしてマークされます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- 型：`string[]`

コメントの IP がこのリストに一致する場合、403 ステータスコードが返されます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- 型：`string`

コメント返信メールのタイトルをカスタマイズします。環境変数 `MAIL_SUBJECT` に相当します。

### mailTemplate

- 型：`string`

コメント返信メールの内容をカスタマイズします。環境変数 `MAIL_TEMPLATE` に相当します。

### mailSubjectAdmin

- 型：`string`

新しいコメントの通知メールのタイトルをカスタマイズします。環境変数 `MAIL_SUBJECT_ADMIN` に相当します。

### mailTemplateAdmin

- 型：`string`

新しいコメントの通知メールの内容をカスタマイズします。環境変数 `MAIL_TEMPLATE_ADMIN` に相当します。

### QQTemplate

- 型：`string`

QQ のコメント通知テンプレートです。環境変数 `QQ_TEMPLATE` に相当します。

### TGTemplate

- 型：`string`

Telegram のコメント通知テンプレートです。環境変数 `TG_TEMPLATE` に相当します。

### model

- 型：`class`

詳細は [データベースサービスのカスタマイズ](../../cookbook/customize/database.md) を参照してください。

### encryptPassword

- 型：`function`

詳細は [ユーザーシステムのカスタマイズ](../../cookbook/customize/userdb.md) を参照してください。

### locales

- 型：`Record<string, Record<string, string>>`

[ロケールのカスタマイズ](../../cookbook/customize/locale.md) を参照してください。

## コメントフック

環境変数による設定に加えて、Waline はカスタム要件の処理を容易にするためのカスタムフックも提供しています。サーバーのエントリーファイル `index.js` で設定するだけで利用できます。

### preSave(comment)

Waline は、ユーザーが自身のニーズに応じて Waline サーバーの動作をカスタマイズできるよう、いくつかのカスタムフックを提供しています。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

コメントが投稿された後に実行されるアクションです。

このメソッドが実行されると、コメントデータが第 1 引数として渡されます。コメントへの返信の場合は、親コメントが第 2 引数として渡されます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

管理画面でコメントの内容が更新される前に実行されるアクションです。メソッドが内容を返した場合、コメントデータを更新せずにその内容がそのまま返されます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### postUpdate(comment)

管理画面でコメントの内容が更新された後に実行されるアクションです。メソッドが実行されるときにコメントデータが渡されます。

::: details 例

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

コメントが削除される前に実行されるアクションです。メソッドが実行されると、操作対象のコメント ID が渡されます。メソッドが内容を返した場合、コメントデータを更新せずにその内容がそのまま返されます。

::: details 例

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

コメントが削除された後に実行されるアクションです。コメント ID が唯一の引数として渡されます。

::: details 例

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
