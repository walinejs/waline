---
title: CSS 变量
icon: style
---

`@waline/client` 提供了一些 CSS 变量。你可以很轻松的通过这些变量配置 waline 的样式。

<!-- more -->

## 提供的变量与默认值

```css
:root {
  /* 字体大小 */
  --waline-font-size: 16px;

  /* 常规颜色 */
  --waline-white: #fff;
  --waline-light-grey: #999;
  --waline-dark-grey: #666;

  /* 主题色 */
  --waline-theme-color: #27ae60;
  --waline-active-color: #2ecc71;

  /* 布局颜色 */
  --waline-color: #444;
  --waline-bg-color: #fff;
  --waline-bg-color-light: #f8f8f8;
  --waline-bg-color-hover: #f0f0f0;
  --waline-border-color: #ddd;
  --waline-disable-bg-color: #f8f8f8;
  --waline-disable-color: #bbb;
  --waline-code-bg-color: #282c34;

  /* 特殊颜色 */
  --waline-bq-color: #f0f0f0;

  /* 头像 */
  --waline-avatar-size: 3.25rem;
  --waline-m-avatar-size: calc(var(--waline-avatar-size) * 9 / 13);

  /* 徽章 */
  --waline-badge-color: #3498db;
  --waline-badge-font-size: 0.775em;

  /* 信息 */
  --waline-info-bg-color: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* 渲染选择 */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-avatar-radius: 50%;
  --waline-box-shadow: none;
}

/* 根据用户设置 ↓ */
darkmode-selector {
  /* 常规颜色 */
  --waline-white: #000;
  --waline-light-grey: #666;
  --waline-dark-grey: #999;

  /* 布局颜色 */
  --waline-color: #888;
  --waline-bg-color: #1e1e1e;
  --waline-bg-color-light: #272727;
  --waline-border-color: #333;
  --waline-disable-bg-color: #444;
  --waline-disable-color: #272727;

  /* 特殊颜色 */
  --waline-bq-color: #272727;

  /* 其他颜色 */
  --waline-info-bg-color: #272727;
  --waline-info-color: #666;
}
```
