---
title: Widget Komentar Terbaru
icon: recent
---

Waline mendukung penampilan komentar terbaru melalui widget, yang berguna untuk menampilkan komentar terbaru di sidebar blog.

<!-- more -->

## Opsi Komponen

Widget komentar terbaru bernama `RecentComments` dan memiliki tiga opsi:

- `el` (opsional): elemen yang akan dipasang
- `serverURL`: tautan server
- `count`: jumlah komentar terbaru yang perlu diambil

Format data yang dikembalikan oleh komponen harus berupa `Promise<{ comment: WalineComment[], destroy: () => void }>`.

- Properti `comment`: array dari komentar terbaru dengan jumlah tepat sesuai `count`
- Metode `destroy`: fungsi yang akan menghancurkan widget

## Penggunaan Dasar

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    el: '#waline-recent',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

::: tip

Ini akan dirender di `#waline-recent` menggunakan gaya default.

:::

## Penggunaan Lanjutan

Jika Anda tidak puas dengan format output default, Anda dapat memanggil komponen dengan menghilangkan opsi `el` untuk mendapatkan data dan merendernya sendiri.

Contoh:

```html
<div id="waline-recent"></div>
<script type="module">
  import { RecentComments } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  RecentComments({
    serverURL: 'http://waline.vercel.app',
    count: 10,
  }).then(({ comments }) => {
    document.getElementById('waline-recent').innerHTML = comments.map(
      (comment) => `${comment.nick}: ${comment.comment}`,
    );
  });
</script>
```
