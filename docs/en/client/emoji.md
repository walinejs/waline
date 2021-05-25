# Custom emoji

Waline provides a series of emoji presets that can be used immediately. You can directly set the emoji options to an array containing them.

## Available items

- Alus

  ```
  https://cdn.jsdelivr.net/gh/walinejs/emojis/alus
  ```

- Bilibili

  ```
  https://cdn.jsdelivr.net/gh/walinejs/emojis/bilibili
  ```

- QQ

  ```
  https://cdn.jsdelivr.net/gh/walinejs/emojis/qq
  ```

- Tieba

  ```
  https://cdn.jsdelivr.net/gh/walinejs/emojis/tieba
  ```

- Twemoji

  - Emoji:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-emoji
    ```

  ::: details Others

  - Full: (Not recommand)

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw
    ```

  - People:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-people
    ```

  - Body:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-body
    ```

  - Flag:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-flag
    ```

  - Food:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-food
    ```

  - Natural:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-natural
    ```

  - Object:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-object
    ```

  - Sport:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-sport
    ```

  - Symbol:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-symbol
    ```

  - Time:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-time
    ```

  - Travel:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-travel
    ```

  - Weather:

    ```
    https://cdn.jsdelivr.net/gh/walinejs/emojis/tw-weather
    ```

  :::

- Weibo

  ```
  https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo
  ```

## Historical issues

### Valine support

::: tip

Although Waline is still compatible with Valine's custom emoji syntax, this compatibility will be removed in future versions. Please migrate to the `emoji` option as soon as possible.

:::

Use `emojiCDN` to set the address prefix of emoji images, and use `emojiMaps` to set the mapping between emoji title and image:

```js
new Waline({
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
.v[data-class='v'] .vcontent img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
