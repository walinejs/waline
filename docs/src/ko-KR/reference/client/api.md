---
title: 클라이언트 API
icon: config
---

## 클라이언트 API

Waline은 세 가지 API를 제공합니다:

- `init`: Waline 초기화

- `commentCount`: 댓글 수 카운트

- `pageviewCount`: 페이지뷰 수 카운트

추가로:

- `RecentComment`: Waline 최근 댓글 위젯

- `UserList`: 사용자 목록

- `version`: Waline 클라이언트 버전

## init

`init` API는 `WalineInitOptions` 옵션을 받아 `WalineInstance`를 반환합니다.

타입:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

반환값:

```ts
interface WalineInstance {
  /**
   * Element where Waline is mounted
   *
   * @description when initialized with `el: null`, it will be `null`
   */
  el: HTMLElement | null;

  /**
   * Update Waline instance
   *
   * @description when not setting `path` option, it will be reset to `window.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * Unmount and destroy Waline instance
   */
  destroy: () => void;
}
```

초기화 옵션은 모든 [Waline 컴포넌트 Props](props.md)를 받으며, 추가로 다음 옵션이 제공됩니다.

### el

- 타입: `string | HTMLElement | null`
- 기본값: `'#waline'`

초기화 시 마운트할 DOM 요소입니다. 유효한 **CSS 선택자 문자열** 또는 HTMLElement 객체여야 합니다.

아래의 카운터 기능만 사용하려면 이 옵션을 `null`로 설정하세요.

### comment

- 타입: `boolean | string`
- 기본값: `false`

글 댓글 수 카운터이며, 문자열을 입력하면 CSS 선택자로 사용됩니다.

### pageview

- 타입: `boolean | string`
- 기본값: `false`

페이지뷰 카운터입니다. 문자열을 입력하면 CSS 선택자로 사용됩니다.

## commentCount

`commentCount` 함수는 `WalineCommentCountOptions` 옵션을 받아 페이지의 글 댓글 수를 업데이트하며, 현재 작업을 취소할 수 있는 `WalineAbort` 함수를 반환합니다.

타입:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

옵션:

```ts
interface WalineCommentCountOptions {
  /**
   * Waline server url
   */
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

반환값:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

`pageviewCount` 함수는 `WalinePageviewCountOptions` 옵션을 받아 페이지의 페이지뷰 수를 업데이트하며, 현재 작업을 취소할 수 있는 `WalineAbort` 함수를 반환합니다.

타입:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

옵션:

```ts
interface WalinePageviewCountOptions {
  /**
   * Waline server url
   */
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

반환값:

```ts
type WalineAbort = (reason?: any) => void;
```

## 위젯

### RecentComments

`RecentComments`는 최근 댓글을 표시하는 위젯입니다.

타입:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

옵션:

```ts
interface WalineRecentCommentsOptions {
  /**
   * Waline serverURL
   */
  serverURL: string;

  /**
   * fetch number of latest comments
   */
  count: number;

  /**
   * Element to be mounted
   */
  el?: string | HTMLElement;
}
```

반환값:

```ts
interface WalineRecentCommentsResult {
  /**
   * Comment Data
   */
  comments: WalineComment[];

  /**
   * Umount widget
   */
  destroy: () => void;
}
```

### UserList

`UserList`는 사용자 상호작용 리더보드 또는 댓글 담벼락을 표시하는 위젯입니다.

타입:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

옵션:

```ts
interface WalineUserListOptions {
  /**
   * Waline serverURL
   */
  serverURL: string;

  /**
   * fetch number of user list
   */
  count: number;

  /**
   * Element to be mounted
   */
  el?: string | HTMLElement;

  /**
   * Language of error message
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * Custom display language in waline
   *
   * @see [I18n](https://waline.js.org/ko-KR/client/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * list mode or avatar wall mode
   */
  mode: 'list' | 'wall';
}
```

반환값:

```ts
interface WalineUserListResult {
  /**
   * User Data
   */
  users: WalineUser[];

  /**
   * Umount widget
   */
  destroy: () => void;
}
```
