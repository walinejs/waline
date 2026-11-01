---
title: 閲覧数カウンター
icon: counter
order: 7
---

Waline は閲覧数のカウントに対応しています。

<!-- more -->

## コメントと併用する

Waline のコメントサービスを利用している場合は、初期化時に `pageview` オプションを `true` に設定すると閲覧数の統計を有効にできます：

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline はページ内から `class` の値が `waline-pageview-count` の要素を自動的に探し、その `data-path` をクエリ条件として取得します。そして取得した値をその要素に埋め込みます。

別のセレクターを使いたい場合は、`pageview` オプションにそのセレクターを設定してください。

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

`WalineInstance.update()` を呼び出すたびに、Waline はページの内容を再検索し、閲覧数を自動的に更新します。

::: tip 例

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" />
times.
```

現在のページは
<span class="waline-pageview-count" data-path="/en/guide/client/count.html" /> 回閲覧されています。

:::

## 単独で使用する

閲覧数の統計機能だけを使いたい場合は、Waline が提供する pageview モジュールをインポートできます。その Gzip サイズは 1KB 未満です。

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- 現在のページの閲覧数: <span class="waline-pageview-count" />

- ホームページの閲覧数: <span class="waline-pageview-count" data-path="/" />

::: info 中断

閲覧数の取得は非同期のネットワーク処理であるため、状況によっては実行中の閲覧数更新処理をキャンセルする必要があるかもしれません。

`pageviewCount` は、呼び出すと更新をキャンセルできる関数を返します：

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
