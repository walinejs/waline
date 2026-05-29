---
title: Kustomisasi Locale
icon: i18n
---

Cookbook ini memandu Anda untuk mengkustomisasi multibahasa dan teks tampilan Waline.

<!-- more -->

## Kustomisasi bahasa dan teks klien

`@waline/client` menyediakan opsi `locale`, yang melaluinya Anda dapat mengkustomisasi beberapa bahasa dan teks tampilan.

Secara default, opsi ini menggunakan literal multibahasa bawaan dan akan kembali ke `en-US` (English US) jika bahasa tidak didukung.

Anda dapat meneruskan konfigurasi multibahasa yang lengkap ke opsi `locale` untuk menambahkan dukungan bahasa, atau mengatur beberapa di antaranya untuk menimpa teks UI yang sudah ada.

### Opsi Locale

- Terkait level:
  - `level${number}`: Label untuk nomor level

  ::: tip

  Misalnya, Anda dapat mengkustomisasi label untuk 6 level seperti ini:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Terkait reaksi:
  - `reactionTitle`: Judul reaksi
  - `reaction0`: Teks reaksi 1
  - `reaction1`: Teks reaksi 2
  - `reaction2`: Teks reaksi 3
  - `reaction3`: Teks reaksi 4
  - `reaction4`: Teks reaksi 5
  - `reaction5`: Teks reaksi 6
  - `reaction6`: Teks reaksi 7
  - `reaction7`: Teks reaksi 8
  - `reaction8`: Teks reaksi 9

- Terkait UI:
  - `nick`: nama panggilan
  - `mail`: Email
  - `link`: Tautan
  - `placeholder`: Teks default kotak komentar
  - `sofa`: Teks tampilan ketika area komentar kosong
  - `submit`: Teks tombol kirim
  - `comment`: Teks tombol komentar
  - `refresh`: Teks tombol muat ulang
  - `more`: Teks tombol muat lebih banyak
  - `uploading`: teks tampilan saat mengunggah
  - `login`: teks tombol masuk
  - `admin`: Label administrator
  - `sticky`: Teks sticky
  - `word`: kata
  - `anonymous`: nama default pengguna anonim
  - `optional`: teks yang menunjukkan opsi opsional
  - `gifSearchPlaceholder`: teks placeholder pencarian emoji
  - `oldest`: komentar terlama
  - `latest`: komentar terbaru
  - `hottest`: komentar terpanas

  ::: info

  Teks di atas akan ditampilkan di halaman.

  :::

- Terkait informasi petunjuk:
  - `nickError`: Pesan kesalahan bahwa nama panggilan tidak memenuhi kondisi
  - `mailError`: Pesan kesalahan bahwa kotak surat tidak memenuhi kondisi
  - `wordHint`: Petunjuk kesalahan untuk jumlah kata komentar, di mana `$0` `$1` `$2` akan secara otomatis diganti dengan batas bawah jumlah kata yang diizinkan, batas atas jumlah kata yang diizinkan, dan jumlah kata saat ini.

- Terkait waktu komentar:
  - `seconds`: detik yang lalu
  - `minutes`: menit yang lalu
  - `hours`: jam yang lalu
  - `days`: hari yang lalu
  - `now`: baru saja

- Terkait manajemen:
  - `approved`: Tombol yang menandai komentar sebagai disetujui
  - `waiting`: Tombol yang menandai komentar menunggu tinjauan
  - `spam`: Tombol yang menandai komentar sebagai spam
  - `unsticky`: Tombol yang membatalkan sticky komentar

- Terkait aksesibilitas:
  - `like`: teks label tombol suka
  - `cancelLike`: teks label tombol batalkan suka
  - `reply`: teks label tombol balas
  - `cancelReply`: teks label tombol batalkan balas
  - `preview`: Teks label tombol pratinjau
  - `emoji`: teks label tombol emoji
  - `gif`: Teks label tombol Gif
  - `uploadImage`: teks label tombol unggah gambar
  - `profile`: Judul tautan halaman profil
  - `logout`: teks label tombol keluar

  ::: info

  Teks-teks ini hanya untuk tujuan aksesibilitas dan tidak akan ditampilkan di halaman.

  :::

### Contoh

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint: 'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Kustomisasi teks respons server

`@waline/vercel` menyediakan opsi `locales` yang memungkinkan Anda mengkustomisasi teks respons.

Secara default, opsi ini menggunakan teks multibahasa bawaan, dan akan kembali ke teks bahasa `en-US` jika bahasa tidak didukung.

Anda dapat meneruskan konfigurasi multibahasa yang lengkap ke opsi `locales` untuk menambahkan dukungan bahasa, atau mengatur beberapa di antaranya untuk menimpa teks yang sudah ada.

::: tip

Semua teks kustom pada akhirnya akan dirender menggunakan mesin template nunjucks, yang mendukung penulisan beberapa ekspresi logika yang relatif kompleks. Misalnya:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### Opsi locale

- Terkait informasi petunjuk:
  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Terkait notifikasi email pendaftaran/masuk:
  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Terkait notifikasi email komentar:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
