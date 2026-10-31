---
title: Dukungan Format Komentar
icon: format
order: 2
---

Sintaks Markdown yang didukung dalam komentar adalah sebagai berikut.

<!-- more -->

## Dukungan Markdown

::: preview Judul

<!-- markdownlint-disable MD025 -->

# Judul 1

<!-- markdownlint-enable MD025 -->

## Judul 2

### Judul 3

#### Judul 4

##### Judul 5

###### Judul 7

:::

::: preview Teks

Kalimat ini memiliki teks bergaya **tebal**、_miring_ dan ~~coret~~.

:::

::: preview Paragraf

Ini adalah sebuah paragraf.

Ini adalah paragraf lainnya.

:::

::: details Pemisah Baris

Saya ingin memutus baris di  
titik ini

```md
I would like to line break at  
this point
```

:::

::: preview Kutipan Blok

> Kutipan blok juga dapat disarangkan...
>
> > ...dengan menggunakan tanda lebih besar yang berdampingan...
> >
> > > ...atau dengan spasi di antara tanda tersebut.

:::

::: preview Daftar Tidak Berurutan

- Buat daftar dengan memulai baris menggunakan `-`
- Buat subdaftar dengan indentasi 2 spasi:
  - Perubahan karakter penanda memaksa dimulainya daftar baru:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      Paragraf baru

- Ini mudah!

:::

::: preview Daftar Berurutan

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   pemisah baris  
   pemisah baris lagi
1. Integer molestie lorem at massa

:::

::: preview HR

---

:::

::: preview Tautan

[Beranda](/)

:::

::: preview Gambar

![Logo](/logo.png)

:::

::: preview Tabel

|             tengah              |                         kanan | kiri                         |
| :-----------------------------: | ----------------------------: | :--------------------------- |
| Gunakan `:-:` untuk rata tengah | Gunakan `-:` untuk rata kanan | Gunakan `:-` untuk rata kiri |
|                b                |                     aaaaaaaaa | aaaa                         |
|                c                |                          aaaa | a                            |

:::

::: preview Kode

Kode inline: `code`

Blok kode:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Superskrip dan Subskrip

Gunakan `^` dan `~` untuk menandai superskrip dan subskrip.

<!-- prettier-ignore-start -->

::: preview Demo

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emoji

Selain emoji Weibo yang dikonfigurasi pengguna atau bawaan, kami juga mendukung emotikon singkatan Emoji lengkap.

<!-- prettier-ignore-start -->

::: preview Demo

Klasik:

:wink: :cry: :laughing: :yum:

Pintasan:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Sorotan Blok Kode

Kami mendukung penyorotan di hampir semua bahasa.

::: details Demo

```html
<!doctype html>
<html lang="en">
  <head>
    <script>
      // Just a lil' script to show off that inline JS gets highlighted
      window.console && console.log('foo');
    </script>
    <meta charset="utf-8" />
    <link rel="icon" href="assets/favicon.png" />
    <title>Prism</title>
    <link rel="stylesheet" href="assets/style.css" />
    <link rel="stylesheet" href="themes/prism.css" data-noprefix />
    <script src="assets/vendor/prefixfree.min.js"></script>

    <script>
      var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];
    </script>
    <script src="https://www.google-analytics.com/ga.js" async></script>
  </head>
  <body></body>
</html>
```

```js
/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
Prism.fileHighlight = function () {
  if (!logged) {
    console.warn(
      'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.',
    );
    logged = true;
  }
  Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};
```

```css
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
  src: url(https://lea.verou.me/logo.otf);
  font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
  font:
    100% Rockwell,
    Arvo,
    serif;
}
```

:::

## Rumus Matematika

Anda dapat menggunakan `$ ... $` untuk membuat rumus inline, atau menggunakan `$$ ... $$` untuk membuat rumus tingkat blok.

::: preview Demo

Identitas Euler $e^{i\pi}+1=0$ adalah rumus yang indah di $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Menyematkan HTML

Silakan tambahkan konten HTML apa pun selama tidak memicu [mekanisme perlindungan](../guide/features/safety.md#comment-security).
