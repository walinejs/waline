---
title: plugin system
icon: api
---

Pengguna dapat memperluas fungsi hook kustom melalui Hook yang disediakan oleh Waline untuk mewujudkan fungsi kustom. Namun jika pengguna ingin berbagi metode Hook kustom, mereka hanya dapat menggunakan metode salin. Untuk mengatasi masalah ini, sistem plugin Waline pun lahir.

## Instal plugin

Atribut `plugins` baru telah ditambahkan ke konfigurasi awal Waline, yang mendukung konfigurasi beberapa plugin.

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [HelloWorldPlugin],
});
```

Untuk menginstal plugin orang lain secara langsung, Anda juga dapat menempatkan hook plugin langsung di `plugins`:

```js
// index.js
const Waline = require('@waline/vercel');
const HelloWorldPlugin = require('@waline-plugins/hello-world');

module.exports = Waline({
  plugins: [
    {
      hooks: {
        async postSave() {
          // do what ever you want after comment saved
        },
      },
      middlewares: [
        async (ctx, next) => {
          await next();
        },
      ],
    },
  ],
});
```

## Buat plugin

### Buat berdasarkan Hook

Membangun plugin itu mudah. Sebuah plugin terdiri dari kumpulan [hook.](./config.md#hooks)

```js
module.exports = {
  hooks: {
    async postSave() {
      // do what ever you want after comment saved
    },
  },
};
```

Perlu dicatat bahwa jika pengguna menginstal beberapa plugin Hook, eksekusi fungsi hook yang sama dilakukan sesuai urutan instalasi plugin. Jika metode pre-hook mengembalikan lebih awal, tidak ada operasi selanjutnya yang akan dilakukan.

### Buat berdasarkan middleware

Jika Hook tidak dapat memenuhi kebutuhan Anda, Anda dapat menggunakan mode middleware yang lebih canggih untuk pengembangan kustom. Lapisan bawah Waline menggunakan framework Node.js [Koa](https://koajs.com), dan kami mengekspos konfigurasi middleware Koa secara keseluruhan, yang dapat memenuhi berbagai kebutuhan kustomisasi pengembang tingkat lanjut.

Jika Anda tidak tahu apa itu middleware Koa, Anda dapat mencarinya terlebih dahulu. Yang perlu diperhatikan saat menggunakan mode middleware untuk membuat plugin adalah bahwa metode callback harus menulis eksekusi `await next()`, jika tidak, operasi selanjutnya tidak akan dijalankan.

```js
module.exports = {
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
};
```

Tentu saja, Anda dapat menggabungkan logika plugin tipe Hook dan plugin tipe middleware, dan Waline mendukung keduanya.

### Daftar plugin

Selamat datang untuk mengirimkan plugin~

- [@waline-plugins/hello-world](https://github.com/walinejs/plugins/tree/master/packages/hello-world)
- [@waline-plugins/privacy](https://github.com/walinejs/plugins/tree/master/packages/privacy)
- [@waline-plugins/tencent-tms](https://github.com/walinejs/plugins/tree/master/packages/tencent-tms)
- [@waline-plugins/link-interceptor](https://github.com/walinejs/plugins/tree/master/packages/link-interceptor)
- [waline-plugin-llm-reviewer](https://github.com/zhullyb/waline-plugin-llm-reviewer)
- [waline-notification-bark](https://github.com/wnwd/waline-notification-bark)
- [waline-notification-telegram-bot](https://github.com/wnwd/waline-notification-telegram-bot)
- [waline-notification-wecom-group-bot](https://github.com/wnwd/waline-notification-wecom-group-bot)
- [waline-notification-lark-group-bot](https://github.com/wnwd/waline-notification-lark-group-bot)
- [waline-notification-slack-app](https://github.com/wnwd/waline-notification-slack-app)
- [waline-openai-moderation](https://github.com/chenxv399/waline-openai-moderation)
