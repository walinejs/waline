---
title: Props Komponen
icon: config
---

## serverURL

- Tipe: `string`
- Wajib: Ya

URL alamat server Waline

## path

- Tipe: `string`
- Bawaan: `window.location.pathname`

ID path artikel. Digunakan untuk membedakan _halaman artikel_ yang berbeda guna memastikan daftar komentar yang tepat dimuat di bawah _halaman artikel_.

::: warning

Harap pastikan keunikan setiap path _halaman artikel_, jika tidak, daftar komentar yang sama mungkin akan dimuat.

- Contoh 1: Jika di situs Anda `/example/path/` dan `/example/path` adalah halaman yang sama, Anda sebaiknya mengatur `window.location.pathname.replace(/\/$/,'')`.
- Contoh 2: Jika Anda menyimpan dokumen en di root, sementara menyajikan dokumen bahasa lain di `/zh/`, `/ja/`, dll., Anda sebaiknya mengatur `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Tipe: `string`
- Bawaan: `navigator.language`
- Detail:
  - [Panduan → I18n](../../guide/features/i18n.md#set-language)

Bahasa tampilan.

Nilai yang tersedia:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`
- `fr-FR`
- `fr`
- `'es'`
- `'es-MX'`

## locale

- Tipe: `WalineLocale`
- Bawaan: Nilai bawaan berdasarkan `lang`
- Detail:
  - [Cookbook → Menyesuaikan Locale](../../cookbook/customize/locale.md)

Locale Waline.

## emoji

