---
title: Vue 组件
icon: component
---

Waline V2 客户端导出了一个响应式的 Vue 组件。

所有的属性都是响应式的，你可以在 [参考 → 组件属性](../../reference/component.md) 找到全部支持的属性。

<!-- more -->

## 案例

```vue
<template>
  <button @click="toggleDarkmode">切换模式</button>
  <Waline :serverURL="serverURL" :path="path" :darkmode="darkmode" />
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Waline } from '@waline/client/dist/component';

const serverURL = 'https://waline.vercel.app';
const path = computed(() => useRoute().path);

const darkmode = ref(false);

const toggleDarkmode = () => {
  darkmode.value = !darkmode.value;
};
</script>
```

由于我们使用了响应式的 `path`，当路由变动时，Waline 会自动刷新并显示相应路由的评论，同时，当你按下切换按钮时，Waline 会切换主题模式。

## React 组件

只需要简单的包装，你就可以将 Waline 转为 React 组件:

```tsx
import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';

import type { WalineInstance, WalineInitOptions } from '@waline/client';

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
