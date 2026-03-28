---
title: 絵文字のカスタマイズ
icon: emoji
order: 2
---

`emoji` オプションを設定することで、コメントボックスの絵文字をカスタマイズできます。_プリセットリンク_ または _プリセット設定オブジェクト_ を含む**配列**として設定する必要があります。不要な場合は `false` に設定してください。

<!-- more -->

## プリセット

Waline はすぐに使えるさまざまな絵文字プリセットを提供しています。`emoji` オプションに直接追加できます:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/alus
  ```

- Bmoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bmoji
  ```

- Bilibili

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bilibili
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/qq
  ```

- Tieba

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/tieba
  ```

- Twemoji
  - Emoji:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details その他のプリセット
  - Full: (非推奨)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Body:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Food:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Natural:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Object:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Symbol:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - People:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Sport:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Time:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Travel:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Weather:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Flag:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Soul Knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline は上記の絵文字に関して一切の著作権を持っていません。ご利用は自己責任でお願いします。

:::

### 例

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // Set emoji to Weibo and Bmoji
    emoji: ['//unpkg.com/@waline/emojis@1.4.0/weibo', '//unpkg.com/@waline/emojis@1.4.0/bmoji'],
  });
</script>
```

## 独自プリセットの作成

Waline が提供するプリセットのほかに、独自のプリセットを作成することもできます。[ガイド → 絵文字プリセットの作成](../../cookbook/customize/emoji.md)を参照してください。
