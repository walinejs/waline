---
title: Tùy chỉnh kiểu dáng
icon: style
order: -2
---

`@waline/client` cung cấp một số biến CSS. Bạn có thể dễ dàng cấu hình kiểu dáng của Waline qua các biến này:

Đồng thời, `@waline/client` cũng có sẵn hỗ trợ chế độ tối.

<!-- more -->

## Hỗ trợ chế độ tối

Bạn có thể dùng tùy chọn `dark` để bật hỗ trợ chế độ tối của Waline.

Thông thường trang web bật hỗ trợ chế độ tối theo hai cách:

- Dùng bộ chọn `@media` để tự động chuyển theo trạng thái màu của thiết bị thông qua `prefers-color-scheme`
- Áp dụng động kiểu màu chế độ tối khác bằng cách sửa thuộc tính và class của phần tử gốc DOM (`html` hoặc `body`).

Nếu trang của bạn dùng cách thứ nhất, bạn chỉ cần đặt `dark` thành `'auto'`.

Với trang dùng cách thứ hai, bạn cần đặt dark thành bộ chọn CSS làm chế độ tối có hiệu lực. Dưới đây là vài ví dụ:

::: tip Ví dụ

- **vuepress-theme-hop v2**: chủ đề này bật chế độ tối bằng cách đặt `data-theme="dark"` trên chính thẻ `<html>`. Vì vậy bạn cần đặt `'html[data-theme="dark"]'` làm tùy chọn `dark`.

- **hexo-theme-fluid**: chủ đề này bật chế độ tối bằng cách đặt `data-user-color-scheme="dark"` trên chính thẻ `<html>`. Vì vậy bạn cần đặt `'html[data-user-color-scheme="dark"]'` làm tùy chọn `dark`.

:::

## Biểu tượng meta

Nếu muốn thêm biểu tượng vào phần meta của bình luận, bạn có thể nhập `waline-meta.css` để dùng.

Với người dùng CDN, bạn có thể nhập qua liên kết sau:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Với người dùng NPM, bạn có thể nhập qua:

```js
import '@waline/client/meta';
```

## Hỗ trợ RTL

`@waline/client` hỗ trợ bố cục RTL, bạn chỉ cần thêm `dir="rtl"` vào thẻ `<html>`.

## Tùy chỉnh kiểu dáng

### Biến CSS

Bạn có thể tìm giá trị mặc định của các biến CSS mà Waline dùng ở chế độ thường và chế độ tối tại [Tham chiếu ứng dụng khách → Biến CSS](../../reference/client/style.md).

Nếu khác với kiểu dáng trang của bạn, bạn có thể tự ghi đè biến CSS tương ứng.

## Đổ bóng

Nếu bạn dùng chủ đề dùng bóng đổ (`box-shadow`) thay vì đường viền, bạn có thể thay đổi hiển thị của Waline bằng cách sửa `--waline-border` và `--waline-box-shadow`, ví dụ:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Thêm

Nếu các biến CSS trên không đáp ứng được yêu cầu tùy chỉnh kiểu dáng Waline của bạn, bạn có thể tự viết tệp CSS riêng.
