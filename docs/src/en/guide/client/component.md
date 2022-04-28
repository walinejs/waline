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
