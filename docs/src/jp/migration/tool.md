---
title: 移行ヘルパー
icon: helper
---

<MigrationTool />

::: tip

上記のツールを使用してエクスポートしたファイルを取得したら、対応するストレージサービスでインポートできます。

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
