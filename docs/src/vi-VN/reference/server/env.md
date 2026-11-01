---
title: Biến môi trường máy chủ
icon: config
---

Bạn có thể tùy chỉnh máy chủ Waline thông qua các biến môi trường sau.

::: warning

Bạn PHẢI **triển khai lại** sau khi cập nhật biến môi trường để các thay đổi có hiệu lực.

Khi dùng Vercel, bạn nên đặt qua `Settings` - `Environment Variables`.

:::

<!-- more -->

## Cơ bản

| Biến môi trường | Bắt buộc | Mô tả                                                                        |
| --------------- | -------- | ---------------------------------------------------------------------------- |
| `SITE_NAME`     |          | tên trang web                                                                |
| `SITE_URL`      |          | URL trang web                                                                |
| `LOGIN`         |          | Người dùng cần đăng nhập trước khi bình luận khi `LOGIN=force`               |
| `SERVER_URL`    |          | URL của máy chủ Waline, hữu ích khi địa chỉ được tạo tự động không chính xác |

## Hiển thị

| Biến môi trường         | Mặc định                                                                | Mô tả                                                                       |
| ----------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | có ẩn user agent của người bình luận hay không. Giá trị mặc định là `false` |
| `DISABLE_REGION`        |                                                                         | có ẩn khu vực của người bình luận hay không. Giá trị mặc định là `false`    |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | có tắt thông báo cho tác giả hay không                                      |
| `AVATAR_PROXY`          | `''`                                                                    | URL dịch vụ proxy avatar. Để trống để tắt dịch vụ này                       |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | Chuỗi hiển thị Gravatar, dựa trên template nunjucks                         |
| `LEVELS`                |                                                                         | Gán cho mỗi người dùng một nhãn cấp độ dựa trên số lượng bình luận          |

::: tip Nhãn cấp độ

Dựa trên số bình luận của người dùng, một nhãn cấp độ sẽ được thêm vào người bình luận theo các điều kiện xếp hạng. Tính năng này mặc định bị tắt và có thể bật bằng cách đặt biến môi trường `LEVELS`. Cấu hình có dạng các con số được nối với nhau bằng dấu phẩy, ví dụ `0,10,20,50,100,200` nghĩa là:

| Cấp độ | Điều kiện          | Nhãn cấp độ mặc định |
| ------ | ------------------ | -------------------- |
| 0      | 0 <= count < 10    | Người lùn            |
| 1      | 10 <= count < 20   | Người tí hon         |
| 2      | 20 <= count < 50   | Thần rừng            |
| 3      | 50 <= count < 100  | Pháp sư              |
| 4      | 100 <= count < 200 | Tiên tộc             |
| 5      | 200 <= count       | Maiar                |

Ngoài việc tùy chỉnh quy tắc xét cấp độ, chúng ta cũng có thể tùy chỉnh nhãn cấp độ. Cấu hình nội dung trong ứng dụng khách như sau:

```js
Waline.init({
  locale: {
    level0: 'Dwarves',
    level1: 'Hobbits',
    level2: 'Ents',
    level3: 'Wizards',
    level4: 'Elves',
    level5: 'Maiar',
  },
});
```

Mặc định chỉ cung cấp nội dung cho 6 cấp độ, nhưng điều đó không có nghĩa là chỉ có thể có 6 cấp độ. Giới hạn cấp độ cụ thể phụ thuộc vào quy tắc xét cấp độ mà bạn đặt. Để thêm cấp độ mới, nên tự cấu hình nội dung nhãn tương ứng với cấp độ đó. Nếu không cung cấp nội dung nhãn, nhãn mặc định như `Level 10` sẽ được hiển thị.

:::

## Bảo mật

| Biến môi trường       | Mặc định       | Mô tả                                                                                                                              |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | Giới hạn tần suất gửi bình luận theo IP, tính bằng giây. Đặt là 0 để không giới hạn                                                |
| `SECURE_DOMAINS`      |                | Cấu hình tên miền an toàn. Hỗ trợ nhiều tên miền, phân tách bằng dấu phẩy                                                          |
| `AKISMET_KEY`         | `70542d86693e` | Khóa dịch vụ chống thư rác Akismet, đặt là `false` nếu bạn muốn tắt dịch vụ này.                                                   |
| `COMMENT_AUDIT`       | `false`        | Công tắc kiểm duyệt bình luận. Khi bật, mọi bình luận cần được quản trị viên phê duyệt, nên khuyến nghị thêm gợi ý vào placeholder |
| `RECAPTCHA_V3_KEY`    |                | Khóa reCAPTCHA V3, cần đặt cùng với ứng dụng khách                                                                                 |
| `RECAPTCHA_V3_SECRET` |                | Bí mật reCAPTCHA V3 dành cho máy chủ.                                                                                              |
| `TURNSTILE_KEY`       |                | Khóa Turnstile, cần đặt cùng với ứng dụng khách                                                                                    |
| `TURNSTILE_SECRET`    |                | Bí mật Turnstile dành cho máy chủ                                                                                                  |

::: tip Recaptcha và Turnstile

