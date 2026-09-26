---
title: CSS variable
icon: style
---

`@waline/client` provides some CSS variables. You can easily configure the style of waline through these variables.

<!-- more -->

## CSS Variables Name and Default Values

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
  --waline-color: #444;
  --waline-bg-color: #fff;
  --waline-bg-color-light: #f8f8f8;
  --waline-bg-color-hover: #f0f0f0;
  --waline-border-color: #ddd;
  --waline-disable-bg-color: #f8f8f8;
  --waline-disable-color: #bbb;
  --waline-code-bg-color: #282c34;

  /* Special Color */
  --waline-bq-color: #f0f0f0;

  /* Avatar */
  --waline-avatar-size: 3.25rem;
  --waline-m-avatar-size: calc(var(--waline-avatar-size) * 9 / 13);

  /* Badge */
  --waline-badge-color: #3498db;
  --waline-badge-font-size: 0.775em;

  /* Information */
  --waline-info-bg-color: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* Render choice */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-avatar-radius: 50%;
  --waline-box-shadow: none;
}

/* ↓ Based on user settings */
darkmode-selector {
  /* Regular color */
  --waline-white: #000;
  --waline-light-grey: #666;
  --waline-dark-grey: #999;

  /* Layout color */
  --waline-color: #888;
  --waline-bg-color: #1e1e1e;
  --waline-bg-color-light: #272727;
  --waline-border-color: #333;
  --waline-disable-bg-color: #444;
  --waline-disable-color: #272727;

  /* Special color */
  --waline-bq-color: #272727;

  /* Other color */
  --waline-info-bg-color: #272727;
  --waline-info-color: #666;
}
```
