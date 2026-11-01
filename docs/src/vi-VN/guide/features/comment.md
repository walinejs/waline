---
title: Bộ đếm bình luận
icon: counter
order: 8
---

Waline hỗ trợ hiển thị số lượng bình luận riêng biệt ở những khu vực nằm ngoài khung bình luận.

<!-- more -->

## Tự động cập nhật

Bạn có thể bật tính năng đếm bình luận trong hàm `init` bằng cách đặt tùy chọn `comment` thành `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline sẽ cố gắng điền hoặc cập nhật số lượng bình luận mỗi khi bạn gọi hàm `init` hoặc cập nhật đường dẫn.

Waline tìm các phần tử có lớp `waline-comment-count` trong trang, lấy thuộc tính `data-path` của chúng làm điều kiện truy vấn, rồi điền giá trị thu được vào đó:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

Nếu cần một bộ chọn khác, bạn có thể đặt tùy chọn `comment` thành bộ chọn đó.

Mỗi lần bạn gọi `WalineInstance.update()`, Waline sẽ tìm kiếm nội dung trang và tự động cập nhật số lượng bình luận.

::: tip Ví dụ

```html
The current page has <span class="waline-comment-count" /> comments, the home page has
<span data-path="/vi-VN/" class="waline-comment-count" /> comments.
```

Trang hiện tại có <span class="waline-comment-count" /> bình luận, trang chủ có
<span data-path="/vi-VN/" class="waline-comment-count" /> bình luận.

:::

## Cập nhật thủ công

Ngoài việc tự động cập nhật qua hàm `init`, bạn có thể cập nhật thủ công số lượng bình luận của trang hiện tại qua API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Hủy thao tác

Vì việc lấy số lượng bình luận là một thao tác mạng bất đồng bộ, trong một số trường hợp bạn có thể cần hủy thao tác cập nhật số lượng bình luận đang diễn ra.

`commentCount` trả về một hàm, bạn có thể gọi hàm này để hủy việc cập nhật:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Chỉ nhập bộ đếm

Đôi khi bạn muốn hiển thị số lượng bình luận của một số trang trong danh sách bài viết hoặc trang chủ mà không muốn tải toàn bộ Waline. Khi đó bạn có thể dùng mô-đun `comment` có kích thước Gzip < 1KB:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
