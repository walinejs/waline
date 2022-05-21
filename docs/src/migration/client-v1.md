---
title: Waline 客户端 V1 迁移指南
icon: migration
---

V1 有数处更改，破坏性变更详见 [初始化变更](#初始化变更) 和 [挂件更改](#挂件更改)。

## 新功能

- Emoji 预设支持: 你现在可以直接填入 Emoji 预设链接完成 Emoji 的配置
- 多 Emoji 选项卡: 现在 Emoji 可以包含含有多个选项卡，以便添加多种不同类型的 Emoji
- 图片上传优化: 我们添加了图片上传按钮，以提示访客可以上传图片
- 拖拽支持: 你现在可以直接将文字或图片拖拽到评论框中完成文字的输入或图片的添加。
- 响应式与 SPA: 现在 Waline 将返回一个响应式的实例，并支持 SPA 应用，详见 [响应式](#响应式)

## 体积减小

v1 版本是基于 Vue 与 TypeScript 的完全重写，所以大小从 78.4kb 减小至 54.0kb (gzip)。

## 选项变更

以下选项标记为 `废弃`，相关兼容已在 v2 移除。

- `placeholder` → 请通过 `locale.placeholder` 选项设置

  ::: tip

  此改动是为了让默认的 placeholder 可以适配多语言

  :::

- `emojiCDN`、`emojiMaps`→ 请使用新的 `emoji` 选项

  ::: tip

  我们带来了多 Emoji 选项卡和 Emoji 预设支持。Emoji 配置将对大多数使用者来说更为简单。

  :::

- `anonymous` → 请使用新的 `login` 选项

  ::: tip

  由于 Waline 带来了登录支持，我们将先前的

  - `anonymous: undefined`:匿名评论和登录均可
  - `anonymous: true`: 禁用登录
  - `anonymous: false`: 无法匿名评论，即只有登录后才能评论

  改为了

  - `login: 'enable'`: 启用登录
  - `login: 'disable'`: 禁用登录
  - `login: 'force'`: 强制登录

  此选项应该更加直观。

  :::

## 选项重命名

原先的选项存在含义不明，Chinglish 或命名不一致等问题。下列是重命名的选项，其行为与先前保持一致。旧选项同样标记为 `废弃`，相关兼容兼容将在 v2 移除。

- `langmode` → 重命名为 `locale`

  ::: tip

  此改动改进了选项的英文翻译。

  :::

- `requiredFields` → 重命名为 `requiredMeta`

  ::: tip

  此改动是为了与 `meta` 选项进行对齐。

  :::

## 行为变更

### 响应式

现在 Waline 将是完全响应式的，调用 Waline 将会返回一个 `WalineInstance` 实例，你可以通过调用 `WalineInstance` 上的 `update()` 方法更新 Waline 的选项，或是使用 `WalineInstance` 上的 `destroy()` 方法销毁实例。

此改变将使 Waline 支持 SPA 应用，详情请见 [SPA 支持](../guide/client/spa.md)。

### 初始化变更

由于 Waline 函数现在返回一个 Waline 实例，我们在 Waline 初始化时加强了检测。如果 Waline 不能正确的挂载。我们会返回 `WalineErrorInstance` 实例，实例上只有一个 `errMsg` 表明初始化的错误原因。

::: warning BREAKING CHANGE

如果你只是想让 Waline 更新页面内的评论数与浏览量，而**不需要 Waline 挂载到当前页面时**，请**不要设置选项 `el`**。

:::

## 挂件更改

::: warning BREAKING CHANGE

`RecentComments` 现在将返回 `Promise <{comment: commentData[], destroy: () => void}>` 而不是 `Promise<CommentData[]>`。

:::
