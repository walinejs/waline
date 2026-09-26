---
title: Reaksi Artikel
icon: reaction
order: 4
---

Waline memungkinkan pengguna mengekspresikan reaksi terhadap konten artikel.

<!-- more -->

## Memulai

Untuk mengaktifkan reaksi dengan cepat, Anda dapat menetapkan opsi `reaction` ke `true` untuk menampilkan daftar reaksi default:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: true, // aktifkan reaksi
});
```

Waline akan menampilkan daftar reaksi default di atas kotak komentar.

## Kustomisasi Reaksi

Jika Anda perlu mengkustomisasi emotikon reaksi ini, Anda dapat meneruskan array yang berisi tautan gambar emotikon reaksi, mewakili reaksi yang ingin Anda berikan kepada pengguna untuk dipilih:

```js
Waline.init({
  el: '#waline',
  // ...
  reaction: [
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_heart_eyes.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
  ],
});
```

Sementara itu, Anda dapat mengkustomisasi judul reaksi melalui `reactionTitle` di `locale`, dan Anda juga dapat mengkustomisasi nama ekspresi reaksi melalui `reaction0` hingga `reaction8`. Lihat [Pengaturan Multibahasa](./i18n.md).

## Perhatian

::: tip Batasan Jumlah

Waline mendukung hingga 9 reaksi, dan Anda dapat menambahkan kurang dari 9 reaksi tanpa masalah.

:::

::: warning Aturan Penghitungan

Penghitungan reaksi didasarkan pada lokasi.

Jika Anda perlu mengurutkan ulang dan menyesuaikan reaksi, periksa [#1451](https://github.com/walinejs/waline/issues/1451#issuecomment-1264555264) untuk detail lebih lanjut.

:::
