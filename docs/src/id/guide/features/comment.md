---
title: Penghitung Komentar
icon: counter
order: 8
---

Waline mendukung penampilan jumlah komentar secara terpisah di area yang bukan area komentar.

<!-- more -->

## Pembaruan Otomatis

Anda dapat mengaktifkan penghitung komentar pada fungsi `init` dengan menetapkan opsi `comment` ke `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

  init({
    el: '#waline',
    // ...
    comment: true, // aktifkan penghitung komentar
  });
</script>
```

Waline akan mencoba mengisi atau memperbarui jumlah komentar setiap kali Anda memanggil fungsi `init` atau memperbarui path.

Waline mencari elemen yang memiliki class `waline-comment-count` pada halaman, dan mengambil atribut `data-path` sebagai kondisi kueri. Kemudian mengisinya dengan nilai yang diperoleh:

```html
<!-- data-path akan menjadi kondisi kueri -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> komentar
```

Jika Anda membutuhkan selektor yang berbeda, Anda dapat menetapkan opsi `comment` ke selektor tersebut.

Setiap kali Anda memanggil `WalineInstance.update()`, Waline akan mencari konten halaman dan memperbarui jumlah komentar secara otomatis.

::: tip Contoh

```html
Halaman ini memiliki <span class="waline-comment-count" /> komentar, halaman beranda memiliki
<span data-path="/id/" class="waline-comment-count" /> komentar.
```

Halaman ini memiliki <span class="waline-comment-count" /> komentar, halaman beranda memiliki
<span data-path="/id/" class="waline-comment-count" /> komentar.

:::

## Pembaruan Manual

Selain pembaruan otomatis melalui fungsi `init`, Anda dapat memperbarui jumlah komentar halaman saat ini secara manual menggunakan API `commentCount`:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // opsional, untuk selektor kustom, default ke `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Membatalkan

Karena pengambilan jumlah komentar merupakan operasi jaringan asinkron, Anda mungkin perlu membatalkan operasi pembaruan jumlah komentar yang sedang berjalan dalam kondisi tertentu.

`commentCount` mengembalikan sebuah fungsi yang dapat dipanggil untuk membatalkan pembaruan:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// Setelah 500ms, jika permintaan jaringan belum selesai, batalkan operasi ini
setTimeout(() => abort(), 500);
```

:::

## Impor Penghitung Saja

Terkadang, Anda mungkin ingin menampilkan jumlah komentar beberapa halaman di daftar artikel atau beranda, tetapi tidak ingin memuat seluruh Waline. Pada saat ini Anda dapat menggunakan modul `comment` dengan ukuran Gzip < 1KB:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v3/dist/comment.js';

  commentCount({
    serverURL,
    path,

    // opsional, untuk selektor kustom, default ke `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

<script setup>
import { walineOptions } from '@source/.vuepress/client.ts'
import { commentCount } from '@waline/client/comment'
import { onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const { serverURL } = walineOptions
const route = useRoute()

onMounted(()=>{
  commentCount({
    serverURL: serverURL,
    path: route.path,
  })
})
</script>
