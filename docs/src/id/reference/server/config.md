---
title: Konfigurasi Server
icon: config
---

Opsi-opsi berikut perlu dikonfigurasi di file entri server `index.js`.

::: warning

Jika Anda menggunakan template, harap perhatikan bahwa Anda perlu menyimpan konfigurasi ini sendiri, karena konfigurasi tersebut akan ditimpa saat Anda menarik template resmi terbaru.

Kami merekomendasikan Anda untuk membuat repo dari template resmi dan membuat perubahan di sana.

:::

## Opsi Dasar

### plugins

- Tipe: `plugin[]`

Lihat [Sistem Plugin](./plugin.md) untuk detailnya

### secureDomains

- Tipe: `string | RegExp | string[] | RegExp[]`

Pengaturan domain aman. Permintaan dari domain lain akan menerima kode status 403. Mendukung tipe String, Regexp, dan Array. Membiarkan konfigurasi ini berarti semua referrer domain diizinkan.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- Untuk memudahkan pengembangan lokal, `localhost` dan `127.0.0.1` akan ditambahkan ke daftar nama domain aman secara default.
- Variabel lingkungan `SECURE_DOMAINS` tidak akan berfungsi ketika opsi ini diatur.

:::

### forbiddenWords

- Tipe: `string[]`

Jika sebuah komentar cocok dengan kata terlarang, komentar tersebut akan ditandai sebagai spam.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Tipe: `string[]`

Jika IP komentar cocok dengan daftar ini, kode status 403 akan dikembalikan.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Tipe: `string`

Menyesuaikan judul email balasan komentar, setara dengan variabel lingkungan `MAIL_SUBJECT`.

### mailTemplate

- Tipe: `string`

Menyesuaikan konten email balasan komentar, setara dengan variabel lingkungan `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Tipe: `string`

Menyesuaikan judul email notifikasi komentar baru, setara dengan variabel lingkungan `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Tipe: `string`

Menyesuaikan konten email notifikasi komentar baru, setara dengan variabel lingkungan `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Tipe: `string`

Template notifikasi komentar QQ, setara dengan variabel lingkungan `QQ_TEMPLATE`.

### TGTemplate

- Tipe: `string`

Template notifikasi komentar Telegram, setara dengan variabel lingkungan `TG_TEMPLATE`.

### model

- Tipe: `class`

Untuk detailnya, lihat [Menyesuaikan Layanan Database](../../cookbook/customize/database.md)

### encryptPassword

- Tipe: `function`

Lihat [Menyesuaikan Sistem Pengguna](../../cookbook/customize/userdb.md) untuk detailnya

### locales

- Tipe: `Record<string, Record<string, string>>`

Lihat [Locale Kustom](../../cookbook/customize/locale.md)

## Hook Komentar

Selain konfigurasi variabel lingkungan, Waline juga menyediakan beberapa hook kustom untuk memudahkan pemrosesan kebutuhan kustom. Cukup dikonfigurasi di file entri server `index.js`.

### preSave(comment)

Waline menyediakan beberapa hook kustom untuk membiarkan pengguna menyesuaikan perilaku server Waline sesuai kebutuhan mereka.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

Tindakan yang dilakukan setelah komentar diposting.

Ketika metode dijalankan, data komentar akan diteruskan sebagai parameter pertama, dan jika merupakan balasan komentar, komentar induk akan diteruskan sebagai parameter kedua.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Tindakan sebelum konten komentar diperbarui di dashboard. Jika metode mengembalikan konten, antarmuka akan langsung mengembalikan tanpa memperbarui data komentar.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### afterUpdate(comment)

Tindakan setelah konten komentar diperbarui di dashboard. Data komentar akan diteruskan saat metode dijalankan.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Tindakan sebelum komentar dihapus. Ketika metode dijalankan, ID komentar yang akan dioperasikan akan diteruskan. Jika metode mengembalikan konten, antarmuka akan langsung mengembalikan tanpa memperbarui data komentar.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### afterDelete(commentId)

Tindakan setelah komentar dihapus, ID komentar akan diteruskan sebagai satu-satunya parameter.

::: details Contoh

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
