---
title: Dukungan Format Komentar
icon: format
order: 1
---

Anda dapat menambahkan berbagai konten ke komentar, termasuk sintaks Markdown yang diperluas dan tag HTML.

<!-- more -->

## Dukungan Format

Kami mendukung CommonMark lengkap (sintaks Markdown standar), beserta ekstensi berikut:

- Tabel gaya GFM
- Strikethrough gaya GFM
- Subskrip dan superskrip
- Emoji
- Penyorotan blok kode
- Formula $\TeX$

::: info GFM

Github Flavored Markdown

:::

Sementara itu, Anda dapat dengan bebas menyisipkan konten HTML apapun tanpa memicu [mekanisme perlindungan](./safety.md#comment-security).

## Dukungan Pratinjau Terbatas

Untuk mengontrol ukuran klien, kami hanya menempatkan parser Markdown yang kecil di klien resmi `@waline/client`, yang menyebabkan banyak tata bahasa tidak ditampilkan dengan benar di panel pratinjau (namun tetap dapat **ditampilkan dengan benar di area komentar**).

Ini mencakup batasan berikut:

- Sintaks emoji standar (mis. :tada:`:tada:`) tidak ditampilkan dengan benar

- Subskrip dan superskrip (mis.: `H~2~O`, `x^2^`) tidak dapat ditampilkan dengan benar

- Sintaks $\TeX$, yaitu formula matematika (mis.: `$a = 1$`) tidak dapat dirender secara default.

  Saat menggunakan klien resmi, Anda dapat mengkustomisasi rendering $\TeX$ dalam pratinjau dengan menetapkan opsi `texRenderer`. Lihat [Cookbook → Menggunakan renderer $\TeX$ kustom](../../cookbook/customize/tex-renderer.md).

- Di bawah highlighter default, blok kode akan disorot dengan warna acak dengan pembatas tertentu.

  Saat menggunakan klien resmi, Anda dapat mengkustomisasi penyorotan kode saat pratinjau dengan menetapkan opsi `highlighter`. Lihat [Cookbook → Penyorotan Kode Kustom](../../cookbook/customize/highlighter.md).

## Selengkapnya

::: tip Prinsip

1. Mempertimbangkan ukuran paket, klien menggunakan `marked` untuk rendering dan menggunakan highlighter < 1kb secara default, serta tidak menyertakan renderer $\TeX$, sehingga mengakibatkan keterbatasan di atas.

1. Ketika pengguna mengirim komentar, klien menyisipkan gambar Emoji kustom dan mengirim komentar asli ke server.

1. Server menerima teks asli, menggunakan `markdown-it` untuk merender markdown dengan benar bersama plugin yang relevan, menggunakan `prismjs` untuk menyorot blok kode sesuai bahasa, dan melakukan rendering $\TeX$ sesuai pengaturan pengguna, lalu melakukan pemrosesan XSS.

1. Setelah pemrosesan selesai, server akan menyimpan konten rendering yang benar dan mengembalikannya ke klien saat diperlukan untuk memastikan tampilan normal area komentar.

:::
