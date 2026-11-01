---
title: 自訂表情符號包搜尋
icon: search
---

本教學指引你如何透過 `@waline/client` 提供的 `search` 選項自訂設定表情符號包搜尋服務。

<!-- more -->

## 搜尋結果轉換

你在使用不同的第三方圖片搜尋服務時，可能會得到不同的結果。在取得搜尋結果後，你需要將其轉換為 `@waline/client` 所需要的格式。

對於下文的任何操作，`@waline/client` 都要求你回傳如下格式的圖片資訊陣列:

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /** 圖片連結 */
  src: string;

  /**
   * 圖片標題
   *
   * 用於圖片的 alt 屬性
   */
  title?: string;

  /**
   * 圖片縮圖
   *
   * 為了更好的載入效能，我們會優先於列表中使用此縮圖
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];
```

你需要保證陣列的每個物件至少含有 `src` 屬性來標明圖片的位址。

並且，你應當盡可能提供一個替代文字 `title`，以便協助無障礙存取以及應對圖片服務失效的情況。

為了讓列表載入更快，只要圖片服務可以回傳多種尺寸的圖片位址，你就應該選用一張小尺寸的圖片作為 `preview`，以提升列表圖片的載入速度。

::: note

`@waline/client` 並不在意圖片結果中是否有額外屬性，所以你無需刻意移除回傳結果中的其他鍵值。

:::

## 搜尋設定

`@waline/client` 提供三個子選項來控制搜尋行為:

```ts
interface WalineSearchOptions {
  /** 搜尋操作 */
  search: (word: string) => Promise<WalineSearchResult>;

  /**
   * 開啟列表時展示的預設結果
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>;

  /**
   * 取得更多結果的操作
   *
   * 會在列表捲動到底部時觸發，如果你的搜尋服務支援分頁功能，你應該設定此項來實現無限捲動
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}
```

由於你至少需要實現搜尋邏輯，`search` 是必填的。`@waline/client` 會將使用者的搜尋關鍵字傳入並呼叫此選項函式，並等待此函式回傳 Promise 完成後取得搜尋結果。

我們希望使用者開啟時能夠看到一些熱門的圖片或表情符號包結果，因此我們提供了 `default` 函式來實現這一行為。如果你的服務商提供熱門圖片或表情符號包的介面，你應該利用此介面回傳內容。此外，由於此函式預設的行為是搜尋空字串，如果你的搜尋服務商在此情形下會回傳空結果，那我們建議你加入一個隨機預設字詞的簡要實作，以避免展示一個空列表。

```js
const search = (word) => {
  // ...
  // 回傳結果
};

Waline.init({
  el: '#waline',
  // ...
  search: {
    search,
    default: () =>
      search(
        // 在三個詞之間隨機
        ['開心', '失落', '贊同'][(Math.random() * 3) | 0],
      ),
  },
});
```

通常情況下，你的搜尋服務商會支援分頁服務，所以我們提供一個 `more` 函式，在使用者捲動到底部時觸發並載入更多圖片，讓你回傳更多結果。為了更好的體驗，我們推薦將分頁數量設定為 20 - 40，也就是每次載入 20 - 40 張圖片。

::: tip 一個幫助理解的範例

當使用者點擊表情符號包搜尋按鈕時，我們會觸發 `default()`，如果此函式缺失，我們會觸發 `search('')`，同時我們會等待 Promise 執行並使用回傳結果進行渲染，這樣使用者就可以看到結果。

當使用者搜尋 `微笑`，我們會執行 `search('微笑')`。假定你每次回傳 20 個結果，使用者持續向下捲動時，我們會依次觸發 `more('微笑', 20)`、`more('微笑', 40)`、`more('微笑', 60)` ...

:::

## 案例

::: details 預設實作

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
