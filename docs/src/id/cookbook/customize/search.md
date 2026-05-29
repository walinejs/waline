---
title: Kustomisasi Pencarian Emotikon
icon: search
---

Tutorial ini memandu Anda cara mengkustomisasi layanan pencarian emoji melalui opsi `search` yang disediakan oleh `@waline/client`.

<!-- more -->

## Konversi hasil pencarian

Anda mungkin mendapatkan hasil yang berbeda saat menggunakan layanan pencarian gambar pihak ketiga yang berbeda. Setelah mendapatkan hasil pencarian, Anda perlu mengonversinya ke format yang diperlukan oleh `@waline/client`.

Untuk semua operasi berikut, `@waline/client` mengharuskan Anda mengembalikan array informasi gambar dalam format berikut:

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * Image link
   */
  src: string;

  /**
   * Image title
   *
   * @description Used for alt attribute of image
   */
  title?: string;

  /**
   * Image preview link
   *
   * @description For better loading performance, we will use this thumbnail first in the list
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];
```

Anda perlu memastikan bahwa setiap objek dalam array setidaknya mengandung atribut `src` untuk menunjukkan alamat gambar.

Selain itu, jika memungkinkan, Anda harus menyediakan teks alt `title` untuk membantu aksesibilitas dan jika layanan gambar gagal.

Untuk membuat daftar memuat lebih cepat, selama layanan gambar dapat mengembalikan beberapa ukuran URL gambar, Anda harus memilih gambar berukuran kecil sebagai `preview` untuk meningkatkan kecepatan loading gambar dalam daftar.

::: note

`@waline/client` tidak peduli apakah ada properti tambahan dalam hasil gambar, jadi Anda tidak perlu sengaja menghapus kunci lain dari hasil yang dikembalikan.

:::

## Opsi Search

`@waline/client` menyediakan tiga sub-opsi untuk mengontrol perilaku pencarian:

```ts
interface WalineSearchOptions {
  /**
   * Search action
   */
  search: (word: string) => Promise<WalineSearchResult>;

  /**
   * Default result when opening list
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>;

  /**
   * Fetch more action
   *
   * @description It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}
```

Karena Anda perlu mengimplementasikan setidaknya logika pencarian, `search` wajib diisi. `@waline/client` akan meneruskan istilah pencarian pengguna dan memanggil fungsi opsi ini, lalu menunggu fungsi ini mengembalikan Promise untuk menyelesaikan hasil pencarian.

Kami ingin pengguna melihat beberapa gambar atau hasil emoji populer saat membuka pencarian, sehingga kami menyediakan fungsi `default` untuk mengimplementasikan perilaku ini. Jika penyedia layanan Anda menyediakan antarmuka untuk gambar atau emotikon populer, Anda harus menggunakan antarmuka ini untuk mengembalikan konten. Selain itu, karena perilaku default fungsi ini adalah mencari string kosong, jika penyedia pencarian Anda mengembalikan hasil kosong dalam situasi ini, kami menyarankan Anda menambahkan implementasi singkat kata preset acak untuk menghindari tampilan daftar kosong.

```js
const search = (word) => {
  // ...
  // returning result
};

Waline.init({
  el: '#waline',
  // ...
  search: {
    search,
    default: () =>
      search(
        // random between 3 words
        ['laugh', 'cry', 'smile'][(Math.random() * 3) | 0],
      ),
  },
});
```

Biasanya, layanan pencarian Anda akan mendukung pagination, sehingga kami menyediakan fungsi `more` untuk dipicu saat pengguna menggulir ke bawah dan memuat lebih banyak gambar agar Anda dapat mengembalikan lebih banyak hasil. Untuk pengalaman yang lebih baik, kami merekomendasikan mengatur jumlah pagination ke 20 - 40, yaitu 20 - 40 gambar dimuat setiap kali.

::: tip Contoh untuk membantu pemahaman

Ketika pengguna mengklik tombol pencarian, kami akan memicu `default()`, jika fungsi ini tidak ada, kami akan memicu `search('')`, dan kami akan menunggu Promise dieksekusi dan merender dengan hasil yang dikembalikan.

Ketika pengguna mencari `smile`, kami mengeksekusi `search('smile')`. Misalkan Anda mengembalikan 20 hasil setiap kali, ketika pengguna terus menggulir ke bawah, kami akan memicu `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60)` ...

:::

## Contoh

::: details Implementasi default

@[code{33-79}](../../../../../packages/client/src/config/default.ts)

:::

::: details Tenor V1

```ts
interface FetchGifRequest {
  keyword: string;
  pos?: string;
}

type GifFormat =
  | 'gif'
  | 'mediumgif'
  | 'tinygif'
  | 'nanogif'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm';

interface MediaObject {
  preview: string;
  url: string;
  dims: number[];
  size: number;
}

interface GifObject {
  created: number;
  hasaudio: boolean;
  id: string;
  media: Record<GifFormat, MediaObject>[];
  tags: string[];
  title: string;
  itemurl: string;
  hascaption: boolean;
  url: string;
}

interface FetchGifResponse {
  next: string;
  results: GifObject[];
}

export const getTenorV1SearchOptions = (key = 'PAY5JLFIH6V6'): WalineSearchOptions => {
  const state = { next: '' };

  const fetchGif = ({ keyword, pos }: FetchGifRequest): Promise<FetchGifResponse> => {
    const baseUrl = `https://g.tenor.com/v1/search`;
    const query = new URLSearchParams('media_filter=minimal');

    query.set('key', key);
    query.set('limit', '20');
    query.set('pos', pos || '');
    query.set('q', keyword);

    return fetch(`${baseUrl}?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => <Promise<FetchGifResponse>>resp.json())
      .catch(() => ({ next: pos || '', results: [] }));
  };

  return {
    search: (word = '') =>
      fetchGif({ keyword: word }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
    more: (word) =>
      fetchGif({ keyword: word, pos: state.next }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
  };
};
```

:::
