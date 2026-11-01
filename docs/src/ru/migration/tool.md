---
title: Помощник миграции
icon: helper
---

<MigrationTool />

::: tip

Получив с помощью инструмента выше экспортированные файлы, их можно импортировать в соответствующем сервисе хранения.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
