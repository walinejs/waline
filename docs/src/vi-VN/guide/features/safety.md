---
title: Bảo mật
icon: safe
order: -10
---

Bảo mật của hệ thống bình luận Waline là ưu tiên hàng đầu của chúng tôi. Dưới đây là những điểm về bảo mật của Waline.

<!-- more -->

## Bảo mật bình luận

### Chống tấn công XSS

Waline dùng [DOMPurify](https://github.com/cure53/DOMPurify) để lọc từng nội dung bình luận ở phía máy chủ nhằm ngăn chặn các cuộc tấn công XSS tiềm tàng. Điều này có nghĩa bạn không thể dùng `<iframe>` hay bất kỳ hình thức script nào.

### Ngăn chặn theo dõi qua liên kết

Mọi liên kết sẽ tự động được đặt `rel="noreferrer noopener"` và mở trong cửa sổ mới với `target="_blank"`.

### Ngăn chặn chèn nội dung độc hại

- Để ngăn người dùng tạo biểu mẫu có thể gửi trong khu vực bình luận nhằm lừa người truy cập khác gửi thông tin, bạn không thể dùng `<form>` và `<input>`

- Để ngăn người dùng dùng style để sửa đổi trang web hoặc sửa kiểu dáng bình luận của mình nhằm cài quảng cáo rác, thẻ `<style>` và thuộc tính `style` trên phần tử đều không được phép dùng.

- Để ngăn người dùng lạm dụng chức năng tự động phát của media, bạn không thể dùng thuộc tính `autoplay`.

### Ngăn chặn giả mạo

Waline hỗ trợ hệ thống tài khoản, nên bạn có thể buộc người dùng đăng ký và đăng nhập bằng tài khoản. Như vậy người truy cập sẽ không thể giả mạo bình luận của người khác.

Để bật tính năng này, bạn cần bật đăng nhập bắt buộc ở cả ứng dụng khách và máy chủ, xem [`login`](../../reference/client/props.md#login) và [`LOGIN`](../../reference/server/env.md#co-ban) để biết chi tiết.

## Bảo mật trang web

### Giới hạn tần suất

Để ngăn người dùng bình luận liên tục, Waline sẽ giới hạn theo IP bình luận. Mặc định, cùng một IP chỉ có thể gửi một bình luận trong vòng một phút. Bạn có thể thay đổi giới hạn này trong [Tham chiếu máy chủ → Biến môi trường](../../reference/server/env.md#bao-mat).

### Ngăn chặn gửi dồn dập

Waline sẽ đối chiếu với các bình luận hiện có khi nhập bình luận, nếu phát hiện bình luận có độ tương đồng quá cao, nó sẽ từ chối bình luận đó. Điều này phần nào ngăn được việc gửi dồn dập.

### Kiểm duyệt bình luận

Khi trang web của bạn bị tấn công ác ý, trong giai đoạn nhạy cảm hoặc khi bạn đang bận, bạn có thể bật tính năng kiểm duyệt bình luận. Chi tiết xem [Tham chiếu máy chủ → Biến môi trường](../../reference/server/env.md#bao-mat) .

Khi bật kiểm duyệt bình luận, mọi bình luận mới sẽ bị ẩn mặc định. Bạn có thể xem và kiểm duyệt bình luận trong bảng điều khiển quản trị Waline hoặc ngay trong khung bình luận ở trang tương ứng. Chỉ những bình luận bạn phê duyệt mới được hiển thị.

## Bảo mật dữ liệu

Vì Waline có phía máy chủ, không ai có thể sửa đổi dữ liệu bình luận hay lượt xem.

Đồng thời, bạn có thể đặt biến `DISABLE_USERAGENT` và `DISABLE_REGION` ở phía máy chủ để ngăn người khác xem UA và vị trí địa lý của bình luận.
