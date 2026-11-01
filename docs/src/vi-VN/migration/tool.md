---
title: Công cụ hỗ trợ di chuyển
icon: helper
---

<MigrationTool />

::: tip

Sau khi dùng các công cụ trên để lấy các tệp đã xuất, bạn có thể nhập chúng vào dịch vụ lưu trữ phù hợp.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
