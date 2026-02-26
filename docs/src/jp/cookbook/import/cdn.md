---
title: CDN 経由で Waline をインポートする
icon: import
order: 1
---

このクックブックは、CDN 経由で Waline をインポートする方法について説明します。

<!-- more -->

中国本土のユーザーには [unpkg](https://unpkg.com/@waline/client) の使用を推奨します。海外ユーザーには jsDelivr の使用を推奨します。

Waline を SSR フレンドリーにするため、V2 バージョンで Waline のスタイルを分離しました。つまり、Waline の CSS スタイルファイルをインポートし、Waline のスクリプトファイルをインポートして Waline を呼び出す必要があります。

## コメント

通常、Waline でコメント一覧を表示したい場合は、以下のように Waline をインポートします：

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## ページビューとコメント数

ホームページや記事一覧でページビュー数とコメント数を表示したいが、コメントコンポーネントは読み込む必要がない場合、以下の方法で Gzip 圧縮後 1KB 未満のスクリプトファイルをインポートできます：

ページビュー:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

コメント数:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## 詳細

::: info バージョンの指定

上記の例では、`@waline/client` の後に明示的に `@v2` バージョンを宣言していることに気づかれたかもしれません。これを行わないと、ウェブサイトが正常に動作しない場合があります。

:::
