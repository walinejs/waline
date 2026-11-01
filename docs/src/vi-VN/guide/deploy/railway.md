---
title: Triển khai trên Railway
icon: railway
---

[Railway](https://railway.app/) là một nền tảng Serverless miễn phí, chúng ta có thể triển khai Waline lên nền tảng Railway một cách dễ dàng.

<!-- more -->

## Cách triển khai

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Nhấn nút này, trình duyệt sẽ chuyển đến nền tảng railway.app để triển khai nhanh. Sau khi đăng nhập, bạn có thể nhập tên kho lưu trữ GitHub mới hoặc dùng giá trị mặc định, rồi nhấn nút <kbd>Deploy</kbd> ở cuối để triển khai. Bạn nên lưu ý rằng phần biến môi trường không nên sửa.

![railway1](../../../assets/railway-1.jpg)

Sau một lát, bạn sẽ được chuyển đến trang bảng điều khiển. Nhấn <kbd>PostgreSQL</kbd> - <kbd>Query</kbd> và dán nội dung tệp [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) vào vùng văn bản, rồi nhấn nút <kbd>Run Query</kbd> ở cuối để khởi tạo cơ sở dữ liệu.

![railway2](../../../assets/railway-2.jpg)

Cuối cùng, bạn có thể nhấn <kbd>Deployments</kbd> - <kbd>Domains</kbd> để lấy URL máy chủ. Sao chép URL trang web và nhập vào cấu hình `serverURL` của ứng dụng khách. Sau đó bạn có thể dùng Waline!

![railway3](../../../assets/railway-3.jpg)

## Cách cập nhật

Vào kho lưu trữ GitHub tương ứng và sửa số phiên bản của `@waline/vercel` trong tệp package.json thành phiên bản mới nhất.

## Cách sửa biến môi trường

Nhấn thẻ <kbd>Variables</kbd> để vào trang quản lý biến môi trường. Hệ thống sẽ tự động triển khai lại sau khi biến được thay đổi.

![railway4](../../../assets/railway-4.jpg)
