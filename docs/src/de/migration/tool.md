---
title: Migrations-Helfer
icon: helper
---

<MigrationTool />

::: tip

Nachdem Sie die oben genannten Tools verwendet haben, um die exportierten Dateien zu erhalten, können Sie sie in den richtigen Speicherdienst importieren.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
