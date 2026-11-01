---
title: Railway 部署
icon: railway
---

[Railway](https://railway.app/) 是一個可免費使用的 Serverless 部署平台。我們可以快速地將 Waline 部署到 Railway 平台上。

<!-- more -->

## 如何部署

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

點選上方按鈕，跳轉至 Railway 平台快速部署。登入之後會讓你選擇新建儲存庫的名稱，環境變數部分不需要修改，直接點選下方的 <kbd>Deploy</kbd> 按鈕進行部署即可。

![railway1](../../../assets/railway-1.jpg)

進入管理介面後，選擇 <kbd>PostgreSQL</kbd> - <kbd>Query</kbd>，將 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 中的內容貼至輸入框中，點選底部的 <kbd>Run Query</kbd> 按鈕完成資料庫的初始化。

![railway2](../../../assets/railway-2.jpg)

最後在 <kbd>Deployments</kbd> - <kbd>Domains</kbd> 中就可以取得存取的位址了。

![railway3](../../../assets/railway-3.jpg)

## 如何更新

進入 GitHub 儲存庫中，將 package.json 檔案中的 `@waline/vercel` 版本號修改為最新版本即可。

## 如何修改環境變數

可以透過 <kbd>Variables</kbd> Tab 進入環境變數管理頁，修改完成之後會自動重新部署。

![railway4](../../../assets/railway-4.jpg)
