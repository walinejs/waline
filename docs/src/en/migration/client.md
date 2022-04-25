---
title: Migration to @waline/client V2
icon: migration
---

## API changes

We removed Waline's default export and instead provide the following exports:

- `init`: behave like the old `Waline`
- `version`: version number
- `commentCount`: number of updated comments
- `pageviewCount`: update the number of visits
- `RecentComments`: recent comments

We changed Waline's default export to `init` named export, and to make Waline SSR friendly, V2 exports CSS separately.

In most cases, this just means the following changes:

```diff
- <script src='//cdn.jsdelivr.net/npm/@waline/client'></script>
+ <script src='//cdn.jsdelivr.net/npm/@waline/client/dist/waline.js'></script>
+ <link href='//cdn.jsdelivr.net/npm/@waline/client/dist/waline.css' rel='stylesheet' />

  <script>
-  Waline({
+  Waline.init({
    el: '#waline',
    serverURL: 'YOUR SERVER URL'
  });
  </script>
```

## Options Added

- The `comment` option supports setting strings as CSS selectors.
- The `pageview` option supports setting strings as CSS selectors.

## Options Renamed

- `uploadImage` renamed to `imageUploader`

- `highlight` renamed to `highlighter`

- `previewMath` renamed to `texRenderer`

- `visitor` renamed to `pageview`

## Options Removed

The following options have long been marked as deprecated APIs in V1, they have been removed in V2.

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

## Other changes

### Instance

`Waline.init` now throws an error when the two required properties `el`, `serverURL` are invalid, instead of returning an error instance with reason.

You can use `try { ... } catch (err) { ... }` blocks to catch errors for better compatibility in case that user sets invalid options.

### Update behavior changes

- Waline now supports updating all options except the `el` option via `Instance.update`.
- `path` parameter will reset on `update()`, which means as long as you don't pass `path` options during `update()`, it will be `window.location.pathname`.

### Comments and Pageview Selector Changes

Comments and views on Valine's selector compatibility have now been removed.

- The comment selector defaults to `'.waline-comment-count'`
- The pageview selector defaults to `'.waline-pageview-count'`

If you need to get a different value for a selector than the current page, it is strongly recommended to use the `data-path` attribute.

For compatibility, we still keep the previous `id` attribute support, but this compatibility will be removed in V3.

### CSS class changes

All CSS classes changed from `v` to `wl-`.
