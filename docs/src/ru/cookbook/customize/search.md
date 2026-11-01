---
title: Настройка поиска эмодзи
icon: search
---

Это руководство рассказывает, как настроить сервис поиска эмодзи с помощью параметра `search`, предоставляемого `@waline/client`.

<!-- more -->

## Преобразование результатов поиска

Разные сторонние сервисы поиска изображений возвращают результаты в разном виде. Получив результат поиска, его нужно преобразовать в формат, который ожидает `@waline/client`.

Во всех описанных ниже случаях `@waline/client` ожидает массив с информацией об изображениях следующего формата:

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

Каждый объект массива должен содержать как минимум свойство `src` с адресом изображения.

Кроме того, по возможности следует указывать альтернативный текст `title` — это помогает с доступностью и при сбоях сервиса изображений.

Чтобы список загружался быстрее, при наличии у сервиса изображений ссылок на разные размеры следует выбрать небольшое изображение в качестве `preview` — так изображения в списке будут загружаться быстрее.

::: note

`@waline/client` не обращает внимания на дополнительные свойства в результате изображения, поэтому специально удалять из него другие ключи не нужно.

:::

## Параметр поиска

`@waline/client` предоставляет три подпараметра для управления поиском:

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

Поскольку логику поиска нужно реализовать в любом случае, параметр `search` обязателен. `@waline/client` передаёт в эту функцию поисковый запрос пользователя и ждёт, пока она вернёт Promise с результатом поиска.

Хочется, чтобы при открытии списка пользователь сразу видел популярные изображения или эмодзи, поэтому предусмотрена функция `default`. Если ваш сервис предоставляет интерфейс для популярных изображений или эмодзи, используйте его для возврата содержимого. Кроме того, по умолчанию эта функция выполняет поиск по пустой строке: если сервис в такой ситуации возвращает пустой результат, рекомендуется добавить несложную реализацию со случайным набором слов, чтобы не показывать пустой список.

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

Обычно сервис поиска поддерживает пагинацию, поэтому предусмотрена функция `more`, которая вызывается, когда пользователь прокручивает список до конца, и загружает больше изображений. Для удобства рекомендуется задавать размер страницы 20–40, то есть загружать по 20–40 изображений за раз.

::: tip Пример для наглядности

Когда пользователь нажимает кнопку поиска, вызывается `default()`; если эта функция не задана, вызывается `search('')`, после чего результат Promise дожидается выполнения и отрисовывается.

Когда пользователь ищет `smile`, выполняется `search('smile')`. Предположим, каждый раз возвращается по 20 результатов: при дальнейшей прокрутке вызываются `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

## Примеры

::: details Реализация по умолчанию

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
