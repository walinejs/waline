# 单页应用支持

Waline 为 SPA(**S**ingle **P**age **A**pplication, 单页应用) 带来了支持。

在单页应用中，你需要在初始化 Waline 时保存 Waline 函数返回的 `WalineInstance` 实例以便后续使用。

你可以在 `WalineInstance` 上找到一个实例属性 `el` 和两个方法: `update()` 和 `destroy()`。

## el

`el` 属性为 Waline 当前实例挂载的 HTMLElement。

如果你不设置 `el` 初始化 Waline (即只使用浏览量与评论数功能)，该项为 `null`。

## update

你可以调用 `update()` 更新 Waline。`update` 方法接收一个可选参数 `options`，除 `el` 和 `dark` 选项外，其他 Waline 初始化选项都可以传入新的值进行更新。

如:

```js
// 在 `/` 路由
const waline = Walien({
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

### 工作方式

调用 `update` 时，会把当前选项和历史选项**浅拷贝**合并，并重新根据新参数更新整个 Waline 实例 (同时保存这个新参数)。

该方法的默认行为是: 对于未设置过的参数永远**重新生成默认值**，对于设置过的参数**使用历史值**。

这里有两个选项你可能需要特别留意: `path` 和 `locale`。

::: warning path 注意事项

你需要注意，`path` 选项的默认值是 `window.location.pathname`。正如前文所说:

> 对于未设置过的参数永远**重新生成默认值**，对于设置过的参数**使用历史值**。

如果你从未设置 `path` 选项，每次 `update()` 我们会自动更新 `path` 为当前页面路径。

只要你历史曾经设置过 `path`，无 `path` 参数调用 `update()` 的行为就将是使用这个历史值。这种情况下你可以随时通过设置 `path` 为 `undefined` 来使此次和之后的调用重新动态读取 `path`。

:::

::: warning locale 注意事项

由于浅拷贝的关系，`locale` 选项会被 `update` 传入的新 `locale` 选项完全覆盖。

我们的依据是: 用户更新 locale 的情景通常是想要进行显示语言的切换，所以我们将其设置为插件的预期行为。这也意味着你可以通过 `update({ locale: {} })` 清除之前设置的自定义语言配置。

如果你的确需要更新已设置的 `locale` 的某项或某几项，你需要把更新后的整个 `locale` 传入插件。

:::

同时，`update()` 选项已经针对异步网络请求优化，这包括:

- 只有当路径的确发生改变时才刷新评论区重新请求
- 新的 `update()` 调用会自动终止上一个 `update()` 发出的不再需要的请求。

## destroy

你可以使用 `destroy()` 方法销毁 Waline 实例。它会同时清空 Waline 挂载元素中的全部内容。

## 初始化失败

如果你忘记传入 `serverURL` 或者 Waline 无法在页面中通过 `el` 选项找到挂载位置，Waline 会返回一个 `WalineErrorInstance`。

`WalineErrorInstance` 上只有一个属性 `errMsg` 标明初始化失败的原因。
