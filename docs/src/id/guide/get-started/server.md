---
title: Pengenalan Server
icon: server
order: 2
---

## Penerapan

Selain men-deploy di Vercel secara gratis, Anda dapat men-deploy melalui docker atau langsung di lingkungan self-hosted, serta ke platform cloud umum lainnya. Untuk informasi lebih lanjut, lihat:

- [Penerapan mandiri](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Dukungan Multi-Database

Waline mendukung berbagai jenis database, termasuk MySQL, PostgreSQL, SQLite, dan MongoDB.

Anda hanya perlu mengonfigurasi variabel lingkungan database yang sesuai, dan Waline akan secara otomatis beralih ke layanan penyimpanan data yang sesuai.

Lihat [dukungan multi-database](../database.md) untuk detail lebih lanjut.

## Konfigurasi

Sebagian besar konfigurasi di sisi server dapat dilakukan melalui variabel lingkungan, dan Anda juga dapat mengonfigurasi beberapa opsi lanjutan di file entri utama.

Untuk detail konfigurasi, lihat [Referensi Server → Variabel Lingkungan](../../reference/server/env.md) dan [Referensi Server → Konfigurasi](../../reference/server/config.md).

## Notifikasi Komentar

Kami mendukung beberapa cara untuk memberi tahu Anda atau komentator ketika seseorang berkomentar atau membalas. Lihat [Notifikasi Komentar](../features/notification.md) untuk detail lebih lanjut.

## Pendaftaran Akun Pengguna dan Login Sosial

Waline mendukung pembuatan akun dalam aplikasi dan login sosial menggunakan GitHub, Twitter, dan Facebook.

::: tip

Pantau terus: Kami berencana menambahkan lebih banyak dukungan aplikasi sosial di rilis mendatang.

:::
