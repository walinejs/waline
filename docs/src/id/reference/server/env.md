---
title: Server Environment Variables
icon: config
---

Anda dapat menyesuaikan Server Waline melalui variabel lingkungan berikut.

::: warning

Anda HARUS **melakukan deploy ulang** setelah memperbarui variabel lingkungan agar perubahan diterapkan.

Anda harus mengatur melalui `Settings` - `Environment Variables` saat menggunakan Vercel.

:::

<!-- more -->

## Dasar

| Variabel Lingkungan | Wajib | Deskripsi                                                                        |
| ------------------- | ----- | -------------------------------------------------------------------------------- |
| `SITE_NAME`         |       | nama situs                                                                       |
| `SITE_URL`          |       | URL situs                                                                        |
| `LOGIN`             |       | Pengguna perlu login sebelum berkomentar ketika `LOGIN=force`                    |
| `SERVER_URL`        |       | URL Server Waline, berguna ketika alamat yang dibuat secara otomatis tidak benar |

## Tampilan

| Variabel Lingkungan     | Default                                                                 | Deskripsi                                                                     |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `DISABLE_USERAGENT`     |                                                                         | apakah menyembunyikan user agent komentator. Nilai default adalah `false`     |
| `DISABLE_REGION`        |                                                                         | apakah menyembunyikan wilayah komentator. Nilai default adalah `false`        |
| `DISABLE_AUTHOR_NOTIFY` |                                                                         | apakah menonaktifkan notifikasi penulis                                       |
| `AVATAR_PROXY`          | `https://avatar.75cdn.workers.dev`                                      | URL layanan proxy avatar. Anda dapat mengatur `false` untuk menonaktifkannya  |
| `GRAVATAR_STR`          | <span v-pre>`https://seccdn.libravatar.org/avatar/{{mail\|md5}}`</span> | String render Gravatar, berdasarkan template nunjucks                         |
| `LEVELS`                |                                                                         | Memberikan label peringkat kepada setiap pengguna berdasarkan jumlah komentar |

::: tip Label Level

Berdasarkan jumlah komentar pengguna, label level akan ditambahkan ke komentator berdasarkan kondisi peringkat. Fitur ini dinonaktifkan secara default dan dapat diaktifkan dengan mengatur variabel lingkungan `LEVELS`. Konfigurasi dalam bentuk angka yang digabungkan dengan koma, misalnya `0,10,20,50,100,200` berarti:

| Tingkat | Kondisi            | Label Tingkat Default |
| ------- | ------------------ | --------------------- |
| 0       | 0 <= count < 10    | Dwarves               |
| 1       | 10 <= count < 20   | Hobbits               |
| 2       | 20 <= count < 50   | Ents                  |
| 3       | 50 <= count < 100  | Wizards               |
| 4       | 100 <= count < 200 | Elves                 |
| 5       | 200 <= count       | Maiar                 |

Selain menyesuaikan aturan penilaian level, kita juga dapat menyesuaikan label level. Konfigurasikan teks di klien sebagai berikut:

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

Secara default, hanya 6 level teks yang disediakan, tetapi bukan berarti hanya bisa ada 6 level. Batas level spesifik berdasarkan aturan penilaian level yang Anda tetapkan. Untuk menambahkan level baru, disarankan untuk mengonfigurasi teks label yang sesuai dengan level tersebut sendiri. Jika tidak ada teks label yang disediakan, teks label default seperti `Level 10` akan ditampilkan secara default.

:::

## Keamanan

| Variabel Lingkungan   | Default        | Deskripsi                                                                                                                           |
| --------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `IPQPS`               | `60`           | Batas frekuensi posting komentar berbasis IP dalam detik. Atur ke 0 untuk tidak ada batas                                           |
| `SECURE_DOMAINS`      |                | Konfigurasi Domain Aman. Mendukung beberapa domain yang dipisahkan dengan koma                                                      |
| `AKISMET_KEY`         | `70542d86693e` | Kunci layanan antispam Akismet, atur `false` jika Anda ingin menonaktifkannya.                                                      |
| `COMMENT_AUDIT`       | `false`        | Pengalih audit komentar. Ketika diaktifkan, setiap komentar perlu disetujui oleh admin, sehingga petunjuk di placeholder disarankan |
| `RECAPTCHA_V3_KEY`    |                | Kunci reCAPTCHA V3, harus diatur bersamaan dengan klien                                                                             |
| `RECAPTCHA_V3_SECRET` |                | Secret reCAPTCHA V3 untuk server.                                                                                                   |
| `TURNSTILE_KEY`       |                | Kunci Turnstile, harus diatur bersamaan dengan klien                                                                                |
| `TURNSTILE_SECRET`    |                | Secret Turnstile untuk server                                                                                                       |

::: tip Recaptcha dan Turnstile

