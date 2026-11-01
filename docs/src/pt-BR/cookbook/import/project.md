---
title: Importar no projeto
icon: import
order: 2
---

O cliente oficial do Waline fornece arquivos em várias versões. Você pode importar e usar o cliente oficial de diversas maneiras.

<!-- more -->

## Pacotes NPM

O cliente oficial do Waline foi publicado no [npm](https://www.npmjs.com/package/@waline/client) como `@waline/client`; você pode instalá-lo com o seguinte comando:

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

Para conhecer os módulos exportados por `@waline/client`, consulte [Referência do cliente → Arquivos](../../reference/client/file.md).

## Importar em um projeto comum

Aqui está um exemplo de importação e uso do `@waline/client` em um projeto de site comum.

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

## Importar em um projeto Vue

Como o `@waline/client` é baseado no Vue3, exportamos diretamente um componente Vue reativo.

Todas as propriedades dos componentes são reativas; você pode encontrar todas as propriedades suportadas em [Referência do cliente → Props do componente](../../reference/client/props.md).

::: details Demonstração

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

Como usamos um `path` reativo, quando a rota muda, o `@waline/client` atualiza automaticamente e exibe os comentários da rota correspondente.

:::

## Importar em um projeto React

Com um wrapper simples, você pode transformar o Waline em um componente React:

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
