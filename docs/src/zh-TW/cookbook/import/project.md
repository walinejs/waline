---
title: 在專案中匯入
icon: import
order: 2
---

Waline 官方客戶端提供多種版本的檔案。你可以透過多種方式引入並使用官方客戶端。

<!-- more -->

## NPM 套件

Waline 官方客戶端已透過 `@waline/client` 發佈到 [npm](https://www.npmjs.com/package/@waline/client)，你可以透過以下指令安裝：

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

關於 `@waline/client` 所匯出的模組，詳見 [客戶端參考 → 檔案](../../reference/client/file.md)。

## 在一般專案中匯入

以下是一個在一般的網站專案中匯入並使用 `@waline/client` 的範例。

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

## 在 Vue 專案中匯入

由於 `@waline/client` 本身基於 Vue3，因此我們直接匯出了一個響應式的 Vue 元件。

元件的所有屬性都是響應式的，你可以在 [客戶端參考 → 元件屬性](../../reference/client/props.md) 找到全部支援的屬性。

::: details 範例

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

由於我們使用了響應式的 `path`，當路由變動時，`@waline/client` 會自動重新整理並顯示對應路由的留言。

:::

## 在 React 專案中匯入

只需要簡單的包裝，你就可以將 Waline 轉為 React 元件：

```tsx
import { type WalineInstance, type WalineInitOptions, init } from '@waline/client';
import React, { useEffect, useRef } from 'react';
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
