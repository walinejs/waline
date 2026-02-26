---
title: クライアント API
icon: config
---

## クライアント API

Waline は以下の 3 つの API を提供しています:

- `init`: Waline を初期化する

- `commentCount`: コメント数をカウントする

- `pageviewCount`: ページビュー数をカウントする

また、以下も提供しています:

- `RecentComment`: Waline 最新コメントウィジェット

- `UserList`: ユーザーリスト

- `version`: Waline クライアントのバージョン

## init

`init` API は `WalineInitOptions` オプションを受け取り、`WalineInstance` を返します。

型:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

戻り値:

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

初期化オプションはすべての [Waline コンポーネント Props](props.md) を受け付けるほか、以下のオプションが追加されています。

### el

- 型: `string | HTMLElement | null`
- デフォルト: `'#waline'`

初期化時にマウントする DOM 要素。有効な **CSS セレクタ文字列** または HTMLElement オブジェクトを指定する必要があります。

カウンターのみを使用する場合は、このオプションを `null` に設定してください。

### comment

- 型: `boolean | string`
- デフォルト: `false`

記事のコメント数カウンター。文字列を指定した場合、CSS セレクタとして使用されます。

### pageview

- 型: `boolean | string`
- デフォルト: `false`

ページビューカウンター。文字列を指定した場合、CSS セレクタとして使用されます。

## commentCount

`commentCount` 関数は `WalineCommentCountOptions` オプションを受け取り、ページ上の記事コメント数を更新して、現在の操作をキャンセルできる `WalineAbort` 関数を返します。

型:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

オプション:

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

戻り値:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

`pageviewCount` 関数は `WalinePageviewCountOptions` オプションを受け取り、ページ上の記事コメント数を更新して、現在の操作をキャンセルできる `WalineAbort` 関数を返します。

型:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

オプション:

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

戻り値:

```ts
type WalineAbort = (reason?: any) => void;
```

## ウィジェット

### RecentComments

`RecentComments` は最新コメントを表示するウィジェットです。

型:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

オプション:

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

戻り値:

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

`UserList` はユーザーインタラクションのリーダーボードまたはコメントウォールを表示するウィジェットです。

型:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

オプション:

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
   * @see [I18n](https://waline.js.org/jp/client/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * list mode or avatar wall mode
   */
  mode: 'list' | 'wall';
}
```

戻り値:

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
