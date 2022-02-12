<template>
  <DefaultThemeLayout>
    <template #page-bottom>
      <Waline />
      <slot name="page-bottom" />
    </template>
  </DefaultThemeLayout>
</template>

<script setup lang="ts">
import Waline from '../components/Waline';
import DefaultThemeLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
</script>
