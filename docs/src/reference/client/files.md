---
title: 客户端文件
icon: file
---

`@waline/client` 提供多个版本的文件。

<!-- more -->

## 文件列表

- `dist/waline.js`: 完整版本，UMD 格式

  此文件为 CDN 引入 `@waline/client` 的默认文件，53 KB Gzip 大小

- `dist/shim.mjs`: 不含依赖捆绑的完整版本， ES Module 格式

  此文件为 `import` 引入 `@waline/client` 的默认文件, 19.39 KB Gzip 大小

- `dist/shim.cjs`: 不含依赖捆绑的完整版本，Common JS 格式

  此文件为 `require` 引入 `@waline/client` 的默认文件，19.59 KB Gzip 大小

- `dist/waline.css`: Waline CSS 样式

- `dist/waline-meta.css`: Waline Meta 图标 CSS

- `dist/component.mjs`: Waline 的 Vue 组件，ES Module 格式，不含依赖捆绑

  此文件用于在 Vue 项目中以组件模式使用 Waline 评论, 18.28 KB Gzip 大小

- `dist/comment.js`: Waline 的评论数模块，UMD 格式， < 1KB Gzip 大小

  此文件用于 CDN 引入，用于仅需页面评论数的情况

- `dist/pageview.js`: Waline 的浏览量模块，UMD 格式， < 1KB Gzip 大小

  此文件用于 CDN 引入，用于仅需页面浏览量的情况

其他格式文件:

- `dist/waline.cjs`: `dist/waline.js` 文件的 Common JS 格式

- `dist/waline.mjs`: `dist/waline.js` 文件的 ES Module 格式

- `dist/comment.cjs`: `dist/comment.js` 文件的 Common JS 格式

- `dist/comment.mjs`: `dist/comment.js` 文件的 ES Module 格式

- `dist/pageview.cjs`: `dist/pageview.js` 文件的 Common JS 格式

- `dist/pageview.mjs`: `dist/pageview.js` 文件的 ES Module 格式

## 模块导出

- `@waline/client`：没有捆绑依赖的 Waline 主入口

- `@waline/client/waline.css`：Waline 样式文件

- `@waline/client/waline-meta.css`：Waline 用户信息图标样式文件

- `@waline/client/comment`：Waline 评论计数模块

- `@waline/client/pageview`：Waline 网页浏览计数模块

- `@waline/client/api`：客户端 API，可供第三方客户端使用

- `@waline/client/full`：捆绑了所有依赖项的 Waline 主入口
