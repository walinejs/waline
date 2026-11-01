---
title: Cấu hình máy chủ
icon: config
---

Các tùy chọn sau cần được cấu hình trong tệp đầu vào của máy chủ `index.js`.

::: warning

Nếu bạn đang dùng template, lưu ý rằng bạn cần tự lưu các cấu hình này, vì chúng sẽ bị ghi đè khi bạn kéo template chính thức mới nhất về.

Chúng tôi khuyến nghị bạn tạo một kho lưu trữ từ template chính thức và thực hiện các thay đổi ở đó.

:::

## Tùy chọn cơ bản

### plugins

- Kiểu: `plugin[]`

Xem [Hệ thống plugin](./plugin.md) để biết chi tiết

### secureDomains

- Kiểu: `string | RegExp | string[] | RegExp[]`

Cấu hình tên miền an toàn. Các yêu cầu từ tên miền khác sẽ nhận mã trạng thái 403. Hỗ trợ kiểu String, Regexp và Array. Bỏ trống cấu hình này nghĩa là cho phép mọi tên miền gửi yêu cầu.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Để thuận tiện cho việc phát triển cục bộ, `localhost` và `127.0.0.1` sẽ được thêm vào danh sách tên miền an toàn theo mặc định.
- Biến môi trường `SECURE_DOMAINS` sẽ không có tác dụng khi tùy chọn này được đặt.

:::

### forbiddenWords

- Kiểu: `string[]`

Nếu bình luận khớp với một từ bị cấm, bình luận đó sẽ bị đánh dấu là thư rác.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Kiểu: `string[]`

Nếu IP của bình luận khớp với danh sách này, sẽ trả về mã trạng thái 403.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Kiểu: `string`

Tùy chỉnh tiêu đề email trả lời bình luận, tương đương với biến môi trường `MAIL_SUBJECT`.

### mailTemplate

- Kiểu: `string`

Tùy chỉnh nội dung email trả lời bình luận, tương đương với biến môi trường `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Kiểu: `string`

Tùy chỉnh tiêu đề email thông báo bình luận mới, tương đương với biến môi trường `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Kiểu: `string`

Tùy chỉnh nội dung email thông báo bình luận mới, tương đương với biến môi trường `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Kiểu: `string`

Mẫu thông báo bình luận qua QQ, tương đương với biến môi trường `QQ_TEMPLATE`.

### TGTemplate

- Kiểu: `string`

Mẫu thông báo bình luận qua Telegram, tương đương với biến môi trường `TG_TEMPLATE`.

### model

- Kiểu: `class`

Chi tiết xem [Tùy chỉnh dịch vụ cơ sở dữ liệu](../../cookbook/customize/database.md)

### encryptPassword

- Kiểu: `function`

Xem [Tùy chỉnh hệ thống người dùng](../../cookbook/customize/userdb.md) để biết chi tiết

### locales

- Kiểu: `Record<string, Record<string, string>>`

Xem [Tùy chỉnh ngôn ngữ](../../cookbook/customize/locale.md)

## Hook bình luận

Ngoài cấu hình qua biến môi trường, Waline còn cung cấp một số hook tùy chỉnh để thuận tiện xử lý các yêu cầu riêng. Chỉ cần cấu hình trong tệp đầu vào của máy chủ `index.js`.

### preSave(comment)

Waline cung cấp một số hook tùy chỉnh để người dùng có thể tùy biến hành vi của máy chủ Waline theo nhu cầu của mình.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

Hành động được thực hiện sau khi bình luận được đăng.

Khi phương thức được thực thi, dữ liệu bình luận sẽ được truyền làm tham số thứ nhất; nếu đó là trả lời cho một bình luận, bình luận cha sẽ được truyền làm tham số thứ hai.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Hành động trước khi nội dung bình luận được cập nhật trong bảng điều khiển. Nếu phương thức trả về nội dung, giao diện sẽ trả về ngay mà không cập nhật dữ liệu bình luận.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### postUpdate(comment)

Hành động sau khi nội dung bình luận được cập nhật trong bảng điều khiển. Dữ liệu bình luận sẽ được truyền vào khi phương thức được thực thi.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Hành động trước khi một bình luận bị xóa. Khi phương thức được thực thi, ID bình luận cần thao tác sẽ được truyền vào. Nếu phương thức trả về nội dung, giao diện sẽ trả về ngay mà không cập nhật dữ liệu bình luận.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### postDelete(commentId)

Hành động sau khi một bình luận bị xóa, ID bình luận sẽ được truyền làm tham số duy nhất.

::: details Ví dụ

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
