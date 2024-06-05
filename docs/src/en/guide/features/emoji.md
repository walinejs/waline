---
title: Emoji Customize
icon: emoji
order: 2
---

You can customize the emoji of the comment box by setting `emoji` option, you should set it to an **array** containing _preset link_ or _preset config object_. If you don't want it, just set it to `false`.

<!-- more -->

## Presets

Waline provides a series of emoji presets that can be used out of box. You can add them directly to the `emoji` options:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/alus
  ```

- Bmoji

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/bmoji
  ```

- Bilibili

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/bilibili
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/qq
  ```

- Tieba

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/tieba
  ```

- Twemoji

  - Emoji:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-emoji
    ```

  ::: details Others presets

  - Full: (Not recommended)

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw
    ```

  - Body:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-body
    ```

  - Food:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-food
    ```

  - Natural:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-natural
    ```

  - Object:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-object
    ```

  - Symbol:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-symbol
    ```

  - People:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-people
    ```

  - Sport:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-sport
    ```

  - Time:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-time
    ```

  - Travel:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-travel
    ```

  - Weather:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-weather
    ```

  - Flag:

    ```http
    https://unpkg.com/@waline/emojis@1.2.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/weibo
  ```

- Soul knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.2.0/soul-emoji
  ```

::: warning

Waline DO NOT have any copyright of above emojis, use them at your own risk.

:::

### Example

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // Set emoji to Weibo and Bmoji
    emoji: [
      '//unpkg.com/@waline/emojis@1.2.0/weibo',
      '//unpkg.com/@waline/emojis@1.2.0/bmoji',
    ],
  });
</script>
```

## Create your own presets

Besides the presets provided by Waline, you can create your own presets, see [Guide → Create Emoji Presets](../../cookbook/customize/emoji.md).
