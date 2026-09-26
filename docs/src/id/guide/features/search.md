---
title: Pencarian Emotikon
icon: search
order: 3
---

`@waline/client` memungkinkan pengguna menambahkan layanan pencarian emoji dan mengkustomisasi fungsi ini.

Secara default, `@waline/client` menyediakan layanan pencarian meme melalui [Giphy](https://giphy.com/). Ini akan memungkinkan Anda mencari gambar dan menambahkannya ke komentar.

<!-- more -->

## Nonaktifkan

Jika Anda tidak membutuhkan layanan pencarian gambar default, Anda dapat menonaktifkannya dengan menetapkan opsi `search` ke `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Kustomisasi

Anda dapat mengkustomisasi layanan pencarian gambar melalui opsi search.

Untuk setiap operasi, Anda harus mengembalikan array yang berisi informasi gambar sebagai hasil pencarian, dan setiap item harus berupa objek dengan properti berikut:

- `src`: alamat tautan gambar
- `title`: judul gambar dan teks alt (opsional)
- `preview`: thumbnail gambar untuk digunakan dalam daftar hasil (opsional)

Opsi ini menerima tiga fungsi, yang masing-masing harus mengembalikan sebuah Promise, dan hasilnya adalah array hasil pencarian di atas.

- `search`: operasi pencarian, kata kunci pencarian akan diteruskan sebagai parameter pertama fungsi
- `default`: daftar gambar yang ditampilkan secara default (opsional)
- `more`: fungsi yang dipanggil saat gambar digulir ke bawah, di mana kata kunci pencarian dan jumlah saat ini diteruskan sebagai dua parameter pertama (opsional)

Untuk tutorial pencarian kustom, lihat [Cookbook → Pencarian Emoji Kustom](../../cookbook/customize/search.md).