- Tipe: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /**
     * Nama emoji yang ditampilkan pada tab
     */
    name: string;
    /**
     * Tautan folder saat ini
     */
    folder?: string;
    /**
     * Awalan umum ikon Emoji
     */
    prefix?: string;
    /**
     * Tipe ikon Emoji, akan dianggap sebagai ekstensi file
     */
    type?: string;
    /**
     * Ikon emoji yang ditampilkan pada tab
     */
    icon: string;
    /**
     * Daftar gambar Emoji
     */
    items: string[];
  }
  ```

- Bawaan: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Detail:
  - [Panduan → Emoji](../../guide/features/emoji.md)

Pengaturan Emoji.

## dark

- Tipe: `string | boolean`
- Bawaan: `false`

Dukungan mode gelap

- Mengatur boolean akan mengatur mode gelap sesuai nilainya.
- Mengaturnya ke `'auto'` akan menampilkan mode gelap berdasarkan pengaturan perangkat.
- Mengisi selektor CSS akan mengaktifkan mode gelap hanya ketika selektor cocok dengan node leluhur waline.

::: tip Contoh

- **Docusaurus**: Mode gelap diaktifkan dengan mengatur `data-theme="dark"` pada tag `<html>` itu sendiri. Jadi Anda perlu mengatur `'html[data-theme="dark"]'` sebagai opsi `dark`.

- **hexo-theme-fluid**: Mode gelap diaktifkan dengan mengatur `data-user-color-scheme="dark"` pada tag `<html>` itu sendiri. Jadi Anda perlu mengatur `'html[data-user-color-scheme="dark"]'` sebagai opsi `dark`.

- **vuepress-theme-hope**: Mode gelap diaktifkan dengan mengatur class `theme-dark` pada tag `<body>` itu sendiri. Jadi Anda perlu mengatur `'body.theme-dark'` sebagai opsi `dark`.

:::

Untuk detail gaya kustom dan mode gelap, silakan lihat [Gaya Kustom](../../guide/features/style.md).

## commentSorting

- Tipe: `WalineCommentSorting`
- Bawaan: `'latest'`

Metode pengurutan daftar komentar. Nilai yang tersedia: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Tipe: `string[]`
- Bawaan: `['nick','mail','link']`

Atribut pengulas. Nilai yang tersedia: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Tipe: `string[]`
- Bawaan: `[]`

Mengatur bidang yang wajib diisi, default anonim, nilai yang tersedia:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Tipe: `string`
- Nilai bawaan: `'enable'`

Status mode login, nilai yang tersedia:

- `'enable'`: aktifkan login (default)
- `'disable'`: Login dinonaktifkan, pengguna harus mengisi informasi untuk berkomentar
- `'force'`: Login paksa, pengguna harus login untuk berkomentar

## wordLimit

- Tipe: `number | [number, number]`
- Bawaan: `0`

Batas kata komentar. Ketika satu angka diisi, itu adalah jumlah maksimum kata komentar. Tidak ada batas ketika diatur ke `0`.

## pageSize

- Tipe: `number`
- Bawaan: `10`

Jumlah komentar per halaman.

## imageUploader

- Tipe: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Wajib: Tidak

- Detail:
  - [Cookbook → Upload Gambar](../../cookbook/customize/upload-image.md)

Metode upload gambar kustom. Perilaku default adalah menyematkan gambar yang dikodekan Base64, Anda dapat mengatur ini ke `false` untuk menonaktifkan upload gambar.

Fungsi ini harus menerima objek gambar dan mengembalikan Promise yang menyediakan alamat gambar.

## highlighter

- Tipe: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Wajib: Tidak

- Detail:
  - [Cookbook → Menyesuaikan Highlighter](../../cookbook/customize/highlighter.md)

**Penyorotan kode**, menggunakan `hanabi` secara default. Fungsi ini menerima konten asli blok kode dan bahasa blok kode. Anda harus mengembalikan string secara langsung.

Anda dapat meneruskan penyorot kode Anda sendiri, atau mengatur ke `false` untuk menonaktifkan penyorotan kode.

## texRenderer

- Tipe: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Wajib: Tidak

- Detail:
  - [Cookbook → Menyesuaikan Renderer $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Menyesuaikan rendering $\TeX$, perilaku default adalah memberikan peringatan bahwa mode pratinjau tidak mendukung $\TeX$. Fungsi ini menyediakan dua parameter, parameter pertama menunjukkan apakah harus dirender dalam level blok, dan parameter kedua adalah string konten $\TeX$, dan mengembalikan string HTML sebagai hasil render.

Anda dapat mengimpor renderer $\TeX$ untuk menyediakan fitur pratinjau. Kami merekomendasikan Anda menggunakan KaTeX atau MathJax, atau Anda dapat mengatur ke `false` untuk menonaktifkan penguraian $\TeX$.

## search

- Tipe: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * Tautan gambar
     */
    src: string;

    /**
     * Judul gambar
     *
     * @description Digunakan untuk atribut alt gambar
     */
    title?: string;

    /**
     * Tautan pratinjau gambar
     *
     * @description Untuk performa loading yang lebih baik, kami akan menggunakan thumbnail ini terlebih dahulu dalam daftar
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * Aksi pencarian
     */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * Hasil default saat membuka daftar
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * Aksi ambil lebih banyak
     *
     * @description Akan dipicu ketika daftar digulir ke bawah. Jika layanan pencarian Anda mendukung paging, Anda harus mengatur ini untuk mencapai infinite scrolling
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- Wajib: Tidak
- Detail:
  Menyesuaikan fitur pencarian, Anda dapat menonaktifkan fungsi pencarian dengan mengaturnya ke `false`.

## noCopyright

- Tipe: `boolean`
- Bawaan: `false`

Apakah menyembunyikan hak cipta dan versi di footer.

::: tip

Kami berharap Anda dapat tetap mengaktifkannya untuk mendukung Waline.

:::

## noRss

- Tipe: `boolean`
- Bawaan: `false`

Apakah menyembunyikan tautan langganan RSS.

## recaptchaV3Key

- Tipe: `string`
- Wajib: Tidak

reCAPTCHA V3 adalah layanan captcha yang disediakan oleh Google. Anda dapat menambahkan kunci situs reCAPTCHA V3 dengan `recaptchaV3Key` untuk mengaktifkannya. Perhatikan bahwa Anda juga harus mengatur variabel lingkungan `RECAPTCHA_V3_SECRET` untuk server.

## turnstileKey

- Tipe: `string`
- Wajib: Tidak

Turnstile adalah layanan captcha yang disediakan oleh Cloudflare. Anda dapat menambahkan kunci situs turnstile dengan `turnstileKey` untuk mengaktifkannya. Perhatikan bahwa Anda juga harus mengatur variabel lingkungan `TURNSTILE_SECRET` untuk server.

## reaction

- Tipe: `boolean | string[]`
- Bawaan: `false`

Menambahkan fungsi interaksi emoji pada artikel, atur ke `true` untuk menyediakan emoji default, Anda juga dapat menyesuaikan gambar emoji dengan mengatur array URL emoji, dan mendukung maksimum 8 emoji.
