---
title: 客户端简介
icon: client
order: 1
---

Waline 官方提供了 [`@waline/client`](https://www.npmjs.com/package/@waline/client) 客户端，使用 Vue + TypeScript 编写，大小仅为 53kb gzip。

## 引入

你可以使用 CDN 或 npm 引入 Waline 客户端，我们提供了多种版本的文件以应对的场景。

如果你在此过程中有问题，详见:

- [Cookbook → CDN 引入](../../cookbook/import/cdn.md)
- [Cookbook → 项目引入](../../cookbook/import/project.md)

## 调用 Waline

使用 Waline 最简单的方式就是 [快速上手中的方式](./README.md#html-引入-客户端)，从 Waline 中导入 `init` 函数并通过 `init(yourOptions)` 初始化 Waline 实例。

在初始化选项中，`el` 和 `serverURL` 两个选项是必填的。前者为 Waline 挂载的元素或元素选择器，后者为服务端地址。关于 `@waline/client` 的全部初始化参数，详见 [客户端参考 → API](../../reference/client/api.md)。

## 评论数统计

`@waline/client` 同时也提供评论数统计的分包，你可以在博客的文章列表或其他不含评论的页面调用它展示评论数。，详见 [功能 → 评论数统计](../features/comment.md)

## 浏览量统计

Waline 支持页面浏览量统计，如果你不需要评论服务而只是需要浏览量功能的话，Waline 提供了一个 Gzip 大小不足 1KB 大小的统计插件。

关于 `@waline/client` 的浏览量统计，详见 [功能 → 浏览量统计](../features/pageview.md)

## 丰富的评论格式支持

`@waline/client` 支持丰富的格式。除了在评论区使用标准的 Markdown 与 GFM 语法扩展外，你还可以嵌入 HTML 标签、使用数学公式以及其他语法，详见 [功能 → 支持语法](../features/syntax.md)。

`@waline/client` 还支持在评论框中实时预览评论输入，但一些功能因体积原因被默认阉割。如果你希望恢复这些功能，详见:

- [Cookbook → 自定义预览代码高亮器](../../cookbook/customize/highlighter.md)
- [Cookbook → 自定义预览 $\TeX$ 渲染器](../../cookbook/customize/tex-renderer.md)

## 文章反应

觉得评论太麻烦？ Waline 允许你的访客快速表达对文章的反应，比如喜欢、不喜欢、疑惑、无聊、惊喜等，你可以手动启用这个功能，详见 [功能 → 文章反应](../features/reaction.md)。

## 评论功能

Waline 支持诸多基础功能，包括登录、头像、[多语言](../features/i18n.md) 和实时预览等功能。

Waline 允许你为用户设置互动等级标签和自定义标签，详见 [用户标签](../features/label.md)。

## 表情选项卡

`@waline/client` 支持多 Emoji 选项卡，并允许用户通过预设便捷引入 Emoji 选项卡。在官方提供的预设之外，你可以很轻松的创建属于自己的预设。

有关 `@waline/client` 的表情选项卡，详见:

- [功能 → 表情选项卡](../features/emoji.md)
- [Cookbook → 自定义 Emoji](../../cookbook/customize/emoji.md)

## 图片上传

`@waline/client` 内置了图像上传支持，默认将图片转为 Base64 内嵌，当然，你也可以使用自己喜欢的图床。

关于 `@waline/client` 的图片上传配置，详见 [Cookbook → 自定义图片上传](../../cookbook/customize/upload-image.md)。

## 表情包搜索

`@waline/client` 通过 [giphy](https://giphy.com) 提供了表情包搜索功能，并允许你自定义表情包搜索服务，详见:

- [功能 → 表情包搜索](../features/search.md)
- [Cookbook → 自定义表情包搜索](../../cookbook/customize/search.md)

## 多语言支持

`@waline/client` 含有多种语言的内置支持，同时你可以在此基础上新增语言支持或修改 UI 文字，详见:

- [功能 → 设置语言](../features/i18n.md)。
- [Cookbook → 自定义语言](../../cookbook/customize/locale.md)。

## 无障碍支持

Waline 完整支持了全部的无障碍标准:

- 所有图标与控件均有其对应的无障碍标签。
- 你可以使用键盘或头戴式指针设备完成与 Waline 所有控件的交互。

这是我们为全球视障及行动障碍人群做出的一点支持！:heart:

## 自定义样式

Waline 带来了内置的暗黑模式支持，同时为了方便用户对 Waline 样式的调整，Waline 提供了很多可配置的 CSS 变量 (CSS Variables)。

详见 [自定义样式](../features/style.md)。

## 高级开发

### 单页应用支持

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。

如果你想要在基于 history API 的网站或应用中使用，你可以使用初始化得到的实例上的 `update()` 方法刷新评论区的配置，也可已使用实例上的 `destroy()` 方法销毁 Waline。想要了解 `@waline/client` 的响应性，详见 [Cookbook → 响应性](../../cookbook/reactivity.md)。

### 生态环境

你可以很方便的在 Hexo，VuePress 等工具上通过插件使用 Waline，甚至使用第三方客户端。

有关支持 Waline 的第三方客户端、主题与插件，详见 [了解更多 → 生态系统](../../advanced/ecosystem.md)。
