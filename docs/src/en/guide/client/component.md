---
title: Vue Component
icon: component
---

Waline V2 client exports a Vue Component.

All properties are reactive, you can find all supported properties in [Reference → Component Properties](../../reference/component.md).

<!-- more -->

## Demo

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

Since we use reactive `path`, when the route changes, Waline will automatically refresh and display the comments of the corresponding route, and at the same time, when you click the toggle button, Waline will switch the theme mode.

## React Component

With a simple wrapper, you can turn Waline into a React Component:

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
