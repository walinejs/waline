---
title: Dukungan multi-database
icon: database
order: 2
---

Waline mendukung berbagai jenis database, termasuk MySQL, PostgreSQL, SQLite, dan MongoDB.

Anda hanya perlu mengonfigurasi variabel lingkungan, dan Waline akan secara otomatis beralih ke layanan penyimpanan data yang sesuai berdasarkan variabel lingkungan yang Anda konfigurasikan.

<!-- more -->

## MongoDB

<https://mongodb.com> secara resmi menyediakan dukungan database MongoDB 512M secara gratis. Berikut adalah variabel lingkungan yang perlu dikonfigurasi untuk menggunakan database MongoDB.

| Variabel Lingkungan | Wajib | Default   | Deskripsi                                     |
| ------------------- | ----- | --------- | --------------------------------------------- |
| `MONGO_DB`          | ✅    |           | Nama database MongoDB                         |
| `MONGO_USER`        | ✅    |           | Username server MongoDB                       |
| `MONGO_PASSWORD`    | ✅    |           | Password server MongoDB                       |
| `MONGO_HOST`        |       | 127.0.0.1 | Alamat server MongoDB, mendukung format array |
| `MONGO_PORT`        |       | 27017     | Port server MongoDB, mendukung format array   |
| `MONGO_REPLICASET`  |       |           | Replica set MongoDB                           |
| `MONGO_AUTHSOURCE`  |       |           | Auth source MongoDB                           |
| `MONGO_OPT_SSL`     |       | `false`   | Gunakan koneksi SSL                           |

Berikut adalah contoh konfigurasi untuk mongodb.com. Perlu diperhatikan bahwa Anda harus mengatur `MONGO_HOST` dan `MONGO_PORT` dalam format JSON ketika memiliki beberapa host.

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

