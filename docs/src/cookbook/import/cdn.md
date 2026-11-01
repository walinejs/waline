---
title: 通过 CDN 导入 Waline
icon: import
order: 1
---

本教程引导你如何使用 CDN 导入 Waline。

<!-- more -->

对于国内用户，我们推荐使用 [unpkg](https://unpkg.com/@waline/client)。对于国外用户，我们推荐使用 jsDelivr。

为了让 Waline 对 SSR 友好，从 V3 开始我们将 Waline 的样式拆分成了单独的 CSS 文件。这意味着，你需要先导入 Waline 的 CSS 样式文件，再导入并调用 Waline 脚本文件。

## 评论功能

通常情况下，你希望 Waline 渲染评论列表，你可以按照如下方式引入 Waline:

```html
<!-- 样式文件 -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- 脚本文件 -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## 浏览量和评论数

有些时候，你可能希望在主页或文章列表显示文章的浏览量和评论数，但是不需要加载评论组件，那么你可以通过下列方式引入一个 Gzip < 1KB 的脚本文件:

浏览量:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

评论数:

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

你可能已经注意到，上述案例中，我们都在 `@waline/client` 后显式声明了 `@v3` 版本。这是推荐的做法，可以避免 Waline 客户端发布新的主版本后导致你的网站工作异常。

:::
