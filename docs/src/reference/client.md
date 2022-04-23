---
title: 初始化选项
icon: config
---

初始化选项接受所有 [Waline 组件](component.md) 支持的选项，此外，新增下列选项。

## el

- 类型: `string | HTMLElement | null`
- 默认值: `'#waline'`

Waline 的初始化挂载器。必须是一个有效的 **CSS 选择器** 或 HTMLELement 对象。

如果你只需要下方的统计，请将此选项设置为 `null`。

## comment

- 类型: `boolean | string`
- 默认值: `false`

文章评论数统计，填入字符串时会作为 CSS 选择器。

## pageview

- 类型: `boolean | string`
- 默认值: `false`

文章浏览量统计，填入字符串时会作为 CSS 选择器。
