---
title: Import im Projekt
icon: import
order: 2
---

Der offizielle Waline-Client bietet verschiedene Versionen von Dateien. Sie können den offiziellen Client auf verschiedene Weise importieren und verwenden.

<!-- more -->

## NPM-Pakete

Der offizielle Waline-Client wurde über `@waline/client` auf [npm](https://www.npmjs.com/package/@waline/client) veröffentlicht. Sie können ihn mit dem folgenden Befehl installieren:

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

Für die von `@waline/client` exportierten Module siehe [Client-Referenz → Dateien](../../reference/client/file.md).

## Import in einem normalen Projekt

Hier ist ein Beispiel für den Import und die Verwendung von `@waline/client` in einem normalen Website-Projekt.

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

## Import in einem Vue-Projekt

Da `@waline/client` selbst auf Vue3 basiert, exportieren wir direkt eine responsive Vue-Komponente.

Alle Eigenschaften der Komponenten sind reaktiv. Sie finden alle unterstützten Eigenschaften in [Client-Referenz → Komponenteneigenschaften](../../reference/client/props.md).

::: details Demo

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

Da wir einen responsiven `path` verwenden, wird `@waline/client` automatisch aktualisiert und die Kommentare der entsprechenden Route angezeigt, wenn sich die Route ändert.

:::

## Import in einem React-Projekt

Mit einer einfachen Wrapper-Funktion können Sie Waline in eine React-Komponente verwandeln:

```tsx
import React, { useEffect, useRef } from 'react';
import { type WalineInstance, type WalineInitOptions, init } from '@waline/client';

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
