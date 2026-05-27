---
title: Dukungan Format Komentar
icon: format
order: 2
---

Sintaks Markdown yang didukung dalam komentar adalah sebagai berikut.

<!-- more -->

## Dukungan Markdown

::: details Judul

<!-- markdownlint-disable MD025 -->

# Heading1

<!-- markdownlint-enable MD025 -->

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading7

```md
# Heading1

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading7
```

:::

::: details Teks

This sentence has **bold**、_italic_ and ~~delete~~ style text.

```md
This sentence has **bold**、_italic_ and ~~delete~~ style text.
```

:::

::: details Paragraf

This is a paragraph.

This is another paragraph.

```md
This is a paragraph.

This is another paragraph.
```

:::

::: details Pemisah Baris

I would like to line break at  
this point

```md
I would like to line break at  
this point
```

:::

::: details Blockquotes

> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

```md
> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.
```

:::

::: details Daftar Tidak Berurutan

- Create a list by starting a line with `-`
- Make sub-lists by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- It's easy!

```md
- Create a list by starting a line with `-`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- Very easy!
```

:::

::: details Daftar Berurutan

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa
```

:::

::: details HR

---

```md
---
```

:::

::: details Tautan

[HomePage](/)

```md
[HomePage](/)
```

:::

::: details Gambar

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details Tabel

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

```md
|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |
```

:::

::: details Kode

Inline Code: `code`

```md
Inline Code: `code`
```

Block code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

````md
Block code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
````

:::

## Superscript dan Subscript

Gunakan `^` dan `~` untuk menandai superscript dan subscript.

::: details Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::

## Emoji

Selain emoji Weibo yang dikonfigurasi pengguna atau bawaan, kami juga mendukung emotikon singkatan Emoji lengkap.

::: details Demo

Klasik:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

Pintasan:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

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

:::
::: details Demo

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

## Embed HTML

Silakan tambahkan konten HTML apa pun selama tidak memicu [mekanisme perlindungan](../guide/features/safety.md#comment-security).
