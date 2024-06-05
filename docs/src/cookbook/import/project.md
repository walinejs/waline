---
title: 在项目中导入
icon: import
order: 2
---

Waline 官方客户端提供多种版本的文件。你可以通过多种方式引入并使用官方客户端。

<!-- more -->

## NPM 包

Waline 官方客户端已通过 `@waline/client` 发布到 [npm](https://www.npmjs.com/package/@waline/client)，你可以通过以下命令安装:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @waline/client
```

@tab npm

```bash
npm i -D @waline/client
```

@tab yarn

```bash
yarn add -D @waline/client
```

:::

有关于 `@waline/client` 导出的模块，详见 [客户端参考 → 文件](../../reference/client/file.md)。

## 在普通项目中导入

以下是一个在普通的网站项目中导入并使用 `@waline/client` 的示例。

::: code-tabs#lang

@tab TS

```ts
import { init } from '@waline/client';

import '@waline/client/style';

init({
  el: '#waline',
  // ...
});
```

@tab JS

```js
import { init } from '@waline/client';

import '@waline/client/style';

init({
  el: '#waline',
  // ...
});
```

:::

## 在 Vue 项目中导入

由于 `@waline/client` 本身基于 Vue3，因此我们直接导出了一个响应式的 Vue 组件。

组件的所有属性都是响应式的，你可以在 [客户端参考 → 组件属性](../../reference/client/props.md) 找到全部支持的属性。

::: details 案例

```vue
<template>
  <Waline :serverURL="serverURL" :path="path" />
</template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import '@waline/client/style';

const serverURL = 'https://waline.vercel.app';
const path = computed(() => useRoute().path);
</script>
```

由于我们使用了响应式的 `path`，当路由变动时，`@waline/client` 会自动刷新并显示相应路由的评论。

:::

## 在 React 项目中导入

只需要简单的包装，你就可以将 Waline 转为 React 组件:

```tsx
import React, { useEffect, useRef } from 'react';
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from '@waline/client';

import '@waline/client/style';

export type WalineOptions = Omit<WalineInitOptions, 'el'> & { path: string };

export const Waline = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  return <div ref={containerRef} />;
};
```
