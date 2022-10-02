---
title: Emoticons Search
icon: search
---

Waline allows users to add emoticons search services and customize this feature.

<!-- more -->

## Introduction

By default, Waline provides meme search service through [Giphy](https://giphy.com/). This will allow you to search for images and add to comments while commenting.

## disable

If you don't need the default images search service, you can disable it by setting the `search` option to `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## customize

You can customize the images search service through the search option.

For each action, you should return an array containing the image information as the search result.

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

The plugin doesn't care if there are extra attributes in the image result, but you should provide an alt text `title` whenever possible to help with accessibility and in case the image service fails. At the same time, in order to make the list load faster, if the image service returns image addresses of multiple sizes, you should choose a small size image as `preview` to improve the loading speed of the list image.

The three functions you need to pass in are as follows.

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
  more?: (word: string, currectCount: number) => Promise<WalineSearchResult>;
}
```

Since you need to implement at least the search logic, `search` is required. Waline will pass in the user search terms and expect this function to return a Promise containing the search results.

We hope that users can see some hot pictures or emoji results when they open it, so we provide the `default` function to achieve this. If your service provider provides an api for popular pictures or emoticons, you should use this api to return content. Also, since the default behavior of this function is to search for empty strings, if your search provider returns empty results in this case, we recommend that you add a brief implementation of random preset words to avoid showing an empty list.

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
        ['laugh', 'cry', 'smile'][(Math.random() * 3) | 0]
      ),
  },
});
```

Usually, your search service will support pagination, so we provide a `more` function to trigger when the user swipes to the bottom and load more images to let you return more results.

::: tip

For a better experience, we recommend setting the number of pagination to 20 - 40, that is, 20 - 40 images are loaded each time.

:::

::: info

Here is an example to help you understand the process. When the user clicks the search button, we will trigger `default()`, if this function is missing, we will trigger `search('')`, and we will wait for the Promise to execute and render with the returned result.

When the user searches for `smile`, we execute `search('smile')`. Suppose you return 20 results each time, when the user continues to scroll down, we will trigger `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

::: details Default implementation

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

export const getTenorV1SearchOptions = (
  key = 'PAY5JLFIH6V6'
): WalineSearchOptions => {
  const state = { next: '' };

  const fetchGif = ({
    keyword,
    pos,
  }: FetchGifRequest): Promise<FetchGifResponse> => {
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
      .then((resp) => resp.json() as Promise<FetchGifResponse>)
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
