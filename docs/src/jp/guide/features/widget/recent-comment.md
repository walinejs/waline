---
title: 最近のコメント ウィジェット
icon: recent
---

Waline はウィジェットとして最近のコメントを表示する機能をサポートしており、ブログのサイドバーに最新のコメントを表示するのに便利です。

<!-- more -->

## コンポーネントのオプション

最新コメントウィジェットは `RecentComments` という名前で、3 つのオプションがあります:

- `el`（オプション）: マウントする要素
- `serverURL`: サーバーのリンク
- `count`: 取得する最近のコメントの件数

コンポーネントが返すデータ形式は `Promise<{ comment: WalineComment[], destroy: () => void }>` です。

- `comment` プロパティ: `count` 件の最新コメントの配列
- `destroy` メソッド: ウィジェットを破棄する関数

## 基本的な使い方

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

デフォルトのスタイルで `#waline-recent` にレンダリングされます。

:::

## 高度な使い方

デフォルトの出力形式に満足できない場合は、`el` オプションを省略してコンポーネントを呼び出し、データを取得して自分でレンダリングすることができます。

例:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

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
