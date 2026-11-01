---
title: Thông báo bình luận
icon: notice
order: 10
---

Khi người dùng gửi bình luận trên trang web hoặc trả lời một bình luận, Waline hỗ trợ gửi thông báo qua email hoặc WeChat cho chủ blog và cho tác giả của bình luận được trả lời.

- Chúng tôi hỗ trợ nhiều loại thông báo cho chủ blog
- Chúng tôi sẽ gửi email cho người dùng bình luận ngay khi bình luận của họ có trả lời.

<!-- more -->

## Thông báo qua email

Thông báo qua email cần cấu hình các biến môi trường sau:

- `SMTP_SERVICE`: Nhà cung cấp dịch vụ gửi thư SMTP

  ::: tip

  Bạn có thể tìm thấy mọi nhà cung cấp được hỗ trợ trong [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Nếu nhà cung cấp của bạn không có trong danh sách, bạn phải cấu hình `SMTP_HOST` và `SMTP_PORT`.

  - `SMTP_HOST`: Địa chỉ máy chủ SMTP, thường có thể tìm thấy trong trang cài đặt của hộp thư.
  - `SMTP_PORT`: Cổng máy chủ SMTP, thường có thể tìm thấy trong trang cài đặt của hộp thư.

  :::

- `SMTP_USER`: Tài khoản dịch vụ gửi thư SMTP, chính là địa chỉ email của bạn.
- `SMTP_PASS`: Mật khẩu dịch vụ gửi thư SMTP, chính là mật khẩu email của bạn.
- `SMTP_SECURE`: Kết nối SMTP bằng SSL, nhận giá trị `true` hoặc `false`.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.

Các biến môi trường sau là tùy chọn:

- `SENDER_NAME`: Tên người gửi tùy chỉnh trong thông báo
- `SENDER_EMAIL`: Email người gửi tùy chỉnh trong thông báo, bắt buộc với một số dịch vụ SMTP.
- `MAIL_SUBJECT`: Tiêu đề email trả lời tùy chỉnh
- `MAIL_TEMPLATE`: Nội dung email trả lời tùy chỉnh
- `MAIL_SUBJECT_ADMIN`: Tiêu đề email thông báo bình luận mới tùy chỉnh
- `MAIL_TEMPLATE_ADMIN`: Nội dung email thông báo bình luận mới tùy chỉnh
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để xác định bình luận có phải do chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.

## Thông báo qua WeChat

Chúng tôi dùng [Mr. Server](http://sc.ftqq.com/3.version) để gửi thông báo qua WeChat. Bạn cần đặt `SC_KEY` trong biến môi trường, đây là khóa đăng ký trên Mr. Server.

- `SC_KEY`: Token đăng ký trên Mr. Server, bắt buộc cho dịch vụ này.
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để phân biệt bình luận có phải do chính chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.

## Thông báo qua QQ

Chúng tôi dùng [Mr. Qmsg](https://qmsg.zendee.cn) để gửi thông báo qua QQ. Bạn cần đặt `QMSG_KEY` trong biến môi trường, đây là khóa đăng ký trên Mr. Qmsg.

- `QMSG_KEY`: KEY đăng ký trên Mr. Qmsg, bắt buộc cho dịch vụ này.
- `QMSG_HOST`: HOST đăng ký trên Mr. QmsgPrivate, tùy chọn. Bắt buộc khi dùng host riêng này. Mặc định là `https://qmsg.zendee.cn`
- `QQ_ID`: ID QQ của (những) người nhận, trừ nhóm QQ. Nếu có nhiều ID QQ, hãy phân tách các giá trị bằng dấu phẩy, ví dụ `1244453393,2952937634` (tất cả phải nằm trong danh sách QQ ID của Mr. Qmsg).
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để phân biệt bình luận có phải do chính chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `QQ_TEMPLATE`: Mẫu thông báo dùng cho QQ. Các biến và định dạng cụ thể có thể xem trong phần mẫu thông báo bên dưới. Nếu không cấu hình, mẫu mặc định sẽ được dùng.

## Thông báo qua Telegram

Chúng tôi dùng bot Telegram để gửi thông báo qua Telegram. Bạn cần đặt các biến môi trường sau.

- `TG_BOT_TOKEN`: Token của bot Telegram để truy cập HTTP API. Tạo bot với [@BotFather](https://t.me/BotFather) để lấy token này. Bắt buộc cho dịch vụ này.
- `TG_CHAT_ID`: `chat_id` của người nhận. Có thể là một người dùng, một kênh hoặc một nhóm. [@userinfobot](https://t.me/userinfobot) sẽ hiển thị `chat_id` này khi bạn chuyển tiếp tin nhắn cho nó. Bắt buộc cho dịch vụ này.
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để phân biệt bình luận có phải do chính chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `TG_TEMPLATE`: Mẫu thông báo dùng cho Telegram. Các biến và định dạng cụ thể có thể xem trong phần mẫu thông báo bên dưới. Nếu không cấu hình, mẫu mặc định sẽ được dùng.

## Thông báo qua PushPlus

[pushplus](http://www.pushplus.plus/) là một nền tảng đẩy tin nhắn hỗ trợ nhiều kênh như WeChat, WeChat Work, DingTalk, SMS hoặc email. Bạn cần đặt các biến môi trường sau. Bạn có thể xem [tài liệu pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) để biết thêm chi tiết về định dạng tham số.

- `PUSH_PLUS_KEY`: token người dùng. Bắt buộc cho dịch vụ này.
- `PUSH_PLUS_TOPIC`: ID nhóm. Nếu để trống sẽ gửi cho chính bạn. Không có tác dụng nếu `PUSH_PLUS_CHANNEL` bằng `webhook`.
- `PUSH_PLUS_TEMPLATE`: Mẫu gửi
- `PUSH_PLUS_CHANNEL`: Kênh gửi
- `PUSH_PLUS_WEBHOOK`: webhook là bắt buộc nếu `PUSH_PLUS_CHANNEL` bằng `webhook` hoặc `cp`.
- `PUSH_PLUS_CALLBACKURL`: URL callback sau khi gửi phản hồi.
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để phân biệt bình luận có phải do chính chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.

## Thông báo qua Discord

Chúng tôi dùng Discord Webhook để gửi thông báo qua Discord. Bạn cần đặt các biến môi trường sau.

- `DISCORD_WEBHOOK`: URL Webhook Discord, [Cách tạo URL Webhook Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: Mẫu gửi
- `AUTHOR_EMAIL`: Email của chủ blog, dùng để phân biệt bình luận có phải do chính chủ blog gửi hay không. Nếu do chủ blog gửi sẽ không có thông báo nhắc nhở.
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.

## Thông báo qua Lark

Chúng tôi dùng Lark Webhook để gửi thông báo nhóm. Các biến môi trường sau là bắt buộc.

- `LARK_WEBHOOK`: Bot nhóm Lark [Cách dùng Webhook](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US)
- `LARK_SECRET`: Theo tài liệu của Lark, secret này dùng để ký yêu cầu của bạn nhằm tránh bị lạm dụng (tùy chọn).
- `LARK_TEMPLATE`: Mẫu tin nhắn
- `SITE_NAME`: Tên trang web của bạn, sẽ được hiển thị trong nội dung thông báo.
- `SITE_URL`: URL trang web của bạn, sẽ được hiển thị trong nội dung thông báo.

## Mẫu thông báo

Waline hỗ trợ cấu hình mẫu thông báo tùy chỉnh riêng cho từng nền tảng, giúp khả năng tùy biến mạnh hơn và tương thích với đa ngôn ngữ.

### Các biến được hỗ trợ

Mẫu nhận tham số thông qua các đối tượng `self`, `parent` và `site`, mỗi đối tượng chứa các biến sau:

- `self`: Bình luận hiện tại

  | biến            | mô tả                         |
  | --------------- | ----------------------------- |
  | nick            | Biệt danh của người bình luận |
  | mail            | Email của người bình luận     |
  | link            | Trang web của người bình luận |
  | url             | Địa chỉ bài viết              |
  | comment         | Nội dung bình luận            |
  | browser         | Tên trình duyệt               |
  | os              | Tên hệ điều hành              |
  | avatar          | ảnh đại diện                  |
  | _commentLink_\* | Liên kết trong bình luận      |

  \*: commentLink chỉ được cung cấp trong thông báo Telegram và sẽ tự động được bọc theo định dạng Markdown.

- `parent`: Bình luận được trả lời (bình luận cha).

  | biến    | mô tả                         |
  | ------- | ----------------------------- |
  | nick    | Biệt danh của người bình luận |
  | mail    | Email của người bình luận     |
  | link    | Trang web của người bình luận |
  | browser | Tên trình duyệt               |
  | os      | Tên hệ điều hành              |
  | avatar  | ảnh đại diện                  |
  | comment | Nội dung bình luận            |

- `site`: Cấu hình trang web

  | biến    | mô tả                        |
  | ------- | ---------------------------- |
  | name    | Tên trang web                |
  | url     | URL trang web                |
  | postUrl | Địa chỉ đầy đủ của bình luận |

### Mẫu mặc định

Mẫu mặc định được đính kèm dưới đây để bạn tham khảo:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Thông tin thêm

1. Kích thước biến môi trường của Vercel bị giới hạn ở `4KB`, nên nếu mẫu của bạn dài, bạn nên cấu hình nó trong tệp đầu vào chính, xem [issue#106](https://github.com/walinejs/waline/issues/106).
1. Thông tin cụ thể của các biến có thể thay đổi trong quá trình phát triển. Phần mô tả biến ở đây chỉ mang tính tham khảo. Vui lòng tham khảo các ví dụ mã cụ thể để biết nội dung chính xác.
