---
title: 프로젝트에서 가져오기
icon: import
order: 2
---

Waline 공식 클라이언트는 다양한 버전의 파일을 제공합니다. 여러 가지 방법으로 공식 클라이언트를 가져와 사용할 수 있습니다.

<!-- more -->

## NPM 패키지

Waline 공식 클라이언트는 `@waline/client`로 [npm](https://www.npmjs.com/package/@waline/client)에 배포되었으며, 다음 명령어로 설치할 수 있습니다:

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

`@waline/client`에서 내보내는 모듈에 대해서는 [클라이언트 참조 → 파일](../../reference/client/file.md)을 참조하세요.

## 일반 프로젝트에서 가져오기

다음은 일반 웹사이트 프로젝트에서 `@waline/client`를 가져와 사용하는 예시입니다.

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

## Vue 프로젝트에서 가져오기

`@waline/client` 자체가 Vue3를 기반으로 하므로, 반응형 Vue 컴포넌트를 직접 내보냅니다.

컴포넌트의 모든 속성은 반응형이며, 지원되는 모든 속성은 [클라이언트 참조 → 컴포넌트 Props](../../reference/client/props.md)에서 찾을 수 있습니다.

::: details 데모

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

반응형 `path`를 사용하므로, 라우트가 변경되면 `@waline/client`가 자동으로 새로고침하여 해당 라우트의 댓글을 표시합니다.

:::

## React 프로젝트에서 가져오기

간단한 래퍼를 통해 Waline을 React 컴포넌트로 변환할 수 있습니다:

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
