---
title: Tùy chỉnh ngôn ngữ hiển thị
icon: i18n
---

Hướng dẫn này chỉ cho bạn cách tùy chỉnh đa ngôn ngữ và văn bản hiển thị của Waline.

<!-- more -->

## Tùy chỉnh ngôn ngữ và văn bản của ứng dụng khách

`@waline/client` cung cấp tùy chọn `locale`, qua đó bạn có thể tùy chỉnh nhiều ngôn ngữ và văn bản hiển thị.

Mặc định, nó dùng các chuỗi đa ngôn ngữ có sẵn và quay về `en-US` (tiếng Anh Mỹ) nếu ngôn ngữ không được hỗ trợ.

Bạn có thể truyền một cấu hình đa ngôn ngữ hoàn chỉnh cho tùy chọn `locale` để thêm hỗ trợ ngôn ngữ, hoặc chỉ đặt một vài mục trong đó để ghi đè văn bản giao diện hiện có.

### Các tùy chọn locale

- Liên quan đến cấp độ:
  - `level${number}`: Nhãn cho số cấp độ

  ::: tip

  Ví dụ, bạn có thể tùy chỉnh nhãn cho 6 cấp độ như sau:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Liên quan đến cảm xúc (reaction):
  - `reactionTitle`: Tiêu đề của phần cảm xúc
  - `reaction0`: Văn bản cảm xúc 1
  - `reaction1`: Văn bản cảm xúc 2
  - `reaction2`: Văn bản cảm xúc 3
  - `reaction3`: Văn bản cảm xúc 4
  - `reaction4`: Văn bản cảm xúc 5
  - `reaction5`: Văn bản cảm xúc 6
  - `reaction6`: Văn bản cảm xúc 7
  - `reaction7`: Văn bản cảm xúc 8
  - `reaction8`: Văn bản cảm xúc 9

- Liên quan đến giao diện:
  - `nick`: biệt danh
  - `mail`: Email
  - `link`: Liên kết
  - `placeholder`: Văn bản mặc định của khung bình luận
  - `sofa`: Văn bản hiển thị khi khu vực bình luận trống
  - `submit`: Văn bản nút gửi
  - `comment`: Văn bản nút bình luận
  - `refresh`: Văn bản nút làm mới
  - `more`: Văn bản nút tải thêm
  - `uploading`: văn bản hiển thị khi đang tải lên
  - `login`: văn bản nút đăng nhập
  - `admin`: Nhãn của quản trị viên
  - `sticky`: Văn bản ghim
  - `word`: từ
  - `anonymous`: tên mặc định của người dùng ẩn danh
  - `optional`: văn bản cho biết tùy chọn không bắt buộc
  - `gifSearchPlaceholder`: văn bản gợi ý tìm kiếm emoji
  - `oldest`: bình luận cũ nhất
  - `latest`: bình luận mới nhất
  - `hottest`: bình luận nổi bật nhất

  ::: info

  Các văn bản trên sẽ được hiển thị trên trang.

  :::

- Liên quan đến thông báo:
  - `nickError`: Thông báo lỗi khi biệt danh không đáp ứng điều kiện
  - `mailError`: Thông báo lỗi khi địa chỉ email không đáp ứng điều kiện
  - `wordHint`: Thông báo lỗi về số từ của bình luận, trong đó `$0` `$1` `$2` sẽ tự động được thay bằng giới hạn dưới số từ cho phép, giới hạn trên số từ cho phép và số từ hiện tại.

- Liên quan đến thời gian bình luận:
  - `seconds`: giây trước
  - `minutes`: phút trước
  - `hours`: giờ trước
  - `days`: ngày trước
  - `now`: vừa xong

- Liên quan đến quản lý:
  - `approved`: Nút đánh dấu bình luận đã được phê duyệt
  - `waiting`: Nút đánh dấu bình luận đang chờ kiểm duyệt
  - `spam`: Nút đánh dấu bình luận là spam
  - `unsticky`: Nút bỏ ghim bình luận

- Liên quan đến khả năng truy cập:
  - `like`: văn bản nhãn của nút thích
  - `cancelLike`: văn bản nhãn của nút hủy thích
  - `reply`: văn bản nhãn của nút trả lời
  - `cancelReply`: văn bản nhãn của nút hủy trả lời
  - `preview`: Văn bản nhãn của nút xem trước
  - `emoji`: văn bản nhãn của nút emoji
  - `gif`: Văn bản nhãn của nút GIF
  - `uploadImage`: văn bản nhãn của nút tải hình ảnh lên
  - `profile`: Tiêu đề liên kết của trang hồ sơ
  - `logout`: văn bản nhãn của nút đăng xuất

  ::: info

  Các văn bản này chỉ nhằm mục đích hỗ trợ khả năng truy cập và sẽ không hiển thị trên trang.

  :::

### Ví dụ

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Tùy chỉnh văn bản phản hồi của máy chủ

`@waline/vercel` cung cấp tùy chọn `locales` cho phép bạn tùy chỉnh văn bản phản hồi.

Mặc định, nó dùng văn bản đa ngôn ngữ có sẵn và quay về văn bản tiếng `en-US` nếu ngôn ngữ không được hỗ trợ.

Bạn có thể truyền một cấu hình đa ngôn ngữ hoàn chỉnh cho tùy chọn `locales` để thêm hỗ trợ ngôn ngữ, hoặc đặt một vài mục trong đó để ghi đè văn bản hiện có.

::: tip

Mọi văn bản tùy chỉnh cuối cùng sẽ được kết xuất bằng công cụ mẫu nunjucks, công cụ này hỗ trợ viết một số biểu thức logic tương đối phức tạp. Ví dụ:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Tùy chọn locale

- Liên quan đến thông báo:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Liên quan đến thông báo email đăng ký/đăng nhập:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Liên quan đến thông báo email bình luận:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
