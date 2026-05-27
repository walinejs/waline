---
title: Notifikasi Komentar
icon: notice
order: 10
---

Ketika seorang pengguna memposting komentar di situs web atau seorang pengguna merespons sebuah komentar, Waline mendukung notifikasi melalui email atau WeChat kepada blogger dan penulis yang merespons komentar tersebut.

- Kami mendukung beberapa jenis notifikasi untuk blogger
- Kami akan mengirimkan email kepada pengunjung sekali komentarnya mendapat balasan.

<!-- more -->

## Notifikasi Email

Notifikasi email membutuhkan variabel lingkungan berikut untuk dikonfigurasi:

- `SMTP_SERVICE`: Penyedia layanan pengiriman email SMTP

  ::: tip

  Anda dapat menemukan semua penyedia yang didukung di [layanan nodemailer](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json). Jika penyedia Anda tidak terdaftar, Anda harus mengkonfigurasi `SMTP_HOST` dan `SMTP_PORT`.
  - `SMTP_HOST`: Alamat server SMTP, biasanya dapat ditemukan di halaman pengaturan kotak surat.
  - `SMTP_PORT`: Port server SMTP, biasanya dapat ditemukan di halaman pengaturan kotak surat.

  :::

- `SMTP_USER`: Akun layanan pengiriman email SMTP, yaitu alamat email Anda.
- `SMTP_PASS`: Kata sandi layanan pengiriman email SMTP, yaitu kata sandi email Anda.
- `SMTP_SECURE`: Koneksi SMTP dengan SSL, nilai `true` atau `false`.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.

Variabel lingkungan berikut bersifat opsional:

- `SENDER_NAME`: Nama pengirim kustom dalam notifikasi
- `SENDER_EMAIL`: Nama pengirim kustom dalam notifikasi, diperlukan untuk beberapa layanan SMTP.
- `MAIL_SUBJECT`: Judul email balasan komentar kustom
- `MAIL_TEMPLATE`: Konten email balasan kustom
- `MAIL_SUBJECT_ADMIN`: Judul email notifikasi komentar baru kustom
- `MAIL_TEMPLATE_ADMIN`: Konten email notifikasi komentar baru kustom
- `AUTHOR_EMAIL`: Email blogger, digunakan untuk menentukan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.

## Notifikasi WeChat

