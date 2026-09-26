---
title: Buat Preset Emoji Sendiri
icon: emoji
---

Cookbook ini akan menunjukkan cara membuat dan menggunakan preset Emoji Anda sendiri.

<!-- more -->

## Buat preset Anda sendiri

Pertama-tama, Anda perlu menyiapkan beberapa gambar emoji. Kemudian, ikuti langkah-langkah berikut untuk membuat preset Anda.

### Beri nama emoji dan unggah

Demi kemudahan, Waline akan langsung menggunakan nama gambar emoji sebagai kunci emoji. Ini berarti jika Anda mengimpor dua preset berbeda, dan keduanya mengandung gambar laugh.png, kedua emote akan berkorespondensi dengan emoji yang sama yaitu `:laugh:`.

Oleh karena itu, praktik terbaik adalah setiap pembuat preset emoji harus menambahkan prefiks yang terkait dengan nama preset ke semua nama dalam file emoji.

Setelah memberi nama dengan tepat, Anda perlu mengunggahnya ke server Anda.

### Tulis informasi preset

Kami berasumsi bahwa Anda telah menempatkan beberapa gambar emoji di folder berikut:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

Pada titik ini, Anda juga perlu membuat file `info.json` untuk folder ini agar Waline mengetahui emoji apa yang terkandung dalam preset Emoji tersebut.

Pertama, mari kita tetapkan nama untuk preset Emoji, misalnya `My Emoji`, karena Anda telah menetapkan prefiks `my_` untuk gambar, dan file-filenya dalam format `png`. Anda perlu menambahkannya di `info.json`.

`info.json` Anda bisa berisi:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Kemudian, daftarkan semua nama emoji dalam `items` sesuai urutan yang Anda inginkan, sekaligus ingat untuk mengabaikan prefiks dan sufiks yang telah Anda tetapkan di `prefix` dan `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Setelah itu, pilih emoji yang representatif sebagai ikon yang ditampilkan di tab:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Dengan ini, Anda telah selesai menulis `info.json`, silakan unggah ke folder yang sama.

Anda kini berhasil membuat preset `my-emoji` dengan `https://example.com/my-emoji/`.

## Gunakan mirror GitHub dengan tag

Biasanya, Anda mungkin merasa agak merepotkan untuk memiliki nama domain sendiri dan mengunggah gambar ke nama domain tersebut, dan tautan mungkin kedaluwarsa seiring waktu. Oleh karena itu, pendekatan yang lebih canggih adalah menggunakan repositori GitHub dan menggunakan fungsi tag di git untuk mencerminkan repositori GitHub sebagai preset emoji.

Mirip dengan langkah-langkah di atas, Anda perlu membuat repositori GitHub baru, memberi nama emoji seperti di atas, membuat `info.json` menggunakan langkah yang sama, dan mengunggahnya ke repositori.

Kemudian, buat tag untuk repositori pada saat ini, kami merekomendasikan mengaturnya dalam format `vx.x.x`, seperti `v1.0.0`.

Setelah menambahkan tag, Anda dapat menggunakan tautan CDN dengan versi di [cdn.jsdelivr.net](https://www.jsdelivr.com/) sebagai preset Anda dalam format `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Kami berasumsi bahwa Anda telah membuat repositori `example/emoji`, mengunggah gambar emoji dan `info.json` secara langsung, dan telah membuat tag `v1.0.0`, maka Anda dapat menggunakan `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` sebagai preset Anda.

::: tip

Penting untuk menentukan tag dengan tautan untuk mencegah tautan gambar yang direferensikan oleh komentar historis menjadi tidak valid akibat modifikasi preset Anda.

Preset emoji resmi diwujudkan dengan membuat repositori [walinejs/emojis](https://github.com/walinejs/emojis) dan menggunakan tautan CDN. Saat ini kami menggunakan versi `v1.1.0`.

:::

::: warning

Karena cdn.jsdelivr.net diblokir di China, Anda dapat mengganti `cdn.jsdelivr.net` dengan `gcore.jsdelivr.net`

:::

## Menggunakan objek konfigurasi

Mirip dengan artikel sebelumnya, kami berasumsi Anda memiliki struktur file berikut:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

Selain membuat unggahan `info.json` dan menggunakan tautan sebagai preset, Anda juga dapat langsung menggunakan objek berikut sebagai preset:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Di sini, kami menambahkan properti `folder` untuk memberi tahu Waline di mana gambar disimpan.
