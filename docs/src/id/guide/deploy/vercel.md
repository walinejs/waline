---
title: Deployment Vercel
icon: vercel
order: 1
---

Kami merilis paket `@waline/vercel` sebagai paket server, dan deployment Vercel adalah cara yang paling kami rekomendasikan.

<!-- more -->

## Cara Deploy

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Klik tombol biru di atas, Anda akan diarahkan ke Vercel untuk melakukan deployment dengan template waline.

   ::: note

   Jika Anda belum login, kami merekomendasikan untuk masuk menggunakan GitHub.

   :::

1. Masukkan nama proyek Vercel Anda kemudian klik `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Repositori dengan nama yang Anda masukkan tadi akan dibuat dan diinisialisasi secara otomatis berdasarkan template contoh waline oleh Vercel.

   ![new project](../../../assets/vercel-2.png)

   Setelah satu atau dua menit, Vercel akan selesai melakukan deployment. Klik tombol `Go to Dashboard` untuk diarahkan ke dashboard aplikasi Anda.

   ![dashboard](../../../assets/vercel-3.png)

## Membuat Database

1. Klik `Storage` di bagian atas untuk masuk ke halaman layanan penyimpanan, pilih `Create Database`. Di bagian `Marketplace Database Providers`, pilih `Neon`, kemudian klik `Continue`.

   ![storage](../../../assets/vercel-4.png)

1. Anda akan diminta untuk membuat akun Neon. Pilih `Accept and Create`. Selanjutnya, pilih konfigurasi paket database, termasuk region dan kuota. Anda dapat membiarkan default dan klik `Continue`.

   ![neon](../../../assets/vercel-5.png)

1. Tentukan nama database. Anda dapat membiarkan default dan klik `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Sekarang database muncul di bagian `Storage`. Klik database tersebut dan pilih `Open in Neon` untuk berpindah ke Neon. Di Neon, pilih `SQL Editor` di sebelah kiri, tempelkan SQL dari [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) ke dalam editor, dan klik `Run` untuk membuat tabel.

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. Setelah beberapa saat Anda akan melihat pesan berhasil. Kembali ke Vercel, klik `Deployments`, kemudian klik `Redeploy` pada deployment terbaru agar konfigurasi database baru berlaku.

   ![redeploy success](../../../assets/vercel-9.png)

1. Vercel akan diarahkan ke `Overview` dan mulai melakukan deployment. Ketika `STATUS` berubah menjadi `Ready`, klik `Visit` untuk membuka situs yang di-deploy. URL ini adalah alamat server Anda.

   ![visit](../../../assets/vercel-10.png)

## Menetapkan Domain

1. Klik <kbd>Settings</kbd> - <kbd>Domains</kbd> untuk masuk ke halaman pengaturan domain.

1. Masukkan domain yang ingin Anda tetapkan dan klik tombol <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-11.png)

1. Tambahkan record `CNAME` baru di server layanan domain Anda.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Anda dapat menggunakan domain sendiri untuk mengakses Waline setelah berlaku. :tada:
   - Sistem komentar: example.your-domain.com
   - Panel admin: example.your-domain.com/ui

   ![success](../../../assets/vercel-12.png)

## Impor HTML

Atur sebagai berikut di halaman web Anda:

1. Impor stylesheet Waline dari `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Buat tag `<script>` yang menggunakan `init()` dari `https://unpkg.com/@waline/client@v3/dist/waline.js`, dan berikan opsi wajib `el` dan `serverURL`.
   - `el` adalah elemen yang digunakan untuk me-render Waline. Dapat berupa string CSS selector atau HTMLElement.
   - `serverURL` adalah alamat server Anda yang diperoleh pada langkah sebelumnya.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Admin Komentar

1. Setelah deployment selesai, kunjungi `<serverURL>/ui/register` untuk mendaftar. Pengguna pertama yang mendaftar akan menjadi administrator.
2. Setelah login, administrator dapat mengelola komentar: mengedit, menandai, atau menghapus.
3. Pengguna juga dapat mendaftar melalui kotak komentar. Setelah login mereka akan diarahkan ke halaman profil mereka.
