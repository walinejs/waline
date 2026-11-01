---
title: Nhập Waline qua CDN
icon: import
order: 1
---

Sổ tay này hướng dẫn cách nhập Waline qua CDN.

<!-- more -->

Với người dùng Trung Quốc đại lục, chúng tôi khuyên dùng [unpkg](https://unpkg.com/@waline/client). Với người dùng nước ngoài, chúng tôi khuyên dùng jsDelivr.

Để Waline thân thiện với SSR, chúng tôi đã tách riêng phần kiểu dáng của Waline trong phiên bản V2. Điều này có nghĩa là bạn cần nhập tệp CSS của Waline, rồi nhập tệp script của Waline và gọi Waline.

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

Bạn có thể đã nhận ra rằng trong các trường hợp trên, chúng ta đã khai báo rõ phiên bản `@v2` sau `@aline/client`. Trang web của bạn sẽ không hoạt động bình thường.

:::
