---
title: Tùy chỉnh emoji
icon: emoji
order: 2
---

Bạn có thể tùy chỉnh emoji của khung bình luận bằng cách đặt tùy chọn `emoji`. Giá trị của nó phải là một **mảng** chứa _liên kết bộ emoji có sẵn_ hoặc _đối tượng cấu hình bộ emoji có sẵn_. Nếu không muốn dùng, chỉ cần đặt thành `false`.

<!-- more -->

## Bộ emoji có sẵn

Waline cung cấp một loạt bộ emoji dùng được ngay. Bạn có thể thêm trực tiếp chúng vào tùy chọn `emoji`:

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

  ::: details Các bộ emoji khác
  - Đầy đủ: (không khuyến nghị)

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw
    ```

  - Cơ thể:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-body
    ```

  - Đồ ăn:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-food
    ```

  - Tự nhiên:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-natural
    ```

  - Đồ vật:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-object
    ```

  - Ký hiệu:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-symbol
    ```

  - Con người:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-people
    ```

  - Thể thao:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-sport
    ```

  - Thời gian:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-time
    ```

  - Du lịch:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-travel
    ```

  - Thời tiết:

    ```http
    https://unpkg.com/@waline/emojis@1.4.0/tw-weather
    ```

  - Cờ:

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

Waline KHÔNG sở hữu bản quyền của các bộ emoji trên, hãy tự chịu rủi ro khi sử dụng.

:::

### Ví dụ

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

## Tự tạo bộ emoji của riêng bạn

Ngoài các bộ emoji có sẵn do Waline cung cấp, bạn có thể tự tạo bộ emoji riêng, xem [Sổ tay → Tạo bộ emoji](../../cookbook/customize/emoji.md).