Kunci dan Secret Turnstile dapat diminta di <https://www.cloudflare.com/products/turnstile/>.

Kunci dan Secret Recaptcha dapat diminta di <https://www.google.com/recaptcha>.

Saat mengatur domain keamanan, Anda perlu menambahkan alamat situs dan alamat server Waline secara bersamaan.

:::

## Markdown

| Variabel Lingkungan  | Default   | Deskripsi                                                           |
| -------------------- | --------- | ------------------------------------------------------------------- |
| `MARKDOWN_CONFIG`    | `{}`      | Konfigurasi MarkdownIt                                              |
| `MARKDOWN_HIGHLIGHT` | `true`    | Apakah mengaktifkan highlight                                       |
| `MARKDOWN_EMOJI`     | `true`    | Apakah mengaktifkan emoji                                           |
| `MARKDOWN_SUB`       | `true`    | Apakah mengaktifkan subscript                                       |
| `MARKDOWN_SUP`       | `true`    | Apakah mengaktifkan superscript                                     |
| `MARKDOWN_TEX`       | `mathjax` | Layanan untuk mengurai math, `mathjax` `katex` dan `false` didukung |
| `MARKDOWN_MATHJAX`   | `{}`      | Opsi MathJax                                                        |
| `MARKDOWN_KATEX`     | `{}`      | Opsi KaTeX                                                          |

## Layanan Email

Layanan email digunakan untuk notifikasi email pendaftaran pengguna dan komentar. Setelah mengonfigurasi variabel yang berkaitan dengan layanan email, pendaftaran pengguna akan menambahkan operasi yang berkaitan dengan konfirmasi kode verifikasi email untuk mencegah pendaftaran berbahaya.

| Nama variabel lingkungan | Keterangan                  |
| ------------------------ | --------------------------- |
| `SMTP_SERVICE`           | Penyedia layanan email SMTP |
| `SMTP_HOST`              | Alamat server SMTP          |
| `SMTP_PORT`              | Port server SMTP            |
| `SMTP_USER`              | Nama pengguna SMTP          |
| `SMTP_PASS`              | Kata sandi SMTP.            |
| `SMTP_SECURE`            | Koneksi SMTP dengan SSL     |
| `SENDER_NAME`            | Sesuaikan nama pengirim     |
| `SENDER_EMAIL`           | Sesuaikan email pengirim    |

::: tip

Penyedia layanan yang didukung dapat ditemukan di [layanan nodemailer](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). Anda dapat memilih salah satu dari `SMTP_SERVICE` dan (`SMTP_HOST`, `SMTP_PORT`). Jika Anda tidak mengetahui `SMTP_SERVICE` yang sesuai dalam daftar, Anda perlu mengonfigurasi `SMTP_HOST` dan `SMTP_PORT`, yang mungkin dapat ditemukan di pengaturan kotak surat.

Nama pengguna SMTP biasanya mendukung kotak surat lengkap pengguna, dan kata sandi sebagian besar sama dengan kata sandi kotak surat.

Harap perhatikan secara khusus bahwa beberapa kotak surat menggunakan kata sandi SMTP terpisah.

:::

## Database

### MongoDB

| Variabel Lingkungan | Wajib | Default   | Deskripsi                                     |
| ------------------- | ----- | --------- | --------------------------------------------- |
| `MONGO_DB`          | ✅    |           | Nama database MongoDB                         |
| `MONGO_USER`        | ✅    |           | Nama pengguna server MongoDB                  |
| `MONGO_PASSWORD`    | ✅    |           | Kata sandi server MongoDB                     |
| `MONGO_HOST`        |       | 127.0.0.1 | Alamat server MongoDB, mendukung format array |
| `MONGO_PORT`        |       | 27017     | Port server MongoDB, mendukung format array   |
| `MONGO_REPLICASET`  |       |           | Replica set MongoDB                           |
| `MONGO_AUTHSOURCE`  |       |           | Sumber auth MongoDB                           |
| `MONGO_OPT_SSL`     |       | `false`   | gunakan koneksi SSL                           |

### MySQL

| Variabel Lingkungan | Wajib | Default   | Deskripsi                      |
| ------------------- | ----- | --------- | ------------------------------ |
| `MYSQL_DB`          | ✅    |           | Nama database MySQL            |
| `MYSQL_USER`        | ✅    |           | Nama pengguna server MySQL     |
| `MYSQL_PASSWORD`    | ✅    |           | Kata sandi server MySQL        |
| `MYSQL_HOST`        |       | 127.0.0.1 | Alamat server MySQL            |
| `MYSQL_PORT`        |       | 3306      | Port server MySQL              |
| `MYSQL_PREFIX`      |       | `wl_`     | Prefiks tabel MySQL            |
| `MYSQL_CHARSET`     |       | `utf8mb4` | Charset tabel MySQL            |
| `MYSQL_SSL`         |       | `false`   | apakah menggunakan koneksi SSL |

