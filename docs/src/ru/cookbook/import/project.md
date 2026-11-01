---
title: Импорт в проект
icon: import
order: 2
---

Официальный клиент Waline предоставляет файлы в нескольких версиях. Импортировать и использовать официальный клиент можно несколькими способами.

<!-- more -->

## NPM-пакеты

Официальный клиент Waline опубликован в [npm](https://www.npmjs.com/package/@waline/client) под именем `@waline/client`; установить его можно следующей командой:

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

О модулях, экспортируемых `@waline/client`, см. в разделе [Справочник клиента → Файлы](../../reference/client/file.md).

## Импорт в обычный проект

Ниже приведён пример импорта и использования `@waline/client` в обычном проекте сайта.

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

## Импорт в проект Vue

Поскольку сам `@waline/client` основан на Vue 3, мы напрямую экспортируем реактивный компонент Vue.

Все свойства компонента реактивны; полный список поддерживаемых свойств приведён в разделе [Справочник клиента → Свойства компонента](../../reference/client/props.md).

::: details Демонстрация

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

Поскольку мы используем реактивный `path`, при изменении маршрута `@waline/client` автоматически обновится и покажет комментарии соответствующего маршрута.

:::

## Импорт в проект React

С помощью простой обёртки Waline можно превратить в React-компонент:

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
  }, props);

  return <div ref={containerRef} />;
};
```
