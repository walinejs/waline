---
title: API ứng dụng khách
icon: config
---

## API ứng dụng khách

Waline cung cấp ba API:

- `init`: Khởi tạo Waline

- `commentCount`: Đếm số bình luận

- `pageviewCount`: Đếm số lượt xem

Cùng với đó:

- `RecentComment`: Tiện ích hiển thị bình luận gần đây của Waline

- `UserList`: Danh sách người dùng

- `version`: Phiên bản ứng dụng khách Waline

## init

API `init` nhận các tùy chọn `WalineInitOptions` và trả về một `WalineInstance`.

Kiểu:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Trả về:

```ts
interface WalineInstance {
  /**
   * Element where Waline is mounted
   *
   * When initialized with `el: null`, it will be `null`
   */
  el: HTMLElement | null;

  /**
   * Update Waline instance
   *
   * When not setting `path` option, it will be reset to `window.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /** Unmount and destroy Waline instance */
  destroy: () => void;
}
```

Các tùy chọn khởi tạo chấp nhận toàn bộ [Props của component Waline](props.md), ngoài ra còn có thêm các tùy chọn sau.

### el

- Kiểu: `string | HTMLElement | null`
- Mặc định: `'#waline'`

Phần tử DOM được gắn khi khởi tạo. Đây phải là **chuỗi bộ chọn CSS** hợp lệ hoặc một đối tượng HTMLElement.

Nếu bạn chỉ muốn dùng bộ đếm bên dưới, hãy đặt tùy chọn này là `null`.

### comment

- Kiểu: `boolean | string`
- Mặc định: `false`

Bộ đếm số bình luận của bài viết; khi truyền vào một chuỗi, chuỗi đó sẽ được dùng làm bộ chọn CSS.

### pageview

- Kiểu: `boolean | string`
- Mặc định: `false`

Bộ đếm lượt xem. Khi truyền vào một chuỗi, chuỗi đó sẽ được dùng làm bộ chọn CSS.

## commentCount

Hàm `commentCount` nhận tùy chọn `WalineCommentCountOptions`, cập nhật số bình luận của bài viết trên trang và trả về hàm `WalineAbort` để có thể hủy thao tác hiện tại.

Kiểu:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Tùy chọn:

```ts
interface WalineCommentCountOptions {
  /** Waline server url */
  serverURL: string;

  /**
   * Comment count CSS selector
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * Path to be fetched by default
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

Trả về:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

Hàm `pageviewCount` nhận tùy chọn `WalinePageviewCountOptions`, cập nhật số lượt xem của bài viết trên trang và trả về hàm `WalineAbort` để có thể hủy thao tác hiện tại.

Kiểu:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Tùy chọn:

```ts
interface WalinePageviewCountOptions {
  /** Waline server url */
  serverURL: string;

  /**
   * Pageview CSS selector
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * Path to be fetched and updated
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * Whether update pageviews when fetching path result
   *
   * @default true
   */
  update?: boolean;
}
```

Trả về:

```ts
type WalineAbort = (reason?: any) => void;
```

## Tiện ích

### RecentComments

`RecentComments` là tiện ích hiển thị các bình luận gần đây.

Kiểu:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Tùy chọn:

```ts
interface WalineRecentCommentsOptions {
  /** Waline serverURL */
  serverURL: string;

  /** Fetch number of latest comments */
  count: number;

  /** Element to be mounted */
  el?: string | HTMLElement;
}
```

Trả về:

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` là tiện ích hiển thị bảng xếp hạng tương tác của người dùng hoặc tường bình luận.

Kiểu:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Tùy chọn:

```ts
interface WalineUserListOptions {
  /** Waline serverURL */
  serverURL: string;

  /** Fetch number of user list */
  count: number;

  /** Element to be mounted */
  el?: string | HTMLElement;

  /**
   * Language of error message
   *
   * @default navigator.language
   */
  lang?: string;

  /**
   * Custom display language in waline
   *
   * @see [I18n](https://waline.js.org/vi-VN/client/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Trả về:

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
