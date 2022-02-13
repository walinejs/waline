---
title: 客户端实例
icon: instance
---

## el

当前实例挂载的 DOM 元素对象

## update

结构: `(options: Partial<Omit<WalineOptions, 'el' | 'dark'>>) => void`

可传入一个可选参数作为需要更新的配置对象，除 `el` 和 `dark` 外所有初始化选项均可用。

## destory

结构: `() => void`

销毁当前 Waline 实例。同时清空当前 Waline 挂载元素中的全部内容。
