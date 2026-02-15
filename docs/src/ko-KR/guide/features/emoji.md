---
title: 이모지 사용자 정의
icon: emoji
order: 2
---

`emoji` 옵션을 설정하여 댓글 상자의 이모지를 사용자 정의할 수 있습니다. _프리셋 링크_ 또는 _프리셋 설정 객체_를 포함하는 **배열**로 설정해야 합니다. 이모지를 원하지 않는 경우 `false`로 설정하면 됩니다.

<!-- more -->

## 프리셋

Waline은 바로 사용할 수 있는 일련의 이모지 프리셋을 제공합니다. `emoji` 옵션에 직접 추가할 수 있습니다:

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

  ::: details 기타 프리셋
  - Full: (권장하지 않음)

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

- Soul knight Emoji

  ```http
  https://unpkg.com/@waline/emojis@1.4.0/soul-emoji
  ```

::: warning

Waline은 위 이모지에 대한 저작권을 보유하고 있지 않으며, 사용에 따른 책임은 본인에게 있습니다.

:::

### 예시

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

## 나만의 프리셋 만들기

Waline에서 제공하는 프리셋 외에도 나만의 프리셋을 만들 수 있습니다. [가이드 → 이모지 프리셋 만들기](../../cookbook/customize/emoji.md)를 참조하세요.
