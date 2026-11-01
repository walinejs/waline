---
title: Importer dans un projet
icon: import
order: 2
---

Le client officiel de Waline fournit des fichiers en plusieurs versions. Vous pouvez importer et utiliser le client officiel de plusieurs manières.

<!-- more -->

## Paquets npm

Le client officiel de Waline est publié sur [npm](https://www.npmjs.com/package/@waline/client) sous le nom `@waline/client` ; vous pouvez l'installer avec la commande suivante :

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

Pour les modules exportés par `@waline/client`, consultez [Référence du client → Fichiers](../../reference/client/file.md).

## Importation dans un projet classique

Voici un exemple d'importation et d'utilisation de `@waline/client` dans un projet de site web classique.

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

## Importation dans un projet Vue

Comme `@waline/client` est lui-même basé sur Vue 3, nous exportons directement un composant Vue réactif.

Toutes les propriétés des composants sont réactives ; vous trouverez toutes les propriétés prises en charge dans [Référence du client → Propriétés du composant](../../reference/client/props.md).

::: details Démo

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

Comme nous utilisons un `path` réactif, lorsque la route change, `@waline/client` actualisera automatiquement l'affichage et montrera les commentaires de la route correspondante.

:::

## Importation dans un projet React

Avec un simple wrapper, vous pouvez transformer Waline en composant React :

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
