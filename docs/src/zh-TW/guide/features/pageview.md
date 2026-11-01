---
title: 瀏覽量統計
icon: counter
order: 7
---

Waline 支援瀏覽量統計。

<!-- more -->

## 和留言一起使用

如果你正在使用 Waline 的留言服務，你可以在初始化時設定 `pageview` 選項為 `true` 來開啟瀏覽量統計功能:

```html
<div id="article-info">
  <!-- ... -->
  閱讀量: <span class="waline-pageview-count" data-path="<Your/Path/Name>" />
  <!-- ... -->
</div>
<!-- 文章內容 -->
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    pageview: true, // 瀏覽量統計
  });
</script>
```

Waline 會在初始化以及每次 path 更新時，自動尋找頁面中 `class` 值為 `waline-pageview-count` 的元素，以其 `data-path` 作為查詢條件，並將取得的值填入其中:

如果你需要一個不同的選擇器，你可以將 `pageview` 選項設定為這個選擇器。

```html
<!-- data-path 將作為查詢條件 -->
閱讀量: <span class="waline-pageview-count" data-path="<Your/Path/Name>" />
```

每次你呼叫 `WalineInstance.update()` 時，Waline 會重新尋找頁面並自動更新瀏覽量。

::: tip 範例

```html
目前頁面閱讀量為: <span class="waline-pageview-count" data-path="/guide/client/count.html" />
```

目前頁面閱讀量為:
<span class="waline-pageview-count" data-path="/guide/client/count.html" />

:::

## 單獨使用

如果你只需要使用瀏覽量統計功能，你可以匯入 Waline 提供的 pageview 模組，它的 Gzip 大小 < 1KB。

```html
<ul>
  <li>
    目前頁面瀏覽量:
    <span class="waline-pageview-count" />
  </li>
  <li>
    首頁瀏覽量:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // 選填，用於自訂選擇器，預設為 `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // 選填，是否在取得時增加造訪量，預設為 `true`
    // update: true,
  });
</script>
```

- 目前頁面瀏覽量: <span class="waline-pageview-count" />

- 首頁瀏覽量: <span class="waline-pageview-count" data-path="/" />

::: info 中途取消

由於瀏覽量取得是一個非同步網路操作，你可能需要在特定情況下取消正在執行的瀏覽量更新操作。

`pageviewCount` 會傳回一個函式，呼叫後即可取消此次更新:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // 在 500ms 後，若網路請求仍未完成，取消本次操作
  setTimeout(() => abort(), 500);
</script>
```

:::
