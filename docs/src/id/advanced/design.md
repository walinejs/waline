---
title: Tujuan Desain
icon: goal
order: 2
---

[Valine](https://valine.js.org) adalah sistem ulasan dengan gaya yang indah, operasi sederhana, dan deployment yang efisien. Saat pertama kali bersentuhan dengannya, saya langsung tertarik oleh gayanya yang elegan dan karakteristik serverless-nya. Tidak memerlukan layanan backend. Frontend berinteraksi langsung dengan layanan penyimpanan LeanCloud, yang benar-benar keren! Namun seiring pemahaman yang lebih dalam, saya menemukan berbagai masalahnya.

## Masalah Valine

### Tidak Open Source

Penulis hanya mendorong file yang sudah dikompilasi ke repositori GitHub mulai dari versi `1.4.0`, dan kode sumber berhenti diperbarui. Mungkin penulis sudah kecewa dengan open source. Bagi pengguna seperti saya yang ingin menambah atau memodifikasi proyek, masalah ini cukup mengganggu.

### XSS

Sejak versi awal, pengguna telah melaporkan masalah XSS pada Valine, dan komunitas juga menggunakan berbagai metode untuk memperbaiki masalah ini. Termasuk penambahan kode verifikasi, pemfilteran XSS di frontend, dan metode lainnya. Namun, penulis kemudian menyadari bahwa semua verifikasi frontend hanya dapat mencegah orang jujur, sehingga pembatasan seperti kode verifikasi dihapus.

Sekarang ketika frontend mempublikasikan komentar, Markdown akan dikonversi menjadi HTML, kemudian menjalankan fungsi filter XSS di frontend sebelum dikirimkan ke LeanCloud. Setelah mendapatkan data dari LeanCloud, data tersebut langsung dimasukkan ke DOM. Proses ini jelas bermasalah. Selama HTML dikirimkan langsung dan ditampilkan langsung setelah HTML diperoleh, XSS tidak dapat diberantas secara fundamental.

::: note Solusi fundamental

Untuk serangan XSS yang tersimpan, kita dapat menggunakan kode HTML yang di-escape untuk menyelesaikannya secara permanen. Sama seperti BBCode lama, hanya konten markdown yang dikirimkan ke database. Frontend membaca konten dan mengenkode semua HTML sebelum menampilkannya setelah konversi Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Karena Valine adalah sistem serverless, penyerang dapat langsung mencapai tahap penyimpanan. Semua tindakan pencegahan sebelum penyimpanan data tidak valid dan hanya dapat diproses selama proses tampilan. Karena semua HTML tidak dapat diurai setelah di-escape, kita dapat memastikan bahwa HTML yang dikonversi tidak memiliki kesempatan untuk disisipkan.

Karena Valine tidak lagi open source, pull request tidak dapat dibuka.

:::

Karena metode di atas akan sepenuhnya membatasi pengguna dalam cakupan Markdown, Waline menambahkan `DOMPurify` di sisi klien sejak `0.15.0` untuk mencegah XSS. Selain sanitasi XSS biasa:

- `<form>` dan `<input>` dinonaktifkan
- injeksi style dinonaktifkan
- autoplay media dinonaktifkan
- semua tautan eksternal akan diproses dan dibuka di jendela baru dengan rel `noopener noreferrer`.

### Kebocoran Privasi

Selain akses langsung ke penyimpanan, penyerang juga dapat membaca data apa pun secara langsung. Jika sebuah field database memiliki izin baca untuk semua orang, konten field tersebut sepenuhnya transparan bagi penyerang.

Dalam data komentar, dua field IP dan kotak surat berisi data sensitif pengguna. Mr. Deng menulis artikel khusus untuk mengkritik masalah tersebut [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Bahkan ketika komunitas [JueJin](https://juejin.cn) menggunakan LeanCloud pada tahun-tahun awal, masalah keamanan [nomor ponsel pengguna yang bocor](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999) pun terungkap.

Untuk mengatasi masalah ini, penulis Valine menambahkan konfigurasi `recordIP` untuk mengatur apakah pencatatan IP pengguna diizinkan. Karena tidak ada server, ini hanya dapat diselesaikan dengan tidak menyimpan nilainya.

Masih ada masalah dengan opsi ini: apakah mencatat ip didasarkan pada konfigurasi pemilik situs, sementara pengguna yang berkomentar tidak memiliki hak untuk mengelola privasi mereka sendiri.

Kebocoran alamat email adalah masalah privasi besar lainnya. Sangat layak untuk menghitung dan melaporkan md5 email pengguna di frontend untuk mendapatkan avatar Gravatar. Tetapi jika pengiriman notifikasi email saat komentar dibalas diperlukan, tidak dapat dihindari untuk menyimpan nilai asli alamat email pengguna. Masalah ini secara teori dapat diselesaikan dengan enkripsi RSA. Kunci privat dapat disimpan dalam variabel lingkungan LeanCloud. Klien melaporkan md5 email dan email yang dienkripsi dengan kunci publik. Ketika LeanCloud ingin mengirim notifikasi email, ia membaca kunci privat di lingkungan dalam fungsi cloud, kemudian mendekripsi untuk mendapatkan email pengguna. Namun, mengingat ukuran dan kinerja library enkripsi RSA frontend, ini tidak praktis. Menambahkan lapisan server untuk memfilter informasi sensitif melalui sisi server jelas merupakan praktik yang lebih baik.

### Manipulasi Statistik Baca

Valine 1.2.0 menambahkan fungsi statistik pembacaan artikel, pengguna mengunjungi halaman dan mencatat jumlah kunjungan berdasarkan url di tabel counter di latar belakang. Karena data perlu diperbarui setiap kali halaman diakses, izin harus diatur agar dapat ditulis untuk melakukan pembaruan field berikutnya. Ini menciptakan masalah. Faktanya, data dapat diperbarui ke nilai apa pun. Jika Anda tertarik, Anda dapat membuka situs web resmi <https://valine.js.org/visitor.html> dan masuk ke konsol, lalu masukkan kode berikut untuk mencoba. Ingat untuk mengubah angka kembali setelah mencoba~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Untungnya, nilai field `time` bertipe Number, sehingga nilai lain tidak dapat dimasukkan. Jika field `time` bertipe string, mungkin ada kerentanan XSS. Solusi yang memungkinkan untuk masalah ini adalah tidak menggunakan metode penyimpanan akumulatif. Diubah untuk menyimpan catatan akses read-only untuk setiap kunjungan, dan menggunakan metode `count()` untuk statistik saat membaca. Dengan cara ini, semua data hanya dapat dibaca, yang menyelesaikan masalah manipulasi. Solusi ini juga memiliki masalah: ketika jumlah data relatif besar, hal ini akan menimbulkan tekanan tertentu pada kueri.

Jika didasarkan pada mempertahankan data asli, hanya lapisan server yang dapat ditambahkan untuk mengisolasi izin modifikasi.

## Lahirnya Waline

Berdasarkan alasan-alasan di atas, Waline lahir. Tujuan awal Waline hanyalah menambahkan backend ke Valine, tetapi karena Valine tidak open source, ini hanya dapat diimplementasikan dengan frontend. Tentu saja, banyak kode dan logika frontend yang mereferensikan Valine agar konsisten dengan konfigurasi Valine. Bahkan dalam nama proyek, saya menurunkannya dari Valine, sehingga semua orang dapat memahami bahwa proyek ini adalah turunan dari Valine.

Selain menyelesaikan masalah keamanan yang disebutkan di atas, penambahan sisi server mengimplementasikan banyak fitur yang sebelumnya dibatasi oleh tidak adanya sisi server, termasuk notifikasi email, penyaringan komentar spam, dan lainnya.