Kami menggunakan [Mr. Server](http://sc.ftqq.com/3.version) untuk notifikasi WeChat. Anda perlu menetapkan `SC_KEY` di env yang didapatkan dari Mr. Server.

- `SC_KEY`: Token yang didapatkan dari Mr. Server, diperlukan untuk layanan ini.
- `AUTHOR_EMAIL`: Email blogger digunakan untuk membedakan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.

## Notifikasi QQ

Kami menggunakan [Mr. Qmsg](https://qmsg.zendee.cn) untuk mengirim notifikasi QQ. Anda perlu menetapkan `QMSG_KEY` di env yang didapatkan dari Mr. Qmsg.

- `QMSG_KEY`: KEY yang didapatkan dari Mr. Qmsg, diperlukan untuk layanan ini.
- `QMSG_HOST`: HOST yang didapatkan dari Mr. QmsgPrivate, Opsional. Diperlukan untuk host ini. Default-nya adalah `https://qmsg.zendee.cn`
- `QQ_ID`: ID QQ dari penerima, kecuali grup QQ. Jika ada lebih dari satu ID QQ, gunakan koma untuk memisahkan beberapa nilai, misalnya `1244453393,2952937634` (semuanya harus termasuk dalam daftar ID QQ Mr. Qmsg Anda).
- `AUTHOR_EMAIL`: Email blogger digunakan untuk membedakan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.
- `QQ_TEMPLATE`: Template notifikasi yang digunakan oleh QQ. Variabel dan format spesifik dapat ditemukan di bagian template notifikasi di bawah. Jika tidak dikonfigurasi, template default akan digunakan.

## Notifikasi Telegram

Kami menggunakan bot Telegram untuk mengirim notifikasi Telegram. Anda perlu menetapkan env berikut.

- `TG_BOT_TOKEN`: Token bot Telegram untuk mengakses HTTP API. Buat bot dengan [@BotFather](https://t.me/BotFather) untuk mendapatkan token ini. Diperlukan untuk layanan ini.
- `TG_CHAT_ID`: `chat_id` dari penerima. Bisa berupa pengguna, saluran, atau grup. [@userinfobot](https://t.me/userinfobot) akan menampilkan `chat_id` ini saat Anda meneruskan pesan kepadanya. Diperlukan untuk layanan ini.
- `AUTHOR_EMAIL`: Email blogger digunakan untuk membedakan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.
- `TG_TEMPLATE`: Template notifikasi yang digunakan oleh Telegram. Variabel dan format spesifik dapat ditemukan di bagian template notifikasi di bawah. Jika tidak dikonfigurasi, template default akan digunakan.

## Notifikasi PushPlus

[pushplus](http://www.pushplus.plus/) adalah platform push pesan yang mendukung banyak saluran seperti wechat, wechat work, ding talk, sms, atau email. Anda perlu menetapkan env berikut. Anda dapat mengunjungi [dokumentasi pushplus](http://www.pushplus.plus/doc/guide/api.html#%E4%B8%80%E3%80%81%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3) untuk mendapatkan detail format parameter lebih lanjut.

- `PUSH_PLUS_KEY`： Token pengguna. Diperlukan untuk layanan ini.
- `PUSH_PLUS_TOPIC`：ID grup. Kirim ke diri sendiri jika kosong. Tidak berguna jika `PUSH_PLUS_CHANNEL` sama dengan `webhook`.
- `PUSH_PLUS_TEMPLATE`：Template pengiriman
- `PUSH_PLUS_CHANNEL`：Saluran pengiriman
- `PUSH_PLUS_WEBHOOK`：webhook diperlukan jika `PUSH_PLUS_CHANNEL` sama dengan `webhook` atau `cp`.
- `PUSH_PLUS_CALLBACKURL`：URL callback setelah respons pengiriman.
- `AUTHOR_EMAIL`: Email blogger digunakan untuk membedakan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.

## Notifikasi Discord

Kami menggunakan Discord Webhook untuk mengirim notifikasi Discord. Anda perlu menetapkan env berikut.

- `DISCORD_WEBHOOK`: URL Discord Webhook, [Cara membuat URL Discord Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)?
- `DISCORD_TEMPLATE`: Template pengiriman
- `AUTHOR_EMAIL`: Email blogger digunakan untuk membedakan apakah komentar yang diposting adalah dari blogger itu sendiri. Jika komentar diposting oleh blogger, tidak akan ada notifikasi pengingat.
- `SITE_NAME`: Nama situs Anda, akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda, akan ditampilkan dalam pesan notifikasi.

## Notifikasi Lark

Kami menggunakan Lark Webhook untuk mengirim notifikasi grup. Variabel env berikut diperlukan.

- `LARK_WEBHOOK`: [Penggunaan Webhook](https://open.larksuite.com/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=en-US) bot grup Lark
- `LARK_SECRET`: Seperti yang dijelaskan dalam dokumentasi Lark, secret ini digunakan untuk menandatangani permintaan Anda guna menghindari penyalahgunaan (Opsional).
- `LARK_TEMPLATE`: Template pesan
- `SITE_NAME`: Nama situs Anda yang akan ditampilkan dalam pesan notifikasi.
- `SITE_URL`: URL situs Anda yang akan ditampilkan dalam pesan notifikasi.

## Template Notifikasi

Waline mendukung konfigurasi template notifikasi yang dikustomisasi untuk setiap platform secara terpisah guna mencapai kemampuan kustomisasi yang lebih kuat dan kompatibilitas i18n.

### Variabel yang Didukung

Template meneruskan parameter melalui objek `self`, `parent`, dan `site`, yang masing-masing berisi variabel berikut:

- `self`: Komentar itu sendiri

  | variabel        | deskripsi                    |
  | --------------- | ---------------------------- |
  | nick            | Nama panggilan komentator    |
  | mail            | Email komentator             |
  | link            | Situs web komentator         |
  | url             | Alamat artikel               |
  | comment         | Konten komentar              |
  | browser         | Nama browser                 |
  | os              | Nama sistem operasi          |
  | avatar          | avatar                       |
  | _commentLink_\* | Tautan dalam komentar        |

  \*: commentLink hanya tersedia dalam notifikasi Telegram dan akan secara otomatis dikemas dalam format Markdown.

- `parent`: Komentar yang dibalas (komentar induk).

  | variabel | deskripsi                 |
  | -------- | ------------------------- |
  | nick     | Nama panggilan komentator |
  | mail     | Email komentator          |
  | link     | Situs web komentator      |
  | browser  | Nama browser              |
  | os       | Nama sistem operasi       |
  | avatar   | avatar                    |
  | comment  | Konten komentar           |

- `site`: Konfigurasi situs web

  | variabel | deskripsi                    |
  | -------- | ---------------------------- |
  | name     | Nama situs                   |
  | url      | URL situs                    |
  | postUrl  | Alamat lengkap komentar      |

### Template Default

Template default dilampirkan di sini sebagai referensi Anda:

- MAIL_SUBJECT:

  ```plain
  {{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复
  ```

- MAIL_TEMPLATE:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的评论有了新的回复
  </h2>
  {{parent.nick}} 同学，您曾发表评论：
  <div style="padding:0 12px 0 12px;margin-top:18px">
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{parent.comment | safe}}
    </div>
    <p><strong>{{self.nick}}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
      {{self.comment | safe}}
    </div>
    <p>
      您可以点击<a
        style="text-decoration:none; color:#12addb"
        href="{{site.postUrl}}"
        target="_blank"
        >查看回复的完整內容</a
      >，欢迎再次光临<a
        style="text-decoration:none; color:#12addb"
        href="{{site.url}}"
        target="_blank"
        >{{site.name}}</a
      >。
    </p>
    <br />
  </div>
</div>
```

- MAIL_SUBJECT_ADMIN:

  ```plain
  {{site.name | safe}} 上有新评论了
  ```

- MAIL_TEMPLATE_ADMIN:

```html
<div
  style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;"
>
  <h2
    style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;"
  >
    您在<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank"
      >{{site.name}}</a
    >上的文章有了新的评论
  </h2>
  <p><strong>{{self.nick}}</strong>回复说：</p>
  <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">
    {{self.comment | safe}}
  </div>
  <p>
    您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank"
      >查看回复的完整內容</a
    >
  </p>
  <br />
</div>
```

- QQ_TEMPLATE:

  ```plain
  💬 {{site.name|safe}} 有新评论啦
  {{self.nick}} 评论道:
  {{self.comment}}
  邮箱: {{self.mail}}
  状态: {{self.status}}
  仅供评论预览，查看完整內容:
  {{site.postUrl}}
  ```

- TG_TEMPLATE:

  ````md
  💬 _[{{site.name}}]({{site.url}}) 有新评论啦_

  _{{self.nick}}_ 回复说:

  ```
  {{self.comment-}}
  ```

  {{-self.commentLink}}
  _邮箱: _\`{{self.mail}}\`
  _审核: _{{self.status}}

  仅供评论预览，点击[查看完整內容]({{site.postUrl}})
  ````

### Informasi Tambahan

1. Ukuran variabel lingkungan Vercel dibatasi hingga `4KB`, jadi jika template Anda panjang, Anda harus mengkonfigurasinya di file entri utama. Lihat [issue#106](https://github.com/walinejs/waline/issues/106).
1. Informasi spesifik dari variabel mungkin berubah selama proses pengembangan. Deskripsi variabel di sini hanya untuk referensi. Silakan lihat contoh kode spesifik untuk konten yang tepat.
