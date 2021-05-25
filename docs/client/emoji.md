# 自定义表情

Waline 提供了一系列可以立即使用的表情预设。你可以直接将 emoji 选项设置为包含它们的数组。

## 可用预设

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

## 历史问题

### Valine 兼容

::: tip

虽然 Waline 目前仍在兼容 Valine 的自定义表情写法，但此兼容会在未来版本中移除，请尽快迁移到 `emoji` 选项。

:::

使用 `emojiCDN` 设置 emoji 图片地址前缀，并使用 `emojiMaps` 设置表情 title 与图片的映射:

```js
new Waline({
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
```

### 样式问题

在历史版本中，由于 HTML 标签会被转义，Emoji 图片完全使用 Markdown 的图片语法，这导致历史版本的 Emoji 是由存粹的 `<img>` 标签进行渲染的。如果你使用了高清表情包，可能会产生显示大小问题。在 `@waline/client@0.16.0` 以后，表情 emoji 的大小被成功修复。

如果你需要对历史版本的 Emoji 表情大小进行适配，你可以使用 CSS 选择器做到这一点:

```css
/* 你需要把 `https://img.t.sinajs.cn` 换成自己的 CDN */
.v[data-class='v'] .vcontent img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
