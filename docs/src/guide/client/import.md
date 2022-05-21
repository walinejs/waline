---
title: 引入客户端
icon: import
---

Waline 提供多种版本的客户端文件。你可以通过多种方式引入 Waline。

<!-- more -->

## 通过 CDN

推荐使用 [unpkg](https://unpkg.com/@waline/client)。

::: code-tabs

@tab 推荐版本

```html
<!-- 脚本文件 -->
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
<!-- 样式文件 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v2/dist/waline.css"
/>
```

@tab 仅浏览量

```html
<!-- 浏览量 -->
<script src="https://unpkg.com/@waline/client/dist/pageview.js"></script>
```

:::

::: info 指定版本

对于 CDN 链接来说，不指定版本号时为最新版本，所以如果你需要指定特定版本，你需要在 `@waline/client` 后以 `@version` 的格式指定一个版本号。

```html
<!-- 你需要自行修改替换 `next` 为你想要的版本号 -->
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
```

:::

## 通过 NPM

### 安装

Waline 客户端已通过 `@waline/client` 发布到 [npm](https://www.npmjs.com/package/@waline/client)，你可以通过以下命令安装:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @waline/client
```

@tab yarn

```bash
yarn add -D @waline/client
```

@tab npm

```bash
npm i -D @waline/client
```

:::

### 引入

Waline 提供多个版本的文件:

- `dist/waline.js`: 完整版本，UMD 格式

  此文件为 CDN 引入 `@waline/client` 的默认文件，51 KB Gzip 大小

- `dist/shim.js`: 不含依赖捆绑的完整版本，Common JS 格式

  此文件为 `require` 引入 `@waline/client` 的默认文件，14.24 KB Gzip 大小

- `dist/shim.esm.js`: 不含依赖捆绑的完整版本， ES Module 格式

  此文件为 `import` 引入 `@waline/client` 的默认文件, 14.14 KB Gzip 大小

- `dist/waline.css`: Waline CSS 样式

- `dist/component.js`: Waline 的 Vue 组件，ES Module 格式，不含依赖捆绑

  此文件用于在 Vue 项目中以组件模式使用 Waline 评论, 13.19 KB Gzip 大小

- `dist/pageview.js`: Waline 的浏览量模块，UMD 格式， < 1KB Gzip 大小

  此文件用于 CDN 引入，用于仅需页面浏览量的情况

其他格式文件:

- `dist/waline.cjs.js`: `dist/waline.js` 文件的 Common JS 格式

- `dist/waline.esm.js`: `dist/waline.js` 文件的 ES Module 格式

- `dist/pageview.cjs.js`: `dist/pageview.js` 文件的 Common JS 格式

- `dist/pageview.esm.js`: `dist/pageview.js` 文件的 ES Module 格式

### 使用

你可以通过多种形式导入需要的文件并使用，以下是一个示例。

::: code-tabs#lang

@tab JS

```js
import { init } from '@waline/client';

import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

@tab TS

```ts
import { init } from '@waline/client';

import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

:::