### TiDB

[Buat database di TiDB](../../../id/guide/deploy/tidb.md)

| Variabel Lingkungan | Wajib | Default   | Deskripsi                 |
| ------------------- | ----- | --------- | ------------------------- |
| `TIDB_DB`           | ✅    |           | Nama database TiDB        |
| `TIDB_USER`         | ✅    |           | Nama pengguna server TiDB |
| `TIDB_PASSWORD`     | ✅    |           | Kata sandi server TiDB    |
| `TIDB_HOST`         |       | 127.0.0.1 | Alamat server TiDB        |
| `TIDB_PORT`         |       | 4000      | Port server TiDB          |
| `TIDB_PREFIX`       |       | `wl_`     | Prefiks tabel TiDB        |
| `TIDB_CHARSET`      |       | `utf8mb4` | Charset tabel TiDB        |

### SQLite

| Variabel Lingkungan | Wajib | Default | Deskripsi                                                           |
| ------------------- | ----- | ------- | ------------------------------------------------------------------- |
| `SQLITE_PATH`       | ✅    |         | Path file penyimpanan SQLite, tidak termasuk nama file              |
| `JWT_TOKEN`         | ✅    |         | String acak untuk generator token login                             |
| `SQLITE_DB`         |       | waline  | Nama file penyimpanan SQLite, ubah jika nama file Anda bukan waline |
| `SQLITE_PREFIX`     |       | `wl_`   | Prefiks tabel SQLite                                                |

### PostgreSQL

| Variabel Lingkungan | Wajib | Default   | Deskripsi                                    |
| ------------------- | ----- | --------- | -------------------------------------------- |
| `PG_DB`             | ✅    |           | Nama database PostgreSQL                     |
| `PG_USER`           | ✅    |           | Nama pengguna server PostgreSQL              |
| `PG_PASSWORD`       | ✅    |           | Kata sandi server PostgreSQL                 |
| `PG_HOST`           |       | 127.0.0.1 | Alamat server PostgreSQL                     |
| `PG_PORT`           |       | 3211      | Port server PostgreSQL                       |
| `PG_PREFIX`         |       | `wl_`     | Prefiks tabel PostgreSQL                     |
| `PG_SSL`            |       | `false`   | atur ke `true` untuk menggunakan koneksi SSL |
| `POSTGRES_DATABASE` |       |           | alias untuk `PG_DB`                          |
| `POSTGRES_USER`     |       |           | alias untuk `PG_USER`                        |
| `POSTGRES_PASSWORD` |       |           | alias untuk `PG_PASSWORD`                    |
| `POSTGRES_HOST`     |       | 127.0.0.1 | alias untuk `PG_HOST`                        |
| `POSTGRES_PORT`     |       | 3211      | alias untuk `PG_PORT`                        |
| `POSTGRES_PREFIX`   |       | `wl_`     | alias untuk `PG_PREFIX`                      |
| `POSTGRES_SSL`      |       | `false`   | alias untuk `POSTGRES_SSL`                   |

### GitHub

| Variabel Lingkungan | Wajib | Default | Deskripsi                                                                                                      |
| ------------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`      | ✅    |         | [Token akses personal](https://github.com/settings/tokens)                                                     |
| `GITHUB_REPO`       | ✅    |         | nama repositori, seperti `walinejs/waline`                                                                     |
| GITHUB_PATH         |       |         | Direktori penyimpanan data, seperti `data` berarti disimpan di direktori `data`, direktori root secara default |

## Lanjutan

| Variabel Lingkungan             | Default                     | Deskripsi                                                                                                   |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `OAUTH_URL`                     | `https://oauth.lithub.cc`   | URL Layanan Login Sosial OAuth. Anda dapat [membangun auth Anda sendiri](https://github.com/walinejs/auth). |
| `WEBHOOK`                       |                             | Anda dapat mengatur URL Webhook yang akan dipicu ketika ada komentar baru.                                  |
| `WALINE_ADMIN_MODULE_ASSET_URL` | `//unpkg.com/@waline/admin` | Tautan admin Waline                                                                                         |
| `IP2REGION_DB`                  |                             | path perpustakaan kueri IP IPv4 yang disesuaikan (usang, gunakan `IP2REGION_DB_V4` sebagai gantinya)        |
| `IP2REGION_DB_V4`               |                             | path perpustakaan kueri IP IPv4 yang disesuaikan. Kembali ke `IP2REGION_DB` jika tidak diatur               |
| `IP2REGION_DB_V6`               |                             | path perpustakaan kueri IP IPv6 yang disesuaikan. Atur ini untuk mengaktifkan pencarian lokasi alamat IPv6  |
