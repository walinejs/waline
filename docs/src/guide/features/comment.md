---
title: 评论数统计
icon: counter
order: 8
---

Waline 支持显示评论数。

<!-- more -->

## 在获取评论时自动更新页面

你可以在 `init` 函数通过设置 `comment` 选项为 `true` 来开启评论数统计。

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // 评论数统计
  });
</script>
```

Waline 会在初始化以及每次 path 更新时，自动查找页面中 `class` 值为 `waline-comment-count` 的元素，获取其 `data-path` 属性为查询条件，并将值填入其中。

```html
<!-- data-path 将作为查询条件 -->
当前页共有
<span
  class="waline-comment-count"
  data-path="/guide/client/count.html"
/>条评论。
```

如果你需要一个不一样的选择器，你可以设置 `comment` 选项为这个选择器。

每次当你调用 `WalineInstance.update()` 时，Waline 会重新查找页面并自动更新评论数。

::: tip 例子

```html
当前页共有 <span class="waline-comment-count" /> 条评论，主页共有
<span class="waline-comment-count" data-path="/" /> 条评论。
```

当前页共有 <span class="waline-comment-count" /> 条评论，主页共有
<span class="waline-comment-count" data-path="/" /> 条评论。

:::

## 手动更新

除了通过 `init` 函数自动更新之外，你可以通过 `commentCount` API 来手动更新当前页面的评论数:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  commentCount({
    serverURL,
    path,

    // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info 中途取消

由于评论数获取是一个异步网络操作，你可能需要在特定情况下取消正在执行的评论数更新操作。

`commentCount` 会返回一个函数，调用后即可取消此次更新:

```js
const abort = commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// 在 500ms 后，如果网络请求仍未完成，取消本次操作
setTimeout(() => abort(), 500);
```

:::

## 单独导入

有些时候，你可能希望在文章列表或者主页中展示一些页面的评论数，而不希望载入整个 Waline。此时你可以使用一个 Gzip 大小 < 1KB 的 `comment` 模块:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
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
