---
title: Ferramenta de migração
icon: helper
---

<MigrationTool />

::: tip

Depois de usar as ferramentas acima para obter os arquivos exportados, você pode importá-los no serviço de armazenamento correto.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
