---
title: 文章反應
icon: reaction
order: 4
---

Waline 允許使用者表達對文章內容的反應。

<!-- more -->

## 快速啟用

想要快速啟用反應，你可以在初始化時設定 `reaction` 選項為 `true` 來顯示預設的反應清單:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // 開啟反應
});
```

Waline 會在留言框的上方，顯示預設的反應清單。

## 自訂反應

如果你需要自訂這些反應表情，你可以傳入一個包含反應表情圖片網址的陣列，表達你想要使用者選擇的反應:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

同時，你可以透過 `locale` 中的 `reactionTitle` 來自訂反應的標題，也可以透過 `reaction0` 到 `reaction8` 來自訂反應表情的名稱，詳見 [多語言設定](./i18n.md)。

## 注意事項

::: tip 數量限制

Waline 最多支援 9 個反應，新增的反應數量可以小於 9 個，這不會產生任何問題。

:::

::: warning 計數規則

反應的計數是基於位置的。

如果你需要對反應重新進行排序與調整，可參見 [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264)。

:::
