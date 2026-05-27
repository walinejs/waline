---
title: Panduan Pengembangan
icon: contribute
order: -1
---

Kami menyambut semua orang untuk membuka Pull Request untuk waline! :tada:

Jika Anda ingin berkontribusi pada waline, berikut adalah panduannya.

<!-- more -->

## Persiapan

1. Gunakan Git untuk meng-clone proyek

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Instalasi dependensi

   ::: warning

   Instal dan gunakan pnpm untuk menginstal dependensi.

   ```bash
   npm i -g pnpm@latest
   ```

   :::

   ```bash
   cd waline
   pnpm i
   ```

## Pengembangan

- Jalankan `pnpm run client:dev` untuk memulai devServer `@waline/client`

  ::: tip

  Karena waline berbasis arsitektur Client/Server, saat men-debug klien, Anda perlu mengatur `SERVERURL`, atau memulai devServer server di bawah ini secara bersamaan dan menggunakan `localhost:9090` sebagai default.

  :::

- Jalankan `pnpm run server:dev` untuk memulai devServer `@waline/server`

  ::: tip

  Untuk menjalankan `@waline/server` secara lokal, Anda perlu mengonfigurasi beberapa variabel lingkungan lokal ke `.env`.

  Kami menyediakan contoh untuk Anda di `.env.example`.

  :::
