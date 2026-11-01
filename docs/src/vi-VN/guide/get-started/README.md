---
title: Bắt đầu
icon: creative
dir:
  collapsible: false
  order: 1
---

Chào mừng bạn đến với Waline. Chỉ với vài bước, bạn có thể đưa Waline vào trang của mình để cung cấp bình luận và lượt xem.

<!-- more -->

## Triển khai máy chủ

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Nhấn nút ở trên để tới Vercel và triển khai máy chủ.

   ::: note

   Nếu bạn chưa đăng nhập, Vercel sẽ nhắc bạn đăng ký hoặc đăng nhập. Hãy dùng tài khoản GitHub để đăng nhập nhanh.

   :::

1. Nhập tên dự án Vercel mà bạn muốn rồi nhấn `Create` để tiếp tục:

   ![create](../../../assets/vercel-1.png)

1. Vercel sẽ tạo và khởi tạo một kho lưu trữ mới dựa trên mẫu Waline. Tên kho lưu trữ sẽ là tên dự án bạn vừa nhập.

   ![deploy](../../../assets/vercel-2.png)

   Sau một hoặc hai phút, pháo hoa sẽ xuất hiện trên màn hình để chúc mừng triển khai thành công. Nhấn `Go to Dashboard` để tới bảng điều khiển của ứng dụng.

   ![deploy](../../../assets/vercel-3.png)

## Tạo cơ sở dữ liệu

1. Nhấn `Storage` ở trên cùng để vào trang cấu hình lưu trữ, sau đó chọn `Create Database`. Chọn `Neon` làm `Marketplace Database Providers` rồi nhấn `Continue` để tiếp tục.

   ![neon](../../../assets/vercel-5.png)

1. Bạn sẽ được nhắc tạo tài khoản Neon. Nhấn `Accept and Create` để chấp nhận và tạo. Tiếp theo bạn sẽ chọn gói cơ sở dữ liệu, gồm khu vực và hạn mức. Bạn có thể để mặc định tất cả và nhấn `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Sau đó bạn sẽ được yêu cầu đặt tên cơ sở dữ liệu. Bạn cũng có thể giữ nguyên và nhấn `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Bây giờ bạn sẽ thấy dịch vụ cơ sở dữ liệu vừa tạo trong `Storage`. Nhấn vào nó và chọn `Open in Neon` để tới Neon. Trong giao diện Neon, chọn `SQL Editor` ở thanh bên trái, dán các câu lệnh SQL từ [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) vào trình soạn thảo, rồi nhấn `Run` để tạo các bảng.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Sau một lúc, bạn sẽ nhận được thông báo tạo thành công. Quay lại Vercel, nhấn `Deployments` ở trên cùng, rồi nhấn nút `Redeploy` ở bên phải lần triển khai mới nhất. Bước này đảm bảo dịch vụ cơ sở dữ liệu vừa cấu hình có hiệu lực.

   ![redeploy success](../../../assets/vercel-12.png)

1. Bạn sẽ được chuyển tới trang `Overview` và quá trình triển khai bắt đầu. Sau một lát, `STATUS` sẽ chuyển thành `Ready`. Nhấn `Visit` để mở trang web đã triển khai. URL này chính là địa chỉ máy chủ của bạn.

   ![visit](../../../assets/vercel-14.png)

## Liên kết tên miền tùy chỉnh

1. Nhấn `Settings` → `Domains` ở trên cùng để vào trang cấu hình tên miền.

1. Nhập tên miền bạn muốn liên kết và nhấn `Add`.

   ![Add domain](../../../assets/vercel-16.png)

1. Thêm một bản ghi `CNAME` mới tại nhà cung cấp tên miền của bạn:

   | Loại  | Tên     | Giá trị              |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Chờ bản ghi DNS có hiệu lực. Sau đó bạn có thể truy cập Waline bằng tên miền của riêng mình 🎉
   - Hệ thống bình luận: example.yourdomain.com
   - Quản lý bình luận: example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## Nhúng vào HTML

Dưới đây là cách thêm Waline vào trang web của bạn:

1. Nhập tệp kiểu `https://unpkg.com/@waline/client@v3/dist/waline.css` trong `<head>`

1. Tạo thẻ `<script>` và khởi tạo bằng `init()` từ `https://unpkg.com/@waline/client@v3/dist/waline.js`, đồng thời truyền các tùy chọn cần thiết `el` và `serverURL`.
   - Tùy chọn `el` là phần tử dùng để Waline hiển thị. Bạn có thể đặt bộ chọn CSS dưới dạng chuỗi hoặc một đối tượng HTMLElement.
   - `serverURL` là liên kết tới máy chủ đã triển khai của bạn, chính là máy chủ bạn vừa tạo trên Vercel.
   - Để biết thêm tùy chọn, hãy xem [trang Props của component](https://waline.js.org/vi-VN/reference/client/props.html)

   Dưới đây là một ví dụ:

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. Dịch vụ bình luận giờ đã chạy thành công trên trang web của bạn :tada:!

## Quản lý bình luận (Management)

1. Sau khi triển khai xong, hãy truy cập `<serverURL>/ui/register` để đăng ký. Người đăng ký đầu tiên sẽ được đặt làm quản trị viên.

1. Sau khi đăng nhập với tư cách quản trị viên, bạn có thể vào bảng điều khiển quản lý bình luận. Tại đây bạn có thể sửa, đánh dấu hoặc xóa bình luận.

1. Người dùng cũng có thể đăng ký tài khoản qua khung bình luận, và sẽ được chuyển tới trang hồ sơ của mình sau khi đăng nhập.

## Video hướng dẫn

Một người dùng Waline nhiệt tình đã làm video hướng dẫn sau. Nếu các hướng dẫn ở trên chưa rõ, bạn có thể tham khảo video:

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
