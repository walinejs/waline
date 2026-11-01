---
title: 客戶端檔案
icon: file
---

`@waline/client` 提供多個版本的檔案。

<!-- more -->

## CDN 檔案列表

- `dist/waline.js`：完整版本，ESM 格式

  此檔案為透過 CDN 引入 `@waline/client` 的預設檔案，Gzip 大小為 100 KB

- `dist/waline.umd.js`：完整版本，UMD 格式

- `dist/slim.js`：不含相依套件捆綁的完整版本，ES Module 格式

  此檔案為透過 Node.js 匯入 `@waline/client` 的預設檔案，Gzip 大小為 27 KB

- `dist/waline.css`：Waline CSS 樣式

- `dist/waline-meta.css`：Waline Meta 圖示 CSS

- `dist/component.js`：Waline 的 Vue 元件，ES Module 格式，不含相依套件捆綁

  此檔案用於在 Vue 專案中以元件模式使用 Waline 留言，Gzip 大小為 25 KB

- `dist/comment.js`：Waline 的留言數模組，ESM 格式，Gzip 大小 < 1KB

  此檔案用於 CDN 引入，適用於僅需頁面留言數的情況

- `dist/pageview.js`：Waline 的瀏覽量模組，ESM 格式，Gzip 大小 < 1KB

  此檔案用於 CDN 引入，適用於僅需頁面瀏覽量的情況

## 模組匯出

`@waline/client` 是一個標準的 ESM 模組，要求 Node.js 版本 >= 22：

- `@waline/client`：未捆綁相依套件的 Waline 主入口

- `@waline/client/waline.css`：Waline 樣式檔案

- `@waline/client/waline-meta.css`：Waline 使用者資訊圖示樣式檔案

- `@waline/client/comment`：Waline 留言計數模組

- `@waline/client/pageview`：Waline 網頁瀏覽計數模組

- `@waline/client/full`：捆綁了所有相依套件的 Waline 主入口
