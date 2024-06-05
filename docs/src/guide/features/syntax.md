---
title: 评论格式支持
icon: format
order: 1
---

你可以在评论中添加多样化的内容，包括经过扩展的 Markdown 语法和 HTML 标签。

<!-- more -->

## 格式支持

我们支持完整的 CommonMark (标准 Markdown 语法)，同时支持以下扩展:

- GFM 风格的表格
- GFM 风格的删除线
- 上下角标
- Emoji 表情
- 代码块高亮
- $\TeX$ 公式

::: info GFM

Github Flavored Markdown, 即 Github 风格语法

:::

同时，你可以在不触发 [保护机制](./safety.md#评论安全) 的情况下自由嵌入任何的 HTML 内容。

## 有限的预览支持

为了控制客户端体积大小，我们仅在官方客户端 `@waline/client` 放置了小体积的 Markdown 解析器，这导致很多语法并**不能在预览面板内正确显示** (它们可以**正确的渲染在评论区**)。

这包含如下限制:

- 标准的 emoji 语法 (如 :tada:`:tada:`) 无法正确渲染

- 上下角标 (如: `H~2~O`、`x^2^`) 无法正确渲染

- $\TeX$ 语法，也就是数学公式 (如: `$a = 1$`) 默认无法渲染。

  在官方客户端下，你可以通过设置 `texRenderer` 选项来设置预览时的 $\TeX$ 渲染,，参见 [Cookbook → 使用自定义 TeX 渲染器](../../cookbook/customize/tex-renderer.md)。

- 在默认的高亮器下，代码块将通过特定分隔符使用随机颜色进行高亮。

  在官方客户端下，你可以通过设置 `highlighter` 选项来设置预览时的代码高亮，参见 [Cookbook → 自定义代码高亮](../../cookbook/customize/highlighter.md)。

## 更多

::: tip 运行原理

1. 考虑到体积问题，客户端使用 `marked` 进行渲染并默认使用 < 1kb 的高亮器进行高亮，同时不包含 $\TeX$ 渲染器，导致以上限制。

1. 用户提交评论时，客户端嵌入自定义 Emoji 表情图片、并将评论原文会发送到服务端。

1. 服务端接收到原文，使用 `markdown-it` 以相关插件对 markdown 进行正确的渲染，同时使用 `prism.js` 为代码块根据语言进行高亮，并按照用户设置进行 $\TeX$ 渲染，最后执行 XSS 处理。

1. 处理完成后，服务端会将正确的渲染内容进行储存，并在需要时返回给客户端，保证评论区正常显示。

:::
