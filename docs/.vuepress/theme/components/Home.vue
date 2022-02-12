<template>
  <main class="home">
    <HomeHero />
    <HomeFeatures />
    <HomeContent />
    <Waline />
    <HomeFooter />
  </main>
</template>

<script setup lang="ts">
import HomeContent from '@theme/HomeContent.vue';
import HomeFeatures from '@theme/HomeFeatures.vue';
import HomeFooter from '@theme/HomeFooter.vue';
import HomeHero from '@theme/HomeHero.vue';
import Waline from './Waline';
</script>
