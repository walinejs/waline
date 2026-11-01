---
title: 從 Valine 遷移
icon: valine
---

1. 按照 [Vercel 部署](../guide/get-started/README.md#部署伺服器) 一節部署伺服器。

2. 按照 [HTML 片段](../guide/get-started/README.md#html-引入) 一節修改對應的前端腳本。

   ::: warning

   你需要將 `new Valine` 替換為 `Waline.init`，並在設定中刪除 Valine 的 `appId` 和 `appKey`，並加入 `serverURL`。

   :::

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
        el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

::: tip 設定

Waline V2 已經移除了 Valine 支援，進而轉向更好的設定方案。以下是部分選項的遷移概要:

- `placeholder`: 使用 `locale.placeholder`
- `highlight`: 使用 `highlighter`
- `avatarForce`, `avatar`: 使用伺服器的 `AVATAR_PROXY` 環境變數
- `recordIP`: 不再顯示使用者 IP，同時在伺服器提供 `DISABLE_USERAGENT` 環境變數
- `requiredFields`: 重新命名為 `requiredMeta`
- `langMode`: 重新命名為 `locale`
- `emojiCDN`, `emojiMap`: 使用更強大的 `emoji` 選項

Waline 具體的設定詳見 [客戶端設定](../reference/client/api.md)。你也可以查看 [Waline 客戶端 V2 遷移指南](./v2.md) 來了解與 Valine 不相容的選項。

:::

1. 遷移資料

在 LeanCloud 後台選擇 <kbd>匯入匯出</kbd> > <kbd>限定 Class</kbd> > <kbd>Comment</kbd> > <kbd>匯出</kbd>，之後會收到匯出成功的郵件。

將匯出成功的檔案內容貼至下方的文字框中，點擊下方的轉換按鈕，取得待匯入的檔案。

<MigrationTool />

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>

::: tip

使用上述工具取得匯出的檔案之後，可以在對應的儲存服務後台進行匯入。

:::

## Waline 亮點

Waline 相對於 Valine 具有如下亮點:

### 更強大的功能

1. Markdown 支援更多語法，包括上標與下標、emoji、表格、刪除線、數學公式、HTML 標籤、註腳等。
1. 圖片上傳功能，允許自由設定圖床服務或直接嵌入圖片。
1. 全新的標籤系統，可以根據使用者互動頻率為使用者設定等級標籤，也可為登入使用者加入自訂標籤。
1. Emoji 預設集與分頁支援，允許多套 Emoji，同時允許任何人發佈和使用 Emoji 預設集。
1. 全新的反應系統，允許訪客表達對文章的態度。
1. 留言喜歡，對喜歡的留言表達支援。
1. 瀏覽量統計，更加準確的瀏覽量計數與防竄改。
1. 貼圖搜尋。可以自訂貼圖服務，讓使用者搜尋並自由插入貼圖。
1. 支援登入使用者編輯和刪除其發佈的留言。

### 更安全

1. 零隱私洩露，不會暴露使用者電子郵件、IP 位址以及其他敏感資訊，並且可以在後台設定不顯示使用者地理位置、瀏覽器以及作業系統。
1. 完整的反垃圾和防灌水系統。
   - 所有留言都可以透過反垃圾服務進行鑑別，並且可以加入自己的額外驗證邏輯。
   - 可設定單 IP 或者單使用者的留言速度限制，並自動識別重複留言，防止灌水。
1. 留言審核功能，在敏感時期或者網站受到攻擊時，可以一鍵開啟留言審核，手動審查並批准留言顯示，防止惡意留言導致封站。
1. 支援使用者登入，除了註冊帳號外，還支援社交媒體帳號一鍵授權登入，快速同步頭像與暱稱，防止身分冒用

### 更方便

1. 可透過多種方式 (QQ、WeChat、釘釘、電子郵件) 通知部落客留言動態
1. 強大的管理後台，可以查看所有使用者與留言並進行相關操作，同時為使用者設定自訂標籤與管理員
1. 前端管理，管理員可以直接透過 Waline 留言元件審查、編輯或刪除留言。
