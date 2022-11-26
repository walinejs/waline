---
title: Legacy 模式
---

本指南将指导如何引入 Legacy 包，来平滑的从 Valine 或者 v0.x v1.x 的 `@waline/client` 迁移。

<!-- more -->

## 引入

Waline V2 提供了一个 legacy 版本，对 Valine 的部分选项，以及 @waline/client 部分的 0.x 和 1.x 选项进行了兼容。

你需要引入 `https://unpkg.com/@waline/client@v2/dist/legacy.umd.js` 进行引用。

## 兼容情况

在 legacy 版本中，我们提供了下列选项的兼容支持:

- `emojiCDN`
- `emojiMaps`
- `requiredFields`
- `visitor`
- `langMode`
- `placeholder`
- `highlight`
- `uploadImage`
- `previewMath`
- `anonymous`
- `copyRight`

同时，我们会对无法提供支持的下列选项在控制台进行警告:

- `region`
- `appId`
- `appKey`
- `notify`
- `verify`
- `avatar`
- `avatarForce`
- `enableQQ`
- `recordIP`
- `serverURLs`
- `avatarCDN`
- `mathTagSupport`

## 例子

```html
<!-- 使用与 Valine 和 Waline V1 客户端兼容的 Legacy 版本 -->
<script src="https://unpkg.com/@waline/client@v2/dist/legacy.umd.js"></script>
<script>
  Waline({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // 设置 CDN, 如微博表情 CDN
    emojiCDN: 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/',
    // 表情 title 和图片映射
    emojiMaps: {
      smile: 'e3/2018new_weixioa02_org.png',
      lovely: '09/2018new_keai_org.png',
      // ... 更多表情
    },
  });
</script>
```
