---
title: 貼圖搜尋
icon: search
order: 3
---

`@waline/client` 允許使用者新增貼圖搜尋服務並自訂此功能。

在預設情況下，`@waline/client` 透過 [Giphy](https://giphy.com/) 提供貼圖搜尋服務。這將允許你在留言時搜尋貼圖並加入留言中。

<!-- more -->

## 停用

如果你不需要預設的貼圖搜尋服務，你可以將 `search` 選項設定為 `false` 來停用它。

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## 自訂

你可以透過 search 選項自訂貼圖搜尋服務。

對於每項操作，你應該傳回一個包含了圖片資訊的陣列作為搜尋結果，每一項應該是一個物件，包含下列屬性:

- `src`: 圖片的連結位址
- `title`: 圖片的標題與替代文字 (選填)
- `preview`: 圖片的縮圖，用於結果列表中 (選填)

選項接受三個函式，每個函式應該傳回一個 Promise 物件，結果是上方的搜尋結果陣列。

- `search`: 搜尋操作，搜尋詞會作為函式的第一個參數傳入
- `default`: 預設展示的圖片列表 (選填)
- `more`: 當圖片捲動到底部時觸發的函式，其中搜尋詞和目前數量會作為前兩個參數傳入 (選填)

關於自訂搜尋的教學，詳見 [Cookbook → 自訂貼圖搜尋](../../cookbook/customize/search.md)。
