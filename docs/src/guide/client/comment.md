---
title: 评论数统计
icon: counter
---

Waline 支持在非评论区单独显示评论数。

<!-- more -->

## 自动更新

你可以在 `init` 函数通过设置 `comment` 选项为 `true` 来开启评论数统计。

```js
Waline.init({
  el: '#waline',
  // ...
  comment: true, // 评论数统计
});
```

Waline 会自动查找页面中 `class` 值为 `waline-comment-count` 的元素，获取其 `data-path` 为查询条件，并将值填入其中。

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
当前页共有
<span
  class="waline-comment-count"
  data-path="/guide/client/count.html"
/>条评论。
```

当前页共有
<span
  class="waline-comment-count"
  data-path="/guide/client/count.html"
/>条评论。

:::

## 手动更新

除了通过 `init` 函数自动更新之外，你可以通过 `commentCount` API 来手动更新当前页面的评论数:

```js
Waline.commentCount({
  serverURL,
  path,

  // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
  // selector: 'waline-pageview-count',
});
```

::: info 中途取消

由于评论数获取是一个异步网络操作，你可能需要在特定情况下取消正在执行的评论数更新操作。

`commentCount` 会返回一个函数，调用后即可取消此次更新:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// 在 500ms 后，如果网络请求仍未完成，取消本次操作
setTimeout(() => abort(), 500);
```

:::
