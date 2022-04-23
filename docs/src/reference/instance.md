---
title: 客户端实例
icon: instance
---

## el

当前实例挂载的 DOM 元素对象。

::: note

当初始化指定 `el: null` 时，其为 null。

:::

## update

结构: `(options: Partial<Omit<WalineInitOptions, 'el'>>) => void`

可传入一个可选参数作为需要更新的配置对象，除 `el` 外所有初始化选项均可用。

## destory

结构: `() => void`

销毁当前 Waline 实例。同时清空当前 Waline 挂载元素中的全部内容。
