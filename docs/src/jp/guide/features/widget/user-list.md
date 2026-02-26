---
title: ユーザーランキング/ユーザーウォール ウィジェット
icon: rank
---

Waline はウィジェットとしてユーザーランキングまたはユーザーウォールの表示をサポートしており、ブログのサイドバーにコメント投稿者の情報を表示するのに便利です。

<!-- more -->

## コンポーネントのオプション

ユーザーランキング/ユーザーウォールウィジェットは `UserList` という名前で、6 つのオプションがあります:

- `el`（オプション）: マウントする要素
- `serverURL`: サーバーのリンク
- `count`: 取得するユーザー数
- `mode`: `list` はユーザーランキング、`wall` はユーザーウォールを意味します
- `lang`: i18n サポート。詳細は [i18n](../i18n.md) を参照
- `locale`: 言語のカスタマイズ。詳細は [i18n](../i18n.md) を参照

コンポーネントが返すデータ形式は `Promise<{ users: WalineUser[], destroy: () => void }>` です。

- `users` プロパティ: `count` 件のユーザー一覧の配列
- `destroy` メソッド: ウィジェットを破棄する関数

## 基本的な使い方

### ユーザーランキング

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### ユーザーウォール

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## 高度な使い方

デフォルトの出力形式に満足できない場合は、`el` オプションを省略してコンポーネントを呼び出し、データを取得して自分でレンダリングすることができます。

例:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
