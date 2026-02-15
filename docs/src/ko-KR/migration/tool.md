---
title: 마이그레이션 도우미
icon: helper
---

<MigrationTool />

::: tip

위의 도구를 사용하여 내보내기 파일을 얻은 후, 해당 스토리지 서비스에서 가져올 수 있습니다.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
