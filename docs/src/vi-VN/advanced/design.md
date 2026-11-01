---
title: Mục tiêu thiết kế
icon: goal
order: 2
---

[Valine](https://valine.js.org) là một hệ thống bình luận có kiểu dáng tinh tế, vận hành đơn giản và triển khai hiệu quả. Lần đầu tiếp cận, tôi đã bị thu hút bởi kiểu dáng tinh tế và đặc tính serverless của nó. Nó không cần dịch vụ backend, giao diện tương tác trực tiếp với dịch vụ lưu trữ LeanCloud, thực sự rất tuyệt! Nhưng càng tìm hiểu sâu, tôi càng nhận ra những vấn đề của nó.

## Vấn đề của Valine

### Không mã nguồn mở

Từ phiên bản `1.4.0`, tác giả chỉ đẩy các tệp đã biên dịch lên kho GitHub, còn mã nguồn thì ngừng cập nhật. Có lẽ tác giả đã thất vọng với mã nguồn mở. Với những người dùng muốn bổ sung hay sửa đổi dự án như tôi, điều này khá khó chịu.

### XSS

Ngay từ những phiên bản rất sớm, người dùng đã báo cáo các vấn đề XSS của Valine, và cộng đồng cũng dùng nhiều cách để khắc phục. Bao gồm thêm mã xác minh, lọc XSS ở phía giao diện và các cách khác. Tuy nhiên, sau đó tác giả nhận ra mọi biện pháp xác minh phía giao diện chỉ có thể ngăn người ngay thẳng, nên các hạn chế như mã xác minh đã bị gỡ bỏ.

Hiện nay, khi giao diện đăng bình luận, Markdown được chuyển thành HTML, rồi chạy một hàm lọc XSS ngay trên giao diện trước khi gửi lên LeanCloud. Sau khi lấy dữ liệu từ LeanCloud, nội dung được chèn thẳng vào DOM. Rõ ràng quy trình này có vấn đề. Chừng nào HTML còn được gửi trực tiếp và hiển thị trực tiếp ngay sau khi lấy về, XSS sẽ không thể bị loại bỏ tận gốc.

::: note Giải pháp tận gốc

Với các cuộc tấn công XSS lưu trữ, ta có thể dùng cách escape mã HTML để giải quyết vĩnh viễn. Giống như BBCode ngày trước, chỉ nội dung markdown được gửi vào cơ sở dữ liệu. Giao diện đọc nội dung, mã hóa toàn bộ HTML rồi mới hiển thị sau khi chuyển đổi Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Vì Valine là hệ thống serverless, kẻ tấn công có thể chạm thẳng tới tầng lưu trữ. Mọi biện pháp phòng ngừa trước khi lưu dữ liệu đều vô hiệu, chỉ có thể xử lý trong quá trình hiển thị. Vì toàn bộ HTML sau khi escape không thể được phân tích cú pháp, ta có thể đảm bảo HTML đã chuyển đổi không có cơ hội bị chèn vào.

Vì Valine không còn mã nguồn mở, không thể mở pull request.

:::

Vì cách trên sẽ hoàn toàn giới hạn người dùng trong phạm vi Markdown, từ `0.15.0` Waline bổ sung `DOMPurify` ở phía ứng dụng khách để ngăn XSS. Ngoài việc diệt XSS thông thường:

- `<form>` và `<input>` bị vô hiệu hóa
- Việc chèn style bị vô hiệu hóa
- Tính năng tự phát của media bị vô hiệu hóa
- Mọi liên kết bên ngoài đều được xử lý và mở trong cửa sổ mới với rel là `noopener noreferrer`.

### Rò rỉ quyền riêng tư

Ngoài việc truy cập trực tiếp vào lưu trữ, kẻ tấn công còn có thể đọc bất kỳ dữ liệu nào. Nếu một trường trong cơ sở dữ liệu cho phép mọi người đọc, nội dung của trường đó hoàn toàn minh bạch với kẻ tấn công.

Trong dữ liệu bình luận, hai trường IP và hộp thư chứa dữ liệu nhạy cảm của người dùng. Ông Deng đã viết một bài riêng để phê phán vấn đề này: [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Ngay cả cộng đồng [JueJin](https://juejin.cn) khi dùng LeanCloud những năm đầu cũng từng bị phơi bày vấn đề bảo mật [làm lộ số điện thoại người dùng](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999).

Để lách vấn đề này, tác giả của Valine thêm cấu hình `recordIP` để quy định có cho phép ghi lại IP người dùng hay không. Vì không có máy chủ, chỉ có thể giải quyết bằng cách không lưu giá trị đó.

Tùy chọn này vẫn còn vấn đề: việc có ghi IP hay không do chủ trang web cấu hình, còn người dùng bình luận không có quyền quản lý quyền riêng tư của chính mình.

Lộ địa chỉ email là một vấn đề riêng tư lớn khác. Việc tính và gửi md5 của email người dùng ngay trên giao diện để lấy ảnh đại diện Gravatar là hoàn toàn khả thi. Nhưng nếu cần gửi thông báo email khi bình luận được trả lời, việc lưu giá trị gốc của địa chỉ email người dùng là không thể tránh khỏi. Về lý thuyết, vấn đề này có thể giải quyết bằng mã hóa RSA. Khóa riêng có thể lưu trong biến môi trường của LeanCloud. Ứng dụng khách gửi cả md5 của email và email đã mã hóa bằng khóa công khai. Khi LeanCloud muốn gửi thông báo email, hàm cloud đọc khóa riêng trong môi trường rồi giải mã để lấy email người dùng. Tuy nhiên, xét về kích thước và hiệu năng của thư viện mã hóa RSA phía giao diện, cách này không thực tế. Thêm một tầng máy chủ để lọc thông tin nhạy cảm qua phía máy chủ chắc chắn là cách làm tốt hơn.

### Chỉnh sửa thống kê lượt đọc

Valine 1.2.0 bổ sung chức năng thống kê lượt đọc bài viết: khi người dùng truy cập trang, số lượt truy cập được ghi lại theo url trong bảng counter ở phần nền. Vì dữ liệu phải được cập nhật mỗi lần truy cập trang, quyền phải được đặt thành có thể ghi để có thể cập nhật trường về sau. Điều này tạo ra vấn đề: dữ liệu thực tế có thể được cập nhật thành bất kỳ giá trị nào. Nếu bạn quan tâm, có thể mở trang chính thức <https://valine.js.org/visitor.html>, vào console và nhập đoạn mã dưới đây để thử. Nhớ đổi số về ban đầu sau khi thử nhé~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

May mắn là giá trị của trường `time` thuộc kiểu Number nên không thể chèn giá trị khác. Nếu trường `time` có kiểu chuỗi, đó có thể là một lỗ hổng XSS. Một cách khả thi để giải quyết vấn đề này là không dùng phương pháp lưu cộng dồn, mà chuyển sang lưu một bản ghi truy cập chỉ đọc cho mỗi lần ghé thăm, và dùng phương thức `count()` để thống kê khi đọc. Như vậy toàn bộ dữ liệu là chỉ đọc, giải quyết được vấn đề chỉnh sửa. Cách này cũng có vấn đề: khi lượng dữ liệu tương đối lớn, nó sẽ gây áp lực nhất định cho truy vấn.

Nếu muốn giữ nguyên dữ liệu gốc, chỉ có thể thêm tầng máy chủ để tách biệt quyền chỉnh sửa.

## Waline ra đời

Vì những lý do trên, Waline ra đời. Mục tiêu ban đầu của Waline chỉ là thêm backend cho Valine, nhưng vì Valine không mã nguồn mở nên chỉ có thể thực hiện ở phía giao diện. Tất nhiên, nhiều đoạn mã và logic ở phía giao diện đã tham khảo Valine để tương thích với cấu hình của Valine. Ngay cả tên dự án, tôi cũng đặt phái sinh từ Valine để mọi người hiểu đây là một dự án phái sinh của Valine.

Ngoài việc giải quyết các vấn đề bảo mật nêu trên, việc bổ sung phía máy chủ còn hiện thực hóa nhiều tính năng trước đây bị hạn chế vì không có máy chủ, bao gồm thông báo email, lọc bình luận spam, v.v.
