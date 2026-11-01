---
title: 絵文字検索をカスタマイズする
icon: search
---

このチュートリアルでは、`@waline/client` が提供する `search` オプションを使って絵文字検索サービスをカスタマイズする方法を説明します。

<!-- more -->

## 検索結果の変換

使用するサードパーティの画像検索サービスによって、得られる結果は異なります。検索結果を取得したら、`@waline/client` が要求する形式に変換する必要があります。

以下のいずれの操作でも、`@waline/client` は次の形式の画像情報の配列を返すことを求めます。

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /** Image link */
  src: string;

  /**
   * Image title
   *
   * Used for alt attribute of image
   */
  title?: string;

  /**
   * Image preview link
   *
   * For better loading performance, we will use this thumbnail first in the list
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];
```

配列の各オブジェクトには、画像のアドレスを示す `src` 属性が少なくとも含まれている必要があります。

また、可能であれば代替テキスト `title` を指定し、アクセシビリティの向上と画像サービスの障害に備えてください。

リストの読み込みを速くするため、画像サービスが複数サイズの画像 URL を返せる場合は、小さいサイズの画像を `preview` に指定してリスト画像の読み込み速度を向上させてください。

::: note

`@waline/client` は画像の結果に余分なプロパティがあっても気にしないため、返却結果から他のキーをわざわざ削除する必要はありません。

:::

## 検索オプション

`@waline/client` は検索動作を制御する 3 つのサブオプションを提供しています。

```ts
interface WalineSearchOptions {
  /** Search action */
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
   * It will be triggered when the list scrolls to the bottom. If your search service supports
   * paging, you should set this to achieve infinite scrolling
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}
```

検索ロジックは少なくとも実装する必要があるため、`search` は必須です。`@waline/client` はユーザーの検索語を渡してこのオプション関数を呼び出し、この関数が Promise を返すのを待って検索結果を取得します。

ユーザーが開いたときに人気の画像や絵文字の結果をいくつか目にできるように、私たちは `default` 関数を提供してこの動作を実現しています。サービス提供元が人気の画像や絵文字のインターフェースを提供している場合は、そのインターフェースを使って内容を返してください。また、この関数のデフォルトの動作は空文字列の検索であるため、その場合に検索プロバイダーが空の結果を返す場合は、空のリストが表示されないよう、ランダムなプリセット語を返す簡単な実装を追加することをおすすめします。

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

通常、検索サービスはページネーションをサポートしているため、ユーザーが一番下までスクロールしたときに追加の画像を読み込めるよう `more` 関数を提供しています。より良い体験のために、ページネーションの件数は 20〜40 に設定することをおすすめします。つまり、1 回に 20〜40 枚の画像を読み込みます。

::: tip 理解のための例

ユーザーが検索ボタンをクリックすると `default()` を呼び出します。この関数がない場合は `search('')` を呼び出し、Promise の実行が完了するのを待って返された結果でレンダリングします。

ユーザーが `smile` を検索すると `search('smile')` を実行します。毎回 20 件の結果を返すとすると、ユーザーがさらに下へスクロールすると `more('smile', 20)`、`more('smile', 40)`、`more('smile', 60 )` ... が呼び出されます。

:::

## 例

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
