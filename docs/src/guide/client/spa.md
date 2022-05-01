---
title: 单页应用支持
icon: spa
---

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。

## Vue 组件

如果你在使用一个 Vue 项目，你可以通过导入 `@waline/client/dist/components` 来使用 Waline 组件。

所有组件的属性都是响应式的，这意味着当你更改属性时，评论框会自动更新。

## 其他项目

在其他单页项目应用中，你需要在初始化 Waline 时保存 Waline 函数返回的 `WalineInstance` 实例以便后续使用。

你可以在 `WalineInstance` 上找到一个实例属性 `el` 和两个方法: `update()` 和 `destroy()`。

### update

你可以在任何需要的时刻 (如用户前往新页面后) 调用 `update()` 更新 Waline。`update` 方法接收一个可选参数 `options`，除 `el` 选项外，其他 Waline 初始化选项都可以传入新的值进行更新。

如:

```js
// 在 `/` 路由
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* 用户: 一段时间后，路由变动到 `/a.html` */

waline.update(); // 现在 waline 将开始清除评论并显示加载状态
// 一段时间后，计数器和评论将全部更新

waline.update({
  lang: 'en',
  login: 'disable',
}); // 这将使 Waline 以英文显示，并禁用用户登录
```

#### 工作方式

调用 `update` 时，会把当前选项和历史选项**浅拷贝**合并，并重新根据新参数更新整个 Waline 实例 (同时保存这个新参数)。

该方法的默认行为是: 对于未设置过的参数永远**重新生成默认值**，对于设置过的参数**使用历史值**。

这里有两个选项你可能需要特别留意: `path` 和 `locale`。

::: warning path 注意事项

在 V2 中，`path` 参数在 `update()` 时**总是被重置**。

这意味着在任何一次更新中只要你不指定 `path`，`path` 就会在被重置为 `window.location.pathname`。

:::

::: warning locale 注意事项

由于浅拷贝的关系，旧的 `locale` 选项会被 `update` 传入的新 `locale` 选项完全覆盖。

我们的依据是: 用户更新 locale 的情景通常是想要进行显示语言的切换，所以我们将其设置为插件的预期行为。这种行为提供了通过 `update({ locale: {} })` 清除之前设置的自定义语言配置的能力。

如果你的确需要更新已设置的 `locale` 的某项或某几项，你需要把 `locale` 中所有变动的值重新传入插件。

:::

同时，`update()` 选项已经针对异步网络请求优化，这包括:

- 只有当路径的确发生改变时才刷新评论区重新请求
- 新的 `update()` 调用会自动终止上一个 `update()` 发出的不再需要的请求。

### el

`el` 属性为 Waline 当前实例挂载的 HTMLElement。

如果你在初始化时设置了 `el: null` (即只需要浏览量与评论数功能)，该项为 `null`。

### destroy

你可以使用 `destroy()` 方法销毁 Waline 实例。它会同时清空 Waline 挂载元素中的全部内容。

### 初始化失败

如果你忘记传入 `serverURL` 或者 Waline 无法在页面中通过 `el` 选项找到挂载位置，Waline 会抛出一个 Error 指明错误原因。

### 注意事项

::: warning 取消挂载实例

为了让 Waline 能够正确释放资源，请在移除 Waline 所在元素之前，手动调用 `WalineInstance.destroy()`。

否则，一些监听器可能不会被正确移除。

:::
