---
title: Nhập Waline qua CDN
icon: import
order: 1
---

Sổ tay này hướng dẫn cách nhập Waline qua CDN.

<!-- more -->

Với người dùng Trung Quốc đại lục, chúng tôi khuyên dùng [unpkg](https://unpkg.com/@waline/client). Với người dùng nước ngoài, chúng tôi khuyên dùng jsDelivr.

Kể từ V3, phần kiểu dáng của Waline được cung cấp dưới dạng một tệp CSS riêng để giữ cho client thân thiện với SSR. Điều này có nghĩa là bạn cần nhập tệp CSS của Waline, sau đó nhập và gọi tệp script của Waline.

## Bình luận

Thông thường, bạn có thể muốn Waline hiển thị danh sách bình luận, khi đó bạn có thể nhập Waline như sau:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Lượt xem và bình luận

Đôi khi, bạn có thể muốn hiển thị số lượt xem và số bình luận của bài viết trên trang chủ hoặc trong danh sách bài viết nhưng không cần tải thành phần bình luận, khi đó bạn có thể nhập một tệp script Gzip < 1KB theo các cách sau:

Lượt xem:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Số bình luận:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Thêm

::: info Chỉ định phiên bản

Bạn có thể đã nhận ra rằng trong các ví dụ trên, chúng ta đã khai báo rõ phiên bản `@v3` sau `@waline/client`. Điều này được khuyến nghị vì nó giúp trang web của bạn không bị hỏng khi một phiên bản major mới của client Waline được phát hành.

:::
