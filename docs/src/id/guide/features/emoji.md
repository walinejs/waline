---
title: Kustomisasi Emoji
icon: emoji
order: 2
---

Anda dapat mengkustomisasi emoji pada kotak komentar dengan menetapkan opsi `emoji`. Opsi ini harus diatur ke **array** yang berisi _tautan preset_ atau _objek konfigurasi preset_. Jika Anda tidak menginginkannya, cukup atur ke `false`.

<!-- more -->

## Preset

Waline menyediakan serangkaian preset emoji yang siap digunakan. Anda dapat menambahkannya langsung ke opsi `emoji`:

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

  ::: details Preset lainnya

  - Full: (Tidak disarankan)

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

Waline TIDAK memiliki hak cipta atas emoji-emoji di atas, gunakan dengan risiko Anda sendiri.

:::

### Contoh

```html
<div id="waline"></div>
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    serverURL: '<YOUR SERVER URL>',

    // Atur emoji ke Weibo dan Bmoji
    emoji: ['//unpkg.com/@waline/emojis@1.4.0/weibo', '//unpkg.com/@waline/emojis@1.4.0/bmoji'],
  });
</script>
```

## Buat Preset Anda Sendiri

Selain preset yang disediakan oleh Waline, Anda dapat membuat preset sendiri. Lihat [Panduan → Membuat Preset Emoji](../../cookbook/customize/emoji.md).
