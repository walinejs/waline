---
title: 排行榜/讀者牆小工具
icon: rank
---

Waline 透過 `UserList` 支援使用者排行榜和讀者牆的展示，方便在部落格側邊欄展示留言使用者資訊。

<!-- more -->

## 元件選項

排行榜小工具或者讀者牆小工具名為 `UserList`，包含三個選項:

- `el` (選填): 需要掛載的元素
- `serverURL`: 伺服器位址
- `count`: 需要取得的使用者列表數量
- `mode`: `list` 表示排行榜，`wall` 表示讀者牆
- `lang`: 多語言支援，具體可參考 [i18n](../i18n.md)
- `locale`: 自訂語言，具體可參考 [i18n](../i18n.md)

元件傳回的資料格式應為 `Promise<{ users: WalineUser[], destroy: () => void }>`。

- `users` 屬性: 包含 `count` 數量的使用者列表
- `destroy` 方法: 銷毀小工具的函式

## 基本用法

### 使用者排行榜

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### 讀者牆

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## 進階用法

如果對預設輸出的格式不滿意，你也可以不傳入 `el` 選項，呼叫元件取得資料之後自行進行渲染。

範例:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
