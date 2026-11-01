---
title: 留言數統計
icon: counter
order: 8
---

Waline 支援顯示留言數。

<!-- more -->

## 取得留言時自動更新頁面

你可以在 `init` 函式中將 `comment` 選項設定為 `true` 來開啟留言數統計。

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // 留言數統計
  });
</script>
```

Waline 會在初始化以及每次 path 更新時，自動尋找頁面中 `class` 值為 `waline-comment-count` 的元素，以其 `data-path` 屬性作為查詢條件，並將值填入其中。

```html
<!-- data-path 將作為查詢條件 -->
目前頁面共有
<span class="waline-comment-count" data-path="/guide/client/count.html" /> 則留言。
```

如果你需要一個不同的選擇器，你可以將 `comment` 選項設定為這個選擇器。

每次你呼叫 `WalineInstance.update()` 時，Waline 會重新尋找頁面並自動更新留言數。

::: tip 範例

```html
目前頁面共有 <span class="waline-comment-count" /> 則留言，首頁共有
<span class="waline-comment-count" data-path="/" /> 則留言。
```

目前頁面共有 <span class="waline-comment-count" /> 則留言，首頁共有
<span class="waline-comment-count" data-path="/" /> 則留言。

:::

## 手動更新

除了透過 `init` 函式自動更新之外，你也可以透過 `commentCount` API 手動更新目前頁面的留言數:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  commentCount({
    serverURL,
    path,

    // 選填，用於自訂選擇器，預設為 `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info 中途取消

由於留言數取得是一個非同步網路操作，你可能需要在特定情況下取消正在執行的留言數更新操作。

`commentCount` 會傳回一個函式，呼叫後即可取消此次更新:

```js
const abort = commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// 在 500ms 後，若網路請求仍未完成，取消本次操作
setTimeout(() => abort(), 500);
```

:::

## 單獨匯入

有些時候，你可能希望在文章列表或首頁中顯示一些頁面的留言數，而不希望載入整個 Waline。此時你可以使用一個 Gzip 大小 < 1KB 的 `comment` 模組:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // 選填，用於自訂選擇器，預設為 `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
