---
title: Tùy chỉnh tìm kiếm emoji
icon: search
---

Hướng dẫn này chỉ cho bạn cách tùy chỉnh dịch vụ tìm kiếm emoji thông qua tùy chọn `search` do `@waline/client` cung cấp.

<!-- more -->

## Chuyển đổi kết quả tìm kiếm

Bạn có thể nhận được kết quả khác nhau khi dùng các dịch vụ tìm kiếm hình ảnh bên thứ ba khác nhau. Sau khi có kết quả tìm kiếm, bạn cần chuyển nó sang định dạng mà `@waline/client` yêu cầu.

Với bất kỳ thao tác nào dưới đây, `@waline/client` đều yêu cầu bạn trả về một mảng thông tin hình ảnh theo định dạng sau:

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

Bạn cần đảm bảo mỗi đối tượng trong mảng chứa ít nhất thuộc tính `src` để chỉ ra địa chỉ của hình ảnh.

Ngoài ra, nếu có thể, bạn nên cung cấp văn bản thay thế `title` để hỗ trợ khả năng truy cập và phòng khi dịch vụ hình ảnh gặp sự cố.

Để danh sách tải nhanh hơn, miễn là dịch vụ hình ảnh có thể trả về URL hình ảnh với nhiều kích thước, bạn nên chọn hình ảnh kích thước nhỏ làm `preview` để cải thiện tốc độ tải hình ảnh trong danh sách.

::: note

`@waline/client` không quan tâm kết quả hình ảnh có thuộc tính thừa hay không, nên bạn không cần cố ý loại bỏ các khóa khác khỏi kết quả trả về.

:::

## Tùy chọn tìm kiếm

`@waline/client` cung cấp ba tùy chọn con để điều khiển hành vi tìm kiếm:

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

Vì bạn cần triển khai ít nhất logic tìm kiếm, `search` là bắt buộc. `@waline/client` sẽ truyền từ khóa tìm kiếm của người dùng vào và gọi hàm tùy chọn này, rồi chờ hàm trả về Promise để hoàn tất kết quả tìm kiếm.

Chúng tôi muốn người dùng thấy một số hình ảnh hoặc emoji phổ biến khi mở, nên đã cung cấp hàm `default` để thực hiện hành vi này. Nếu nhà cung cấp dịch vụ của bạn có giao diện cho hình ảnh hoặc biểu tượng cảm xúc phổ biến, bạn nên dùng giao diện đó để trả về nội dung. Đồng thời, vì hành vi mặc định của hàm này là tìm kiếm chuỗi rỗng, nếu nhà cung cấp tìm kiếm của bạn trả về kết quả rỗng trong trường hợp này, chúng tôi khuyến nghị bạn thêm một cách triển khai ngắn gọn với các từ đặt sẵn ngẫu nhiên để tránh hiển thị danh sách trống.

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

Thông thường, dịch vụ tìm kiếm của bạn sẽ hỗ trợ phân trang, nên chúng tôi cung cấp hàm `more` để kích hoạt khi người dùng cuộn xuống cuối và tải thêm hình ảnh, cho phép bạn trả về thêm kết quả. Để có trải nghiệm tốt hơn, chúng tôi khuyến nghị đặt số lượng phân trang là 20 - 40, tức là mỗi lần tải 20 - 40 hình ảnh.

::: tip Một ví dụ giúp dễ hiểu

Khi người dùng nhấn nút tìm kiếm, chúng tôi sẽ kích hoạt `default()`; nếu thiếu hàm này, chúng tôi sẽ kích hoạt `search('')`, rồi chờ Promise thực thi và hiển thị bằng kết quả trả về.

Khi người dùng tìm kiếm `smile`, chúng tôi thực thi `search('smile')`. Giả sử mỗi lần bạn trả về 20 kết quả, khi người dùng tiếp tục cuộn xuống, chúng tôi sẽ kích hoạt `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

## Ví dụ

::: details Cách triển khai mặc định

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
