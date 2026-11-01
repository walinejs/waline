---
title: Hỗ trợ nhiều dịch vụ cơ sở dữ liệu
icon: database
order: 2
---

Waline hỗ trợ nhiều loại cơ sở dữ liệu, bao gồm MySQL, PostgreSQL, SQLite và MongoDB.

Bạn chỉ cần cấu hình biến môi trường, Waline sẽ tự động chuyển sang dịch vụ lưu trữ dữ liệu tương ứng dựa trên các biến môi trường bạn đã cấu hình.

<!-- more -->

## MongoDB

<https://mongodb.com> cung cấp miễn phí cơ sở dữ liệu MongoDB 512M. Dưới đây là các biến môi trường cần cấu hình để sử dụng cơ sở dữ liệu MongoDB.

| Biến môi trường    | Bắt buộc | Giá trị mặc định | Mô tả                                          |
| ------------------ | -------- | ---------------- | ---------------------------------------------- |
| `MONGO_DB`         | ✅       |                  | Tên cơ sở dữ liệu MongoDB                      |
| `MONGO_USER`       | ✅       |                  | Tên người dùng máy chủ MongoDB                 |
| `MONGO_PASSWORD`   | ✅       |                  | Mật khẩu máy chủ MongoDB                       |
| `MONGO_HOST`       |          | 127.0.0.1        | Địa chỉ máy chủ MongoDB, hỗ trợ định dạng mảng |
| `MONGO_PORT`       |          | 27017            | Cổng máy chủ MongoDB, hỗ trợ định dạng mảng    |
| `MONGO_REPLICASET` |          |                  | Replica set của MongoDB                        |
| `MONGO_AUTHSOURCE` |          |                  | Nguồn xác thực của MongoDB                     |
| `MONGO_OPT_SSL`    |          | `false`          | Sử dụng kết nối SSL                            |

Dưới đây là ví dụ cấu hình cho mongodb.com. Xin lưu ý rằng bạn cần đặt `MONGO_HOST` và `MONGO_PORT` theo định dạng JSON khi có nhiều máy chủ.

```bash
MONGO_HOST=["cluster0-shard-00-00.p4edw.mongodb.net","cluster0-shard-00-01.p4edw.mongodb.net","cluster0-shard-00-02.p4edw.mongodb.net"]
MONGO_PORT=[27017,27017,27017,27017]
MONGO_DB=waline
MONGO_USER=admin
MONGO_PASSWORD=xxxx
MONGO_REPLICASET=atlas-12cebf-shard-0
MONGO_AUTHSOURCE=admin
MONGO_OPT_SSL=true
```

## MySQL

