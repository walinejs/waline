---
title: Di chuyển từ Valine
icon: valine
---

1. Triển khai backend theo [Triển khai trên Vercel](../guide/get-started/README.md#trien-khai-may-chu) trong phần _Bắt đầu_.

2. Sửa script phía giao diện theo [HTML](../guide/get-started/README.md#nhung-vao-html) trong phần _Bắt đầu_.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

   ::: tip Cấu hình

   Waline V2 đã loại bỏ hỗ trợ Valine và chuyển sang cấu hình tốt hơn. Dưới đây là tóm tắt việc di chuyển một số tùy chọn:

   - `placeholder`: dùng `locale.placeholder`
   - `highlight`: dùng `highlighter`
   - `avatarForce`, `avatar`: dùng biến môi trường `AVATAR_PROXY` của máy chủ
   - `recordIP`: không còn hiển thị IP người dùng, máy chủ cung cấp biến môi trường `DISABLE_USERAGENT`
   - `requiredFields`: đổi tên thành `requiredMeta`
   - `langMode`: đổi tên thành `locale`
   - `emojiCDN`, `emojiMap`: dùng các tùy chọn `emoji` mạnh hơn

   Về cấu hình waline, vui lòng xem [Cấu hình ứng dụng khách](../reference/client/api.md). Bạn cũng có thể xem [Hướng dẫn di chuyển Waline Client V2](./v2.md) để biết những tùy chọn không tương thích với Valine.

   :::

3. Di chuyển dữ liệu

Trong phần nền LeanCloud, chọn <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd>, sau đó bạn sẽ nhận được thông báo email.

Dán nội dung của tệp xuất vào vùng văn bản bên dưới và nhấn nút chuyển đổi để lấy tệp cần nhập.

<MigrationTool />

::: tip

Sau khi lấy được tệp đã xuất qua công cụ trên, bạn có thể nhập nó trong bảng điều khiển của dịch vụ lưu trữ tương ứng.

:::

## Điểm nổi bật của Waline

So với Valine, Waline có những điểm nổi bật sau:

### Nhiều tính năng hơn

1. Markdown hỗ trợ nhiều cú pháp hơn, bao gồm chỉ số trên và chỉ số dưới, emoji, bảng, gạch ngang chữ, công thức toán, thẻ HTML, chú thích cuối trang, v.v.
1. Tính năng tải lên hình ảnh, cho phép tùy chỉnh dịch vụ cung cấp hình ảnh hoặc nhúng hình ảnh trực tiếp.
1. Hệ thống nhãn hoàn toàn mới gán nhãn cấp độ cho người dùng theo tần suất tương tác, và hỗ trợ nhãn tùy chỉnh cho người dùng đã đăng ký.
1. Hỗ trợ bộ emoji đặt trước và tab, cho phép nhiều bộ emoji, đồng thời cho phép bất kỳ ai phát hành và sử dụng bộ emoji đặt trước.
1. Hệ thống cảm xúc hoàn toàn mới cho phép khách truy cập bày tỏ thái độ của mình với bài viết.
1. Thích bình luận, bày tỏ sự ủng hộ với bình luận mà bạn thích.
1. Lượt xem trang, chính xác hơn và chống chỉnh sửa.
1. Tìm kiếm emoji. Dịch vụ có thể tùy chỉnh, cho phép người dùng tự do tìm và chèn biểu tượng cảm xúc.
1. Hỗ trợ người dùng đã đăng ký chỉnh sửa và xóa những bình luận mình đã đăng.

### An toàn hơn

1. Không rò rỉ quyền riêng tư, không phơi bày hộp thư, địa chỉ IP và các thông tin nhạy cảm khác của người dùng, có thể chọn ẩn vị trí địa lý, trình duyệt và hệ điều hành của người dùng ở phía máy chủ
1. Hệ thống chống spam hoàn chỉnh.
   - Mọi bình luận đều có thể được xác thực bởi dịch vụ chống spam và hỗ trợ logic xác thực bổ sung.
   - Bạn có thể đặt giới hạn tốc độ bình luận cho một IP hoặc một người dùng, và Waline tự động nhận diện bình luận trùng lặp.
1. Tính năng kiểm duyệt bình luận: trong giai đoạn nhạy cảm hoặc khi trang web bị tấn công, bạn có thể bật kiểm duyệt bình luận, duyệt thủ công và phê duyệt hiển thị bình luận, ngăn bình luận độc hại khiến trang web bị đóng.
1. Hỗ trợ tài khoản người dùng. Ngoài đăng ký tài khoản, Waline còn hỗ trợ tài khoản mạng xã hội, đồng bộ nhanh ảnh đại diện và biệt danh theo nhãn được ủy quyền để chống mạo danh.

### Tiện lợi hơn

1. Nhiều cách (QQ, WeChat, DingTalk, email), v.v. để thông báo cho blogger về bình luận
1. Dịch vụ quản lý mạnh mẽ, bạn có thể xem tất cả người dùng và bình luận, thực hiện các thao tác liên quan, đặt nhãn tùy chỉnh và quyền quản trị viên cho người dùng
1. Quản lý ngay trên giao diện: quản trị viên có thể duyệt, chỉnh sửa hoặc xóa bình luận trực tiếp thông qua component bình luận của Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
