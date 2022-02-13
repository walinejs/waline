---
title: 最新评论挂件
icon: recent
---

Waline 通过 `RecentComments` 支持最新评论挂件显示，方便在博客侧边栏显示最近评论。

<!-- more -->

## 组件选项

最新评论挂件名为 `RecentComments`，包含三个选项:

- `el` (可选的): 需要挂载的元素
- `serverURL`: 服务器地址
- `count` 需要获取的最近评论数量

组件返回的数据格式应为 `Promise<{ comment: CommentData[], destroy: () => void }>`。

- `comment` 属性: 包含 `count` 数量的最近评论的数组
- `destory` 方法: 销毁挂件的函数

## 基本用法

```html
<div id="waline-recent"></div>
<script>
  window.addEventListener('load', () => {
    Waline.Widget.RecentComments({
      el: '#waline-recent',
      serverURL: 'http://waline.vercel.app',
      count: 10,
    });
  });
</script>
```

::: tip

这会使用默认样式渲染在 `#waline-recent` 上。

:::

## 高级用法

如果对默认输出的格式不满意，你也可以不传入 `el` 选项，调用组件拿到数据之后自己进行渲染。

例子:

```html
<div id="waline-recent"></div>
<script>
  window.addEventListener('load', () => {
    Waline.Widget.RecentComments({
      serverURL: 'http://waline.vercel.app',
      count: 10,
    }).then(({ comments }) => {
      document.getElementById('waline-recent').innerHTML = comments.map(
        (comment) => `${comment.nick}: ${comment.comment}`
      );
    });
  });
</script>
```
