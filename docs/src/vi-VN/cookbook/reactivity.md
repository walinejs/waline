---
title: Phiên bản Waline có tính phản ứng
icon: spa
order: -1
---

Ứng dụng khách chính thức `@waline/client` được xây dựng trên Vue3, cung cấp các thành phần và phiên bản có tính phản ứng, đồng thời mang lại hỗ trợ SPA (**S**ingle **P**age **A**pplication - ứng dụng một trang).

<!-- more -->

## Thành phần Vue

Nếu bạn đang xây dựng một dự án Vue, bạn có thể lấy và sử dụng thành phần Waline bằng cách nhập tên xuất `Waline` từ `@waline/client/components`.

Mọi thuộc tính của thành phần đều có tính phản ứng, nghĩa là khi bạn thay đổi các thuộc tính, khung bình luận sẽ tự động được cập nhật.

## Các dự án khác

Trong các SPA khác, bạn cần lưu lại `WalineInstance` mà hàm Waline trả về khi Waline được khởi tạo.

Bạn có thể tìm thấy thuộc tính `el` và hai phương thức `update()` và `destroy()` trên `WalineInstance`.

### update

Bạn có thể gọi `update()` để cập nhật Waline bất cứ lúc nào (ví dụ: khi người dùng truy cập một tuyến đường mới). Phương thức `update` nhận tham số tùy chọn `options`; ngoài `el`, các tùy chọn khởi tạo khác của Waline đều có thể được cập nhật bằng cách truyền giá trị mới.

Ví dụ:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Nguyên lý hoạt động

Khi gọi `update`, tùy chọn hiện tại và tùy chọn trong lịch sử sẽ được hợp nhất bằng **sao chép nông (shallow copy)**, và phiên bản Waline sẽ làm mới với tùy chọn mới (đồng thời lưu lại tùy chọn mới).

Hành vi mặc định của phương thức này là luôn **tạo lại giá trị mặc định** cho những tùy chọn chưa được đặt, và **dùng giá trị trong lịch sử** cho những tùy chọn đã được đặt.

Có hai tùy chọn bạn có thể cần đặc biệt lưu ý: `path` và `locale`.

::: warning Lưu ý về path

Trong V2, tham số `path` **luôn được đặt lại** khi gọi `update()`.

Điều này có nghĩa là trong bất kỳ lần cập nhật nào, hễ bạn không chỉ định `path`, thì `path` sẽ được đặt lại thành `window.location.pathname`.

:::

::: warning Lưu ý về locale

Do sao chép nông, tùy chọn `locale` cũ sẽ bị tùy chọn `locale` mới được truyền vào `update` ghi đè hoàn toàn.

Quan điểm của chúng tôi là: người dùng thường muốn chuyển ngôn ngữ hiển thị khi cập nhật locale, nên chúng tôi đặt đây là hành vi mong đợi của plugin. Điều này cũng có nghĩa là bạn có thể dùng `update({ locale: {} })` để xóa cấu hình locale tùy chỉnh trong lịch sử.

Nếu bạn thực sự cần cập nhật một hoặc một vài trường nhất định trong `locale`, bạn phải truyền toàn bộ `locale` đã cập nhật.

:::

Đồng thời, tùy chọn của `update()` đã được tối ưu cho các yêu cầu mạng bất đồng bộ, bao gồm:

- Chỉ làm mới khu vực bình luận và gửi lại yêu cầu khi đường dẫn thực sự thay đổi
- Lần gọi `update()` mới sẽ tự động chấm dứt yêu cầu không còn cần thiết từ lần `update()` trước đó.

### el

Thuộc tính `el` là HTMLElement mà phiên bản Waline hiện tại được gắn vào.

Nếu bạn khởi tạo Waline với `el: null` (chỉ dùng bình luận và thống kê lượt xem), thuộc tính này sẽ là `null`.

### destroy

Nếu bạn quên truyền `serverURL` hoặc Waline không thể tìm thấy vị trí gắn kết qua tùy chọn `el` trên trang, Waline sẽ ném ra một Error cho biết lý do lỗi.

### Khởi tạo thất bại

Nếu bạn quên đặt `serverURL` hoặc Waline không thể tìm thấy vị trí gắn kết qua tùy chọn `el` trên trang, Waline sẽ trả về một `WalineErrorInstance`.

Trên `WalineErrorInstance` chỉ có một thuộc tính `errMsg` để cho biết lý do khởi tạo thất bại.

### Lưu ý

::: warning Hãy nhớ hủy phiên bản

Để Waline giải phóng tài nguyên đúng cách, vui lòng gọi thủ công `WalineInstance.destroy()` trước khi gỡ bỏ phần tử mà Waline được gắn vào.

Nếu không, một số trình lắng nghe có thể không được gỡ bỏ đúng cách.

:::
