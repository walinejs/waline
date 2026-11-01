---
title: Bộ đếm lượt xem
icon: counter
order: 7
---

Waline hỗ trợ đếm lượt xem trang.

<!-- more -->

## Dùng cùng bình luận

Nếu bạn đang dùng dịch vụ bình luận của Waline, bạn có thể bật thống kê lượt xem bằng cách đặt tùy chọn `pageview` thành `true` khi khởi tạo:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline sẽ tự động tìm các phần tử có giá trị `class` là `waline-pageview-count` trong trang, lấy `data-path` của chúng làm điều kiện truy vấn, rồi điền giá trị thu được vào đó:

Nếu cần một bộ chọn khác, bạn có thể đặt tùy chọn `pageview` thành bộ chọn đó.

```html
<!-- data-path will be the query condition -->
Pageviews: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></span>
```

Mỗi lần bạn gọi `WalineInstance.update()`, Waline sẽ tìm lại nội dung trang và tự động cập nhật lượt xem.

::: tip Ví dụ

```html
The current page has been viewed
<span class="waline-pageview-count" data-path="/vi-VN/guide/client/count.html" />
times.
```

Trang hiện tại đã được xem
<span class="waline-pageview-count" data-path="/vi-VN/guide/client/count.html" /> lần.

:::

## Dùng độc lập

Nếu chỉ cần dùng chức năng thống kê lượt xem, bạn có thể nhập mô-đun pageview do Waline cung cấp, kích thước Gzip của nó < 1KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Lượt xem trang hiện tại: <span class="waline-pageview-count" />

- Lượt xem trang chủ: <span class="waline-pageview-count" data-path="/" />

::: info Hủy thao tác

Vì việc lấy lượt xem là một thao tác mạng bất đồng bộ, trong một số trường hợp bạn có thể cần hủy thao tác cập nhật lượt xem đang diễn ra.

`pageviewCount` trả về một hàm, bạn có thể gọi hàm này để hủy việc cập nhật:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // After 500ms, if the network request has not been completed, cancel this operation
  setTimeout(() => abort(), 500);
</script>
```

:::
