---
title: 兼容历史版本的 Emoji
---

本指南将指导如何兼容 Valine，以及上古版本的 Waline。

<!-- more -->

## 兼容 Valine

Waline 提供了一个 legacy 版本，对 Valine 的 emoji 选项进行了兼容。

在 legacy 版本中，你可以使用 `emojiCDN` 设置 emoji 图片地址前缀，并使用 `emojiMaps` 设置表情 title 与图片的映射。

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

## 历史遗留的样式问题

在历史版本中，由于 HTML 标签会被转义，Emoji 图片完全使用 Markdown 的图片语法，这导致历史版本的 Emoji 是由存粹的 `<img>` 标签进行渲染的。如果你使用了高清表情包，可能会产生显示大小问题。

我们在 `@waline/client@0.16.0` 起，通过改进 Markdown 的渲染方式，成功的修复了 emoji 表情尺寸。

如果你需要对此版本之前发布的评论的 Emoji 表情大小进行适配，你可以使用 CSS 选择器做到这一点:

```css
/* 你需要把 `https://img.t.sinajs.cn` 换成自己的 CDN */
.wl-content img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
