---
title: Waline 客户端 V2 迁移指南
icon: migration
---

## API 更改

我们取消了 Waline 的默认导出，进而提供下列导出:

- `init`: 行为模式同旧的 `Waline`
- `version`: 版本号
- `commentCount`: 更新评论数
- `pageviewCount`: 更新访问数
- `RecentComments`: 最近评论

我们将 Waline 的默认导出改为 `init` 命名导出，同时为了使 Waline SSR 友好，V2 将 CSS 单独输出。

在大多数情况下，这只意味着下列更改:

```diff
- <script src='//cdn.jsdelivr.net/npm/@waline/client'></script>
+ <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
+ <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

  <script>
-  Waline({
+  Waline.init({
    el: '#waline',
    serverURL: 'YOUR SERVER URL'
  });
  </script>
```

## 新增选项

- `comment` 选项支持设置字符串作为 CSS 选择器。
- `pageview` 选项支持设置字符串作为 CSS 选择器。

## 选项重命名

- `uploadImage` 更名为 `imageUploader`

- `highlight` 更名为 `highlighter`

- `previewMath` 更名为 `texRenderer`

- `visitor` 更名为 `pageview`

## 选项移除

以下选项已在 V1 中长时间标记为废弃 API，它们已在 V2 中移除。

- `langMode`
- `placeholder`
- `emojiCDN`
- `emojiMaps`
- `requiredFields`
- `avatar`
- `avatarCDN`
- `avatarForce`
- `anonymous`
- `mathTagSupport`
- `copyRight`

## 其他变更

### 实例变更

现在 `Waline.init` 会在 `el`, `serverURL` 两个必填属性非法时直接抛出错误，而不是返回一个错误实例表明原因。

你可以使用 `try { ... } catch (err) { ... }` 块来捕获错误以更好的兼容用户配置错误的情况。

### 更新行为变更

- Waline 现在支持通过 `Instance.update` 更新 `el` 选项之外的所有选项。
- `path` 参数在 `update()` 时会被重置，这意味着只要你不传入 `path`，它就会被重置为 `window.location.pathname`。

### 评论与浏览量选择器变更

现在，评论与浏览量关于 Valine 的选择器兼容已被移除。

- 评论选择器默认为 `'.waline-comment-count'`
- 浏览量选择器默认为 `'.waline-pageview-count'`

如果你需要为某个选择器获取不同于当前页面的对应值时，强烈建议使用 `data-path` 属性。

为了兼容性，我们仍然保留先前的 `id` 属性支持，但此兼容会在 V3 移除。

### CSS 类变更

所有 CSS 类从 `v` 开头改为 `wl-` 开头。
