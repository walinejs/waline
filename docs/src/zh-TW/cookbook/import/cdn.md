---
title: 透過 CDN 匯入 Waline
icon: import
order: 1
---

本教學將引導你如何透過 CDN 匯入 Waline。

<!-- more -->

對於中國大陸的使用者，我們推薦使用 [unpkg](https://unpkg.com/@waline/client)；對於海外的使用者，我們推薦使用 jsDelivr。

自 V3 版本起，Waline 的樣式改以獨立的 CSS 檔案提供，以讓客戶端對 SSR 更友善。這意味著你需要先匯入 Waline 的 CSS 樣式檔案，再匯入並呼叫 Waline 的腳本檔案。

## 留言功能

通常情況下，你會希望 Waline 渲染留言列表，可以按照以下方式引入 Waline：

```html
<!-- 樣式檔案 -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- 腳本檔案 -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## 瀏覽量與留言數

有時候，你可能希望在首頁或文章列表顯示文章的瀏覽量和留言數，但不需要載入留言元件，那麼你可以透過下列方式引入一個 Gzip < 1KB 的腳本檔案：

瀏覽量：

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

留言數：

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## 更多

::: info 指定版本

你可能已經注意到，上述範例中，我們都在 `@waline/client` 後明確指定了 `@v3` 版本。這是推薦的做法，因為這樣可以避免 Waline 客戶端推出新的主版本時，導致你的網站運作異常。

:::
