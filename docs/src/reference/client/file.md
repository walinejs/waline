---
title: 客户端文件
icon: file
---

`@waline/client` 提供多个版本的文件。

<!-- more -->

## CDN 文件列表

- `dist/waline.js`: 完整版本, ESM 格式

  此文件为 CDN 引入 `@waline/client` 的默认文件，53 KB Gzip 大小

- `dist/waline.umd.js`: 完整版本，UMD 格式

- `dist/slim.js`: 不含依赖捆绑的完整版本， ES Module 格式

  此文件为 Node.js 导入 `@waline/client` 的默认文件, 19.39 KB Gzip 大小

- `dist/waline.css`: Waline CSS 样式

- `dist/waline-meta.css`: Waline Meta 图标 CSS

- `dist/component.js`: Waline 的 Vue 组件，ES Module 格式，不含依赖捆绑

  此文件用于在 Vue 项目中以组件模式使用 Waline 评论, 18.28 KB Gzip 大小

- `dist/comment.js`: Waline 的评论数模块，ESM 格式， < 1KB Gzip 大小

  此文件用于 CDN 引入，用于仅需页面评论数的情况

- `dist/pageview.js`: Waline 的浏览量模块，ESM 格式， < 1KB Gzip 大小

  此文件用于 CDN 引入，用于仅需页面浏览量的情况

## 模块导出

`@waline/client` 是一个标准的 ESM 模块，要求 Node.js 版本 >= 18:

- `@waline/client`：没有捆绑依赖的 Waline 主入口

- `@waline/client/waline.css`：Waline 样式文件

- `@waline/client/waline-meta.css`：Waline 用户信息图标样式文件

- `@waline/client/comment`：Waline 评论计数模块

- `@waline/client/pageview`：Waline 网页浏览计数模块

- `@waline/client/full`：捆绑了所有依赖项的 Waline 主入口
