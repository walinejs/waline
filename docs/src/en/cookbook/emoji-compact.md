---
title: Compatible with historical versions of Emoji
---

This cookbook will show you how to display emoji well with Valine, as well as older versions of Waline.

<!-- more -->

## Compatible with Valine

Valine provides a legacy version that is compatible with Valine's emoji options.

In legacy version, you can use `emojiCDN` to set emoji image link prefix, and use `emojiMaps` to set the mapping between emoji title and image.

```html
<!-- Use Legacy version compatible with Valine and Waline V1 clients -->
<script src="https://unpkg.com/@waline/client@v2/dist/legacy.umd.js"></script>
<script>
  Waline({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // Set CDN, such as Weibo emoticon CDN
    emojiCDN: 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/',
    // emoticon title and image map
    emojiMaps: {
      smile: 'e3/2018new_weixioa02_org.png',
      lovely: '09/2018new_keai_org.png',
      // ... more expressions
    },
  });
</script>
```

## Historical Style Issues

In the historical version, since the HTML tags will be escaped, the Emoji images use the Markdown image syntax completely, which causes the Emoji of the historical version to be rendered by the pure `<img>` tag. If you use HD emojis, there may be display size issues.

Since `@waline/client@0.16.0`, we have successfully fixed the emoji size by improving the rendering method of Markdown.

If you need to adapt the emoji size of comments posted before this version, you can do so using CSS selectors:

```css
/* You need to replace `https://img.t.sinajs.cn` with your own CDN */
.wl-content img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
