---
title: CDN 経由で Waline をインポート
icon: import
order: 1
---

このクックブックでは、CDN 経由で Waline をインポートする方法を説明します。

<!-- more -->

中国本土のユーザーには [unpkg](https://unpkg.com/@waline/client) の利用を推奨します。それ以外の国のユーザーには jsDelivr の利用を推奨します。

Waline を SSR フレンドリーにするため、V2 では Waline のスタイルを分離しました。つまり、Waline の CSS スタイルファイルとスクリプトファイルをそれぞれ読み込み、Waline を呼び出す必要があります。

## コメント

通常はコメント一覧を表示したいはずです。その場合は次のように Waline をインポートします:

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

## 閲覧数とコメント

ホームページや記事一覧で記事の閲覧数とコメント数を表示したいものの、コメントコンポーネントを読み込む必要がない場合があります。その場合は、次の方法で Gzip で 1KB 未満のスクリプトファイルを読み込めます:

閲覧数:

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

## 補足

::: info バージョンの指定

上の例では、`@aline/client` の後に `@v2` バージョンを明示的に指定していることにお気づきかもしれません。そうしないと、ウェブサイトが正しく動作しません。

:::
