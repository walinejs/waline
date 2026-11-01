---
title: Hỗ trợ định dạng bình luận
icon: format
order: 1
---

Bạn có thể thêm nhiều nội dung khác nhau vào bình luận, bao gồm cú pháp Markdown mở rộng và thẻ HTML.

<!-- more -->

## Định dạng được hỗ trợ

Chúng tôi hỗ trợ đầy đủ CommonMark (cú pháp Markdown chuẩn), cùng các phần mở rộng sau:

- Bảng kiểu GFM
- Gạch ngang kiểu GFM
- Chỉ số dưới và chỉ số trên
- Emoji
- Tô sáng khối mã
- Công thức $\TeX$

::: info GFM

Github Flavored Markdown

:::

Đồng thời, bạn có thể tự do nhúng bất kỳ nội dung HTML nào mà không kích hoạt [cơ chế bảo vệ](./safety.md#bao-mat-binh-luan).

## Hạn chế của phần xem trước

Để kiểm soát kích thước của ứng dụng khách, chúng tôi chỉ đặt một trình phân tích Markdown nhỏ trong ứng dụng khách chính thức `@waline/client`, khiến nhiều cú pháp không hiển thị đúng trong bảng xem trước (chúng vẫn **được hiển thị đúng trong khung bình luận**).

Điều này bao gồm các hạn chế sau:

- Cú pháp emoji chuẩn (ví dụ :tada:`:tada:`) không hiển thị đúng

- Chỉ số trên và chỉ số dưới (ví dụ: `H~2~O`, `x^2^`) không thể hiển thị đúng

- Cú pháp $\TeX$, tức công thức toán học (ví dụ: `$a = 1$`) mặc định không được hiển thị.

  Khi dùng ứng dụng khách chính thức, bạn có thể tùy chỉnh việc hiển thị $\TeX$ trong phần xem trước bằng cách đặt tùy chọn `texRenderer`, xem [Sổ tay → Dùng trình hiển thị $\TeX$ tùy chỉnh](../../cookbook/customize/tex-renderer.md).

- Với bộ tô sáng mặc định, các khối mã sẽ được tô sáng bằng màu ngẫu nhiên với các dấu phân cách cụ thể.

  Khi dùng ứng dụng khách chính thức, bạn có thể tùy chỉnh việc tô sáng mã khi xem trước bằng cách đặt tùy chọn `highlighter`, xem [Sổ tay → Tùy chỉnh tô sáng mã](../../cookbook/customize/highlighter.md).

## Thêm

::: tip Nguyên lý

1. Do cân nhắc kích thước gói, ứng dụng khách dùng `marked` để hiển thị và mặc định dùng bộ tô sáng < 1kb, đồng thời không bao gồm trình hiển thị $\TeX$, dẫn tới các hạn chế trên.

1. Khi người dùng gửi bình luận, ứng dụng khách nhúng hình emoji tùy chỉnh và gửi nội dung bình luận gốc tới máy chủ.

1. Máy chủ nhận văn bản gốc, dùng `markdown-it` để hiển thị Markdown một cách chính xác với các plugin liên quan, dùng `prismjs` để tô sáng khối mã theo ngôn ngữ, thực hiện hiển thị $\TeX$ theo cài đặt của người dùng, và cuối cùng xử lý XSS.

1. Sau khi xử lý xong, máy chủ sẽ lưu nội dung đã hiển thị chính xác và trả về cho ứng dụng khách khi cần, đảm bảo khu vực bình luận hiển thị bình thường.

:::
