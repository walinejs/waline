---
title: 이모티콘 검색 사용자 정의
icon: search
---

이 튜토리얼에서는 `@waline/client`에서 제공하는 `search` 옵션을 통해 이모지 검색 서비스를 사용자 정의하는 방법을 안내합니다.

<!-- more -->

## 검색 결과 변환

서로 다른 타사 이미지 검색 서비스를 사용하면 다른 결과를 얻을 수 있습니다. 검색 결과를 가져온 후, `@waline/client`에서 요구하는 형식으로 변환해야 합니다.

다음 작업을 수행하려면 `@waline/client`에서 다음 형식의 이미지 정보 배열을 반환해야 합니다:

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

배열의 각 객체에 최소한 `src` 속성이 포함되어 이미지 주소를 나타내야 합니다.

또한 가능한 경우 접근성 향상 및 이미지 서비스 장애 시를 대비하여 alt 텍스트 `title`을 제공해야 합니다.

목록 로딩 속도를 높이기 위해, 이미지 서비스에서 여러 크기의 이미지 URL을 반환할 수 있다면 작은 크기의 이미지를 `preview`로 선택하여 목록 이미지 로딩 속도를 개선해야 합니다.

::: note

`@waline/client`는 이미지 결과에 추가 속성이 있는지 신경 쓰지 않으므로, 반환된 결과에서 다른 키를 일부러 제거할 필요가 없습니다.

:::

## 검색 옵션

`@waline/client`는 검색 동작을 제어하기 위한 세 가지 하위 옵션을 제공합니다:

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

최소한 검색 로직을 구현해야 하므로 `search`는 필수입니다. `@waline/client`는 사용자 검색어를 전달하고 이 옵션 함수를 호출하며, 이 함수가 Promise를 반환하여 검색 결과를 완성할 때까지 기다립니다.

사용자가 목록을 열 때 인기 이미지나 이모지 결과를 볼 수 있도록 `default` 함수를 제공합니다. 서비스 제공업체에서 인기 이미지나 이모티콘 인터페이스를 제공하는 경우, 이 인터페이스를 사용하여 콘텐츠를 반환해야 합니다. 또한 이 함수의 기본 동작은 빈 문자열을 검색하는 것이므로, 검색 제공업체에서 이 경우 빈 결과를 반환한다면 빈 목록이 표시되는 것을 방지하기 위해 랜덤 프리셋 단어의 간단한 구현을 추가하는 것이 좋습니다.

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

일반적으로 검색 서비스는 페이지네이션을 지원하므로, 사용자가 하단으로 스크롤할 때 더 많은 이미지를 로드하여 더 많은 결과를 반환할 수 있는 `more` 함수를 제공합니다. 더 나은 경험을 위해 페이지네이션 수를 20 - 40으로 설정하는 것을 권장합니다. 즉, 매번 20 - 40개의 이미지가 로드됩니다.

::: tip 이해를 돕기 위한 예시

사용자가 검색 버튼을 클릭하면 `default()`를 트리거합니다. 이 함수가 없으면 `search('')`를 트리거하고, Promise가 실행될 때까지 기다린 후 반환된 결과로 렌더링합니다.

사용자가 `smile`을 검색하면 `search('smile')`을 실행합니다. 매번 20개의 결과를 반환한다고 가정하면, 사용자가 계속 아래로 스크롤하면 `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60)` ... 을 트리거합니다.

:::

## 예시

::: details 기본 구현

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
