---
title: 絵文字のカスタマイズ
icon: emoji
order: 2
---

`emoji` オプションを設定すると、コメント欄の絵文字をカスタマイズできます。_プリセットリンク_ または _プリセット設定オブジェクト_ を含む**配列**を設定してください。不要な場合は `false` に設定するだけです。

<!-- more -->

## プリセット

Waline はすぐに使える絵文字プリセットを多数提供しています。`emoji` オプションに直接追加できます：

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
  - 絵文字:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details その他のプリセット
  - すべて:（非推奨）

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - 体:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - 食べ物:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - 自然:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - オブジェクト:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - 記号:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - 人:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - スポーツ:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - 時間:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - 旅行:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - 天気:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - 旗:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- Weibo

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- Soul knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline は上記の絵文字に関する著作権を一切保有していません。自己責任でご利用ください。

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

## 独自のプリセットを作成する

Waline が提供するプリセットのほか、独自のプリセットを作成できます。詳しくは [ガイド → 絵文字プリセットの作成](../../cookbook/customize/emoji.md) を参照してください。
