---
title: ページビューカウンター
icon: counter
order: 7
---

Waline はページビューのカウントをサポートしています。

<!-- more -->

## コメント機能と組み合わせて使う

Waline のコメントサービスを利用している場合、初期化時に `pageview` オプションを `true` に設定することでページビュー統計を有効にできます:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline はページ内で `class` 値が `waline-pageview-count` の要素を自動的に検索し、それらの `data-path` をクエリ条件として取得します。そして取得した値を要素に反映します:

異なるセレクターが必要な場合は、`pageview` オプションにそのセレクターを設定できます。

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

`WalineInstance.update()` を呼び出すたびに、Waline はページ内容を再検索してページビューを自動更新します。

::: tip 例

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/jp/guide/client/count.html" />
times.
```

このページは
<span class="waline-pageview-count" data-path="/jp/guide/client/count.html" /> 回閲覧されています。

:::

## 単体で使う

ページビュー統計機能のみが必要な場合は、Waline が提供するページビューモジュールをインポートできます。Gzip サイズは 1KB 未満です。

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

- 現在のページビュー数: <span class="waline-pageview-count" />

- ホームページのページビュー数: <span class="waline-pageview-count" data-path="/" />

::: info 中断

ページビューの取得は非同期のネットワーク操作であるため、状況によっては進行中のページビュー更新操作をキャンセルする必要が生じることがあります。

`pageviewCount` はキャンセルに使える関数を返します:

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
