---
title: 最新コメントウィジェット
icon: recent
---

Waline はウィジェットで最新コメントを表示できます。ブログのサイドバーに最新のコメントを表示するのに便利です。

<!-- more -->

## コンポーネントのオプション

最新コメントウィジェットの名前は `RecentComments` で、3 つのオプションがあります：

- `el`（任意）：マウント先の要素
- `serverURL`：サーバーのリンク
- `count` 取得する最新コメントの件数

このコンポーネントが返すデータ形式は `Promise<{ comment: WalineComment[], destroy: () => void }>` です。

- `comment` プロパティ：`count` と同数の最新コメントの配列
- `destroy` メソッド：ウィジェットを破棄する関数

## 基本的な使い方

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

これはデフォルトのスタイルで `#waline-recent` にレンダリングされます。

:::

## 応用的な使い方

デフォルトの出力形式が気に入らない場合は、`el` オプションを省略してコンポーネントを呼び出し、データを取得して自分でレンダリングできます。

例：

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
