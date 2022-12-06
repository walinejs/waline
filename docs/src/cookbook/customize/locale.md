---
title: 自定义语言
icon: i18n
---

本教程指引你自定义 `@waline/client` 多语言与显示文字。

<!-- more -->

## 简介

`@waline/client` 提供了 `locale` 选项，你可以通过它自定义多语言与显示文字。

默认情况下，它会使用内置的多语言文字，并在语言不受支持时，回退到 `en-US` (英语美国)。

你可以传递一个完成的多语言配置给 `locale` 选项来新增语言支持，或者设置其中的几项对现有的 UI 文字进行覆盖。

## locale 选项

- 等级相关:

  - `level${number}`: number 等级的文字

  ::: tip

  比如你设置了 6 个等级，你可以这样定义它们:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- 反应相关:

  - `reactionTitle`: 反应标题
  - `reaction0`: 反应 1 文字
  - `reaction1`: 反应 2 文字
  - `reaction2`: 反应 3 文字
  - `reaction3`: 反应 4 文字
  - `reaction4`: 反应 5 文字
  - `reaction5`: 反应 6 文字
  - `reaction6`: 反应 7 文字
  - `reaction7`: 反应 8 文字
  - `reaction8`: 反应 9 文字

- UI 相关:

  - `nick`: 昵称
  - `mail`: 邮箱
  - `link`: 网址
  - `placeholder`: 评论框默认文字
  - `sofa`: 评论区为空时的显示文字
  - `submit`: 提交按钮文字
  - `comment`: 评论按钮文字
  - `refresh`: 刷新按钮文字
  - `more`: 加载更多按钮文字
  - `uploading`: 上传时显示文字
  - `login`: 登录按钮文字
  - `admin`: 管理员的标签
  - `sticky`: 置顶文字
  - `word`: 字
  - `anonymous`: 匿名用户默认名称
  - `optional`: 标明可选项的文字
  - `gifSearchPlaceholder`: 表情包搜索占位文字
  - `oldest`: 最早的评论
  - `latest`: 最新的评论
  - `hottest`: 最热的评论

  ::: info

  此分类内的文字会显示在页面上。

  :::

- 提示信息相关:

  - `nickError`: 昵称不满足条件的错误信息
  - `mailError`: 邮箱不满足条件的错误信息
  - `wordHint`: 评论字数的错误提示，其中 `$0` `$1` `$2` 会被自动替换为字数允许下限、字数允许上限、当前字数。

- 评论时间相关:

  - `seconds`: 秒前
  - `minutes`: 分钟前
  - `hours`: 小时前
  - `days`: 天前
  - `now`: 刚刚

- 管理相关:

  - `approved`: 审核通过
  - `waiting`: 等待审核
  - `spam`: 垃圾评论
  - `unsticky`: 取消置顶

- 无障碍相关:

  - `like`: 喜欢文字
  - `cancelLike`: 取消喜欢文字
  - `reply`: 回复按钮的标签文字
  - `cancelReply`: 取消回复按钮的标签文字
  - `preview`: 预览按钮的标签文字
  - `emoji`: 表情按钮的标签文字
  - `gif`: 表情包按钮的标签文字
  - `uploadImage`: 上传图片按钮的标签文字
  - `profile`: 档案页标签文字
  - `logout`: 退出登录按钮的标签文字

  ::: info

  上述文字只用于无障碍服务增强，不会显示在页面中。

  :::

## 例子

```js
// 中文默认
const locale = {
  nick: '昵称',
  nickError: '昵称不能少于3个字符',
  mail: '邮箱',
  mailError: '请填写正确的邮件地址',
  link: '网址',
  optional: '可选',
  placeholder: '欢迎评论',
  sofa: '来发评论吧~',
  submit: '提交',
  like: '喜欢',
  cancelLike: '取消喜欢',
  reply: '回复',
  cancelReply: '取消回复',
  comment: '评论',
  refresh: '刷新',
  more: '加载更多...',
  preview: '预览',
  emoji: '表情',
  uploadImage: '上传图片',
  seconds: '秒前',
  minutes: '分钟前',
  hours: '小时前',
  days: '天前',
  now: '刚刚',
  uploading: '正在上传',
  login: '登录',
  logout: '退出',
  admin: '博主',
  sticky: '置顶',
  word: '字',
  wordHint: '评论字数应在 $0 到 $1 字之间！\n当前字数：$2',
  anonymous: '匿名',
  level0: '潜水',
  level1: '冒泡',
  level2: '吐槽',
  level3: '活跃',
  level4: '话痨',
  level5: '传说',
  gif: '表情包',
  gifSearchPlaceholder: '搜索表情包',
  profile: '个人资料',
  approved: '通过',
  waiting: '待审核',
  spam: '垃圾',
  unsticky: '取消置顶',
  oldest: '按倒序',
  latest: '按正序',
  hottest: '按热度',
  reactionTitle: '你认为这篇文章怎么样？',
};

Waline.init({
  el: '#waline',
  serverURL: 'YOUR_SERVER_URL',
  path: location.pathname,
  // ...
  locale,
});
```
