---
title: Zeabur 部署
icon: zeabur
---

[Zeabur](https://zeabur.com) 是一個幫助開發者們可以一鍵部署自己服務的平台。整體和 Railway 比較類似，但是比它多了更多的功能，不需要綁定信用卡，免費額度也要比它高。

<!-- more -->

## 如何部署

點選 [Fork](https://github.com/walinejs/zeabur-starter/fork) 按鈕建立 Zeabur 啟動範本。

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> 登入 Zeabur 控制台，如果沒有專案需要先為新專案設定名稱。

![zeabur2](../../../assets/zeabur-2.png)

進入之後點選 <kbd>Add New Service</kbd> 建立服務，選擇 <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> 先建立資料庫服務。

為我們的 MongoDB 資料庫服務起個名字，點選 <kbd>Deploy</kbd> 按鈕，我們的資料庫服務就部署好了。

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

接下來我們繼續點選 <kbd>Add New Service</kbd> 建立 Waline 服務，這次我們選擇點選 <kbd>Deploy Your Source Code</kbd>。在接下來的 GitHub 專案清單中找到最開始我們 Fork 出來的專案，點選對應的 <kbd>Import</kbd> 按鈕。

為我們的 Waline 服務起個名字，點選 <kbd>Deploy</kbd> 按鈕，我們的 Waline 服務就部署好了。

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

不要著急關閉 Waline 服務的面板，服務部署完畢之後，我們還需要給服務新增存取網域。點選 <kbd>Domains</kbd> 索引標籤下的 <kbd>Generate Domain</kbd> 按鈕，輸入自己想要的網域前綴並點選 <kbd>Save</kbd> 按鈕，就給我們的服務新增好存取網域了。

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

一切就緒，接下來就是見證奇蹟的時刻。開啟我們剛才設定的存取網域，測試一下留言發布，一切成功~ 接下來就將這個網域設定在客戶端中，就可以愉快地留言了！

![zeabur10](../../../assets/zeabur-10.png)

## 如何更新

進入 GitHub 儲存庫中，將 package.json 檔案中的 `@waline/vercel` 版本號修改為最新版本即可。

## 如何修改環境變數

可以透過 <kbd>Variables</kbd> Tab 進入環境變數管理頁，修改完成之後會自動重新部署。

![zeabur11](../../../assets/zeabur-11.png)
