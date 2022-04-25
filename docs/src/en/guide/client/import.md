---
title: Importing Client
icon: import
---

Waline provides several versions of client files. You can introduce Waline in a number of ways.

## Via CDN

Recommend to use [jsdelivr](https://cdn.jsdelivr.net/npm/@waline/client/).

:::: code-group

::: code-group-item Default

```html
<!-- Scripts -->
<script src="//cdn.jsdelivr.net/npm/@waline/client/dist/waline.js"></script>
<!-- Styles -->
<link rel="style" href="//cdn.jsdelivr.net/@waline/client/dist/waline.css" />
```

::: code-group-item Pageview Only

```html
<!-- Pageview -->
<script src="//cdn.jsdelivr.net/npm/@waline/client/dist/pageview.js"></script>
```

:::

::::

::: info Specifies version

For CDN links, if you don't specify a version number, it will be latest version, so if you need to specify a specific version, you need to specify a version number in the format `@version` after `@waline/client`.

```html
<!-- You need to modify and replace `next` with the version number you want -->
<script src="//cdn.jsdelivr.net/npm/@waline/client/dist/waline.js"></script>
```

:::

## Via NPM

### Install

Waline client has been released to [npm](https://www.npmjs.com/package/@waline/client) via `@waline/client`, you can install it with the following command:

:::: code-group

::: code-group-item yarn

```bash
yarn add -D @waline/client
```

:::

::: code-group-item npm

```bash
npm i -D @waline/client
```

:::

::::

### Import

Waline provides several versions of the file:

- `dist/waline.js`: full version, UMD format

  This file is the default file for CDN import `@waline/client`, 51 KB Gzip size

- `dist/shim.js`: full version without dependencies, in Common JS format

  This file is the default file when `require` `@waline/client`, 14.24 KB Gzip size

- `dist/shim.esm.js`: full version without dependencies, ES Module format

  This file is the default file when `import` `@waline/client`, 14.14 KB Gzip size

- `dist/waline.css`: Waline CSS styles

- `dist/component.js`: Waline's Vue component, ES Module format, without dependency bundling

  This file is for using Waline comments in component mode in a Vue project, 13.19 KB Gzip size

- `dist/pageview.js`: Waline's pageview module, UMD format, < 1KB Gzip size

  This file is used for CDN, when only page views are needed

Other format files:

- `dist/waline.cjs.js`: Common JS format for `dist/waline.js` file

- `dist/waline.esm.js`: ES Module format of `dist/waline.js` file

- `dist/pageview.cjs.js`: Common JS format for `dist/pageview.js` file

- `dist/pageview.esm.js`: ES Module format of `dist/pageview.js` file

### Usage

You can import the required files in various forms and use them, the following is an example.

:::: code-group

::: code-group-item JS

```js
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

:::

::: code-group-item TS

```ts
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

:::

::::
