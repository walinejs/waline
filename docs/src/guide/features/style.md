---
title: 自定义样式
icon: style
order: -2
---

`@waline/client` 提供了一些 CSS 变量。你可以很轻松的通过这些变量配置 waline 的样式。

同时 `@waline/client` 还拥有内置的暗黑模式支持。

<!-- more -->

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

## Meta 图标

如果你希望给用户评论的 meta 数据加上图标的话，你可以导入 `waline-meta.css` 来使用它。

对于 CDN 用户，你可以通过以下链接导入:

```html
<!-- Meta 图标 (可选) -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css"
/>
```

对于 NPM 用户，你可以通过以下方式导入:

```js
import '@waline/client/meta';
```

## RTL 支持

`@waline/client` 支持 RTL 布局，你只需要在 `<html>` 标签添加 `dir="rtl"` 即可。

## 自定义样式

### CSS 变量

你可以在 [客户端参考 → CSS 变量](../../reference/client/style.md) 找到 Waline 正常和夜间模式下使用的 CSS 变量默认值。

如果它和你的站点样式不同，你可以自行覆盖对应的 CSS 变量。

### 阴影样式

如果你在使用一个大量运用阴影 (`box-shadow`) 的主题，你可以通过修改 `--waline-border` 和 `--waline-box-shadow` 来更改 Waline 的显示效果，如:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### 更多

如果上面的 CSS 变量无法满足你对 Waline 样式的定制要求，你可以停止导入 Waline 官方提供的样式，并自己制作 CSS。
