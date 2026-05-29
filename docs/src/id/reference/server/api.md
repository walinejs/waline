---
title: API
icon: api
---

## Komentar

### Daftar Komentar

Mendapatkan daftar komentar untuk artikel

```http
GET /api/comment
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                                                                                                                                                                                                     |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | ID artikel untuk komentar                                                                                                                                                                                     |
| page      | number | Halaman komentar                                                                                                                                                                                              |
| pageSize  | number | Ukuran halaman daftar komentar                                                                                                                                                                                |
| sortBy    | string | Tipe pengurutan daftar komentar, default urutan menurun berdasarkan waktu buat, Anda juga dapat mengurutkan secara menaik berdasarkan create_time, atau mengurutkan secara menurun berdasarkan like komentar. |

### Jumlah Komentar

Mendapatkan jumlah komentar untuk artikel

```http
GET /api/comment?type=count
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                                                                  |
| --------- | ------ | -------------------------------------------------------------------------- |
| url       | string | ID artikel untuk komentar, mengembalikan jumlah komentar situs jika kosong |

### Komentar Terbaru

Mendapatkan komentar terbaru

```http
GET /api/comment?type=recent
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                         |
| --------- | ------ | --------------------------------- |
| count     | number | jumlah komentar yang dikembalikan |

### Kirim komentar

```http
POST /api/comment
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                            |
| --------- | ------ | ------------------------------------ |
| comment   | string | isi komentar                         |
| link      | string | situs komentator                     |
| mail      | string | email komentator                     |
| nick      | string | nama panggilan komentator            |
| pid       | string | ID komentar yang dibalas             |
| rid       | string | ID komentar root yang dimiliki       |
| ua        | string | user agent komentator                |
| url       | string | ID artikel untuk komentar            |
| at        | string | nama panggilan komentar yang dibalas |

## Statistik pembacaan

### Mendapatkan statistik pembacaan

Mendapatkan jumlah pembacaan yang sesuai untuk satu artikel atau beberapa artikel.

```http
GET /api/article
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                                                             |
| --------- | ------ | --------------------------------------------------------------------- |
| path      | string | ID artikel untuk komentar, beberapa ID harus digabungkan dengan koma. |

### Memperbarui statistik pembacaan

Memperbarui jumlah pembacaan sebuah artikel.

```http
POST /api/article
```

**Parameter**:

| Parameter | Tipe   | Deskripsi                 |
| --------- | ------ | ------------------------- |
| path      | string | ID artikel untuk komentar |
