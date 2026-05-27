---
title: Kustomisasi Tampilan
icon: style
order: -2
---

`@waline/client` menyediakan beberapa variabel CSS. Anda dapat dengan mudah mengkonfigurasi tampilan waline melalui variabel-variabel ini:

Sementara itu, `@waline/client` juga memiliki dukungan mode gelap bawaan.

<!-- more -->

## Dukungan Mode Gelap

Anda dapat menggunakan opsi `dark` untuk mengaktifkan dukungan mode gelap Waline.

Biasanya situs web akan mengaktifkan dukungan mode gelap dengan dua cara:

- Menggunakan selektor `@media` untuk beralih secara otomatis sesuai status mode warna perangkat melalui `prefers-color-scheme`
- Menerapkan gaya warna mode gelap lainnya secara dinamis dengan memodifikasi atribut dan class dari elemen root dom (`html` atau `body`).

Jika Anda mengaktifkan Waline di situs dengan metode pertama, Anda hanya perlu menetapkan `dark` ke `'auto'`.

Untuk jenis situs kedua, Anda perlu menetapkan dark ke selektor CSS yang membuat mode gelap aktif. Berikut beberapa contohnya:

::: tip Contoh

- **vuepress-theme-hop v2**: Mode gelap diaktifkan dengan menetapkan `data-theme="dark"` pada tag `<html>` itu sendiri. Jadi Anda perlu menetapkan `'html[data-theme="dark"]'` sebagai opsi `dark`.

- **hexo-theme-fluid**: Mode gelap diaktifkan dengan menetapkan `data-user-color-scheme="dark"` pada tag `<html>` itu sendiri. Jadi Anda perlu menetapkan `'html[data-user-color-scheme="dark"]'` sebagai opsi `dark`.

:::

## Ikon Meta

Jika Anda ingin menambahkan ikon pada metadata komentar pengguna, Anda dapat mengimpor `waline-meta.css` untuk menggunakannya.

Untuk pengguna CDN, Anda dapat mengimpor melalui tautan berikut:

```html
<!-- Ikon Meta (opsional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Untuk pengguna NPM, Anda dapat mengimpor melalui:

```js
import '@waline/client/meta';
```

## Dukungan RTL

`@waline/client` mendukung tata letak RTL, Anda hanya perlu menambahkan `dir="rtl"` pada tag `<html>`.

## Kustomisasi Gaya

### Variabel CSS

Anda dapat menemukan nilai default variabel CSS yang digunakan oleh Waline dalam mode normal dan mode gelap di [Referensi Klien → Variabel CSS](../../reference/client/style.md).

Jika berbeda dari gaya situs Anda, Anda dapat menimpa variabel CSS yang bersangkutan sendiri.

## Box Shadow

Jika Anda menggunakan tema yang menggunakan bayangan (`box-shadow`) alih-alih border, Anda dapat mengubah efek tampilan Waline dengan memodifikasi `--waline-border` dan `--waline-box-shadow`, contoh:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Lebih Lanjut

Jika variabel CSS di atas tidak dapat memenuhi kebutuhan kustomisasi gaya Waline Anda, Anda dapat menulis file css Anda sendiri.
