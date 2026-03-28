---
title: プロジェクトへのインポート
icon: import
order: 2
---

Waline 公式クライアントはさまざまなバージョンのファイルを提供しています。いくつかの方法で公式クライアントをインポートして使用できます。

<!-- more -->

## NPM パッケージ

Waline 公式クライアントは `@waline/client` として [npm](https://www.npmjs.com/package/@waline/client) に公開されており、以下のコマンドでインストールできます：

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

`@waline/client` がエクスポートするモジュールについては、[クライアントリファレンス → ファイル](../../reference/client/file.md) を参照してください。

## 通常のプロジェクトへのインポート

通常のウェブサイトプロジェクトで `@waline/client` をインポートして使用する例を示します。

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

## Vue プロジェクトへのインポート

`@waline/client` 自体が Vue3 をベースとしているため、リアクティブな Vue コンポーネントを直接エクスポートしています。

コンポーネントのすべてのプロパティはリアクティブです。サポートされているすべてのプロパティは [クライアントリファレンス → コンポーネント Props](../../reference/client/props.md) で確認できます。

::: details デモ

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

リアクティブな `path` を使用しているため、ルートが変わると `@waline/client` は自動的に更新され、対応するルートのコメントを表示します。

:::

## React プロジェクトへのインポート

簡単なラッパーを使って、Waline を React コンポーネントに変換できます：

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
