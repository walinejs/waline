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
  <WalineComment :serverURL="serverURL" :path="path" :darkmode="darkmode" />
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

由于我们使用了响应式的 `path`，当路由变动时，Waline 会自动刷新并显示相应路由的评论，同时，当你按下切换按钮时，Waline 会切换主题模式。
