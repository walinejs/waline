---
title: Pengenalan Klien
icon: client
order: 1
---

Waline secara resmi menyediakan [`@waline/client`](https://www.npmjs.com/package/@waline/client), yang ditulis dalam Vue + TypeScript dan hanya berukuran 53kb gzip.

## Impor

Anda dapat menggunakan CDN atau npm untuk mengimpor klien Waline, dan kami menyediakan beberapa versi file untuk memenuhi berbagai skenario.

Jika Anda mengalami masalah selama proses ini, lihat:

- [Cookbook → Impor CDN](../../cookbook/import/cdn.md)
- [Cookbook → Impor Proyek](../../cookbook/import/project.md)

## Menggunakan Waline

Cara termudah menggunakan Waline adalah [menggunakan metode yang dirinci dalam panduan memulai cepat](./README.md#impor-di-html): impor fungsi `init` dari Waline dan inisialisasi instans Waline melalui `init(yourOptions)`.

Di antara opsi `init`, `el` dan `serverURL` wajib ada. Yang pertama adalah elemen atau selector elemen tempat Waline dipasang, dan yang kedua adalah alamat server. Untuk semua parameter inisialisasi `@waline/client`, lihat [Referensi Klien → API](../../reference/client/api.md).

## Jumlah Komentar

`@waline/client` juga menyediakan sub-paket untuk statistik komentar. Anda dapat menggunakannya untuk menampilkan jumlah komentar di daftar posting blog atau halaman lain yang tidak memuat komentar. Untuk detail lebih lanjut, lihat [Fitur → Jumlah Komentar](../features/comment.md)

## Jumlah Penayangan Halaman

Waline mendukung statistik penayangan halaman. Jika Anda tidak memerlukan layanan komentar tetapi ingin menggunakan fungsi penayangan halaman, Waline menyediakan plugin statistik penayangan halaman dengan ukuran Gzip < 1KB.

Untuk informasi lebih lanjut tentang jumlah penayangan halaman `@waline/client`, lihat [Fitur → Jumlah Penayangan Halaman](../features/pageview.md)

## Dukungan Format Komentar

`@waline/client` mendukung banyak sintaks komentar dan pemformatan yang kaya. Selain mendukung ekstensi sintaks Markdown standar dan GFM, komentator juga dapat menyematkan tag HTML, menggunakan persamaan matematika, dan lainnya. Untuk sintaks lainnya, lihat [Fitur → Sintaks yang didukung](../features/syntax.md) untuk detail.

`@waline/client` juga mendukung pratinjau real-time dari input komentar di kotak komentar. Namun, beberapa fungsi tidak diaktifkan secara default karena masalah ukuran. Jika Anda ingin mengaktifkan kembali fungsi-fungsi ini, lihat:

- [Cookbook → Kustomisasi Penyorot Kode Pratinjau](../../cookbook/customize/highlighter.md)
- [Cookbook → Kustomisasi Renderer $\TeX$ Pratinjau](../../cookbook/customize/tex-renderer.md)

## Reaksi Artikel

Merasa komentar terlalu rumit? Waline memungkinkan pengunjung Anda mengekspresikan reaksi mereka terhadap artikel dengan cepat, seperti suka, tidak suka, ragu, bosan, terkejut, dll. Untuk mengaktifkan fitur ini secara manual, lihat [Fitur → Reaksi Artikel](../features/reaction.md).

## Fitur Komentar

Waline mendukung sejumlah fitur dasar, termasuk login, avatar, [berbagai bahasa](../features/i18n.md), dan pratinjau real-time.

Waline memungkinkan Anda mengatur label tingkat interaksi dan label kustom untuk pengguna Anda. Untuk detail lebih lanjut, lihat [Label Pengguna](../features/label.md).

## Tab Emoji

`@waline/client` mendukung beberapa tab Emoji, dan memungkinkan pengguna dengan mudah menggunakan tab Emoji melalui preset. Anda dapat dengan mudah membuat preset Anda sendiri selain preset resmi.

Untuk informasi lebih lanjut tentang tab emoji `@waline/client`, lihat:

- [Fitur → Tab Emoji](../features/emoji.md)
- [Cookbook → Kustomisasi Emoji](../../cookbook/customize/emoji.md)

## Sisipkan Gambar

`@waline/client` memiliki dukungan upload gambar bawaan. Secara default, gambar dikonversi ke base64. Namun, Anda juga dapat menggunakan layanan hosting gambar Anda sendiri.

Untuk info lebih lanjut tentang pengaturan upload gambar `@waline/client`, lihat [Cookbook → Kustomisasi Upload Gambar](../../cookbook/customize/upload-image.md).

## Pencarian Emoji

`@waline/client` menyediakan fungsi pencarian meme dan emoji melalui [giphy](https://giphy.com), dan memungkinkan Anda menyesuaikan layanan pencarian. Lihat:

- [Fitur → Pencarian Emoji](../features/search.md)
- [Cookbook → Kustomisasi pencarian emotikon](../../cookbook/customize/search.md)

## Dukungan Multibahasa

`@waline/client` memiliki dukungan bawaan untuk beberapa bahasa, dan Anda dapat menambahkan dukungan bahasa atau mengubah teks UI berdasarkan ini. Lihat:

- [Fitur → Atur bahasa](../features/i18n.md).
- [Cookbook → Kustomisasi Bahasa](../../cookbook/customize/locale.md).

## Dukungan Aksesibilitas

Waline sepenuhnya mendukung semua standar aksesibilitas:

- Semua ikon dan kontrol memiliki label aksesibilitas yang sesuai.
- Anda dapat berinteraksi dengan semua kontrol Waline menggunakan keyboard atau perangkat penunjuk yang dipasang di kepala.

Ini adalah cara kami mendukung orang-orang tunanetra dan penyandang disabilitas mobilitas di seluruh dunia! :heart:

## Gaya yang Dapat Dikustomisasi

Waline hadir dengan dukungan mode gelap bawaan. Untuk memudahkan pengguna menyesuaikan gaya Waline, kami menyediakan banyak variabel CSS yang dapat dikonfigurasi.

Lihat [Gaya Kustom](../features/style.md) untuk detail lebih lanjut.

## Pengembangan Lanjutan

### Dukungan Aplikasi Single Page

Waline mendukung SPA (**S**ingle **P**age **A**pplication).

Jika Anda ingin menggunakan Waline di website atau aplikasi berbasis history API, Anda dapat menggunakan metode `update()` pada instans yang diinisialisasi untuk menyegarkan konfigurasi area komentar, atau menggunakan metode `destroy()` pada instans untuk menghancurkan Waline. Untuk mempelajari lebih lanjut tentang reaktivitas `@waline/client`, lihat [Cookbook → Reaktivitas](../../cookbook/reactivity.md).

### Ekosistem

Anda dapat dengan mudah menggunakan Waline melalui plugin di alat seperti Hexo, VuePress, dan bahkan klien pihak ketiga.

Untuk klien pihak ketiga, tema, dan plugin yang mendukung Waline, lihat [Pelajari lebih lanjut → Ekosistem](../../advanced/ecosystem.md).
