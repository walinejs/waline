---
title: 客户端介绍
icon: intro
---

Waline 官方提供了 [`@waline/client`](https://www.npmjs.com/package/@waline/client) 客户端，使用 Vue + TypeScript 编写，大小仅为 48kb gzip。

## 引入

你可以使用 CDN 或 npm 引入 Waline，我们提供了多种版本。

关于 Waline 引入，详见 [Waline 引入](./import.md)。

## 初始化

你可以使用 `Waline.init(options)` 初始化 Waline 实例，其中 `el` 和 `serverURL` 两个选项是必填的。前者为 Waline 挂载的元素或元素选择器，后者为服务端地址。

关于 Waline 的全部初始化参数，详见 [参考 → Waline 客户端配置](../../reference/client.md)。

## 浏览量统计

Waline 支持页面浏览量统计，如果你不需要评论服务而只是需要浏览量功能的话，Waline 提供了一个 < 1KB Gzip 大小的统计插件，请参阅 [浏览量统计](pageview.md)。

## 丰富的评论格式支持

Waline 支持丰富的格式。除了在评论区使用标准的 Markdown 与 GFM 语法扩展外，你还可以嵌入 HTML 标签、使用数学公式以及其他语法。

你可以在 [支持语法](./syntax.md) 章节中了解 Waline 支持的完整格式。

## 功能支持

Waline 支持诸多功能，包括登录、头像、多语言、自定义 Emoji、图片上传和实时预览等功能。你可以在下方 Demo 中对这些功能进行体验。

Waline 官方添加了多种语言的内置支持，同时你可以在此基础上 [自定义多语言](./i18n.md)。

Waline 服务端默认使用 [Libravatar 头像配置](../server/intro.md#头像配置)。

你可以很轻松的使用 Waline 提供的预设或自己创建新的预设来自定义评论框内的 Emoji 表情，详见 [自定义 Emoji](./emoji.md)。

Waline 内置了图像上传支持，默认将图片转为 Base64 内嵌，你也可以通过 [`imageUploader` 选项](../../reference/client.md#uploadimage) 完全自定义图像上传过程，比如到你想要使用的图床。

## 自定义样式

Waline 带来了内置的暗黑模式支持，同时为了方便用户对 Waline 样式的调整，Waline 提供了很多可配置的 CSS 变量 (CSS Variables)。

详见 [自定义样式](./style.md)。

## 评论数统计

Waline 支持在页面的其他部分显示评论数，请参阅 [评论统计](comment.md) 。

## Vue 组件

由于 Waline 官方客户端基于 Vue3，Waline 同时提供了一个 13KB Gzip 大小的 Vue 组件，所有的组件属性都是响应式的。

如果你在使用基于 Vue 的项目，你可以直接在项目中导入并使用 Waline 组件，详见 [Vue 组件](./component.md)。

## 单页应用支持

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。如果你想要在使用 history.pushState 的网站中使用，你可以使用 `Waline()` 实例的 `update()` 方法刷新评论区的配置，也可已使用实例上的 `destory()` 方法销毁 Waline。详见 [SPA 支持](./spa.md).

## 无障碍支持

Waline 完整支持了全部的无障碍标准:

- 所有图标与控件均有其对应的无障碍标签。
- 你可以使用键盘或头戴式指针设备完成与 Waline 所有控件的交互。

这是我们为全球视障及行动障碍人群做出的一点支持！:heart:

## 生态环境

你可以很方便的在 Hexo，VuePress 等工具上通过插件使用 Waline，甚至使用第三方客户端。

有关支持 Waline 的第三方客户端、主题与插件，详见[了解更多 → 生态系统](../../advanced/ecosystem.md)。
