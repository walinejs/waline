---
title: 資料遷移助手
icon: helper
---

<MigrationTool />

::: tip

使用上述工具取得匯出的檔案之後，可以在對應的儲存服務後台進行匯入。

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
