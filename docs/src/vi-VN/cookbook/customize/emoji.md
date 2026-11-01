---
title: Tạo bộ emoji đặt sẵn của riêng bạn
icon: emoji
---

Hướng dẫn này sẽ chỉ cho bạn cách tạo và sử dụng bộ emoji đặt sẵn của riêng mình.

<!-- more -->

## Tạo bộ đặt sẵn của riêng bạn

Trước tiên, bạn cần chuẩn bị một số hình ảnh emoji. Sau đó, hãy làm theo các bước sau để tạo bộ đặt sẵn của mình.

### Đặt tên cho emoji và tải lên

Để đơn giản, Waline sẽ dùng trực tiếp tên của tệp hình ảnh emoji làm khóa của emoji. Điều này có nghĩa là nếu bạn nhập hai bộ đặt sẵn khác nhau và cả hai đều chứa hình ảnh laugh.png, thì cả hai emoji sẽ tương ứng với cùng một emoji `:laugh:`.

Vì vậy, cách làm tốt nhất là mỗi người tạo bộ emoji đặt sẵn nên thêm tiền tố liên quan đến tên bộ đặt sẵn vào tất cả tên tệp emoji.

Sau khi đặt tên phù hợp, bạn cần tải chúng lên máy chủ của mình.

### Viết thông tin bộ đặt sẵn

Chúng tôi giả định rằng bạn đã đặt một số hình ảnh emoji trong `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

Lúc này, bạn cũng cần tạo tệp `info.json` cho thư mục này để Waline biết bộ emoji đặt sẵn chứa những emoji nào.

Đầu tiên, hãy đặt tên cho bộ emoji đặt sẵn, ví dụ `My Emoji`, vì bạn đã đặt tiền tố `my_` cho hình ảnh và các tệp ở định dạng `png`. Bạn cần thêm chúng vào `info.json`.

`info.json` của bạn có thể là:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Sau đó, liệt kê tất cả tên emoji trong `items` theo thứ tự bạn muốn, đồng thời nhớ bỏ qua tiền tố và hậu tố mà bạn đã đặt trong `prefix` và `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Sau đó, hãy chọn một emoji đại diện làm biểu tượng hiển thị trên tab:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Như vậy là bạn đã viết xong `info.json`, hãy tải nó lên cùng thư mục.

Bạn đã tạo thành công bộ đặt sẵn `my-emoji` với `https://example.com/my-emoji/'`.

## Sử dụng bản sao GitHub với tag

Thông thường, việc có tên miền riêng và tải hình ảnh lên tên miền đó có thể hơi rườm rà, và liên kết có thể hết hạn theo thời gian, nên một cách nâng cao là dùng kho lưu trữ GitHub và dùng chức năng tag trong git để nhân bản kho GitHub cung cấp bộ emoji đặt sẵn.

Tương tự các bước trên, bạn cần tạo một kho lưu trữ GitHub mới, đặt tên emoji như trên, tạo `info.json` theo cùng các bước và tải chúng lên kho lưu trữ.

Sau đó, hãy tạo một tag cho kho lưu trữ, chúng tôi khuyến nghị đặt theo định dạng `vx.x.x`, ví dụ `v1.0.0`.

Sau khi thêm tag, bạn có thể dùng liên kết CDN kèm phiên bản trên [cdn.jsdelivr.net](https://www.jsdelivr.com/) làm bộ đặt sẵn của mình theo định dạng `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Giả sử bạn đã tạo kho lưu trữ `example/emoji`, tải trực tiếp hình ảnh emoji và `info.json` lên, đồng thời đã tạo tag `v1.0.0`, thì bạn có thể dùng `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` làm bộ đặt sẵn.

::: tip

Cần chỉ định tag trong liên kết để tránh việc liên kết hình ảnh mà các bình luận cũ tham chiếu bị mất hiệu lực do bạn sửa bộ đặt sẵn.

Bộ emoji đặt sẵn chính thức được tạo bằng kho lưu trữ [walinejs/emojis](https://github.com/walinejs/emojis) và dùng liên kết CDN. Hiện tại chúng tôi đang dùng phiên bản `v1.1.0`.

:::

::: warning

Vì cdn.jsdelivr.net bị ô nhiễm tại Trung Quốc, bạn có thể thay `cdn.jsdelivr.net` bằng `gcore.jsdelivr.net`

:::

## Sử dụng đối tượng cấu hình

Tương tự phần trước, giả sử bạn có cấu trúc tệp như sau:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

Ngoài việc tạo và tải lên `info.json` rồi dùng liên kết làm bộ đặt sẵn, bạn cũng có thể dùng trực tiếp đối tượng sau làm bộ đặt sẵn:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Ở đây, chúng ta thêm thuộc tính `folder` để cho Waline biết hình ảnh được lưu ở đâu.
