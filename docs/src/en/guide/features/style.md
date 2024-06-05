---
title: Style Customize
icon: style
order: -2
---

`@waline/client` provides some CSS variables. You can easily configure the style of waline through these variables:

Meanwhile, `@waline/client` also has built-in dark mode support.

<!-- more -->

## Dark mode support

You can use the `dark` option to enable Waline's dark mode support.

Usually websites will enable dark mode support in two ways:

- Use the `@media` selector to automatically switch according to the device color mode status through `prefers-color-scheme`
- Dynamically apply other dark mode color style by modifying the attributes and class of the dom root element (`html` or `body`).

If you enable Waline on the site of the first method, you only need to set `dark` to `'auto'`.

For the second type of site, you need to set dark to the CSS selector that makes the dark mode effective. Here are a few examples:

::: tip Examples

- **vuepress-theme-hop v2**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

:::

## Meta Icons

If you want to add icons to user comment meta data, you can import `waline-meta.css` to use it.

For CDN users, you can import via the following link:

```html
<!-- Meta icon (optional) -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css"
/>
```

For NPM users, you can import via:

```js
import '@waline/client/meta';
```

## RTL support

`@waline/client` supports RTL layout, you just need to add `dir="rtl"` in `<html>` tag.

## Customize Styles

### CSS Variables

You can find default values for CSS variables used by Waline in normal and darkmode at [Client Reference → CSS Variables](../../reference/client/style.md).

If it differs from your site style, you can override the corresponding CSS variable yourself.

## Box Shadow

If you are using a theme that uses shadows (`box-shadow`) instead of borders, you can modify the display effect of Waline by modifying `--waline-border` and `--waline-box-shadow`, e.g.:

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

### More

If the above CSS variables cannot meet your custom requirements for Waline styles, you can write your own css file.
