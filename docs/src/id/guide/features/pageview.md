---
title: Penghitung Tampilan Halaman
icon: counter
order: 7
---

Waline mendukung penghitungan tampilan halaman.

<!-- more -->

## Penggunaan Bersama Komentar

Jika Anda menggunakan layanan komentar Waline, Anda dapat mengaktifkan statistik tampilan halaman dengan menetapkan opsi `pageview` ke `true` saat inisialisasi:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // statistik tampilan halaman
});
```

Waline akan secara otomatis menemukan elemen dengan nilai `class` yaitu `waline-pageview-count` pada halaman, dan mengambil `data-path` sebagai kondisi kueri. Kemudian mengisinya dengan nilai yang diperoleh:

Jika Anda membutuhkan selektor yang berbeda, Anda dapat menetapkan opsi `pageview` ke selektor tersebut.

```html
<!-- data-path akan menjadi kondisi kueri -->
Tampilan: <span class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

Setiap kali Anda memanggil `WalineInstance.update()`, Waline akan mencari ulang konten halaman dan memperbarui tampilan halaman secara otomatis.

::: tip Contoh

```html
Halaman ini telah dilihat
<span class="waline-pageview-count" data-path="/id/guide/client/count.html" />
kali.
```

Halaman ini telah dilihat
<span class="waline-pageview-count" data-path="/id/guide/client/count.html" /> kali.

:::

## Penggunaan Mandiri

Jika Anda hanya membutuhkan fungsi statistik tampilan halaman, Anda dapat mengimpor modul pageview yang disediakan oleh Waline, ukuran Gzip-nya < 1KB.

```html
<ul>
  <li>
    Tampilan halaman saat ini:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Tampilan Halaman:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // opsional, untuk selektor kustom, default ke `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // opsional, apakah akan menambah jumlah kunjungan saat mengambil data, default-nya `true`
    // update: true,
  });
</script>
```

- Tampilan halaman saat ini: <span class="waline-pageview-count" />

- Tampilan Beranda: <span class="waline-pageview-count" data-path="/" />

::: info Batalkan

Karena pengambilan tampilan halaman merupakan operasi jaringan asinkron, Anda mungkin perlu membatalkan operasi pembaruan tampilan halaman yang sedang berjalan dalam kondisi tertentu.

`pageviewCount` mengembalikan sebuah fungsi yang dapat dipanggil untuk membatalkan pembaruan:

```html
<script type="module">
  import { pageviewCount } from 'https://unpkg.com/@waline/client@v3/dist/pageview.js';

  const abort = Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,
  });

  // Setelah 500ms, jika permintaan jaringan belum selesai, batalkan operasi ini
  setTimeout(() => abort(), 500);
</script>
```

:::
