---
title: Strumento di migrazione
icon: helper
---

<MigrationTool />

::: tip

Dopo aver usato gli strumenti qui sopra per ottenere i file esportati, puoi importarli nel servizio di archiviazione corretto.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
