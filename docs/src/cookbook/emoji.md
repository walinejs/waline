---
title: 创建自己的 Emoji 预设表情
icon: emoji
---

本指南将指导你如何创建并使用自己的 Emoji 预设。

<!-- more -->

## 创建自己的预设

首先，你需要准备一些表情图片，作为你的表情包。接下来，你需要按照步骤完成下列流程。

### 为表情包命名并上传

处于简便性的考量，Waline 会将表情图片的名称直接作为表情的 key。这意味着，如果你引入了两个不同的预设，而它们都含有 laugh.png 图片的话，这两个表情会对应同一个表情 `:laugh:`。

所以，我们建议的最佳实践是，每个表情预设创作者应该在表情文件的所有名称中，添加一个预设名称相关的前缀。

将它们妥善命名后，你需要将它们上传到你的服务器。

### 编写预设信息

我们假定你已经在 `https://example.com` 的 `myemoji` 目录下放置了一些表情图片，如下所示：

```
https://example.com/myemoji/
  ├─ my_laugh.png
  ├─ my_cute.png
  ├─ my_rage.png
  ├─ my_sob.png
  └─ ...
```

此时，你还需要为这个文件夹创建一个 `info.json` 文件，来让 Waline 知晓 Emoji 预设所包含的表情。

首先，我们先为 Emoji 预设起一个名称，比如叫 `我的 Emoji`，由于你已经为图片设置了 `my_` 前缀，且文件均为 `png` 格式。你需要将他们添加在 `info.json` 中。

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png"
}
```

之后，你需要在 `items` 中按照你希望的顺序列出所有的表情图片名称，同时，请记得忽略你已经在 `prefix` 和 `type` 中设置的前缀和后缀。

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png",
  "items": ["laugh", "cute", "rage", "sob"]
}
```

之后，请选择一个有代表性的表情作为在选项卡中展示的图标:

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

这样，你就完成了 `info.json` 的编写，请将它上传到同一个文件夹。

这样你就成功的创建了一个 `myemoji` 预设，地址为 `https://example.com/myemoji/'` 预设。

## 利用 GitHub 标签与仓库镜像

通常情况下，你可能会觉得拥有自己的域名并将图片上传到域名有些繁琐，而且链接可能会随时间失效，所以一个进阶的做法是使用 GitHub 仓库，并利用 Git 的标签功能，通过 GitHub 镜像来部署的表情。

与上面的步骤类似，这次，你需要新建 GitHub 仓库，并将表情按照上述的方法进行命名，使用相同步骤创建 `info.json`，并将它们上传到仓库中。

之后，为此时的仓库创建一个标签，我们推荐使用 `vx.x.x` 的格式进行设置，如 `v1.0.0`。

添加标签后，你可以使用 [cdn.jsdelivr.net](https://www.jsdelivr.com/) 上带有版本的 CDN 链接作为你的预设，其格式为 `https://cdn.jsdelivr.net/gh/user/repo@version/file`。

我们假定你创建了 `example/emoji` 仓库，直接上传了表情图片和 `info.json`，并且已经创建了 `v1.0.0` 标签，那么你可以使用 `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` 作为你的预设。

::: tip

为链接绑定标签是十分必要的，这可以防止因修改你的预设导致历史评论引用的图片链接失效。

官方的表情包预设，就是通过创建 [walinejs/emojis](https://github.com/walinejs/emojis) 仓库，并使用 CDN 链接来实现的。目前我们正在使用 `v1.1.0` 版本。

:::

::: warning

由于 cdn.jsdelivr.net 在国内受到污染，你可以将 `cdn.jsdelivr.net` 换成 `gcore.jsdelivr.net`

:::

## 使用配置对象

和前文类似，我们假设你有下列文件结构:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

在创建 `info.json` 上传并使用链接作为预设之外，你也可以直接使用下列对象作为预设:

```js
{
  name: "我的 Emoji",
  folder: "https://example.com/myemoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

这里，我们额外添加了 `folder` 属性来告知 Waline 图片的存放位置。
