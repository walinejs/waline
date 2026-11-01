---
title: 響應式的 Waline 實例
icon: spa
order: -1
---

官方客戶端 `@waline/client` 基於 Vue3，提供了響應式的元件和實例，為 SPA（**S**ingle **P**age **A**pplication，單頁應用）帶來了支援。

<!-- more -->

## Vue 元件

如果你正在使用一個 Vue 專案，你可以透過 `@waline/client/components` 匯入具名匯出 `Waline`，以取得並使用 Waline 元件。

元件的所有屬性都是響應式的，這意味著當你變更屬性時，留言框會自動更新。

## 其他專案

在其他單頁應用中，你需要在初始化 Waline 時儲存 Waline 函式回傳的 `WalineInstance` 實例，以便後續使用。

你可以在 `WalineInstance` 上找到一個實例屬性 `el` 和兩個方法：`update()` 和 `destroy()`。

### update

你可以在任何需要的時刻（例如使用者前往新頁面後）呼叫 `update()` 更新 Waline。`update` 方法接收一個可選參數 `options`，除 `el` 選項外，其他 Waline 初始化選項都可以傳入新的值進行更新。

例如：

```js
// 在 `/` 路由
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* 使用者：經過一段時間後，路由變動到 `/a.html` */

waline.update(); // 現在 waline 將開始清除留言並顯示載入狀態
// 經過一段時間後，計數器和留言將全部更新

waline.update({
  lang: 'en',
  login: 'disable',
}); // 這將使 Waline 以英文顯示，並停用使用者登入
```

#### 運作方式

呼叫 `update` 時，會把目前選項和歷史選項**淺拷貝**合併，並重新根據新參數更新整個 Waline 實例（同時儲存這個新參數）。

該方法的預設行為是：對於未設定過的參數永遠**重新產生預設值**，對於設定過的參數**使用歷史值**。

這裡有兩個選項你可能需要特別留意：`path` 和 `locale`。

::: warning path 注意事項

在 V2 中，`path` 參數在 `update()` 時**總是被重設**。

這意味著在任何一次更新中，只要你不指定 `path`，`path` 就會被重設為 `window.location.pathname`。

:::

::: warning locale 注意事項

由於淺拷貝的關係，舊的 `locale` 選項會被 `update` 傳入的新 `locale` 選項完全覆蓋。

我們的依據是：使用者更新 locale 的情境通常是想切換顯示語言，所以我們將其設定為外掛的預期行為。這種行為提供了透過 `update({ locale: {} })` 清除先前自訂語言設定的能力。

如果你的確需要更新已設定的 `locale` 的某一項或某幾項，你需要把 `locale` 中所有變動的值重新傳入外掛。

:::

同時，`update()` 選項已針對非同步網路請求進行最佳化，包括：

- 只有當路徑確實發生改變時，才重新整理留言區並重新請求
- 新的 `update()` 呼叫會自動終止上一個 `update()` 發出但已不再需要的請求。

### el

`el` 屬性為 Waline 目前實例掛載的 HTMLElement。

如果你在初始化時設定了 `el: null`（即只需要瀏覽量與留言數功能），該項為 `null`。

### destroy

你可以使用 `destroy()` 方法銷毀 Waline 實例。它會同時清空 Waline 掛載元素中的全部內容。

### 初始化失敗

如果你忘記傳入 `serverURL`，或者 Waline 無法在頁面中透過 `el` 選項找到掛載位置，Waline 會拋出一個 Error 指明錯誤原因。

### 注意事項

::: warning 取消掛載實例

為了讓 Waline 能夠正確釋放資源，請在移除 Waline 所在元素之前，手動呼叫 `WalineInstance.destroy()`。

否則，某些監聽器可能不會被正確移除。

:::
