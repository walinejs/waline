---
title: 快速上手
icon: creative
dir:
  collapsible: false
  order: 1
---

歡迎使用 Waline，只需幾個步驟，你就可以在你的網站中啟用 Waline 提供的留言與瀏覽量服務。

<!-- more -->

## 部署伺服器

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 點擊上方按鈕，跳轉至 Vercel 進行 Server 端部署。

   ::: note

   如果你未登入的話，Vercel 會讓你註冊或登入，請使用 GitHub 帳號進行快捷登入。

   :::

1. 輸入一個你喜歡的 Vercel 專案名稱並點擊 `Create` 繼續:

   ![create](../../../assets/vercel-1.png)

1. 此時 Vercel 會基於 Waline 範本協助你新建並初始化儲存庫，儲存庫名稱為你之前輸入的專案名稱。

   ![init](../../../assets/vercel-2.png)

   一兩分鐘後，滿屏的煙火會慶祝你的部署成功。此時點擊 `Go to Dashboard` 可以跳轉到應用的主控台。

   ![success](../../../assets/vercel-3.png)

## 建立資料庫

1. 點擊頂部的 `Storage` 進入儲存服務設定頁，選擇 `Create Database` 建立資料庫。`Marketplace Database Providers` 資料庫服務選擇 `Neon`，點擊 `Continue` 進行下一步。

   ![database](../../../assets/vercel-5.png)

1. 此時會讓你建立一個 Neno 帳號，此時選擇 `Accept and Create` 接受並建立。後續選擇資料庫的方案設定，包括區域和額度。這裡可以什麼都不操作直接選擇 `Continue` 下一步。

   ![neon](../../../assets/vercel-6.png)

1. 此時會讓你定義資料庫名稱，這裡也可以不用修改直接 `Continue` 進行下一步。

   ![neon](../../../assets/vercel-7.png)

1. 這時候 `Storage` 下就有你建立的資料庫服務了，點擊進去選擇 `Open in Neon` 跳轉到 Neon。在 Neon 介面左側選擇 `SQL Editor`，將 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 中的 SQL 語句貼到編輯器中，點擊 `Run` 執行建立資料表操作。

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. 稍等片刻之後會告知你建立成功。此時回到 Vercel，點擊頂部的 `Deployments` 點擊頂部最新的一次部署右側的 `Redeploy` 按鈕進行重新部署。該步驟是為了讓剛才設定的資料庫服務生效。

   ![redeploy success](../../../assets/vercel-12.png)

1. 此時會跳轉到 `Overview` 介面開始部署，等待片刻後 `STATUS` 會變成 `Ready`。此時請點擊 `Visit` ，即可跳轉到部署好的網站網址，此網址即為你的伺服器位址。

   ![visit](../../../assets/vercel-14.png)

## 綁定網域

1. 點擊頂部的 `Settings` - `Domains` 進入網域設定頁

1. 輸入需要綁定的網域並點擊 `Add`

   ![Add domain](../../../assets/vercel-16.png)

1. 在網域服務商處新增一筆 `CNAME` 解析記錄

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. 等待生效，你即可透過自己的網域來造訪了:tada:
   - 留言系統：example.yourdomain.com
   - 留言管理：example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## HTML 引入

在你的網頁中進行如下設定:

1. 匯入 Waline 樣式 `https://unpkg.com/@waline/client@v3/dist/waline.css`。

1. 建立 `<script>` 標籤使用來自 `https://unpkg.com/@waline/client@v3/dist/waline.js` 的 `init()` 函式初始化，並傳入必要的 `el` 與 `serverURL` 選項。
   - `el` 選項是 Waline 渲染使用的元素，你可以設定一個字串形式的 CSS 選擇器或者一個 HTMLElement 物件。
   - `serverURL` 是伺服器的位址，即上一步取得的值。

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
     <!-- ... -->
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
       });
     </script>
   </body>
   ```

1. 留言服務此時就會在你的網站上成功運作 :tada:

## 留言管理 (管理端)

1. 部署完成後，請造訪 `<serverURL>/ui/register` 進行註冊。首個註冊的人會被設定為管理員。
1. 管理員登入後，即可看到留言管理介面。在這裡可以修改、標記或刪除留言。
1. 使用者也可透過留言框註冊帳號，登入後會跳轉到自己的個人檔案頁。

## 影片教學

以下是熱心使用者製作的影片教學，以上操作不清楚的也可以參考。

### Waline 部署教學（快速上手）

> UP 主：[阿巴In](https://space.bilibili.com/381992209)

<BiliBili bvid="BV1J2XuBtEGn" />

<BiliBili bvid="BV1pB4y1E7fp" />

### 使用 Vercel 簡單地部署 Waline 留言系統

> UP 主：[嵐天呀](https://space.bilibili.com/355877984)

<BiliBili bvid="BV1Ft4y1A73f" />
