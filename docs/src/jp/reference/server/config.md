---
title: サーバー設定
icon: config
---

以下のオプションはサーバーのエントリーファイル`index.js`で設定する必要があります。

::: warning

テンプレートを使用している場合は、最新の公式テンプレートを取り込む際にこれらの設定が上書きされる点にご注意ください。そのため、これらの設定は自分で保存しておく必要があります。

公式テンプレートからリポジトリを作成し、そこで変更を加えることをお勧めします。

:::

## 基本オプション

### plugins

- Type: `plugin[]`

詳細は[プラグインシステム](./plugin.md)を参照してください。

### secureDomains

- Type: `string | RegExp | string[] | RegExp[]`

セキュアドメインの設定。他のドメインからのリクエストは403ステータスコードを受け取ります。String、Regexp、Array型をサポートしています。この設定を省略した場合、すべてのドメインのリファラーが許可されます。

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

- ローカル開発を容易にするため、`localhost`と`127.0.0.1`はデフォルトでセキュアドメインのリストに追加されます。
- このオプションが設定されている場合、環境変数`SECURE_DOMAINS`は機能しません。

:::

### forbiddenWords

- Type: `string[]`

コメントが禁止ワードに一致する場合、スパムとしてマークされます。

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

- Type: `string[]`

コメントのIPがこのリストに一致する場合、403ステータスコードが返されます。

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

- Type: `string`

コメント返信メールのタイトルをカスタマイズします。環境変数`MAIL_SUBJECT`と同等です。

### mailTemplate

- Type: `string`

コメント返信メールの内容をカスタマイズします。環境変数`MAIL_TEMPLATE`と同等です。

### mailSubjectAdmin

- Type: `string`

新しいコメント通知メールのタイトルをカスタマイズします。環境変数`MAIL_SUBJECT_ADMIN`と同等です。

### mailTemplateAdmin

- Type: `string`

新しいコメント通知メールの内容をカスタマイズします。環境変数`MAIL_TEMPLATE_ADMIN`と同等です。

### QQTemplate

- Type: `string`

QQコメント通知テンプレート。環境変数`QQ_TEMPLATE`と同等です。

### TGTemplate

- Type: `string`

Telegramコメント通知テンプレート。環境変数`TG_TEMPLATE`と同等です。

### model

- type: `class`

詳細は[データベースサービスのカスタマイズ](../../cookbook/customize/database.md)を参照してください。

### encryptPassword

- type: `function`

詳細は[ユーザーシステムのカスタマイズ](../../cookbook/customize/userdb.md)を参照してください。

### locales

- type: `Record<string, Record<string, string>>`

[カスタムロケール](../../cookbook/customize/locale.md)を参照してください。

## コメントフック

環境変数の設定に加え、Walineはカスタム要件の処理を容易にするいくつかのカスタムフックを提供しています。サーバーのエントリーファイル`index.js`で設定するだけです。

### preSave(comment)

Walineは、ユーザーが自分のニーズに応じてWalineサーバーの動作をカスタマイズできるカスタムフックを提供しています。

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

コメントが投稿された後に実行されるアクション。

このメソッドが実行されるとき、コメントデータが最初のパラメータとして渡され、コメントへの返信の場合は親コメントが2番目のパラメータとして渡されます。

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

ダッシュボードでコメント内容が更新される前のアクション。メソッドが内容を返した場合、コメントデータを更新せずにインターフェースが直接返答します。

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

### afterUpdate(comment)

ダッシュボードでコメント内容が更新された後のアクション。メソッドが実行されるときにコメントデータが渡されます。

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

コメントが削除される前のアクション。メソッドが実行されるとき、操作対象のコメントIDが渡されます。メソッドが内容を返した場合、コメントデータを更新せずにインターフェースが直接返答します。

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

### afterDelete(commentId)

コメントが削除された後のアクション。コメントIDが唯一のパラメータとして渡されます。

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
