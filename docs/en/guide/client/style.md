# Custom style

`@waline/client` provides some CSS variables. You can easily configure the style of waline through these variables:

Meanwhile, `@waline/client` also brings built-in dark mode support.

<!-- more -->

## Variables

```css
:root {
  /* Font Size */
  --waline-font-size: 16px;

  /* Regular color */
  --waline-white: #fff;
  --waline-light-grey: #999;
  --waline-dark-grey: #666;

  /* Theme Color */
  --waline-theme-color: #27ae60;
  --waline-active-color: #2ecc71;

  /* Layout Color */
  --waline-text-color: #444;
  --waline-bgcolor: #fff;
  --waline-bgcolor-light: #f8f8f8;
  --waline-bgcolor-hover: #f0f0f0;
  --waline-border-color: #ddd;
  --waline-disable-bgcolor: #f8f8f8;
  --waline-disable-color: #bbb;
  --waline-code-bgcolor: #282c34;

  /* Special Color */
  --waline-bq-color: #f0f0f0;

  /* Avatar */
  --waline-avatar-size: 3.25rem;
  --waline-mobile-avatar-size: calc(var(--waline-avatar-size) * 9 / 13);

  /* Badge */
  --waline-badge-color: #3498db;
  --waline-badge-font-size: 0.775em;

  /* Information */
  --waline-info-bgcolor: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* Render choise */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-avatar-radius: 50%;
  --waline-box-shadow: none;
}
```

## Dark mode support

You can use the `dark` option to enable Waline's dark mode support.

Usually websites will enable dark mode support in two ways:

- Use the `@media` selector to automatically switch according to the device color mode status through `prefers-color-scheme`
- Dynamically apply othe dark mode color style by modifying the attributes and class of the dom root element (`html` or `body`).

If you enable Waline on the site of the first method, you only need to set `dark` to `'auto'`.

For the second type of site, you need to set dark to the CSS selector that makes the dark mode effective. Here are a few examples:

::: tip Examples

- **Docusaurus**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

- **vuepress-theme-hope**: It will enable darkmode by setting `theme-dark` class on the `<body>` tag itself. So you need to set `'body.theme-dark'` as `dark` option.

:::

### Darkmode Palette

When using the `dark` option to configure the dark mode, waline will use the following colors by default:

```css
/* ↓ According to user settings */
darkmode-selector {
  /* Regular color */
  --waline-white: #000;
  --waline-light-grey: #666;
  --waline-dark-grey: #999;

  /* Layout color */
  --waline-text-color: #888;
  --waline-bgcolor: #1e1e1e;
  --waline-bgcolor-light: #272727;
  --waline-border-color: #333;
  --waline-disable-bgcolor: #444;
  --waline-disable-color: #272727;

  /* Special color */
  --waline-bq-color: #272727;

  /* Other color */
  --waline-info-bgcolor: #272727;
  --waline-info-color: #666;
}
```

If the above colors are different from the darkmode palette of your site, you can override them instead of setting the `dark` option.

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

## More

If the above CSS variables cannot meet your custom requirements for Waline styles, you can also:

- Manually add a CSS file to override Waline's default style

  ::: warning

  Please note that since Waline is a pure JS package, it will inject styles into the `<head>` of the web page at runtime, so if you want to override styles, please pay attention to where your CSS is injected.

  If you use a packing tool (e.g.: webpack), your custom styles will probably be packed as external css and imported in `<head>`, which means it is before the styles injected by Waline.

  So in this case, you may need to use a higher priority selector, or place the `<style>` tag in body.

  :::

- Import the unstyled version of Waline, see [Waline import](./import.md) for details
