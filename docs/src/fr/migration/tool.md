---
title: Assistant de migration
icon: helper
---

<MigrationTool />

::: tip

Après avoir utilisé les outils ci-dessus pour obtenir les fichiers exportés, vous pouvez les importer dans le service de stockage approprié.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
