---
title: Client Files
icon: file
---

`@waline/client` menyediakan berbagai versi file

<!-- more -->

## Daftar File CDN

- `dist/waline.js`: versi lengkap, format ESM

  File ini adalah versi yang direkomendasikan untuk mengimpor `@waline/client`, ukuran Gzip 53 KB

- `dist/waline.umd.js`: versi lengkap, format UMD

- `dist/slim.js`: versi lengkap tanpa bundel dependensi, format ES Module

  File ini adalah file default untuk mengimpor `@waline/client` dengan Node.js, ukuran Gzip 19,39 KB

- `dist/waline.css`: Gaya CSS Waline

- `dist/waline-meta.css`: CSS Ikon Meta Waline

- `dist/component.js`: Komponen Vue Waline, format ES Module, tanpa bundel dependensi

  File ini digunakan untuk menggunakan komentar Waline dalam mode komponen di proyek Vue, ukuran Gzip 18,28 KB

- `dist/comment.js`: Modul penghitung komentar Waline, format ESM, < 1KB ukuran Gzip

  File ini digunakan untuk impor CDN, ketika hanya jumlah komentar halaman yang diperlukan

- `dist/pageview.js`: Modul pageview Waline, format ESM, < 1KB ukuran Gzip

  File ini digunakan untuk impor CDN, ketika hanya tampilan halaman yang diperlukan

## Ekspor Modul

`@waline/client` adalah modul ESM standar, memerlukan Node.js versi >= 18:

- `@waline/client`: Entry utama Waline tanpa dependensi yang dibundel

- `@waline/client/waline.css`: File gaya Waline

- `@waline/client/waline-meta.css`: File gaya ikon meta Waline

- `@waline/client/comment`: Modul penghitung komentar Waline

- `@waline/client/pageview`: Modul penghitung pageview Waline

- `@waline/client/full`: Entry utama Waline dengan semua dependensi dibundel
