---
title: 客戶端簡介
icon: client
order: 1
---

Waline 官方提供了 [`@waline/client`](https://www.npmjs.com/package/@waline/client) 客戶端，使用 Vue + TypeScript 編寫，大小僅為 100kb gzip。

## 引入

你可以使用 CDN 或 npm 引入 Waline 客戶端，我們提供了多種版本的檔案以應對不同場景。

如果你在此過程中遇到問題，詳見:

- [Cookbook → CDN 引入](../../cookbook/import/cdn.md)
- [Cookbook → 專案引入](../../cookbook/import/project.md)

## 呼叫 Waline

使用 Waline 最簡單的方式就是 [快速上手的方式](./README.md#html-引入)，從 Waline 中匯入 `init` 函式並透過 `init(yourOptions)` 初始化 Waline 實例。

在初始化選項中，`el` 和 `serverURL` 兩個選項是必填的。前者為 Waline 掛載的元素或元素選擇器，後者為伺服器位址。關於 `@waline/client` 的全部初始化參數，詳見 [客戶端參考 → API](../../reference/client/api.md)。

## 留言數統計

`@waline/client` 同時也提供留言數統計的子套件，你可以在部落格的文章列表或其他不含留言的頁面呼叫它展示留言數，詳見 [功能 → 留言數統計](../features/comment.md)

## 瀏覽量統計

Waline 支援頁面瀏覽量統計，如果你不需要留言服務而只是需要瀏覽量功能的話，Waline 提供了一個 Gzip 大小不足 1KB 的統計外掛。

關於 `@waline/client` 的瀏覽量統計，詳見 [功能 → 瀏覽量統計](../features/pageview.md)

## 豐富的留言格式支援

`@waline/client` 支援豐富的格式。除了在留言區使用標準的 Markdown 與 GFM 語法擴充外，你還可以嵌入 HTML 標籤、使用數學公式以及其他語法，詳見 [功能 → 支援語法](../features/syntax.md)。

`@waline/client` 還支援在留言框中即時預覽留言輸入，但一些功能因體積原因被預設精簡。如果你希望恢復這些功能，詳見:

- [Cookbook → 自訂預覽程式碼高亮器](../../cookbook/customize/highlighter.md)
- [Cookbook → 自訂預覽 $\TeX$ 渲染器](../../cookbook/customize/tex-renderer.md)

## 文章反應

覺得留言太麻煩？ Waline 允許你的訪客快速表達對文章的反應，比如喜歡、不喜歡、疑惑、無聊、驚喜等，你可以手動啟用這個功能，詳見 [功能 → 文章反應](../features/reaction.md)。

## 留言功能

Waline 支援諸多基礎功能，包括登入、大頭貼、[多語言](../features/i18n.md) 和即時預覽等功能。

Waline 允許你為使用者設定互動等級標籤和自訂標籤，詳見 [使用者標籤](../features/label.md)。

## 表情符號分頁

`@waline/client` 支援多個 Emoji 分頁，並允許使用者透過預設便捷引入 Emoji 分頁。在官方提供的預設之外，你可以很輕鬆地建立屬於自己的預設。

有關 `@waline/client` 的表情符號分頁，詳見:

- [功能 → 表情符號分頁](../features/emoji.md)
- [Cookbook → 自訂 Emoji](../../cookbook/customize/emoji.md)

## 圖片上傳

`@waline/client` 內建了圖片上傳支援，預設將圖片轉為 Base64 內嵌，當然，你也可以使用自己喜歡的圖床。

關於 `@waline/client` 的圖片上傳設定，詳見 [Cookbook → 自訂圖片上傳](../../cookbook/customize/upload-image.md)。

## 貼圖搜尋

`@waline/client` 透過 [giphy](https://giphy.com) 提供了貼圖搜尋功能，並允許你自訂貼圖搜尋服務，詳見:

- [功能 → 貼圖搜尋](../features/search.md)
- [Cookbook → 自訂貼圖搜尋](../../cookbook/customize/search.md)

## 多語言支援

`@waline/client` 含有多種語言的內建支援，同時你可以在此基礎上新增語言支援或修改 UI 文字，詳見:

- [功能 → 設定語言](../features/i18n.md)。
- [Cookbook → 自訂語言](../../cookbook/customize/locale.md)。

## 無障礙支援

Waline 完整支援了全部的無障礙標準:

- 所有圖示與控制項均有其對應的無障礙標籤。
- 你可以使用鍵盤或頭戴式指向裝置完成與 Waline 所有控制項的互動。

這是我們為全球視障及行動障礙族群做出的一點支援！:heart:

## 自訂樣式

Waline 帶來了內建的暗黑模式支援，同時為了方便使用者對 Waline 樣式進行調整，Waline 提供了很多可設定的 CSS 變數 (CSS Variables)。

詳見 [自訂樣式](../features/style.md)。

## 進階開發

### 單頁應用程式支援

Waline 為 SPA(**S**ingle **P**age **A**pplication，單頁應用程式) 帶來了支援。

如果你想要在基於 history API 的網站或應用中使用，你可以使用初始化得到的實例上的 `update()` 方法重新整理留言區的設定，也可以使用實例上的 `destroy()` 方法銷毀 Waline。想要了解 `@waline/client` 的響應性，詳見 [Cookbook → 響應性](../../cookbook/reactivity.md)。

### 生態系

你可以很方便地在 Hexo，VuePress 等工具上透過外掛使用 Waline，甚至使用第三方客戶端。

有關支援 Waline 的第三方客戶端、主題與外掛，詳見 [了解更多 → 生態系](../../advanced/ecosystem.md)。
