---
title: 表情符號分頁
icon: emoji
order: 2
---

你可以透過設定 `emoji` 選項自訂留言輸入框的表情符號，你應該將它設定為包含*預設網址*或*預設設定物件*的**陣列**。如果你不需要它，只需將它設定為 `false`。

<!-- more -->

## 預設

Waline 提供了一系列開箱即用的表情符號預設。你可以直接將它們加入 `emoji` 選項中:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/alus
  ```

- 嗶哩嗶哩

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bilibili
  ```

- 嗶哩嗶哩小黃臉

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/bmoji
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/qq
  ```

- 貼吧

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/tieba
  ```

- Twitter Emoji
  - 表情符號:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-emoji
    ```

  ::: details 其他可用預設
  - 完整: (不建議使用)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - 身體:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - 食物:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - 自然:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - 物件:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - 符號:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - 人物:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - 運動:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - 時間:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - 旅遊:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - 天氣:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - 旗幟:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-flag
    ```

  :::

- 微博

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/weibo
  ```

- 《元氣騎士》

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline 不含有上述 Emoji 表情符號的任何著作權，你需要自行承擔使用風險。

:::

### 範例

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',
    // 將 emoji 設定為微博與嗶哩小黃臉
    emoji: ['//unpkg.com/@waline/emojis@1.4.0/weibo', '//unpkg.com/@waline/emojis@1.4.0/bmoji'],
  });
</script>
```

## 建立自己的預設

除了 Waline 提供的預設外，你可以建立自己的預設，參見 [Cookbook → 建立 emoji 預設](../../cookbook/customize/emoji.md)。
