---
title: Import in project
icon: import
redirectFrom: /en/guide/client/component.html
---

Waline official client provides various versions of files. You can import and use the official client in several ways.

<!-- more -->

## NPM Packages

Waline official client has been released to [npm](https://www.npmjs.com/package/@waline/client) via `@waline/client`, you can install it with the following command:

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

For the modules exported by `@waline/client`, see [Client Reference → Files](../reference/client/files.md).

## Import in Normal Project

Here is an example of importing and using `@waline/client` in a normal website project.

::: code-tabs#lang

@tab TS

```ts
import { init } from '@waline/client';

import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

@tab JS

```js
import { init } from '@waline/client';

import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

:::

## Import in Vue Project

Since `@waline/client` itself is based on Vue3, we directly export a responsive Vue component.

All properties of components are reactive, you can find all supported properties in [Reference → Component Properties](../reference/client/props.md).

::: details Demo

```vue
<template>
  <button @click="toggleDarkmode">Toggle Mode</button>
  <Waline :serverURL="serverURL" :path="path" :darkmode="darkmode" />
</template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const serverURL = 'https://waline.vercel.app';
const path = computed(() => useRoute().path);

const darkmode = ref(false);

const toggleDarkmode = () => {
  darkmode.value = !darkmode.value;
};
</script>
```

Since we use responsive `path`, when the route changes, `@waline/client` will automatically refresh and display the comments of the corresponding route, and at the same time, when you press the toggle button, `@waline/client` will toggle theme mode.

:::

## Import in React project

With a simple wrapper, you can turn Waline into a React component:

```tsx
import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';

import type { WalineInstance, WalineInitOptions } from '@waline/client';

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
  }, props);

  return <div ref={containerRef} />;
};
```