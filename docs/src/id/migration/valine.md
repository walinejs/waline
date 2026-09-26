---
title: Migrasi dari Valine
icon: valine
---

1. Deploy backend sesuai dengan [Penerapan Vercel](../guide/get-started/README.md#penerapan-server) di bagian _Mulai_.

2. Modifikasi skrip frontend sesuai dengan [HTML](../guide/get-started/README.md#impor-di-html) di bagian _Mulai_.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

   ::: tip Konfigurasi

   Waline V2 telah menghapus dukungan Valine dan beralih ke konfigurasi yang lebih baik. Berikut adalah ringkasan migrasi beberapa opsi:
   - `placeholder`: gunakan `locales.placeholder`
   - `highlight`: gunakan `highlighter`
   - `avatarForce`, `avatar`: gunakan variabel lingkungan `AVATAR_PROXY` di server
   - `recordIP`: tidak lagi menampilkan IP pengguna, dan menyediakan variabel lingkungan `DISABLE_USERAGENT` di server
   - `requiredFields`: diganti namanya menjadi `requiredMeta`
   - `langMode`: diganti namanya menjadi `locales`
   - `emojiCDN`, `emojiMap`: gunakan opsi `emoji` yang lebih powerful

   Untuk konfigurasi waline, silakan lihat [Konfigurasi Klien](../reference/client/api.md). Anda juga dapat memeriksa [Panduan Migrasi Waline Client V2](./v2.md) untuk mempelajari opsi yang tidak kompatibel dengan Valine.

   :::

3. Migrasi data

Pilih <kbd>Import/Export</kbd> > <kbd>Batasi ke kelas tertentu</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> di latar belakang LeanCloud, dan kemudian Anda akan menerima notifikasi email.

Tempelkan konten file ekspor ke textarea di bawah, dan klik tombol konversi untuk mendapatkan file yang akan diimpor.

<MigrationTool />

::: tip

Setelah Anda mendapatkan file yang diekspor melalui alat di atas, Anda dapat mengimpornya di konsol layanan penyimpanan yang sesuai.

:::

## Keunggulan Waline

Dibandingkan dengan Valine, Waline memiliki keunggulan berikut:

### Lebih banyak fitur

1. Markdown mendukung lebih banyak sintaks, termasuk superskrip dan subskrip, emoji, tabel, teks tercoret, rumus matematika, tag HTML, catatan kaki, dll.
1. Fitur unggah gambar, yang memungkinkan layanan penyedia gambar yang dikustomisasi atau menyematkan gambar secara langsung.
1. Sistem label baru menambahkan label level untuk pengguna sesuai frekuensi interaksi pengguna, dan mendukung label kustom untuk pengguna terdaftar.
1. Preset dan dukungan tab emoji, memungkinkan beberapa set Emoji, sekaligus memungkinkan siapa saja untuk mempublikasikan dan menggunakan preset Emoji.
1. Sistem reaksi baru yang memungkinkan pengunjung untuk mengekspresikan sikap mereka terhadap artikel.
1. Suka komentar, ungkapkan dukungan untuk komentar yang Anda sukai.
1. Tampilan halaman, tampilan yang lebih akurat dan anti-manipulasi.
1. Pencarian Emoji. Layanan yang dapat dikustomisasi, memungkinkan pengguna untuk mencari dan menyisipkan emotikon dengan bebas.
1. Mendukung pengguna terdaftar untuk mengedit dan menghapus komentar yang mereka publikasikan.

### Lebih aman

1. Zero kebocoran privasi, tidak akan mengekspos kotak surat pengguna, alamat IP, dan informasi sensitif lainnya, dan dapat memilih untuk menyembunyikan lokasi geografis pengguna, browser, dan sistem operasi di server
1. Sistem anti-spam yang lengkap.
   - Semua komentar dapat diautentikasi oleh layanan anti-spam dan mendukung logika validasi tambahan.
   - Anda dapat mengatur batas kecepatan komentar untuk satu IP atau satu pengguna, dan Waline secara otomatis mengidentifikasi komentar duplikat.
1. Fitur review komentar, dalam periode sensitif atau ketika situs web sedang diserang, Anda dapat mengaktifkan review komentar, meninjau dan menyetujui tampilan komentar secara manual, dan mencegah komentar berbahaya menyebabkan penutupan situs.
1. Mendukung akun pengguna. Selain mendaftarkan akun, Waline juga mendukung akun media sosial, dengan cepat menyinkronkan avatar dan nama panggilan dengan label yang diotorisasi untuk mencegah penipuan identitas.

### Lebih nyaman

1. Berbagai metode (QQ, WeChat, DingTalk, E-mail), dll. untuk memberi tahu blogger tentang komentar
1. Layanan manajemen yang powerful, Anda dapat melihat semua pengguna dan komentar serta melakukan operasi terkait, dan menetapkan label kustom dan administrator untuk pengguna
1. Manajemen frontend, administrator dapat meninjau, mengedit, atau menghapus komentar langsung melalui komponen komentar Waline.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
