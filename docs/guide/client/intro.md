# 客户端介绍

Waline 官方提供了 [`@waline/client`](https://www.npmjs.com/package/@waline/client) 客户端，使用 Vue + TypeScript 编写，大小仅为 54kb gzip。

## 引入

你可以使用 CDN 或 npm 引入 Waline，我们提供了有样式和无样式两种版本。

关于 Waline 引入，详见 [Waline 引入](./import.md)。

## 初始化

你可以使用 `Waline(options)` 初始化 Waline 实例，其中 `el` 和 `serverURL` 两个选项是必填的。前者为 Waline 挂载的元素或元素选择器，后者为服务端地址。

关于 Waline 的全部初始化参数，详见 [参考 → Waline 客户端配置](../../reference/client.md)。

## 格式支持

Waline 支持丰富的格式。除了在评论区使用标准的 Markdown 与 GFM 语法扩展外，你还可以嵌入 HTML 标签或是是用数学公式。

你可以在 [支持语法](./syntax.md) 章节中了解 Waline 支持的完整格式。

## 功能支持

Waline 支持诸多功能，包括登录、头像、多语言、自定义 Emoji、图片上传和实时预览等功能。你可以在下方 Demo 中对这些功能进行体验。

Waline 官方添加了简体中文、繁体中文、英文和日语的支持，同时你可以在此基础上 [自定义多语言](./i18n.md)

Waline 使用 Gravatar，同时支持你定制默认头像，详见 [头像配置](./avatar.md)。

你可以很轻松的使用 Waline 提供的预设或自己创建新的预设来自定义评论框内的 Emoji 表情，详见 [自定义 Emoji](./emoji.md)。

Waline 内置了图像上传支持，使用 <pic.alexhchu.com> 的图床，你也可以通过 [`uploadImage` 选项](../../reference/client.md#uploadimage) 自定义图像上传。

## 样式定义

为了方便用户对 Waline 样式的调整，Waline 提供了很多可配置的 CSS 变量 (CSS Variables)。同时 Waline 还带来了内置的 [暗黑模式支持](../../reference/client.md#dark)，详见 [自定义样式](./style.md)。

## 评论数和浏览量统计

Waline 支持评论数和浏览量统计，有关使用的详细信息，请参阅 [浏览量统计](./count.md)。

## 单页应用支持

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。如果你想要在使用 history.pushState 的网站中使用，你可以使用 `Waline()` 实例的 `update()` 方法刷新评论区的配置，也可已使用实例上的 `destory()` 方法销毁 Waline。详见 [SPA 支持](./spa.md).

## 无障碍支持

Waline 在 V1 版本完整符合了全部的无障碍标准:

- 所有图标与控件均有其对应的无障碍标签。
- 你可以使用键盘或头戴式指针设备完成与 Waline 所有控件的交互。

这是我们为全球视障及行动障碍人群做出的一点支持！:heart:

## 生态环境

你可以很方便的在 Hexo，VuePress 等工具上通过插件使用 Waline，甚至使用第三方客户端。

有关支持 Waline 的第三方客户端、主题与插件，详见[了解更多 → 生态系统](../../advanced/ecosystem.md)。
