---
title: Props của component
icon: config
---

## serverURL

- Kiểu: `string`
- Bắt buộc: Có

URL địa chỉ máy chủ Waline

## path

- Kiểu: `string`
- Mặc định: `window.location.pathname`

ID đường dẫn của bài viết. Dùng để phân biệt các _trang bài viết_ khác nhau, đảm bảo tải đúng danh sách bình luận của _trang bài viết_ đó.

::: warning

Vui lòng đảm bảo tính duy nhất của đường dẫn cho mỗi _trang bài viết_, nếu không có thể tải nhầm cùng một danh sách bình luận.

- Ví dụ 1: Nếu trên trang web của bạn `/example/path/` và `/example/path` là cùng một trang, bạn nên đặt `window.location.pathname.replace(/\/$/,'')`.
- Ví dụ 2: Nếu bạn lưu tài liệu tiếng Anh ở thư mục gốc, còn tài liệu các ngôn ngữ khác tại `/zh/`, `/ja/`, v.v., bạn nên đặt `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Kiểu: `string`
- Mặc định: `navigator.language`
- Chi tiết:
  - [Hướng dẫn → I18n](../../guide/features/i18n.md#đat-ngon-ngu)

Ngôn ngữ hiển thị.

Giá trị tùy chọn:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'de'`
- `'es'`
- `'es-MX'`
- `'fr'`
- `'fr-FR'`
- `'id'`
- `'id-ID'`
- `'it'`
- `'it-IT'`
- `'jp'`
- `'jp-JP'`
- `'ko'`
- `'ko-KR'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`
- `'vi'`
- `'vi-VN'`

## locale

- Kiểu: `WalineLocale`
- Mặc định: Giá trị tích hợp sẵn dựa trên `lang`
- Chi tiết:
  - [Cookbook → Tùy chỉnh ngôn ngữ](../../cookbook/customize/locale.md)

Ngôn ngữ của Waline.

## emoji

