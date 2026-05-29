---
title: Instans Waline yang Reaktif
icon: spa
order: -1
---

Klien resmi `@waline/client` berbasis Vue3, menyediakan komponen dan instans yang responsif, dan menghadirkan dukungan SPA (**S**ingle **P**age **A**pplication).

<!-- more -->

## Komponen Vue

Jika Anda membangun proyek Vue, Anda dapat memperoleh dan menggunakan komponen Waline dengan mengimpor ekspor bernama `Waline` dari `@waline/client/components`.

Semua properti komponen bersifat reaktif, yang berarti ketika Anda mengubah properti, kotak komentar akan mendapatkan pembaruan secara otomatis.

## Proyek lainnya

Dalam SPA lain, Anda perlu menyimpan `WalineInstance` yang dikembalikan oleh fungsi Waline saat Waline diinisialisasi.

Anda dapat menemukan properti instans `el` dan dua metode: `update()` dan `destroy()` pada `WalineInstance`.

### update

Anda dapat memanggil `update()` untuk memperbarui Waline kapan saja (misalnya: saat pengguna mengunjungi rute baru). Metode `update` menerima parameter opsional `options`, kecuali `el`, opsi awal Waline lainnya dapat diperbarui dengan meneruskan nilai baru.

Contoh:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Prinsip Kerja

Saat memanggil `update`, opsi saat ini dan opsi sebelumnya akan digabungkan dengan **shallow copy**, dan instans Waline akan disegarkan dengan opsi baru (dan menyimpan opsi baru).

Perilaku default metode ini adalah selalu **menghasilkan ulang nilai default** untuk opsi yang belum diatur, dan **menggunakan nilai historis** untuk opsi yang telah diatur.

Ada dua opsi yang mungkin perlu Anda perhatikan secara khusus: `path` dan `locale`.

::: warning Perhatian tentang Path

Dalam V2, parameter `path` **selalu direset** pada `update()`.

Ini berarti bahwa dalam pembaruan apa pun selama Anda tidak menentukan `path`, `path` akan direset ke `window.location.pathname`.

:::

::: warning Perhatian tentang locale

Karena shallow copy, opsi `locale` lama sepenuhnya ditimpa oleh opsi `locale` baru yang diteruskan oleh `update`.

Pandangan kami adalah: pengguna biasanya ingin beralih bahasa tampilan saat memperbarui locale, jadi kami menetapkannya sebagai perilaku yang diharapkan dari plugin. Ini juga berarti Anda dapat menggunakan `update({ locale: {} })` untuk menghapus konfigurasi locale kustom dalam riwayat.

Jika Anda benar-benar perlu memperbarui satu atau beberapa field tertentu dalam `locale`, Anda perlu meneruskan seluruh `locale` yang telah diperbarui.

:::

Sementara itu, opsi `update()` telah dioptimalkan untuk permintaan jaringan asinkron, termasuk:

- Menyegarkan area komentar dan mengajukan permintaan ulang hanya ketika path berubah
- Panggilan `update()` baru akan secara otomatis menghentikan permintaan yang tidak lagi diperlukan dari `update()` sebelumnya.

### el

Properti `el` adalah HTMLElement yang dipasang oleh instans Waline saat ini.

Jika Anda menginisialisasi Waline dengan `el: null` (hanya menggunakan komentar dan statistik pageview), properti ini akan menjadi `null`.

### destroy

Jika Anda lupa meneruskan `serverURL` atau Waline tidak dapat menemukan lokasi pemasangan melalui opsi `el` di halaman, Waline akan melempar Error yang menunjukkan alasan kesalahan.

### Kegagalan Inisialisasi

Jika Anda lupa mengatur `serverURL` atau Waline tidak dapat menemukan lokasi pemasangan melalui opsi `el` di halaman, Waline akan mengembalikan `WalineErrorInstance`.

Hanya ada satu atribut `errMsg` pada `WalineErrorInstance` untuk menunjukkan alasan kegagalan inisialisasi.

### Perhatian

::: warning Ingat untuk menghancurkan instans

Agar Waline dapat melepaskan sumber daya dengan benar, silakan panggil `WalineInstance.destroy()` secara manual sebelum menghapus elemen tempat Waline dipasang.

Jika tidak, beberapa listener mungkin tidak dihapus dengan benar.

:::
