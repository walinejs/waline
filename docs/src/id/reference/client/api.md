---
title: API Klien
icon: config
---

## API Klien

Waline menyediakan tiga API:

- `init`: Menginisialisasi Waline

- `commentCount`: Menghitung komentar

- `pageviewCount`: Menghitung pageview

Serta:

- `RecentComment`: Widget komentar terbaru Waline

- `UserList`: Daftar Pengguna

- `version`: Versi klien Waline

## init

API `init` menerima opsi `WalineInitOptions` dan mengembalikan `WalineInstance`.

Tipe:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Kembalian:

```ts
interface WalineInstance {
  /**
   * Element tempat Waline dipasang
   *
   * @description ketika diinisialisasi dengan `el: null`, nilainya akan menjadi `null`
   */
  el: HTMLElement | null;

  /**
   * Memperbarui instance Waline
   *
   * @description ketika tidak mengatur opsi `path`, akan direset ke `window.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * Melepas dan menghancurkan instance Waline
   */
  destroy: () => void;
}
```

Opsi inisialisasi menerima semua [Props Komponen Waline](props.md), selain itu opsi berikut ditambahkan.

### el

- Tipe: `string | HTMLElement | null`
- Bawaan: `'#waline'`

Elemen DOM yang akan dipasang saat inisialisasi. Harus berupa **string selektor CSS** yang valid atau objek HTMLElement.

Jika Anda hanya menginginkan counter di bawah, atur opsi ini ke `null`.

### comment

- Tipe: `boolean | string`
- Bawaan: `false`

Penghitung jumlah komentar artikel; ketika diisi dengan string, nilai tersebut akan digunakan sebagai selektor CSS.

### pageview

- Tipe: `boolean | string`
- Bawaan: `false`

Penghitung pageview. Ketika diisi dengan string, nilai tersebut akan digunakan sebagai selektor CSS.

## commentCount

Fungsi `commentCount` menerima opsi `WalineCommentCountOptions`, memperbarui jumlah komentar artikel di halaman, dan mengembalikan fungsi `WalineAbort` yang dapat membatalkan operasi saat ini.

Tipe:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Opsi:

```ts
interface WalineCommentCountOptions {
  /**
   * URL server Waline
   */
  serverURL: string;

  /**
   * Selektor CSS jumlah komentar
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * Path yang akan diambil secara default
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

Kembalian:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

Fungsi `pageviewCount` menerima opsi `WalinePageviewCountOptions`, memperbarui jumlah komentar artikel di halaman, dan mengembalikan fungsi `WalineAbort` yang dapat membatalkan operasi saat ini.

Tipe:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Opsi:

```ts
interface WalinePageviewCountOptions {
  /**
   * URL server Waline
   */
  serverURL: string;

  /**
   * Selektor CSS pageview
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * Path yang akan diambil dan diperbarui
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * Apakah memperbarui pageview saat mengambil hasil path
   *
   * @default true
   */
  update?: boolean;
}
```

Kembalian:

```ts
type WalineAbort = (reason?: any) => void;
```

## Widget

### RecentComments

`RecentComments` adalah widget yang menampilkan komentar terbaru.

Tipe:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opsi:

```ts
interface WalineRecentCommentsOptions {
  /**
   * serverURL Waline
   */
  serverURL: string;

  /**
   * jumlah komentar terbaru yang diambil
   */
  count: number;

  /**
   * Elemen yang akan dipasang
   */
  el?: string | HTMLElement;
}
```

Kembalian:

```ts
interface WalineRecentCommentsResult {
  /**
   * Data Komentar
   */
  comments: WalineComment[];

  /**
   * Melepas widget
   */
  destroy: () => void;
}
```

### UserList

`UserList` adalah widget yang menampilkan papan peringkat interaksi pengguna atau dinding komentar.

Tipe:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opsi:

```ts
interface WalineUserListOptions {
  /**
   * serverURL Waline
   */
  serverURL: string;

  /**
   * jumlah daftar pengguna yang diambil
   */
  count: number;

  /**
   * Elemen yang akan dipasang
   */
  el?: string | HTMLElement;

  /**
   * Bahasa pesan error
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * Bahasa tampilan kustom di waline
   *
   * @see [I18n](https://waline.js.org/id/client/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * mode daftar atau mode dinding avatar
   */
  mode: 'list' | 'wall';
}
```

Kembalian:

```ts
interface WalineUserListResult {
  /**
   * Data Pengguna
   */
  users: WalineUser[];

  /**
   * Melepas widget
   */
  destroy: () => void;
}
```
