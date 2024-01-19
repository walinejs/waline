---
title: Customize Emoticons Search
icon: search
---

This tutorial guides you on how to customize the emoji search service via the `search` option provided by `@waline/client`.

<!-- more -->

## search result conversion

You may get different results when using different third-party image search services. After getting the search result, you need to convert it to the format required by `@waline/client`.

For any of the following operations, `@waline/client` requires you to return an array of image information in the following format:

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

You need to ensure that each object of the array contains at least the `src` attribute to indicate the address of the image.

Also, where possible, you should provide an alt text `title` to help with accessibility and in case of image service failures.

In order to make the list load faster, as long as the image service can return multiple sizes of image URLs, you should choose a small size image as `preview` to improve the loading speed of the list image.

::: note

`@waline/client` doesn't care if there are extra properties in the image result, so you don't need to deliberately remove other keys from the returned result.

:::

## Search Option

`@waline/client` provides three sub-options to control search behavior:

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

Since you need to implement at least the search logic, `search` is required. `@waline/client` will pass in the user search term and call this option function, and wait for this function to return a Promise to complete the search result.

We want users to see some hot images or emoji results when they open it, so we provide the `default` function to implement this behavior. If your service provider provides an interface for popular pictures or emoticons, you should use this interface to return content. Also, since the default behavior of this function is to search for empty strings, if your search provider returns empty results in this situation, we recommend that you add a brief implementation of random preset words to avoid showing an empty list.

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

Usually, your search service will support pagination, so we provide a `more` function to trigger when the user swipes to the bottom and load more images to let you return more results. For a better experience, we recommend setting the number of pagination to 20 - 40, that is, 20 - 40 images are loaded each time.

::: tip An example to help understand

When the user clicks the search button, we will trigger `default()`, if this function is missing, we will trigger `search('')`, and we will wait for the Promise to execute and render with the returned result.

When the user searches for `smile`, we execute `search('smile')`. Suppose you return 20 results each time, when the user continues to scroll down, we will trigger `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

## Examples

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
  key = 'PAY5JLFIH6V6',
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
