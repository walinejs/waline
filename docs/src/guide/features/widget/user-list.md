---
title: 排行榜/读者墙挂件
icon: rank
---

Waline 通过 `UserList` 支持用户排行榜和读者墙的展示，方便在博客侧边栏展示评论用户信息。

<!-- more -->

## 组件选项

排行榜挂件或者读者墙挂件名为 `UserList`，包含三个选项:

- `el` (可选的): 需要挂载的元素
- `serverURL`: 服务器地址
- `count`: 需要获取的用户列表数量
- `mode`: `list` 表示排行榜，`wall` 表示读者墙
- `lang`: 多语言支持，具体可参考 [i18n](../i18n.md)
- `locale`: 自定义语言，具体可参考 [i18n](../i18n.md)

组件返回的数据格式应为 `Promise<{ users: WalineUser[], destroy: () => void }>`。

- `users` 属性: 包含 `count` 数量的用户列表
- `destroy` 方法: 销毁挂件的函数

## 基本用法

### 用户排行榜

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### 读者墙

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## 高级用法

如果对默认输出的格式不满意，你也可以不传入 `el` 选项，调用组件拿到数据之后自己进行渲染。

例子:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(
    ({ users }) => {
      document.getElementById('waline-users').innerHTML = users.map(
        (user) => `<a href="${user.link}">${user.nick}</a>`,
      );
    },
  );
</script>
```
