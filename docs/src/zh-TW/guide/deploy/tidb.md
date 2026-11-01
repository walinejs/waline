---
title: 建立 TiDB 資料庫
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) 是一款開源的 NewSQL 資料庫。[TiDB Cloud](https://tidbcloud.com/) 則是官方提供的線上版本，它提供了 5GB 的免費額度。以下介紹如何在 TiDB Cloud 上建立 Waline 資料庫。

## 建立資料庫

1. 登入 [TiDB Cloud](https://tidbcloud.com) 後會自動建立 TiDB 執行個體，直接點選 <kbd>cluster0</kbd> 進入執行個體

   ![進入執行個體](../../../assets/tidb-1.png)

2. 左側清單選擇 <kbd>SQL Editor</kbd>，並將 [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) 的內容以 `;` 為語句分隔貼到介面中執行。每貼一句就點選右上角的<kbd>執行</kbd>藍色按鈕，或者使用 <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> 快速鍵執行
   ![步驟1](../../../assets/tidb-2.png)
   ![步驟2](../../../assets/tidb-3.png)
   ![步驟3](../../../assets/tidb-4.png)
   ![步驟4](../../../assets/tidb-5.png)
   ![步驟5](../../../assets/tidb-6.png)

至此 Waline 資料庫就已經建立完成！

## 取得連線設定

點選左側的 <kbd>Overview</kbd> 按鈕進入首頁，選擇右上角的 <kbd>Connect</kbd> 取得連線資訊。

Connect with 選擇 `General`。此外還需要點選下一行的 <kbd>Reset password</kbd> 產生新密碼。

這樣你就能取得連線相關的設定了。

![取得連線設定](../../../assets/tidb-7.png)

## Vercel 部署

建立 Vercel 帳號並建立專案和部署好 Waline 服務，然後點選左側的 <kbd>Settings</kbd> 選單項目，再找到 `Environment Variables` 設定項目，點選右上角的 <kbd>Add Environment Variable</kbd> 按鈕，依序填寫 `TIDB_HOST`、`TIDB_PORT`、`TIDB_DB`、`TIDB_USER` 和 `TIDB_PASSWORD` 的參數資訊，然後重新部署服務即可。

![設定 TiDB 資料庫連線](../../../assets/tidb-8.png)
