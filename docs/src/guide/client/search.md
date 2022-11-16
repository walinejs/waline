---
title: 表情包搜索
icon: search
---

Waline 允许用户添加表情包搜索服务并自定义此功能。

<!-- more -->

## 简介

在默认情况下，Waline 通过 [Giphy](https://giphy.com/) 提供表情包搜索服务。这将允许你在评论时搜索表情包并添加到评论中。

## 禁用

如果你不需要默认的表情包搜索服务，你可以将 `search` 选项设置为 `false` 来禁用它。

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## 自定义

你可以通过 search 选项自定义表情包搜索服务。

对于每项操作，你应该返回一个包含了图片信息的数组作为搜索结果。

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * 图片链接
   */
  src: string;

  /**
   * 图片标题
   *
   * @description 用于图片的 alt 属性
   */
  title?: string;

  /**
   * 图片缩略图
   *
   * @description 为了更好的加载性能，我们会优先在列表中使用此缩略图
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];
```

插件并不在意图像结果中是否有额外属性，但是你应当尽可能提供一个替代文字 `title` 以便于帮助无障碍访问以及应对图片服务失效的情况。同时为了让列表加载更快，如果图片服务返回多个尺寸的图片地址，你应该选用一个小尺寸的图片作为 `preview` 以提升列表图片加载速度。

你需要传入的三个函数如下。

```ts
interface WalineSearchOptions {
  /**
   * 搜索操作
   */
  search: (word: string) => Promise<WalineSearchResult>;

  /**
   * 打开列表时展示的默认结果
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>;

  /**
   * 获取更多的操作
   *
   * @description 会在列表滚动到底部时触发，如果你的搜索服务支持分页功能，你应该设置此项实现无限滚动
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}
```

由于你需要至少实现搜索逻辑，`search` 是必填的。Waline 将会将用户搜索字词传入，并期待此函数返回一个包含搜索结果的 Promise。

我们希望用户打开的时候能够看到一些热门的图片或表情包结果，因此我们提供了 `default` 函数来实现。如果你的服务商提供一个热门图片或表情包的接口，你应该利用此接口返回内容。此外，由于此函数缺省的默认行为是搜索空字符串，如果你的搜索服务商会在此情形返回空结果，那我们建议你添加一个随机预设字词简要实现来避免展示一个空列表。

```js
const search = (word) => {
  // ...
  // 返回结果
};

Waline.init({
  el: '#waline',
  // ...
  search: {
    search,
    default: () =>
      search(
        // 在三个单词之间随机
        ['开心', '失落', '赞同'][(Math.random() * 3) | 0]
      ),
  },
});
```

通常情况下，你的搜索服务商会支持分页服务，所以我们提供一个 `more` 函数来在用户滑动到底部时触发并加载更多图片来让你返回更多结果。

::: tip

为了更好的体验，我们推荐将分页数设置为 20 - 40，即每次加载 20 - 40 张图片。

:::

::: info

举一个例子来帮助你理解这个过程。当用户点击表情包搜索按钮时，我们会触发 `default()`，如果此函数缺失，我们会触发 `search('')`，同时我们将等待 Promise 执行并使用返回结果渲染。

当用户搜索 `微笑`，我们会执行 `search('微笑')`。假定你每次返回 20 个结果，用户持续向下滚动时，我们会依次触发 `more('微笑', 20)`、`more('微笑', 40)`、`more('微笑', 60)` ...

:::

::: details 默认实现

@[code{33-79}](../../../../packages/client/src/config/default.ts)

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
