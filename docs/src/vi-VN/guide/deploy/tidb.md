---
title: Tạo cơ sở dữ liệu trên TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) là một cơ sở dữ liệu NewSQL mã nguồn mở. [TiDB Cloud](https://tidbcloud.com/) là phiên bản trực tuyến chính thức, cung cấp miễn phí 5GB dung lượng lưu trữ cho mọi người sử dụng. Dưới đây là hướng dẫn tạo cơ sở dữ liệu Waline trên TiDB Cloud.

## Tạo cơ sở dữ liệu

1. Sau khi đăng nhập [TiDB Cloud](https://tidbcloud.com), một phiên bản TiDB sẽ được tạo tự động, hãy nhấn trực tiếp vào <kbd>cluster0</kbd> để vào phiên bản

   ![Enter instance](../../../assets/tidb-1.png)

2. Chọn <kbd>SQL Editor</kbd> trong danh sách bên trái, chuyển nội dung của [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) thành các câu lệnh phân tách bằng `;` rồi thực thi ngay trong giao diện. Nhấn nút màu xanh <kbd>Run</kbd> ở góc trên bên phải cho từng câu, hoặc dùng tổ hợp phím tắt <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> để thực thi
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

Đến đây cơ sở dữ liệu Waline đã được tạo xong!

## Lấy cấu hình kết nối

Nhấn nút <kbd>Overview</kbd> ở bên trái để vào trang chủ, rồi chọn <kbd>Connect</kbd> ở góc trên bên phải để lấy thông tin kết nối.

Đặt "Connect with" thành `General`. Đồng thời nhấn <kbd>Reset password</kbd> ở dòng bên dưới để tạo mật khẩu mới.

Như vậy, bạn có thể lấy được các cấu hình liên quan đến kết nối.

![Connection](../../../assets/tidb-7.png)

## Triển khai trên Vercel

Tạo tài khoản Vercel, thêm dự án và triển khai dịch vụ Waline. Sau đó mở <kbd>Settings</kbd> của dự án và vào `Environment Variables`. Nhấn <kbd>Add Environment Variable</kbd> và thêm các biến sau: `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` và `TIDB_PASSWORD`. Sau khi thêm các biến này, hãy triển khai lại dự án.

![Configure TiDB connection](../../../assets/tidb-8.png)
