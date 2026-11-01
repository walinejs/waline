---
title: API
icon: api
---

## Bình luận

### Danh sách bình luận

Lấy danh sách bình luận của bài viết

```http
GET /api/comment
```

**Tham số**:

| Tham số  | Kiểu   | Mô tả                                                                                                                                                                           |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path     | string | ID bài viết để bình luận                                                                                                                                                        |
| page     | number | Trang bình luận                                                                                                                                                                 |
| pageSize | number | Số bình luận trên mỗi trang của danh sách                                                                                                                                       |
| sortBy   | string | Kiểu sắp xếp cho danh sách bình luận, mặc định sắp xếp giảm dần theo thời gian tạo; bạn cũng có thể sắp xếp tăng dần theo create_time, hoặc giảm dần theo lượt thích bình luận. |

### Số lượng bình luận

Lấy số lượng bình luận của bài viết

```http
GET /api/comment?type=count
```

**Tham số**:

| Tham số | Kiểu   | Mô tả                                                                        |
| ------- | ------ | ---------------------------------------------------------------------------- |
| url     | string | ID bài viết để bình luận, nếu để trống sẽ trả về tổng số bình luận của trang |

### Bình luận gần đây

Lấy các bình luận gần đây

```http
GET /api/comment?type=recent
```

**Tham số**:

| Tham số | Kiểu   | Mô tả                     |
| ------- | ------ | ------------------------- |
| count   | number | Số lượng bình luận trả về |

### Gửi bình luận

```http
POST /api/comment
```

**Tham số**:

| Tham số | Kiểu   | Mô tả                                       |
| ------- | ------ | ------------------------------------------- |
| comment | string | Nội dung bình luận                          |
| link    | string | Trang web của người bình luận               |
| mail    | string | Email của người bình luận                   |
| nick    | string | Biệt danh của người bình luận               |
| pid     | string | ID của bình luận được trả lời               |
| rid     | string | ID của bình luận gốc mà bình luận này thuộc |
| ua      | string | User agent của người bình luận              |
| url     | string | ID bài viết để bình luận                    |
| at      | string | Biệt danh của người được trả lời            |

## Thống kê lượt đọc

### Lấy thống kê lượt đọc

Lấy số lượt đọc tương ứng của một hoặc nhiều bài viết.

```http
GET /api/article
```

**Tham số**:

| Tham số | Kiểu   | Mô tả                                                                   |
| ------- | ------ | ----------------------------------------------------------------------- |
| path    | string | ID bài viết để bình luận, nhiều ID cần được nối với nhau bằng dấu phẩy. |

### Cập nhật thống kê lượt đọc

Cập nhật số lượt đọc của một bài viết.

```http
POST /api/article
```

**Tham số**:

| Tham số | Kiểu   | Mô tả                    |
| ------- | ------ | ------------------------ |
| path    | string | ID bài viết để bình luận |
