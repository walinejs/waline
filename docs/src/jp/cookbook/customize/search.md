---
title: 絵文字検索のカスタマイズ
icon: search
---

このチュートリアルでは、`@waline/client` が提供する `search` オプションを使って絵文字検索サービスをカスタマイズする方法を説明します。

<!-- more -->

## 検索結果の変換

異なるサードパーティの画像検索サービスを使用すると、異なる結果が得られる場合があります。検索結果を取得した後、`@waline/client` が要求する形式に変換する必要があります。

以下のすべての操作において、`@waline/client` は次の形式の画像情報の配列を返すことを要求します：

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

配列の各オブジェクトには、画像のアドレスを示す `src` 属性が少なくとも含まれていることを確認する必要があります。

また、可能な限り、アクセシビリティと画像サービスの障害に備えて、alt テキスト `title` を提供するべきです。

リストの読み込みを高速化するために、画像サービスが複数のサイズの画像 URL を返せる場合は、リスト画像の読み込み速度を向上させるために小さいサイズの画像を `preview` として選択するべきです。

::: note

`@waline/client` は画像の結果に余分なプロパティがあっても気にしないため、返された結果から他のキーを意図的に削除する必要はありません。

:::

## 検索オプション

`@waline/client` は検索動作を制御するために 3 つのサブオプションを提供しています：

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

少なくとも検索ロジックを実装する必要があるため、`search` は必須です。`@waline/client` はユーザーの検索ワードを渡してこのオプション関数を呼び出し、この関数が検索結果を完了させる Promise を返すのを待ちます。

ユーザーが開いたときにいくつかの人気画像や絵文字の結果を見られるようにするために、この動作を実装する `default` 関数を提供しています。サービスプロバイダーが人気の画像や絵文字のインターフェースを提供している場合は、そのインターフェースを使用してコンテンツを返すべきです。また、この関数のデフォルトの動作は空の文字列を検索することであるため、検索プロバイダーがこの状況で空の結果を返す場合は、空のリストが表示されないようにランダムなプリセットワードの簡単な実装を追加することをお勧めします。

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

通常、検索サービスはページネーションをサポートしているため、ユーザーが一番下までスクロールしたときにトリガーし、より多くの結果を返せるように `more` 関数を提供しています。より良いユーザー体験のために、ページネーションの件数を 20〜40 件、つまり 1 回に 20〜40 件の画像を読み込むように設定することをお勧めします。

::: tip 理解を助ける例

ユーザーが検索ボタンをクリックすると、`default()` をトリガーします。この関数がない場合は `search('')` をトリガーし、Promise の実行を待って返された結果でレンダリングします。

ユーザーが `smile` を検索すると、`search('smile')` を実行します。毎回 20 件の結果を返すと仮定した場合、ユーザーが下にスクロールし続けると、`more('smile', 20)`、`more('smile', 40)`、`more('smile', 60)` ... がトリガーされます。

:::

## 使用例

::: details デフォルトの実装

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
