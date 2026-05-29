---
title: Widget Peringkat Pengguna/Dinding Pengguna
icon: rank
---

Waline mendukung penampilan peringkat pengguna atau dinding pengguna melalui widget, yang berguna untuk menampilkan informasi komentator di sidebar blog.

<!-- more -->

## Opsi Komponen

Widget peringkat pengguna/dinding pengguna bernama `UserList` dan memiliki enam opsi:

- `el` (opsional): elemen yang akan dipasang
- `serverURL`: tautan server
- `count`: jumlah pengguna yang perlu diambil
- `mode`: `list` berarti peringkat pengguna, `wall` berarti dinding pengguna
- `lang`: dukungan i18n, lihat referensi lebih lanjut di [i18n](../i18n.md)
- `locale`: mengkustomisasi bahasa, lihat referensi lebih lanjut di [i18n](../i18n.md)

Format data yang dikembalikan oleh komponen harus berupa `Promise<{ users: WalineUser[], destroy: () => void }>`.

- Properti `users`: array dari daftar pengguna dengan jumlah tepat sesuai `count`
- Metode `destroy`: fungsi yang akan menghancurkan widget

## Penggunaan Dasar

### Peringkat Pengguna

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 10,
  });
</script>
```

### Dinding Pengguna

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({
    el: '#waline-users',
    serverURL: 'http://waline.vercel.app',
    count: 50,
    mode: 'wall',
  });
</script>
```

## Penggunaan Lanjutan

Jika Anda tidak puas dengan format output default, Anda dapat memanggil komponen dengan menghilangkan opsi `el` untuk mendapatkan data dan merendernya sendiri.

Contoh:

```html
<div id="waline-users"></div>
<script type="module">
  import { UserList } from 'https://cdn.jsdelivr.net/npm/@waline/client/dist/waline.mjs';

  UserList({ serverURL: 'http://waline.vercel.app', count: 10 }).then(({ users }) => {
    document.getElementById('waline-users').innerHTML = users.map(
      (user) => `<a href="${user.link}">${user.nick}</a>`,
    );
  });
</script>
```
