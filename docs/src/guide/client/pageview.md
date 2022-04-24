---
title: 浏览量统计
icon: counter
---

Waline 支持浏览量统计。

<!-- more -->

## 和评论一起使用

如果你正在使用 Waline 的评论服务，你可以在初始化时设置 `pageview` 选项为 `true` 来开启浏览量统计功能:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // 浏览量统计
});
```

Waline 会自动查找页面中 `class` 值为 `waline-pageview-count` 的元素，获取其 `data-path` 为查询条件，并将得到的值填充到其中:

如果你需要一个不一样的选择器，你可以设置 `pageview` 选项为这个选择器。

```html
<!-- data-path 将作为查询条件 -->
阅读量: <span class="waline-pageview-count" data-path="<Your/Path/Name>" />
```

每次当你调用 `WalineInstance.update()` 时，Waline 会重新查找页面并自动更新浏览量。

::: tip 例子

```html
当前页阅读量为:
<span class="waline-pageview-count" data-path="/guide/client/count.html" />
```

当前页阅读量为:
<span class="waline-pageview-count" data-path="/guide/client/count.html" />

:::

## 单独使用

如果你只需要使用浏览量统计功能，你可以导入 Waline 提供的 pageview 模块，它的 Gzip 大小 < 1KB。

```html
<ul>
  <li>
    当前页面浏览量:
    <span class="waline-pageview-count" />
  </li>
  <li>
    主页浏览量:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script src="//cdn.jsdelivr.net/npm/@waline/client/dist/visitor.js"></script>
<script>
  Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // 可选的，用于自定选择器，默认为 `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // 可选的，是否在获取时增加访问量，默认为 `true`
    // update: true,
  });
</script>
```

- 当前页面浏览量: <span class="waline-pageview-count" />

- 主页浏览量: <span class="waline-pageview-count" data-path="/" />

::: info 中途取消

由于浏览量获取是一个异步网络操作，你可能需要在特定情况下取消正在执行的浏览量更新操作。

`pageviewCount` 会返回一个函数，调用后即可取消此次更新:

```js
const abort = Waline.pageviewCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// 在 500ms 后，如果网络请求仍未完成，取消本次操作
setTimeout(() => abort(), 500);
```

:::
