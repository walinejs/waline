---
title: Triển khai trên Vercel
icon: vercel
order: 1
---

Chúng tôi đã phát hành gói `@waline/vercel` làm gói máy chủ, và triển khai trên Vercel cũng là cách chúng tôi khuyên dùng nhất.

<!-- more -->

## Cách triển khai

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Nhấn nút màu xanh ở trên, trình duyệt sẽ chuyển bạn đến Vercel để triển khai bằng mẫu Waline.

   ::: note

   Nếu bạn chưa đăng nhập, chúng tôi khuyên bạn nên đăng nhập bằng GitHub.

   :::

1. Nhập tên dự án Vercel của bạn rồi nhấn `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Kho lưu trữ có tên bạn vừa nhập sẽ được Vercel tạo và khởi tạo tự động dựa trên mẫu ví dụ của Waline.

   ![new project](../../../assets/vercel-2.png)

   Sau một hoặc hai phút, Vercel sẽ hoàn tất việc triển khai. Nhấn nút `Go to Dashboard` để chuyển đến bảng điều khiển ứng dụng của bạn.

   ![dashboard](../../../assets/vercel-3.png)

## Tạo cơ sở dữ liệu

1. Nhấn `Storage` ở trên cùng để vào trang dịch vụ lưu trữ, chọn `Create Database`. Trong `Marketplace Database Providers`, chọn `Neon`, rồi nhấn `Continue`.

   ![storage](../../../assets/vercel-5.png)

1. Bạn sẽ được yêu cầu tạo tài khoản Neon. Chọn `Accept and Create`. Tiếp theo, chọn cấu hình gói cơ sở dữ liệu, bao gồm khu vực và hạn mức. Bạn có thể giữ mặc định và nhấn `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Đặt tên cơ sở dữ liệu. Bạn có thể giữ mặc định và nhấn `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Bây giờ cơ sở dữ liệu đã xuất hiện trong `Storage`. Nhấn vào đó và chọn `Open in Neon` để chuyển sang Neon. Trong Neon, chọn `SQL Editor` ở bên trái, dán câu lệnh SQL từ [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) vào trình soạn thảo, rồi nhấn `Run` để tạo các bảng.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Sau một lúc, bạn sẽ thấy thông báo thành công. Quay lại Vercel, nhấn `Deployments`, rồi nhấn `Redeploy` trên lần triển khai mới nhất để cấu hình cơ sở dữ liệu mới có hiệu lực.

   ![redeploy success](../../../assets/vercel-12.png)

1. Vercel sẽ chuyển về `Overview` và bắt đầu triển khai. Khi `STATUS` trở thành `Ready`, nhấn `Visit` để mở trang đã triển khai. URL này chính là địa chỉ máy chủ của bạn.

   ![visit](../../../assets/vercel-14.png)

## Gán tên miền

1. Nhấn <kbd>Settings</kbd> - <kbd>Domains</kbd> để vào trang cài đặt tên miền.

1. Nhập tên miền bạn muốn gán và nhấn nút <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-16.png)

1. Thêm một bản ghi `CNAME` mới trong máy chủ dịch vụ tên miền của bạn.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Sau khi có hiệu lực, bạn có thể dùng tên miền của mình để truy cập Waline. :tada:
   - Hệ thống bình luận: example.your-domain.com
   - Bảng điều khiển quản trị: example.your-domain.com/ui

   ![success](../../../assets/vercel-17.png)

## Nhúng bằng HTML

Thiết lập như sau trong trang web của bạn:

1. Nhập kiểu dáng của Waline từ `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Tạo thẻ `<script>` sử dụng `init()` từ `https://unpkg.com/@waline/client@v3/dist/waline.js`, và truyền các tùy chọn bắt buộc `el` và `serverURL`.
   - `el` là phần tử dùng để hiển thị Waline. Nó có thể là chuỗi chọn CSS hoặc một HTMLElement.
   - `serverURL` là địa chỉ máy chủ bạn đã lấy ở bước trước.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Quản trị bình luận

1. Sau khi triển khai, truy cập `<serverURL>/ui/register` để đăng ký. Người dùng đăng ký đầu tiên sẽ trở thành quản trị viên.
2. Sau khi đăng nhập, quản trị viên có thể quản lý bình luận: chỉnh sửa, đánh dấu hoặc xóa.
3. Người dùng cũng có thể đăng ký qua khung bình luận. Sau khi đăng nhập, họ sẽ được chuyển đến trang hồ sơ của mình.
