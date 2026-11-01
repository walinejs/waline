---
title: Netlify 部署
icon: netlify
---

[Netlify](https://netlify.com) 是知名的靜態網站部署服務供應商，[Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) 是 Netlify 平台推出的一種服務，它允許在網站的邊緣節點上執行 JavaScript 程式碼。

<!-- more -->

## 如何部署

點選 [Fork](https://github.com/walinejs/netlify-starter/fork) 按鈕建立 Netlify 啟動範本。

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> 登入 Netlify 控制台，選擇 <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> 新增網站。選擇 GitHub 認證以讀取我們的 GitHub 專案清單。在清單中搜尋我們剛才 Fork 產生的儲存庫名稱，點選該專案開始基於該儲存庫建立我們的 Netlify 網站。

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

建立 Netlify 網站之前，需要我們填入一些設定資訊。除了環境變數之外，其它資訊我們使用預設的即可。 參考[多資料庫服務支援](../database.md)新增對應儲存服務的環境變數，點選底部的 <kbd>Deploy site</kbd> 開始部署網站。

![netlify](../../../assets/netlify-4.png)

稍待片刻後我們的 Netlify 網站就部署成功了。我們可以點選頂部的 <kbd>Functions</kbd> 導覽列切換到雲端函式清單，其中 `comment` 則是我們部署好的 Waline 服務。點選它進入該雲端函式的詳情頁。

![netlify](../../../assets/netlify-5.png)

在詳情頁中，`Endpoint` 列出來的位址即為我們的 Waline 服務的部署位址。點選右邊的複製按鈕，在新分頁中開啟它，測試一下留言發布，一切成功~ 接下來就將這個網域設定在客戶端中，就可以愉快地留言了！

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## 如何更新

進入 GitHub 儲存庫中，將 package.json 檔案中的 `@waline/vercel` 版本號修改為最新版本即可。

## 如何修改環境變數

點選頂部的 `Site settings` 導覽列，選擇 `Environments variables` 側邊欄，進入環境變數管理頁。點選 `Add a variable` 按鈕我們就可以新增環境變數。

編輯完環境變數後，我們需要進入 `Deploys` 頁面，選擇 `Trigger deploy` - `Deploy site` 對網站進行重新部署，才能使環境變數生效。

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
