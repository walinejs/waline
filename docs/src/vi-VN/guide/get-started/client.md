---
title: Giới thiệu ứng dụng khách
icon: client
order: 1
---

Waline cung cấp chính thức [`@waline/client`](https://www.npmjs.com/package/@waline/client), được viết bằng Vue + TypeScript với kích thước chỉ 100kb gzip.

## Nhập

Bạn có thể dùng CDN hoặc npm để nhập ứng dụng khách Waline, và chúng tôi cung cấp nhiều phiên bản tệp để đáp ứng các tình huống khác nhau.

Nếu gặp vấn đề trong quá trình này, xem:

- [Sổ tay → Nhập qua CDN](../../cookbook/import/cdn.md)
- [Sổ tay → Nhập vào dự án](../../cookbook/import/project.md)

## Sử dụng Waline

Cách đơn giản nhất để dùng Waline là [làm theo phương pháp trong phần bắt đầu nhanh](./README.md#nhung-vao-html): nhập hàm `init` từ Waline và khởi tạo thực thể Waline qua `init(yourOptions)`.

Trong các tùy chọn của `init`, `el` và `serverURL` là bắt buộc. `el` là phần tử hoặc bộ chọn phần tử mà Waline được gắn vào, còn `serverURL` là địa chỉ máy chủ. Để xem tất cả tham số khởi tạo của `@waline/client`, xem [Tham chiếu ứng dụng khách → API](../../reference/client/api.md).

## Đếm bình luận

`@waline/client` còn cung cấp một gói con để thống kê bình luận. Bạn có thể dùng nó để hiển thị số lượng bình luận trong danh sách bài viết hoặc ở các trang không có khung bình luận. Chi tiết xem [Tính năng → Đếm bình luận](../features/comment.md)

## Đếm lượt xem

Waline hỗ trợ thống kê lượt xem. Nếu bạn không cần dịch vụ bình luận mà chỉ muốn dùng chức năng lượt xem, Waline cung cấp plugin thống kê lượt xem với kích thước Gzip < 1KB.

Để biết thêm về đếm lượt xem của `@waline/client`, xem [Tính năng → Đếm lượt xem](../features/pageview.md)

## Hỗ trợ định dạng bình luận

`@waline/client` hỗ trợ nhiều cú pháp bình luận và định dạng phong phú. Ngoài Markdown chuẩn và các phần mở rộng cú pháp GFM, người dùng bình luận còn có thể nhúng thẻ HTML, dùng công thức toán học, v.v. Về các cú pháp khác, xem [Tính năng → Cú pháp được hỗ trợ](../features/syntax.md)

`@waline/client` cũng hỗ trợ xem trước theo thời gian thực nội dung nhập trong khung bình luận. Tuy vậy, một số chức năng bị lược bỏ mặc định do kích thước. Nếu muốn khôi phục các chức năng này, xem:

- [Sổ tay → Tùy chỉnh tô sáng mã khi xem trước](../../cookbook/customize/highlighter.md)
- [Sổ tay → Tùy chỉnh trình hiển thị $\TeX$ khi xem trước](../../cookbook/customize/tex-renderer.md)

## Cảm xúc bài viết

Thấy bình luận quá rườm rà? Waline cho phép khách truy cập nhanh chóng bày tỏ cảm xúc với bài viết, chẳng hạn như thích, không thích, hoài nghi, chán, bất ngờ, v.v. Để bật tính năng này theo cách thủ công, xem [Tính năng → Cảm xúc bài viết](../features/reaction.md) .

## Tính năng bình luận

Waline hỗ trợ một số tính năng cơ bản, bao gồm đăng nhập, ảnh đại diện, [đa ngôn ngữ](../features/i18n.md) và xem trước theo thời gian thực.

Waline cho phép bạn đặt nhãn cấp độ tương tác và nhãn tùy chỉnh cho người dùng của mình. Chi tiết xem [Nhãn người dùng](../features/label.md).

## Tab emoji

`@waline/client` hỗ trợ nhiều tab emoji và cho phép người dùng dễ dàng thêm tab emoji qua các bộ emoji có sẵn. Ngoài các bộ chính thức, bạn cũng có thể dễ dàng tự tạo bộ emoji riêng.

Để biết thêm về tab emoji của `@waline/client`, xem:

- [Tính năng → Tab emoji](../features/emoji.md)
- [Sổ tay → Tùy chỉnh emoji](../../cookbook/customize/emoji.md)

## Chèn hình ảnh

`@waline/client` có sẵn hỗ trợ tải lên hình ảnh. Mặc định hình ảnh được chuyển thành base64. Tuy vậy, bạn cũng có thể dùng dịch vụ lưu trữ ảnh của riêng mình.

Để biết thêm về cài đặt tải lên hình ảnh của `@waline/client`, xem [Sổ tay → Tùy chỉnh tải lên hình ảnh](../../cookbook/customize/upload-image.md).

## Tìm kiếm emoji

`@waline/client` cung cấp chức năng tìm kiếm meme và emoji qua [giphy](https://giphy.com), đồng thời cho phép tùy chỉnh dịch vụ tìm kiếm. Xem:

- [Tính năng → Tìm kiếm emoji](../features/search.md)
- [Sổ tay → Tùy chỉnh tìm kiếm biểu tượng cảm xúc](../../cookbook/customize/search.md)

## Hỗ trợ đa ngôn ngữ

`@waline/client` có sẵn hỗ trợ đa ngôn ngữ, và bạn có thể bổ sung ngôn ngữ hoặc sửa văn bản giao diện dựa trên đó. Xem:

- [Tính năng → Đặt ngôn ngữ](../features/i18n.md).
- [Sổ tay → Tùy chỉnh ngôn ngữ](../../cookbook/customize/locale.md).

## Hỗ trợ khả năng tiếp cận

Waline hỗ trợ đầy đủ mọi tiêu chuẩn về khả năng tiếp cận:

- Mọi biểu tượng và điều khiển đều có nhãn hỗ trợ tiếp cận tương ứng.
- Bạn có thể tương tác với mọi điều khiển của Waline bằng bàn phím hoặc thiết bị trỏ gắn trên đầu.

Đây là cách chúng tôi hỗ trợ những người khiếm thị và khiếm khuyết vận động trên toàn thế giới! :heart:

## Kiểu dáng tùy chỉnh

Waline có sẵn hỗ trợ chế độ tối. Để người dùng dễ điều chỉnh kiểu dáng của Waline, chúng tôi cung cấp nhiều biến CSS có thể cấu hình.

Xem [Kiểu dáng tùy chỉnh](../features/style.md) để biết chi tiết.

## Phát triển nâng cao

### Hỗ trợ ứng dụng một trang

Waline hỗ trợ SPA (**S**ingle **P**age **A**pplications).

Nếu muốn dùng Waline trong một trang web hoặc ứng dụng dựa trên history API, bạn có thể dùng phương thức `update()` trên thực thể đã khởi tạo để làm mới cấu hình khu vực bình luận, hoặc dùng phương thức `destroy()` trên thực thể để hủy Waline. Để tìm hiểu thêm về khả năng phản ứng của `@waline/client`, xem [Sổ tay → Tính phản ứng](../../cookbook/reactivity.md).

### Hệ sinh thái

Bạn có thể dễ dàng dùng Waline qua plugin trên các công cụ như Hexo, VuePress, và cả các ứng dụng khách bên thứ ba.

Để xem các ứng dụng khách, chủ đề và plugin bên thứ ba hỗ trợ Waline, xem [Tìm hiểu thêm → Hệ sinh thái](../../advanced/ecosystem.md).
