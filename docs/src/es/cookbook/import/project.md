---
title: Importar en un proyecto
icon: import
order: 2
---

El cliente oficial de Waline ofrece archivos en varias versiones. Puedes importar y usar el cliente oficial de varias formas.

<!-- more -->

## Paquetes de NPM

El cliente oficial de Waline se publica en [npm](https://www.npmjs.com/package/@waline/client) como `@waline/client`; puedes instalarlo con el siguiente comando:

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

Para ver los módulos que exporta `@waline/client`, consulta [Referencia del cliente → Archivos](../../reference/client/file.md).

## Importar en un proyecto normal

Aquí tienes un ejemplo de cómo importar y usar `@waline/client` en un proyecto web normal.

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

## Importar en un proyecto Vue

Como `@waline/client` se basa en Vue 3, exportamos directamente un componente Vue reactivo.

Todas las propiedades del componente son reactivas; puedes encontrar todas las propiedades admitidas en [Referencia del cliente → Props del componente](../../reference/client/props.md).

::: details Demostración

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

Como usamos un `path` reactivo, cuando cambie la ruta, `@waline/client` se actualizará automáticamente y mostrará los comentarios de la ruta correspondiente.

:::

## Importar en un proyecto React

Con un envoltorio sencillo, puedes convertir Waline en un componente de React:

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
