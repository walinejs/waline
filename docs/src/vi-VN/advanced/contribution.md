---
title: Hướng dẫn phát triển
icon: contribute
order: -1
---

Chúng tôi hoan nghênh mọi người mở Pull Request cho waline! :tada:

Nếu bạn muốn đóng góp cho waline, đây là hướng dẫn dành cho bạn.

<!-- more -->

## Chuẩn bị

1. Dùng Git để clone dự án

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Cài đặt các gói phụ thuộc

   ::: warning

   Hãy cài đặt và sử dụng pnpm để cài các gói phụ thuộc.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Phát triển

- Chạy `pnpm run client:dev` để khởi động devServer của `@waline/client`

  ::: tip

  Vì waline dựa trên kiến trúc Client/Server, khi gỡ lỗi ứng dụng khách, bạn cần đặt `SERVERURL`, hoặc khởi động đồng thời devServer máy chủ bên dưới và dùng `localhost:9090` mặc định.

  :::

- Chạy `pnpm run server:dev` để khởi động devServer của `@waline/server`

  ::: tip

  Để chạy `@waline/server` cục bộ, bạn cần cấu hình một số biến môi trường cục bộ vào `.env`.

  Chúng tôi cung cấp một ví dụ cho bạn trong `.env.example`.

  :::
