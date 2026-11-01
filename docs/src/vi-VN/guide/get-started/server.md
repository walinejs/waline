---
title: Giới thiệu máy chủ
icon: server
order: 2
---

## Triển khai

Ngoài việc triển khai miễn phí trên Vercel, bạn có thể triển khai qua Docker hoặc trực tiếp trên môi trường tự lưu trữ, cũng như trên các nền tảng đám mây phổ biến khác. Để biết thêm, xem:

- [Triển khai độc lập](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Hỗ trợ nhiều cơ sở dữ liệu

Waline hỗ trợ nhiều loại cơ sở dữ liệu, bao gồm MySQL, PostgreSQL, SQLite và MongoDB.

Bạn chỉ cần cấu hình biến môi trường của cơ sở dữ liệu tương ứng, Waline sẽ tự động chuyển sang dịch vụ lưu trữ dữ liệu phù hợp.

Xem [hỗ trợ nhiều cơ sở dữ liệu](../database.md) để biết chi tiết.

## Cấu hình

Hầu hết cấu hình ở phía máy chủ có thể thực hiện qua biến môi trường, và bạn cũng có thể cấu hình một số tùy chọn nâng cao trong tệp đầu vào chính.

Chi tiết cấu hình xem [Tham chiếu máy chủ → Biến môi trường](../../reference/server/env.md) và [Tham chiếu máy chủ → Cấu hình](../../reference/server/config.md).

## Thông báo bình luận

Chúng tôi hỗ trợ nhiều cách thông báo cho bạn hoặc người dùng bình luận khi có ai đó bình luận hay trả lời. Xem [Thông báo bình luận](../features/notification.md) để biết chi tiết.

## Đăng ký tài khoản người dùng và đăng nhập mạng xã hội

Waline hỗ trợ tạo tài khoản ngay trong ứng dụng và đăng nhập qua GitHub, Twitter và Facebook.

::: tip

Hãy chờ đón: chúng tôi dự định bổ sung hỗ trợ thêm nhiều ứng dụng mạng xã hội trong các phiên bản tới.

:::
