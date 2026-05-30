---
title: Keamanan
icon: safe
order: -10
---

Keamanan sistem komentar Waline adalah prioritas utama kami. Kami akan membahas keamanan Waline di sini.

<!-- more -->

## Keamanan Komentar

### Perlindungan dari Serangan XSS

Waline menggunakan [DOMPurify](https://github.com/cure53/DOMPurify) untuk memfilter setiap input komentar di sisi server guna mencegah potensi serangan XSS. Ini berarti Anda tidak akan dapat menggunakan `<iframe>` atau bentuk scripting apapun.

### Mencegah Pelacakan Tautan

Semua tautan akan secara otomatis diatur ke `rel="noreferrer noopener"` dan dibuka di jendela baru dengan `target="_blank"`.

### Mencegah Penyisipan Konten Berbahaya

- Untuk mencegah pengguna membuat formulir yang dapat dikirim di area komentar untuk menipu pengunjung lain agar mengirimkan informasi, Anda tidak dapat menggunakan `<form>` dan `<input>`

- Untuk mencegah pengguna menggunakan gaya untuk memodifikasi halaman situs web atau memodifikasi gaya komentar mereka sendiri guna menanam iklan spam, tag `<style>` dan atribut `style` pada elemen tidak tersedia.

- Untuk mencegah pengguna menyalahgunakan fungsi autoplay media, Anda tidak dapat menggunakan atribut `autoplay`.

### Mencegah Pemalsuan

Waline mendukung sistem akun, sehingga Anda dapat memaksa pengguna untuk mendaftar dan masuk dengan akun. Dengan cara ini pengunjung tidak akan dapat memalsukan komentar orang lain.

Untuk mengaktifkan fitur ini, Anda perlu mengatur login wajib di klien dan server. Lihat [`login`](../../reference/client/props.md#login) dan [`LOGIN`](../../reference/server/env.md#basic) untuk detailnya.

## Keamanan Situs

### Batas Frekuensi

Untuk mencegah pengguna membanjiri komentar, Waline akan membatasi IP yang berkomentar. Secara default, IP yang sama hanya dapat mengirim satu komentar dalam satu menit. Anda dapat mengubah batas ini di [Referensi Server → Variabel Lingkungan](../../reference/server/env.md#safety).

### Mencegah Banjir Komentar

Waline akan mendeteksi komentar yang ada saat memasukkan komentar, dan jika mendeteksi komentar dengan kemiripan yang terlalu tinggi, maka komentar yang bersangkutan akan ditolak. Ini dapat mencegah banjir komentar sampai batas tertentu.

### Moderasi Komentar

Ketika situs Anda sedang diserang secara jahat, pada masa-masa sensitif, atau ketika Anda sibuk, Anda dapat mengaktifkan fitur moderasi komentar. Untuk detailnya, lihat [Referensi Server → Variabel Lingkungan](../../reference/server/env.md#safety).

Ketika moderasi komentar diaktifkan, semua komentar baru akan disembunyikan secara default. Anda dapat melihat dan mereview komentar di terminal manajemen Waline atau kotak komentar di halaman yang bersangkutan. Hanya komentar yang Anda setujui yang dapat ditampilkan.

## Keamanan Data

Karena Waline memiliki sisi server, tidak ada yang dapat memanipulasi data komentar atau tampilan halaman.

Sementara itu, Anda dapat menetapkan variabel `DISABLE_USERAGENT` dan `DISABLE_REGION` di sisi server untuk mencegah orang lain melihat UA dan lokasi geografis komentar pengguna.
