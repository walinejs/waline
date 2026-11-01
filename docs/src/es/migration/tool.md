---
title: Asistente de migración
icon: helper
---

<MigrationTool />

::: tip

Después de usar las herramientas anteriores para obtener los archivos exportados, puedes importarlos en el servicio de almacenamiento correspondiente.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