Sử dụng MySQL để lưu trữ dữ liệu cũng là một lựa chọn tốt. Ngoài dịch vụ MySQL của riêng chúng tôi, bạn cũng có thể dùng [FreeDB)(https://freedb.tech), dịch vụ cung cấp miễn phí 25M dung lượng cơ sở dữ liệu, hoặc [PlanetScale](https://planetscale.com) hiện chỉ hỗ trợ gói trả phí.

Nếu bạn muốn dùng MySQL làm nơi lưu trữ, trước tiên bạn cần nhập [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) để tạo bảng và cấu trúc bảng, sau đó đặt các biến môi trường sau trong dự án.

| Biến môi trường  | Bắt buộc | Giá trị mặc định | Mô tả                            |
| ---------------- | -------- | ---------------- | -------------------------------- |
| `MYSQL_DB`       | ✅       |                  | Tên cơ sở dữ liệu MySQL          |
| `MYSQL_USER`     | ✅       |                  | Tên người dùng máy chủ MySQL     |
| `MYSQL_PASSWORD` | ✅       |                  | Mật khẩu máy chủ MySQL           |
| `MYSQL_HOST`     |          | 127.0.0.1        | Địa chỉ máy chủ MySQL            |
| `MYSQL_PORT`     |          | 3306             | Cổng máy chủ MySQL               |
| `MYSQL_PREFIX`   |          | `wl_`            | Tiền tố bảng MySQL               |
| `MYSQL_CHARSET`  |          | `utf8mb4`        | Bộ ký tự bảng MySQL              |
| `MYSQL_SSL`      |          | `false`          | Có sử dụng kết nối SSL hay không |

## TiDB

[TiDB](https://github.com/pingcap/tidb) là một cơ sở dữ liệu NewSQL mã nguồn mở. [TiDB Cloud](https://tidbcloud.com/) là phiên bản trực tuyến chính thức, cung cấp miễn phí 5GB dung lượng cho mọi người sử dụng.

Vui lòng tham khảo [Tạo cơ sở dữ liệu TiDB](../../vi-VN/guide/deploy/tidb.md) để hiểu quy trình khởi tạo.

| Biến môi trường | Bắt buộc | Giá trị mặc định | Mô tả                       |
| --------------- | -------- | ---------------- | --------------------------- |
| `TIDB_DB`       | ✅       |                  | Tên cơ sở dữ liệu TiDB      |
| `TIDB_USER`     | ✅       |                  | Tên người dùng TiDB         |
| `TIDB_PASSWORD` | ✅       |                  | Mật khẩu cơ sở dữ liệu TiDB |
| `TIDB_HOST`     |          | 127.0.0.1        | Địa chỉ dịch vụ TiDB        |
| `TIDB_PORT`     |          | 4000             | Cổng dịch vụ TiDB           |
| `TIDB_PREFIX`   |          | `wl_`            | Tiền tố bảng dữ liệu TiDB   |
| `TIDB_CHARSET`  |          | `utf8mb4`        | Bộ ký tự bảng dữ liệu TiDB  |

## SQLite

Tải [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) về máy chủ của bạn nếu bạn muốn sử dụng SQLite. Sau đó đặt các biến môi trường sau trong dự án.

| Biến môi trường | Bắt buộc | Giá trị mặc định | Mô tả                                                                 |
| --------------- | -------- | ---------------- | --------------------------------------------------------------------- |
| `SQLITE_PATH`   | ✅       |                  | Đường dẫn tệp lưu trữ SQLite, không bao gồm tên tệp                   |
| `JWT_TOKEN`     | ✅       |                  | Chuỗi ngẫu nhiên dùng để tạo mã thông báo đăng nhập                   |
| `SQLITE_DB`     |          | waline           | Tên tệp lưu trữ SQLite, hãy đổi nếu tên tệp của bạn không phải waline |
| `SQLITE_PREFIX` |          | `wl_`            | Tiền tố bảng SQLite                                                   |

## PostgreSQL

[Supabase](https://supabase.com) và [Neon](https://neon.tech/home) cung cấp miễn phí cơ sở dữ liệu 512M, trong khi [Tembo](https://tembo.io/) cung cấp miễn phí 10G dung lượng cơ sở dữ liệu PG. Giống như MySQL, bạn cần nhập [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) để tạo bảng và cấu trúc bảng trước khi sử dụng PostgreSQL.

| Biến môi trường     | Bắt buộc | Giá trị mặc định | Mô tả                                   |
| ------------------- | -------- | ---------------- | --------------------------------------- |
| `PG_DB`             | ✅       |                  | Tên cơ sở dữ liệu PostgreSQL            |
| `PG_USER`           | ✅       |                  | Tên người dùng máy chủ PostgreSQL       |
| `PG_PASSWORD`       | ✅       |                  | Mật khẩu máy chủ PostgreSQL             |
| `PG_HOST`           |          | 127.0.0.1        | Địa chỉ máy chủ PostgreSQL              |
| `PG_PORT`           |          | 5432             | Cổng máy chủ PostgreSQL                 |
| `PG_PREFIX`         |          | `wl_`            | Tiền tố bảng PostgreSQL                 |
| `PG_SSL`            |          | `false`          | Đặt thành `true` để sử dụng kết nối SSL |
| `POSTGRES_DATABASE` |          |                  | Bí danh cho `PG_DB`                     |
| `POSTGRES_USER`     |          |                  | Bí danh cho `PG_USER`                   |
| `POSTGRES_PASSWORD` |          |                  | Bí danh cho `PG_PASSWORD`               |
| `POSTGRES_HOST`     |          | 127.0.0.1        | Bí danh cho `PG_HOST`                   |
| `POSTGRES_PORT`     |          | 5432             | Bí danh cho `PG_PORT`                   |
| `POSTGRES_PREFIX`   |          | `wl_`            | Bí danh cho `PG_PREFIX`                 |
| `POSTGRES_SSL`      |          | `false`          | Bí danh cho `PG_SSL`                    |

## GitHub

Waline hỗ trợ lưu trữ dữ liệu bình luận trong một tệp CSV trên GitHub. Để dùng GitHub làm nơi lưu trữ dữ liệu, bạn cần xin Personal access tokens. Bạn có thể nhấn <kbd>Generate new token</kbd> để xin tại <https://github.com/settings/tokens>. Chọn tùy chọn **repo** trong phần quyền để có quyền đọc và ghi đối với kho lưu trữ.

| Biến môi trường | Bắt buộc | Giá trị mặc định | Mô tả                                                                                            |
| --------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `GITHUB_TOKEN`  | ✅       |                  | [Personal access tokens](https://github.com/settings/tokens)                                     |
| `GITHUB_REPO`   | ✅       |                  | Tên kho lưu trữ, ví dụ `walinejs/waline`                                                         |
| GITHUB_PATH     |          |                  | Thư mục lưu trữ dữ liệu, ví dụ `data` nghĩa là lưu trong thư mục `data`, mặc định là thư mục gốc |

::: warning

Do vấn đề hiệu năng, không nên sử dụng GitHub.

:::

## Tùy chỉnh

Ngoài các dịch vụ lưu trữ cơ sở dữ liệu ở trên, bạn cũng có thể thêm hỗ trợ cho các dịch vụ lưu trữ khác.

Nếu bạn muốn giúp Waline hỗ trợ thêm dịch vụ lưu trữ, bạn có thể fork dự án, kế thừa [lớp cơ sở](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) rồi triển khai các phương thức `select()`, `add()`, `update()` và `delete()` của dịch vụ lưu trữ tương ứng và gửi PR.
