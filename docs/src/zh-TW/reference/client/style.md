---
title: CSS 變數
icon: style
---

`@waline/client` 提供了一些 CSS 變數。你可以很輕鬆地透過這些變數設定 Waline 的樣式。

<!-- more -->

## 提供的變數與預設值

```css
:root {
  /* 字體大小 */
  --waline-font-size: 16px;

  /* 一般顏色 */
  --waline-white: #fff;
  --waline-light-grey: #999;
  --waline-dark-grey: #666;

  /* 主題色 */
  --waline-theme-color: #27ae60;
  --waline-active-color: #2ecc71;

  /* 版面顏色 */
  --waline-color: #444;
  --waline-bg-color: #fff;
  --waline-bg-color-light: #f8f8f8;
  --waline-bg-color-hover: #f0f0f0;
  --waline-border-color: #ddd;
  --waline-disable-bg-color: #f8f8f8;
  --waline-disable-color: #bbb;
  --waline-code-bg-color: #282c34;

  /* 特殊顏色 */
  --waline-bq-color: #f0f0f0;

  /* 頭像 */
  --waline-avatar-size: 3.25rem;
  --waline-m-avatar-size: calc(var(--waline-avatar-size) * 9 / 13);

  /* 徽章 */
  --waline-badge-color: #3498db;
  --waline-badge-font-size: 0.775em;

  /* 資訊 */
  --waline-info-bg-color: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* 渲染選擇 */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-avatar-radius: 50%;
  --waline-box-shadow: none;
}

/* 根據使用者設定 ↓ */
darkmode-selector {
  /* 一般顏色 */
  --waline-white: #000;
  --waline-light-grey: #666;
  --waline-dark-grey: #999;

  /* 版面顏色 */
  --waline-color: #888;
  --waline-bg-color: #1e1e1e;
  --waline-bg-color-light: #272727;
  --waline-border-color: #333;
  --waline-disable-bg-color: #444;
  --waline-disable-color: #272727;

  /* 特殊顏色 */
  --waline-bq-color: #272727;

  /* 其他顏色 */
  --waline-info-bg-color: #272727;
  --waline-info-color: #666;
}
```