- Kiểu: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /** Emoji name show on tab */
    name: string;
    /** Current folder link */
    folder?: string;
    /** Common prefix of Emoji icons */
    prefix?: string;
    /** Type of Emoji icons, will be regarded as file extension */
    type?: string;
    /** Emoji icon show on tab */
    icon: string;
    /** Emoji image list */
    items: string[];
  }
  ```

- Mặc định: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Chi tiết:
  - [Hướng dẫn → Emoji](../../guide/features/emoji.md)

Cấu hình emoji.

## dark

- Kiểu: `string | boolean`
- Mặc định: `false`

Hỗ trợ chế độ tối

- Đặt giá trị boolean sẽ bật hoặc tắt chế độ tối theo giá trị đó.
- Đặt thành `'auto'` sẽ hiển thị chế độ tối theo cài đặt của thiết bị.
- Truyền vào một bộ chọn CSS sẽ chỉ bật chế độ tối khi bộ chọn đó khớp với các nút tổ tiên của Waline.

::: tip Ví dụ

- **Docusaurus**: Công cụ này bật chế độ tối bằng cách đặt `data-theme="dark"` trên chính thẻ `<html>`. Vì vậy bạn cần đặt `'html[data-theme="dark"]'` làm tùy chọn `dark`.

- **hexo-theme-fluid**: Công cụ này bật chế độ tối bằng cách đặt `data-user-color-scheme="dark"` trên chính thẻ `<html>`. Vì vậy bạn cần đặt `'html[data-user-color-scheme="dark"]'` làm tùy chọn `dark`.

- **vuepress-theme-hope**: Công cụ này bật chế độ tối bằng cách thêm lớp `theme-dark` vào chính thẻ `<body>`. Vì vậy bạn cần đặt `'body.theme-dark'` làm tùy chọn `dark`.

:::

Chi tiết về kiểu dáng tùy chỉnh và chế độ tối, vui lòng xem [Kiểu dáng tùy chỉnh](../../guide/features/style.md).

## commentSorting

- Kiểu: `WalineCommentSorting`
- Mặc định: `'latest'`

Phương thức sắp xếp danh sách bình luận. Giá trị tùy chọn: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Kiểu: `string[]`
- Mặc định: `['nick','mail','link']`

Thuộc tính của người bình luận. Giá trị tùy chọn: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Kiểu: `string[]`
- Mặc định: `[]`

Đặt các trường bắt buộc, mặc định là ẩn danh, các giá trị tùy chọn:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Kiểu: `string`
- Giá trị mặc định: `'enable'`

Trạng thái chế độ đăng nhập, các giá trị tùy chọn:

- `'enable'`: bật đăng nhập (mặc định)
- `'disable'`: Tắt đăng nhập, người dùng cần điền thông tin để bình luận
- `'force'`: Bắt buộc đăng nhập, người dùng phải đăng nhập mới có thể bình luận

## wordLimit

- Kiểu: `number | [number, number]`
- Mặc định: `0`

Giới hạn số từ của bình luận. Khi truyền vào một số, đó là số từ tối đa của bình luận. Không giới hạn khi đặt là `0`.

## pageSize

- Kiểu: `number`
- Mặc định: `10`

Số bình luận trên mỗi trang.

## imageUploader

- Kiểu: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Bắt buộc: Không

- Chi tiết:
  - [Cookbook → Tải lên hình ảnh](../../cookbook/customize/upload-image.md)

Phương thức tải lên hình ảnh tùy chỉnh. Hành vi mặc định là nhúng hình ảnh dưới dạng mã hóa Base64, bạn có thể đặt là `false` để tắt tính năng tải lên hình ảnh.

Hàm này cần nhận một đối tượng hình ảnh và trả về một Promise cung cấp địa chỉ hình ảnh.

## highlighter

- Kiểu: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Bắt buộc: Không

- Chi tiết:
  - [Cookbook → Tùy chỉnh trình tô sáng mã](../../cookbook/customize/highlighter.md)

**Tô sáng mã nguồn**, mặc định sử dụng `hanabi`. Hàm nhận nội dung gốc của khối mã và ngôn ngữ của khối mã. Bạn nên trả về trực tiếp một chuỗi.

Bạn có thể truyền vào trình tô sáng mã của riêng mình, hoặc đặt là `false` để tắt tô sáng mã nguồn.

## texRenderer

- Kiểu: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Bắt buộc: Không

- Chi tiết:
  - [Cookbook → Tùy chỉnh trình hiển thị $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Tùy chỉnh cách hiển thị $\TeX$, hành vi mặc định là thông báo rằng chế độ xem trước không hỗ trợ $\TeX$. Hàm cung cấp hai tham số: tham số thứ nhất cho biết có cần hiển thị ở cấp khối hay không, tham số thứ hai là chuỗi nội dung $\TeX$, và trả về một chuỗi HTML làm kết quả hiển thị.

Bạn có thể import trình hiển thị $\TeX$ để có tính năng xem trước. Chúng tôi khuyến nghị dùng KaTeX hoặc MathJax, hoặc bạn có thể đặt là `false` để tắt việc phân tích $\TeX$.

## search

- Kiểu: `WalineSearchOptions | boolean`

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

- Bắt buộc: Không
- Chi tiết:
  Tùy chỉnh tính năng tìm kiếm, bạn có thể tắt chức năng tìm kiếm bằng cách đặt là `false`.

## noCopyright

- Kiểu: `boolean`
- Mặc định: `false`

Có ẩn thông tin bản quyền và phiên bản ở chân trang hay không.

::: tip

Chúng tôi hy vọng bạn có thể giữ nguyên để ủng hộ Waline.

:::

## noRss

- Kiểu: `boolean`
- Mặc định: `false`

Có ẩn các liên kết đăng ký RSS hay không.

## recaptchaV3Key

- Kiểu: `string`
- Bắt buộc: Không

reCAPTCHA V3 là dịch vụ captcha do Google cung cấp. Bạn có thể thêm site key của reCAPTCHA V3 bằng `recaptchaV3Key` để bật dịch vụ này. Lưu ý bạn cũng cần đặt biến môi trường `RECAPTCHA_V3_SECRET` cho máy chủ.

## turnstileKey

- Kiểu: `string`
- Bắt buộc: Không

Turnstile là dịch vụ captcha do Cloudflare cung cấp. Bạn có thể thêm site key của Turnstile bằng `turnstileKey` để bật dịch vụ này. Lưu ý bạn cũng cần đặt biến môi trường `TURNSTILE_SECRET` cho máy chủ.

## reaction

- Kiểu: `boolean | string[]`
- Mặc định: `false`

Thêm tính năng tương tác emoji cho bài viết; đặt là `true` để dùng bộ emoji mặc định, bạn cũng có thể tùy chỉnh hình ảnh emoji bằng cách truyền vào mảng URL emoji, hỗ trợ tối đa 8 emoji.
