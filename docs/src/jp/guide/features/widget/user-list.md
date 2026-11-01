---
title: ユーザーランキング／ユーザーウォールウィジェット
icon: rank
---

Waline はウィジェットでユーザーランキングやユーザーウォールを表示できます。ブログのサイドバーにコメントしたユーザーの情報を表示するのに便利です。

<!-- more -->

## コンポーネントのオプション

ユーザーランキング／ユーザーウォールウィジェットの名前は `UserList` で、6 つのオプションがあります：

- `el`（任意）：マウント先の要素
- `serverURL`：サーバーのリンク
- `count` 取得するユーザー数
- `mode`：`list` はユーザーランキング、`wall` はユーザーウォールを意味します
- `lang`：i18n 対応。詳しくは [i18n](../i18n.md) を参照してください
- `locale`：言語をカスタマイズします。詳しくは [i18n](../i18n.md) を参照してください

このコンポーネントが返すデータ形式は `Promise<{ users: WalineUser[], destroy: () => void }>` です。

- `users` プロパティ：`count` と同数のユーザー一覧の配列
- `destroy` メソッド：ウィジェットを破棄する関数

## 基本的な使い方

### ユーザーランキング

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

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
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## 応用的な使い方

デフォルトの出力形式が気に入らない場合は、`el` オプションを省略してコンポーネントを呼び出し、データを取得して自分でレンダリングできます。

例：

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
