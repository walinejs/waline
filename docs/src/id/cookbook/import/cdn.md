---
title: Import Waline via CDN
icon: import
order: 1
---

Cookbook ini membahas cara mengimpor Waline melalui CDN.

<!-- more -->

Untuk pengguna di Tiongkok daratan, kami merekomendasikan menggunakan [unpkg](https://unpkg.com/@waline/client). Untuk pengguna luar negeri, kami merekomendasikan menggunakan jsDelivr.

Agar Waline ramah SSR, kami memisahkan gaya Waline di versi V2. Ini berarti, Anda perlu mengimpor file gaya CSS Waline, dan mengimpor file skrip Waline lalu memanggil Waline.

## Komentar

Biasanya, Anda mungkin ingin Waline merender daftar komentar, Anda dapat mengimpor Waline sebagai berikut:

```html
<!-- style file -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<!-- script file -->
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    // options
  });
</script>
```

## Jumlah halaman dilihat dan komentar

Kadang-kadang, Anda mungkin ingin menampilkan jumlah tampilan halaman dan komentar artikel di halaman beranda atau daftar artikel, tetapi tidak perlu memuat komponen komentar, maka Anda dapat mengimpor file skrip Gzip < 1KB dengan cara berikut:

Jumlah halaman dilihat:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    // options
  });
</script>
```

Jumlah komentar:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    // options
  });
</script>
```

## Lebih lanjut

::: info Menentukan versi

Anda mungkin memperhatikan bahwa dalam kasus di atas, kami telah secara eksplisit mendeklarasikan versi `@v2` setelah `@aline/client`. Situs web Anda mungkin tidak berfungsi dengan benar.

:::
