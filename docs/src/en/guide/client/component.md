---
title: Component
icon: component
---

Waline V2 client exports a reactive component.

<!-- more -->

All properties are reactive, you can find all supported properties in [Reference → Component Properties](../../reference/component.md).

Here is a demo:

```vue
<template>
  <button @click="toggleDarkmode">切换模式</button>
  <WalineComment :serverURL="serverURL" :path="path" :darkmode="darmode" />
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { WalineComment } from '@waline/client/dist/components';

const serverURL = 'https://waline.vercel.app';
const path = computed(() => useRoute().path);

const darkmode = ref(false);

const toggleDarkmode = () => {
  darkmode.value = !darkmode.value;
};
</script>
```

Since we use reactive `path`, when the route changes, Waline will automatically refresh and display the comments of the corresponding route, and at the same time, when you click the toggle button, Waline will switch the theme mode.
