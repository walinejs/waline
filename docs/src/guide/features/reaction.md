---
title: 文章反应
icon: reaction
order: 4
---

Waline 允许用户表达对文章内容的反应。

<!-- more -->

## 快速启用

想要快速启用反应，你可以在初始化时设置 `reaction` 选项为 `true` 来显示默认的反应列表:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // 开启反应
});
```

Waline 会在评论框的上方，显示默认的反应列表。

## 自定义反应

如果你需要自定义这些反应表情，你可以转入一个包含反应表情图片地址数组，表达你想要用户选择的反应:

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

同时，你可以通过 `locale` 中的 `reactionTitle` 来自定义反应的标题，也可以通过 `reaction0` 到 `reaction8` 来自定义反应表情的名称，详见 [多语言设置](./i18n.md)。

## 注意事项

::: tip 数量限制

Waline 最多支持 9 个反应，添加的反应数量可以小于 9 个，这不会产生任何问题。

:::

::: warning 计数规则

反应的计数是基于位置的。

如果你需要对反应重新进行排序与调整，可参见 [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264)。

:::
