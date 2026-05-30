---
title: Impor dalam Proyek
icon: import
order: 2
---

Klien resmi Waline menyediakan berbagai versi file. Anda dapat mengimpor dan menggunakan klien resmi dengan beberapa cara.

<!-- more -->

## Paket NPM

Klien resmi Waline telah dirilis ke [npm](https://www.npmjs.com/package/@waline/client) melalui `@waline/client`, Anda dapat menginstalnya dengan perintah berikut:

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

Untuk modul yang diekspor oleh `@waline/client`, lihat [Referensi Klien → File](../../reference/client/file.md).

## Impor dalam Proyek Normal

Berikut adalah contoh mengimpor dan menggunakan `@waline/client` dalam proyek situs web normal.

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

## Impor dalam Proyek Vue

Karena `@waline/client` sendiri berbasis Vue3, kami langsung mengekspor komponen Vue yang responsif.

Semua properti komponen bersifat reaktif, Anda dapat menemukan semua properti yang didukung di [Referensi Klien → Props Komponen](../../reference/client/props.md).

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

Karena kita menggunakan `path` yang responsif, ketika rute berubah, `@waline/client` akan secara otomatis menyegarkan dan menampilkan komentar dari rute yang sesuai.

:::

## Impor dalam Proyek React

Dengan pembungkus sederhana, Anda dapat mengubah Waline menjadi komponen React:

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
