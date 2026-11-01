---
title: Câu hỏi thường gặp
icon: faq
order: 4
---

Waline có một định vị rất rõ ràng ngay từ khi ra đời:

::: info Một hệ thống bình luận đơn giản có backend.

:::

Mọi phiên bản phát hành sau đó đều là những thay đổi xoay quanh định vị này.

## Waline có quan hệ thế nào với Valine?

::: info Waline = Valine có backend

:::

Tham khảo phiên bản mã nguồn mở của Valine, danh sách bình luận ở phía giao diện được viết lại bằng React. Kiểu dáng, cấu trúc cùng một số công cụ và phương thức bên trong đều lấy từ Valine.

## Tôi có còn cần triển khai Valine-Admin trên LeanCloud không?

Không. Waline là giải pháp triển khai hợp nhất ba thành phần: lưu trữ dữ liệu, máy chủ và ứng dụng khách. Giao diện máy chủ đã tương đương với cloud engine LeanCloud của Valine. Máy chủ đã bao gồm tính năng quản lý bình luận và thông báo email mà cloud engine trước đây cung cấp. Bạn không cần thêm cloud engine LeanCloud, nên sẽ không bị hạn chế bởi chiến lược ngủ của cloud engine LeanCloud.

## Làm thế nào để nâng cấp?

Waline chủ yếu gồm hai phần: phía giao diện và phía máy chủ.

### Giao diện

Phía giao diện chèn danh sách bình luận và ô bình luận bằng cách nhúng script JS vào trang web. Trong hầu hết trường hợp, liên kết sẽ dùng địa chỉ của phiên bản mới nhất trên CDN trực tuyến và phiên bản mới nhất được áp dụng tự động, người dùng không cần cập nhật thủ công.

::: note Cần cập nhật thủ công trong các trường hợp sau

1. Số phiên bản được chỉ định cứng trong địa chỉ CDN. Khi đó bạn cần sửa số phiên bản thành mới nhất.
1. Dùng NPM để require và đóng gói module vào mã. Khi đó bạn cần sửa số phiên bản trong gói phụ thuộc để đảm bảo lấy được phiên bản mới nhất khi cài đặt.

:::

### Máy chủ

Máy chủ là dịch vụ backend tương ứng với `serverURL` được cấu hình trong script phía giao diện, và việc cập nhật sẽ hơi khác nhau tùy môi trường triển khai. Bản cập nhật máy chủ sẽ thường xuyên hơn.

#### Vercel

Truy cập kho GitHub tương ứng và sửa số phiên bản của `@waline/vercel` trong tệp package.json thành mới nhất.

![vercel](./assets/vercel-update.png)

#### CloudBase

Vào trang chỉnh sửa mã, nhấn <kbd>Save and reinstall dependencies</kbd>. Nếu vẫn không được, vào <kbd>My Application</kbd> và chọn <kbd>Deploy</kbd> để triển khai lại.

::: caution

Triển khai lại sẽ xóa các tệp trước đó. Nếu tệp cũ có cấu hình, cần sao lưu trước.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Chạy trực tiếp `docker pull lizheming/waline` để kéo image mới nhất.

## Vì sao gửi bình luận lại chậm?

Do một số lý do kỹ thuật, khi gửi bình luận, việc phát hiện spam và thông báo bình luận đều là thao tác tuần tự. Việc phát hiện spam dùng dịch vụ của Akismet ở nước ngoài nên có thể truy cập chậm. Người dùng có thể tắt tính năng phát hiện spam bằng biến môi trường `AKISMET_KEY=false`. Ngoài dịch vụ phát hiện spam, phần thông báo email trong thông báo bình luận cũng có thể gây quá thời gian chờ. Bạn có thể tắt thông báo bình luận để kiểm tra xem có phải do tính năng này không.
