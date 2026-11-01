---
title: Tìm kiếm biểu tượng cảm xúc
icon: search
order: 3
---

`@waline/client` cho phép người dùng thêm dịch vụ tìm kiếm emoji và tùy chỉnh chức năng này.

Mặc định, `@waline/client` cung cấp dịch vụ tìm kiếm meme qua [Giphy](https://giphy.com/). Nhờ đó bạn có thể tìm hình ảnh và thêm vào bình luận.

<!-- more -->

## Tắt tính năng

Nếu không cần dịch vụ tìm kiếm hình ảnh mặc định, bạn có thể tắt nó bằng cách đặt tùy chọn `search` thành `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Tùy chỉnh

Bạn có thể tùy chỉnh dịch vụ tìm kiếm hình ảnh thông qua tùy chọn search.

Với mỗi thao tác, bạn nên trả về một mảng chứa thông tin hình ảnh làm kết quả tìm kiếm, mỗi phần tử là một đối tượng có các thuộc tính sau:

- `src`: địa chỉ liên kết của hình ảnh
- `title`: tiêu đề và văn bản alt của hình ảnh (tùy chọn)
- `preview`: Hình thu nhỏ của ảnh dùng trong danh sách kết quả (tùy chọn)

Tùy chọn này nhận ba hàm, mỗi hàm nên trả về một Promise với kết quả là mảng kết quả tìm kiếm ở trên.

- `search`: thao tác tìm kiếm, từ khóa tìm kiếm sẽ được truyền làm tham số đầu tiên của hàm
- `default`: danh sách hình ảnh hiển thị mặc định (tùy chọn)
- `more`: Hàm được kích hoạt khi cuộn hình ảnh xuống cuối, từ khóa tìm kiếm và số lượng hiện tại được truyền vào làm hai tham số đầu (tùy chọn)

Để biết hướng dẫn về tùy chỉnh tìm kiếm, xem [Sổ tay → Tùy chỉnh tìm kiếm emoji](../../cookbook/customize/search.md).
