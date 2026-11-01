---
title: Tệp của ứng dụng khách
icon: file
---

`@waline/client` cung cấp nhiều phiên bản tệp khác nhau

<!-- more -->

## Danh sách tệp CDN

- `dist/waline.js`: bản đầy đủ, định dạng ESM

  Đây là tệp được khuyến nghị để import `@waline/client`, kích thước Gzip 100 KB

- `dist/waline.umd.js`: bản đầy đủ, định dạng UMD

- `dist/slim.js`: bản đầy đủ không kèm gói phụ thuộc, định dạng ES Module

  Đây là tệp mặc định để import `@waline/client` với Node.js, kích thước Gzip 27 KB

- `dist/waline.css`: các kiểu CSS của Waline

- `dist/waline-meta.css`: CSS cho biểu tượng meta của Waline

- `dist/component.js`: component Vue của Waline, định dạng ES Module, không đóng gói phụ thuộc

  Tệp này dùng để sử dụng bình luận Waline ở chế độ component trong dự án Vue, kích thước Gzip 25 KB

- `dist/comment.js`: mô-đun đếm bình luận của Waline, định dạng ESM, kích thước Gzip < 1KB

  Tệp này dùng để import qua CDN khi chỉ cần số bình luận của trang

- `dist/pageview.js`: mô-đun lượt xem của Waline, định dạng ESM, kích thước Gzip < 1KB

  Tệp này dùng để import qua CDN khi chỉ cần số lượt xem của trang

## Xuất mô-đun

`@waline/client` là mô-đun ESM chuẩn, yêu cầu Node.js phiên bản >= 22:

- `@waline/client`: điểm vào chính của Waline, không đóng gói phụ thuộc

- `@waline/client/waline.css`: tệp kiểu dáng của Waline

- `@waline/client/waline-meta.css`: tệp kiểu dáng biểu tượng meta của Waline

- `@waline/client/comment`: mô-đun đếm bình luận của Waline

- `@waline/client/pageview`: mô-đun đếm lượt xem của Waline

- `@waline/client/full`: điểm vào chính của Waline với toàn bộ phụ thuộc được đóng gói
