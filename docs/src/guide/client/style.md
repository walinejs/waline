---
title: 自定义样式
icon: style
---

`@waline/client` 提供了一些 CSS 变量。你可以很轻松的通过这些变量配置 waline 的样式。

同时 `@waline/client` 还拥有内置的暗黑模式支持。

<!-- more -->

## 提供的变量

```css
:root {
  /* 字体大小 */
  --wl-font-size: 16px;

  /* 常规颜色 */
  --wl-white: #fff;
  --wl-light-grey: #999;
  --wl-dark-grey: #666;

  /* 主题色 */
  --wl-theme-color: #27ae60;
  --wl-active-color: #2ecc71;

  /* 布局颜色 */
  --wl-color: #444;
  --wl-bgcolor: #fff;
  --wl-bgcolor-light: #f8f8f8;
  --wl-bgcolor-hover: #f0f0f0;
  --wl-border-color: #ddd;
  --wl-disable-bgcolor: #f8f8f8;
  --wl-disable-color: #bbb;
  --wl-code-bgcolor: #282c34;

  /* 特殊颜色 */
  --wl-bq-color: #f0f0f0;

  /* 头像 */
  --wl-avatar-size: 3.25rem;
  --wl-m-avatar-size: calc(var(--wl-avatar-size) * 9 / 13);

  /* 徽章 */
  --wl-badge-color: #3498db;
  --wl-badge-font-size: 0.775em;

  /* 信息 */
  --wl-info-bgcolor: #f8f8f8;
  --wl-info-color: #999;
  --wl-info-font-size: 0.625em;

  /* 渲染选择 */
  --wl-border: 1px solid var(--wl-border-color);
  --wl-avatar-radius: 50%;
  --wl-box-shadow: none;
}
```

## 暗黑模式支持

你可以使用 `dark` 选项来启用 Waline 的暗黑模式支持。

通常网站会通过两种方式启用暗黑模式支持:

- 使用 `@media` 选择器通过 `prefers-color-scheme` 来根据设备颜色模式状态自动切换
- 通过修改 dom 根元素 (`html` 或 `body`) 的属性与 class 来动态应用或取消暗黑模式的颜色样式。

如果你在第一种方式的站点上启用 Waline，你只需将 `dark` 设置为 `'auto'`。

对于第二种站点，你需要将 dark 设置为令暗黑模式生效的 CSS 选择器。以下是几个例子

::: tip 不同主题的例子

- **vuepress-theme-hope v2**: 它会在 `<html>` 上通过设置 `data-theme="dark"` 开启暗黑模式，那么你需要将 `dark` 选项设置为 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它会在 `<html>` 上通过设置 `data-user-color-scheme="dark"` 开启暗黑模式。那么你需要将 `dark` 选项设置为 `'html[data-user-color-scheme="dark"]'`。

:::

### 夜间模式默认颜色

在使用 `dark` 选项配置暗黑模式时，waline 会默认使用以下颜色:

```css
/* 根据用户设置 ↓ */
darkmode-selector {
  /* 常规颜色 */
  --wl-white: #000;
  --wl-light-grey: #666;
  --wl-dark-grey: #999;

  /* 布局颜色 */
  --wl-color: #888;
  --wl-bgcolor: #1e1e1e;
  --wl-bgcolor-light: #272727;
  --wl-border-color: #333;
  --wl-disable-bgcolor: #444;
  --wl-disable-color: #272727;

  /* 特殊颜色 */
  --wl-bq-color: #272727;

  /* 其他颜色 */
  --wl-info-bgcolor: #272727;
  --wl-info-color: #666;
}
```

如果上述颜色与你的站点夜间模式颜色不同，你可以考虑手动添加 CSS 并自行覆盖他们。

## 阴影样式

如果你在使用一个大量运用阴影 (`box-shadow`) 的主题，你可以通过修改 `--wl-border` 和 `--wl-box-shadow` 来更改 Waline 的显示效果，如:

```css
:root {
  --wl-border: none;
  --wl-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --wl-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

## 更多

如果上面的 CSS 变量无法满足你对 Waline 样式的定制要求，你还可以:

- 手动添加 CSS 对 Waline 的默认样式进行覆盖

  ::: warning

  请注意，由于 Waline 是一个纯 JS 的包，它会在运行时将样式注入到网页的 `<head>` 中，所以如果你想覆盖样式，请注意你的 CSS 被注入的位置。

  如果你使用打包工具，你的样式很大会打包为外置 css 并在 `<head>` 中引入，这意味着 Waline 后注入的样式将在你 CSS 的后面。

  所以在这种情况下，你可能需要使用更高优先级的选择器，或者将 `<style>` 标签放置在 body 中。

  :::

- 引入 Waline 的无样式版本，详见 [Waline 引入](./import.md)
