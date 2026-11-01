---
title: Importare nel progetto
icon: import
order: 2
---

Il client ufficiale di Waline è disponibile in file di varie versioni. Puoi importare e usare il client ufficiale in diversi modi.

<!-- more -->

## Pacchetti NPM

Il client ufficiale di Waline è pubblicato su [npm](https://www.npmjs.com/package/@waline/client) come `@waline/client`: puoi installarlo con il seguente comando:

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

Per i moduli esportati da `@waline/client`, consulta [Riferimento client → File](../../reference/client/file.md).

## Importare in un progetto normale

Ecco un esempio di importazione e utilizzo di `@waline/client` in un normale progetto web.

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

## Importare in un progetto Vue

Poiché `@waline/client` si basa a sua volta su Vue3, esportiamo direttamente un componente Vue reattivo.

Tutte le proprietà dei componenti sono reattive; puoi trovare tutte le proprietà supportate in [Riferimento client → Proprietà del componente](../../reference/client/props.md).

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

Poiché usiamo un `path` reattivo, quando la rotta cambia `@waline/client` aggiornerà automaticamente la vista e mostrerà i commenti della rotta corrispondente.

:::

## Importare in un progetto React

Con un semplice wrapper puoi trasformare Waline in un componente React:

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
