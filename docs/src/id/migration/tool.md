---
title: Alat Migrasi
icon: helper
---

<MigrationTool />

::: tip

Setelah menggunakan alat di atas untuk mendapatkan file yang diekspor, Anda dapat mengimpornya di layanan penyimpanan yang sesuai.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
