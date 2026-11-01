---
title: Cảm xúc bài viết
icon: reaction
order: 4
---

Waline cho phép người dùng bày tỏ cảm xúc với nội dung bài viết.

<!-- more -->

## Bắt đầu

Để nhanh chóng bật cảm xúc bài viết, bạn có thể đặt tùy chọn `reaction` thành `true` để hiển thị danh sách cảm xúc mặc định:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // start the reaction
});
```

Waline sẽ hiển thị danh sách cảm xúc mặc định phía trên khung bình luận.

## Tùy chỉnh cảm xúc

Nếu cần tùy chỉnh các biểu tượng cảm xúc này, bạn có thể truyền vào một mảng chứa liên kết tới hình ảnh biểu tượng cảm xúc, tương ứng với những cảm xúc bạn muốn người dùng chọn:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

Đồng thời, bạn có thể tùy chỉnh tiêu đề của phần cảm xúc qua `reactionTitle` trong `locale`, và cũng có thể tùy chỉnh tên của từng cảm xúc qua `reaction0` đến `reaction8`, xem [Cài đặt đa ngôn ngữ](./i18n.md).

## Lưu ý

::: tip Giới hạn số lượng

Waline hỗ trợ tối đa 9 cảm xúc, và bạn có thể thêm ít hơn 9 cảm xúc mà không gặp vấn đề gì.

:::

::: warning Quy tắc đếm

Việc đếm cảm xúc dựa trên vị trí.

Nếu bạn cần sắp xếp lại và điều chỉnh các cảm xúc, hãy xem [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) để biết chi tiết.

:::
