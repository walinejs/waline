---
title: Emoji Customize
icon: emoji
---

You can customize the emoji of the comment box by setting `emoji` option, you should set it to an **array** containing _preset link_ or _preset config object_. If you don't want it, just set it to `false`.

<!-- more -->

## Presets

Waline provides a series of emoji presets that can be used out of box. You can add them directly to the `emoji` options:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.0.1/alus
  ```

- Bilibili

  ```http
  https://unpkg.com/@waline/emojis@1.0.1/bilibili
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.0.1/qq
  ```

- Tieba

  ```http
  https://unpkg.com/@waline/emojis@1.0.1/tieba
  ```

- Twemoji

  - Emoji:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-emoji
    ```

  ::: details Others presets

  - Full: (Not recommand)

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw
    ```

  - Body:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-body
    ```

  - Food:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-food
    ```

  - Natural:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-natural
    ```

  - Object:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-object
    ```

  - Symbol:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-symbol
    ```

  - People:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-people
    ```

  - Sport:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-sport
    ```

  - Time:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-time
    ```

  - Travel:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-travel
    ```

  - Weather:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-weather
    ```

  - Flag:

    ```http
    https://unpkg.com/@waline/emojis@1.0.1/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.0.1/weibo
  ```

::: warning

Waline DO NOT have any copright of above emojis, use them at your own risk.

:::

### Example

```js
Waline.init({
  el: '#waline',
  serverURL: '<YOUR SERVER URL>',

  // Set emoji to Weibo and Bilibili
  emoji: [
    '//unpkg.com/@waline/emojis@1.0.1/weibo',
    '//unpkg.com/@waline/emojis@1.0.1/bilibili',
  ],
});
```

## Creating own preset

Besides presets provided by Waline, you can create one by yourself.

You need to place all emoticons in an accessible server folder, then create `info.json` in the root directory and set the following options:

- `name`: emoji name on the tab

- `prefix` (optional): The general prefix of images' filename

  ::: tip Recommanded

  When you set multiple emojis tabs, we recommend you to add a common prefix to all emoji images in one tab to prevent conflicts with other emoji titles.

  :::

- `type` (optional): type of the picture, which will be used as file extension

  ::: tip

  The emojis should be a set of images with same size and same file format. If you DO need to use different types of images, please leave this blank and manually specify the suffix in the next two options.

  :::

- `icon`: filename of the icon image used in tab (requirement is the same as `items`)

- `items`: Array, each item is the picture filename without common prefix (do not include file extension)

  ::: tip

  The order of the array is the order in which the emojis are arranged.

  :::

### Demo

We assume that you have the following files:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

Your `info.json` can be:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Then you can use `'https://example.com/myemoji'` as a available preset in `emoji` option. (ending with `/` suffix or not is both OK)

### Advanced

We recommend you to upload images to a GitHub repo and add a tag after each modification. In this way, you can use the GitHub tag CDN link on [cdn.jsdelivr.net](https://www.jsdelivr.com/) as your preset, which format is `https://cdn.jsdelivr.net/ gh/user/repo@version/file`. After the tag is bound, original links referenced by the historical comment will still be valid if you edit the images.

::: tip

The official presets are using the `v1.0.0` version of [walinejs/emoji](https://github.com/walinejs/emoji).

:::

## Using config objects

Besides creating `info.json` under the image folder to create presets, you can directly add config objects to the `emoji` option.

The format of the config object is only one place different from `info.json`: you should add the `folder` option and set image folder link additionally (DO NOT add trailing `/`) so that Waline can find your images.

### Example

If you have the following files:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

You can add

```js
{
  name: "My Emoji",
  folder: "https://example.com/myemoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

to the `emoji` option as a config item.

## Historical issues

### Valine support

::: warning

Though Waline is still compatible with Valine's custom emoji syntax, this compatibility will be removed in V2 version. Please migrate to the `emoji` option whenever possile.

:::

Use `emojiCDN` to set the address prefix of emoji images, and use `emojiMaps` to set the mapping between emoji title and image:

```js
Waline.init({
  el: '#waline',
  serverURL: '<YOUR SERVER URL>',

  // Set CDN here, such as weibo CDN
  emojiCDN: 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/',
  // Emoji title and image map
  emojiMaps: {
    smile: 'e3/2018new_weixioa02_org.png',
    lovely: '09/2018new_keai_org.png',
    // ... more emojis
  },
});
```

### Emoji Size Issue

In historical versions, since HTML tags will be escaped, Emoji images completely use Markdown's image syntax, which results of Emoji being rendered by the original `<img>` tag in historical versions. If you use a high-definition emoticon pack, it may cause display size problems. After `@waline/client@0.16.0`, the emoji size was successfully repaired.

If you need to adapt the emoji size of the historical version, you can use the CSS selector to do this:

```css
/* You need to replace `https://img.t.sinajs.cn` with your own CDN */
.wl-content img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
