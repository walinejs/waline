---
title: Legacy Mode
---

This guide will guide how to import Legacy packages for smooth migration from Valine or v0.x v1.x versions of `@waline/client`.

<!-- more -->

## Import

Waline V2 provides a legacy version that is compatible with some of Valine's options, and the 0.x and 1.x options of the @waline/client section.

You need to import `https://unpkg.com/@waline/client@v2/dist/legacy.umd.js` for reference.

## Compatibility

In legacy versions, we provide compatible support for the following options:

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

At the same time, we will warn on the console for the following options that cannot be supported:

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

## Demo

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
