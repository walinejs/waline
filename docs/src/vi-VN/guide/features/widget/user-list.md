---
title: Tiện ích bảng xếp hạng người dùng/tường người dùng
icon: rank
---

Waline hỗ trợ hiển thị bảng xếp hạng người dùng hoặc tường người dùng bằng tiện ích, thuận tiện cho việc hiển thị thông tin người dùng bình luận ở thanh bên của blog.

<!-- more -->

## Tùy chọn thành phần

Tiện ích bảng xếp hạng người dùng/tường người dùng có tên `UserList` và gồm sáu tùy chọn:

- `el` (tùy chọn): phần tử để gắn vào
- `serverURL`: liên kết máy chủ
- `count`: số lượng người dùng cần lấy
- `mode`: `list` là bảng xếp hạng người dùng, `wall` là tường người dùng
- `lang`: hỗ trợ đa ngôn ngữ, xem thêm [i18n](../i18n.md)
- `locale`: tùy chỉnh ngôn ngữ, xem thêm [i18n](../i18n.md)

Định dạng dữ liệu mà thành phần trả về là `Promise<{ users: WalineUser[], destroy: () => void }>`.

- thuộc tính `users`: mảng danh sách người dùng với đúng số lượng `count`
- phương thức `destroy`: hàm dùng để hủy tiện ích

## Cách dùng cơ bản

### Bảng xếp hạng người dùng

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### Tường người dùng

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## Cách dùng nâng cao

Nếu không hài lòng với định dạng đầu ra mặc định, bạn có thể gọi thành phần mà bỏ qua tùy chọn `el` để lấy dữ liệu và tự hiển thị.

Ví dụ:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