Menggunakan MySQL untuk menyimpan data juga merupakan pilihan yang baik. Selain layanan MySQL sendiri, kita juga dapat menggunakan [FreeDB](https://freedb.tech) yang menyediakan dukungan database 25M secara gratis, atau [PlanetScale](https://planetscale.com) yang saat ini hanya mendukung paket berbayar.

Jika ingin menggunakan MySQL sebagai penyimpanan, Anda perlu mengimpor [waline.sql](https://github.com/walinejs/waline/blob/main/assets/waline.sql) terlebih dahulu untuk membuat tabel dan struktur tabel, kemudian atur variabel lingkungan berikut dalam proyek.

| Variabel Lingkungan | Wajib | Default   | Deskripsi                      |
| ------------------- | ----- | --------- | ------------------------------ |
| `MYSQL_DB`          | ✅    |           | Nama database MySQL            |
| `MYSQL_USER`        | ✅    |           | Username server MySQL          |
| `MYSQL_PASSWORD`    | ✅    |           | Password server MySQL          |
| `MYSQL_HOST`        |       | 127.0.0.1 | Alamat server MySQL            |
| `MYSQL_PORT`        |       | 3306      | Port server MySQL              |
| `MYSQL_PREFIX`      |       | `wl_`     | Prefiks tabel MySQL            |
| `MYSQL_CHARSET`     |       | `utf8mb4` | Charset tabel MySQL            |
| `MYSQL_SSL`         |       | `false`   | Apakah menggunakan koneksi SSL |

## TiDB

[TiDB](https://github.com/pingcap/tidb) adalah database NewSQL open source. [TiDB Cloud](https://tidbcloud.com/) adalah versi online resminya, yang menyediakan kuota gratis 5GB untuk semua orang.

Silakan lihat [Membuat database TiDB](../../id/guide/deploy/tidb.md) untuk memahami proses inisialisasi.

| Variabel Lingkungan | Wajib | Default   | Deskripsi                    |
| ------------------- | ----- | --------- | ---------------------------- |
| `TIDB_DB`           | ✅    |           | Nama database TiDB           |
| `TIDB_USER`         | ✅    |           | Nama pengguna database TiDB  |
| `TIDB_PASSWORD`     | ✅    |           | Password database TiDB       |
| `TIDB_HOST`         |       | 127.0.0.1 | Alamat layanan TiDB          |
| `TIDB_PORT`         |       | 4000      | Port layanan TiDB            |
| `TIDB_PREFIX`       |       | `wl_`     | Prefiks tabel data TiDB      |
| `TIDB_CHARSET`      |       | `utf8mb4` | Set karakter tabel data TiDB |

## SQLite

Unduh [waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite) ke server Anda jika ingin menggunakan SQLite. Kemudian atur variabel lingkungan berikut dalam proyek.

| Variabel Lingkungan | Wajib | Default | Deskripsi                                                           |
| ------------------- | ----- | ------- | ------------------------------------------------------------------- |
| `SQLITE_PATH`       | ✅    |         | Path file penyimpanan SQLite, tidak termasuk nama file              |
| `JWT_TOKEN`         | ✅    |         | String acak untuk generator token login                             |
| `SQLITE_DB`         |       | waline  | Nama file penyimpanan SQLite, ubah jika nama file Anda bukan waline |
| `SQLITE_PREFIX`     |       | `wl_`   | Prefiks tabel SQLite                                                |

## PostgreSQL

[Supabase](https://supabase.com) dan [Neon](https://neon.tech/home) menawarkan database gratis 512M, sementara [Tembo](https://tembo.io/) menyediakan dukungan database PG 10G secara gratis. Sama seperti MySQL, Anda perlu mengimpor [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) untuk membuat tabel dan struktur tabel sebelum menggunakan PostgreSQL.

| Variabel Lingkungan | Wajib | Default   | Deskripsi                            |
| ------------------- | ----- | --------- | ------------------------------------ |
| `PG_DB`             | ✅    |           | Nama database PostgreSQL             |
| `PG_USER`           | ✅    |           | Username server PostgreSQL           |
| `PG_PASSWORD`       | ✅    |           | Password server PostgreSQL           |
| `PG_HOST`           |       | 127.0.0.1 | Alamat server PostgreSQL             |
| `PG_PORT`           |       | 3211      | Port server PostgreSQL               |
| `PG_PREFIX`         |       | `wl_`     | Prefiks tabel PostgreSQL             |
| `PG_SSL`            |       | `false`   | Atur ke `true` untuk menggunakan SSL |
| `POSTGRES_DATABASE` |       |           | alias untuk `PG_DB`                  |
| `POSTGRES_USER`     |       |           | alias untuk `PG_USER`                |
| `POSTGRES_PASSWORD` |       |           | alias untuk `PG_PASSWORD`            |
| `POSTGRES_HOST`     |       | 127.0.0.1 | alias untuk `PG_HOST`                |
| `POSTGRES_PORT`     |       | 3211      | alias untuk `PG_PORT`                |
| `POSTGRES_PREFIX`   |       | `wl_`     | alias untuk `PG_PREFIX`              |
| `POSTGRES_SSL`      |       | `false`   | alias untuk `POSTGRES_SSL`           |

## GitHub

Waline mendukung penyimpanan data komentar dalam file CSV di GitHub. Untuk menggunakan GitHub sebagai penyimpanan data, Anda perlu mengajukan Personal access tokens. Anda dapat mengklik <kbd>Generate new token</kbd> untuk mengajukannya di <https://github.com/settings/tokens>. Centang opsi **repo** pada izin untuk mendapatkan izin baca dan tulis ke repositori.

| Variabel Lingkungan | Wajib | Default | Deskripsi                                                                                                       |
| ------------------- | ----- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`      | ✅    |         | [Personal access tokens](https://github.com/settings/tokens)                                                    |
| `GITHUB_REPO`       | ✅    |         | Nama repositori, seperti `walinejs/waline`                                                                      |
| GITHUB_PATH         |       |         | Direktori penyimpanan data, misalnya `data` berarti disimpan di direktori `data`, default adalah direktori root |

::: warning

Karena masalah performa, penggunaan GitHub tidak direkomendasikan.

:::

## Kustom

Selain penyimpanan database di atas, dukungan untuk layanan penyimpanan lainnya juga dapat ditambahkan.

Jika Anda ingin membantu Waline mendukung lebih banyak layanan penyimpanan, Anda dapat melakukan fork proyek dan mewarisi [base class](https://github.com/walinejs/waline/blob/main/packages/server/src/service/storage/base.js) kemudian mengimplementasikan metode `select()`, `add()`, `update()`, dan `delete()` dari layanan penyimpanan yang bersangkutan dan mengajukan PR.
