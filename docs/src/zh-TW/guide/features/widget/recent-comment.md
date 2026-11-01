---
title: 最新留言小工具
icon: recent
---

Waline 透過 `RecentComments` 支援最新留言小工具顯示，方便在部落格側邊欄顯示最近留言。

<!-- more -->

## 元件選項

最新留言小工具名為 `RecentComments`，包含三個選項:

- `el` (選填): 需要掛載的元素
- `serverURL`: 伺服器位址
- `count` 需要取得的最近留言數量

元件傳回的資料格式應為 `Promise<{ comment: WalineComment[], destroy: () => void }>`。

- `comment` 屬性: 包含 `count` 數量的最近留言的陣列
- `destroy` 方法: 銷毀小工具的函式

## 基本用法

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

這會使用預設樣式渲染在 `#waline-recent` 上。

:::

## 進階用法

如果對預設輸出的格式不滿意，你也可以不傳入 `el` 選項，呼叫元件取得資料之後自行進行渲染。

範例:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
