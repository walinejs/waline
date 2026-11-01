---
title: Tiện ích bình luận gần đây
icon: recent
---

Waline hỗ trợ hiển thị bình luận gần đây bằng tiện ích, thuận tiện cho việc hiển thị bình luận mới nhất ở thanh bên của blog.

<!-- more -->

## Tùy chọn thành phần

Tiện ích bình luận mới nhất có tên `RecentComments` và gồm ba tùy chọn:

- `el` (tùy chọn): phần tử để gắn vào
- `serverURL`: liên kết máy chủ
- `count`: số lượng bình luận gần đây cần lấy

Định dạng dữ liệu mà thành phần trả về là `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- thuộc tính `comment`: mảng các bình luận gần đây nhất với đúng số lượng `count`
- phương thức `destroy`: hàm dùng để hủy tiện ích

## Cách dùng cơ bản

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Nội dung này sẽ được hiển thị trên `#waline-recent` với kiểu dáng mặc định.

:::

## Cách dùng nâng cao

Nếu không hài lòng với định dạng đầu ra mặc định, bạn có thể gọi thành phần mà bỏ qua tùy chọn `el` để lấy dữ liệu và tự hiển thị.

Ví dụ:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
