---
title: Nhập trong dự án
icon: import
order: 2
---

Ứng dụng khách chính thức của Waline cung cấp các tệp ở nhiều phiên bản khác nhau. Bạn có thể nhập và sử dụng ứng dụng khách chính thức theo một số cách.

<!-- more -->

## Gói NPM

Ứng dụng khách chính thức của Waline đã được phát hành trên [npm](https://www.npmjs.com/package/@waline/client) với tên `@waline/client`, bạn có thể cài đặt bằng lệnh sau:

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

Về các mô-đun do `@waline/client` xuất ra, xem [Tham chiếu ứng dụng khách → Tệp](../../reference/client/file.md).

## Nhập trong dự án thông thường

Dưới đây là ví dụ nhập và sử dụng `@waline/client` trong một dự án trang web thông thường.

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

## Nhập trong dự án Vue

Vì bản thân `@waline/client` được xây dựng trên Vue3, chúng tôi xuất trực tiếp một thành phần Vue có tính phản ứng.

Mọi thuộc tính của thành phần đều có tính phản ứng, bạn có thể tìm thấy tất cả thuộc tính được hỗ trợ trong [Tham chiếu ứng dụng khách → Thuộc tính thành phần](../../reference/client/props.md).

::: details Bản demo

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

Vì chúng tôi sử dụng `path` có tính phản ứng, khi tuyến đường thay đổi, `@waline/client` sẽ tự động làm mới và hiển thị bình luận của tuyến đường tương ứng.

:::

## Nhập trong dự án React

Chỉ với một lớp bọc đơn giản, bạn có thể biến Waline thành một thành phần React:

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