Có thể yêu cầu Key và Secret của Turnstile tại <https://www.cloudflare.com/products/turnstile/>.

Có thể yêu cầu Key và Secret của Recaptcha tại <https://www.google.com/recaptcha>.

Khi thiết lập tên miền bảo mật, bạn cần thêm đồng thời địa chỉ trang web và địa chỉ máy chủ Waline.

:::

## Markdown

| Biến môi trường      | Mặc định  | Mô tả                                                                  |
| -------------------- | --------- | ---------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`      | Cấu hình MarkdownIt                                                    |
| `MARKDOWN_HIGHLIGHT` | `true`    | Có bật tô sáng mã nguồn hay không                                      |
| `MARKDOWN_EMOJI`     | `true`    | Có bật emoji hay không                                                 |
| `MARKDOWN_SUB`       | `true`    | Có bật chỉ số dưới hay không                                           |
| `MARKDOWN_SUP`       | `true`    | Có bật chỉ số trên hay không                                           |
| `MARKDOWN_TEX`       | `mathjax` | Dịch vụ phân tích công thức toán, hỗ trợ `mathjax`, `katex` và `false` |
| `MARKDOWN_MATHJAX`   | `{}`      | Tùy chọn MathJax                                                       |
| `MARKDOWN_KATEX`     | `{}`      | Tùy chọn KaTeX                                                         |

## Dịch vụ email

Dịch vụ email được dùng để gửi thông báo qua email về việc đăng ký người dùng và bình luận. Sau khi cấu hình các biến liên quan đến dịch vụ email, quá trình đăng ký người dùng sẽ có thêm bước xác nhận bằng mã xác minh gửi qua email nhằm ngăn chặn đăng ký độc hại.

| Tên biến môi trường | Ghi chú                         |
| ------------------- | ------------------------------- |
| `SMTP_SERVICE`      | Nhà cung cấp dịch vụ email SMTP |
| `SMTP_HOST`         | Địa chỉ máy chủ SMTP            |
| `SMTP_PORT`         | Cổng máy chủ SMTP               |
| `SMTP_USER`         | Tên người dùng SMTP             |
| `SMTP_PASS`         | Mật khẩu SMTP.                  |
| `SMTP_SECURE`       | Kết nối SMTP bằng SSL           |
| `SENDER_NAME`       | Tùy chỉnh tên người gửi         |
| `SENDER_EMAIL`      | Tùy chỉnh email người gửi       |

::: tip

Các nhà cung cấp dịch vụ được hỗ trợ có thể xem tại [nodemailer services](https://github.com/nodemailer/nodemailer/blob/master/src/well-known/services.json). Bạn có thể chọn một trong hai: `SMTP_SERVICE` hoặc (`SMTP_HOST`, `SMTP_PORT`). Nếu không biết `SMTP_SERVICE` tương ứng trong danh sách, bạn cần cấu hình `SMTP_HOST` và `SMTP_PORT`, thường có thể tìm thấy trong phần cài đặt hộp thư.

Tên người dùng SMTP thường là địa chỉ hộp thư đầy đủ của người dùng, và mật khẩu phần lớn giống với mật khẩu hộp thư.

Xin lưu ý đặc biệt rằng một số hộp thư sử dụng mật khẩu SMTP riêng.

:::

## Cơ sở dữ liệu

### MongoDB

| Biến môi trường    | Bắt buộc | Mặc định  | Mô tả                                          |
| ------------------ | -------- | --------- | ---------------------------------------------- |
| `MONGO_DB`         | ✅       |           | Tên cơ sở dữ liệu MongoDB                      |
| `MONGO_USER`       | ✅       |           | Tên người dùng máy chủ MongoDB                 |
| `MONGO_PASSWORD`   | ✅       |           | Mật khẩu máy chủ MongoDB                       |
| `MONGO_HOST`       |          | 127.0.0.1 | Địa chỉ máy chủ MongoDB, hỗ trợ định dạng mảng |
| `MONGO_PORT`       |          | 27017     | Cổng máy chủ MongoDB, hỗ trợ định dạng mảng    |
| `MONGO_REPLICASET` |          |           | Replica set của MongoDB                        |
| `MONGO_AUTHSOURCE` |          |           | Nguồn xác thực của MongoDB                     |
| `MONGO_OPT_SSL`    |          | `false`   | sử dụng kết nối SSL                            |

### MySQL

| Biến môi trường  | Bắt buộc | Mặc định  | Mô tả                            |
| ---------------- | -------- | --------- | -------------------------------- |
| `MYSQL_DB`       | ✅       |           | Tên cơ sở dữ liệu MySQL          |
| `MYSQL_USER`     | ✅       |           | Tên người dùng máy chủ MySQL     |
| `MYSQL_PASSWORD` | ✅       |           | Mật khẩu máy chủ MySQL           |
| `MYSQL_HOST`     |          | 127.0.0.1 | Địa chỉ máy chủ MySQL            |
| `MYSQL_PORT`     |          | 3306      | Cổng máy chủ MySQL               |
| `MYSQL_PREFIX`   |          | `wl_`     | Tiền tố bảng MySQL               |
| `MYSQL_CHARSET`  |          | `utf8mb4` | Bộ ký tự bảng MySQL              |
| `MYSQL_SSL`      |          | `false`   | có sử dụng kết nối SSL hay không |

### TiDB

[Tạo cơ sở dữ liệu trên TiDB](../../../vi-VN/guide/deploy/tidb.md)

| Biến môi trường | Bắt buộc | Mặc định  | Mô tả                       |
| --------------- | -------- | --------- | --------------------------- |
| `TIDB_DB`       | ✅       |           | Tên cơ sở dữ liệu TiDB      |
| `TIDB_USER`     | ✅       |           | Tên người dùng máy chủ TiDB |
| `TIDB_PASSWORD` | ✅       |           | Mật khẩu máy chủ TiDB       |
| `TIDB_HOST`     |          | 127.0.0.1 | Địa chỉ máy chủ TiDB        |
| `TIDB_PORT`     |          | 4000      | Cổng máy chủ TiDB           |
| `TIDB_PREFIX`   |          | `wl_`     | Tiền tố bảng TiDB           |
| `TIDB_CHARSET`  |          | `utf8mb4` | Bộ ký tự bảng TiDB          |

### SQLite

| Biến môi trường | Bắt buộc | Mặc định | Mô tả                                                                 |
| --------------- | -------- | -------- | --------------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅       |          | Đường dẫn tệp lưu trữ SQLite, không bao gồm tên tệp                   |
| `JWT_TOKEN`     | ✅       |          | Chuỗi ngẫu nhiên dùng để tạo mã thông báo đăng nhập                   |
| `SQLITE_DB`     |          | waline   | Tên tệp lưu trữ SQLite, hãy đổi nếu tên tệp của bạn không phải waline |
| `SQLITE_PREFIX` |          | `wl_`    | Tiền tố bảng SQLite                                                   |

### PostgreSQL

| Biến môi trường     | Bắt buộc | Mặc định  | Mô tả                                |
| ------------------- | -------- | --------- | ------------------------------------ |
| `PG_DB`             | ✅       |           | Tên cơ sở dữ liệu PostgreSQL         |
| `PG_USER`           | ✅       |           | Tên người dùng máy chủ PostgreSQL    |
| `PG_PASSWORD`       | ✅       |           | Mật khẩu máy chủ PostgreSQL          |
| `PG_HOST`           |          | 127.0.0.1 | Địa chỉ máy chủ PostgreSQL           |
| `PG_PORT`           |          | 5432      | Cổng máy chủ PostgreSQL              |
| `PG_PREFIX`         |          | `wl_`     | Tiền tố bảng PostgreSQL              |
| `PG_SSL`            |          | `false`   | đặt là `true` để sử dụng kết nối SSL |
| `POSTGRES_DATABASE` |          |           | bí danh của `PG_DB`                  |
| `POSTGRES_USER`     |          |           | bí danh của `PG_USER`                |
| `POSTGRES_PASSWORD` |          |           | bí danh của `PG_PASSWORD`            |
| `POSTGRES_HOST`     |          | 127.0.0.1 | bí danh của `PG_HOST`                |
| `POSTGRES_PORT`     |          | 5432      | bí danh của `PG_PORT`                |
| `POSTGRES_PREFIX`   |          | `wl_`     | bí danh của `PG_PREFIX`              |
| `POSTGRES_SSL`      |          | `false`   | bí danh của `PG_SSL`                 |

### GitHub

| Biến môi trường | Bắt buộc | Mặc định | Mô tả                                                                                            |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN`  | ✅       |          | [Mã truy cập cá nhân](https://github.com/settings/tokens)                                        |
| `GITHUB_REPO`   | ✅       |          | tên kho lưu trữ, ví dụ `walinejs/waline`                                                         |
| GITHUB_PATH     |          |          | Thư mục lưu trữ dữ liệu, ví dụ `data` nghĩa là lưu trong thư mục `data`, mặc định là thư mục gốc |

## Nâng cao

| Biến môi trường                 | Mặc định                    | Mô tả                                                                                                                 |
| ------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL dịch vụ đăng nhập mạng xã hội OAuth. Bạn có thể [tự xây dựng dịch vụ xác thực](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | Bạn có thể đặt URL Webhook sẽ được kích hoạt khi có bình luận mới.                                                    |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Liên kết quản trị Waline                                                                                              |
| `IP2REGION_DB`                  |                             | đường dẫn thư viện tra cứu IP IPv4 tùy chỉnh (không dùng nữa, hãy dùng `IP2REGION_DB_V4`)                             |
| `IP2REGION_DB_V4`               |                             | đường dẫn thư viện tra cứu IP IPv4 tùy chỉnh. Nếu không đặt sẽ dùng `IP2REGION_DB`                                    |
| `IP2REGION_DB_V6`               |                             | đường dẫn thư viện tra cứu IP IPv6 tùy chỉnh. Đặt giá trị này để bật tra cứu vị trí địa chỉ IPv6                      |
