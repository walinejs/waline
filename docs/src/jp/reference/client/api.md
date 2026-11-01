---
title: クライアント API
icon: config
---

## クライアント API

Waline は 3 つの API を提供しています：

- `init`：Waline を初期化します

- `commentCount`：コメント数をカウントします

- `pageviewCount`：閲覧数をカウントします

さらに次のものも提供しています：

- `RecentComment`：Waline の最近のコメントウィジェット

- `UserList`：ユーザーリスト

- `version`：Waline クライアントのバージョン

## init

`init` API は `WalineInitOptions` オプションを受け取り、`WalineInstance` を返します。

型：

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

戻り値：

```ts
interface WalineInstance {
  /**
   * Waline がマウントされる要素
   *
   * `el: null` で初期化した場合は `null` になります
   */
  el: HTMLElement | null;

  /**
   * Waline インスタンスを更新します
   *
   * `path` オプションを設定していない場合、`window.location.pathname` にリセットされます
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /** Waline インスタンスをアンマウントして破棄します */
  destroy: () => void;
}
```

初期化オプションでは、すべての [Waline コンポーネントのプロパティ](props.md) を受け入れます。さらに、次のオプションが追加されます。

### el

- 型：`string | HTMLElement | null`
- デフォルト：`'#waline'`

初期化時にマウントする DOM 要素です。有効な **CSS セレクター文字列** または HTMLElement オブジェクトである必要があります。

下に表示されるカウンターのみが必要な場合は、このオプションを `null` に設定してください。

### comment

- 型：`boolean | string`
- デフォルト：`false`

記事のコメント数のカウンターです。文字列を指定すると、その文字列が CSS セレクターとして使用されます。

### pageview

- 型：`boolean | string`
- デフォルト：`false`

閲覧数のカウンターです。文字列を指定すると、その文字列が CSS セレクターとして使用されます。

## commentCount

`commentCount` 関数は `WalineCommentCountOptions` オプションを受け取り、ページ上の記事のコメント数を更新し、現在の操作をキャンセルできる関数 `WalineAbort` を返します。

型：

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

オプション：

```ts
interface WalineCommentCountOptions {
  /** Waline サーバーの URL */
  serverURL: string;

  /**
   * コメント数の CSS セレクター
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * デフォルトで取得するパス
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

戻り値：

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

`pageviewCount` 関数は `WalinePageviewCountOptions` オプションを受け取り、ページ上の記事のコメント数を更新し、現在の操作をキャンセルできる関数 `WalineAbort` を返します。

型：

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

オプション：

```ts
interface WalinePageviewCountOptions {
  /** Waline サーバーの URL */
  serverURL: string;

  /**
   * 閲覧数の CSS セレクター
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * 取得および更新するパス
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * パスの結果を取得するときに閲覧数を更新するかどうか
   *
   * @default true
   */
  update?: boolean;
}
```

戻り値：

```ts
type WalineAbort = (reason?: any) => void;
```

## ウィジェット

### RecentComments

`RecentComments` は最近のコメントを表示するウィジェットです。

型：

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

オプション：

```ts
interface WalineRecentCommentsOptions {
  /** Waline の serverURL */
  serverURL: string;

  /** 取得する最新コメントの数 */
  count: number;

  /** マウントする要素 */
  el?: string | HTMLElement;
}
```

戻り値：

```ts
interface WalineRecentCommentsResult {
  /** コメントデータ */
  comments: RecentCommentData[];

  /** ウィジェットをアンマウントします */
  destroy: () => void;
}
```

### UserList

`UserList` は、ユーザーのインタラクションランキングやコメントウォールを表示するウィジェットです。

型：

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

オプション：

```ts
interface WalineUserListOptions {
  /** Waline の serverURL */
  serverURL: string;

  /** 取得するユーザーリストの数 */
  count: number;

  /** マウントする要素 */
  el?: string | HTMLElement;

  /**
   * エラーメッセージの言語
   *
   * @default navigator.language
   */
  lang?: string;

  /**
   * Waline の表示言語をカスタマイズします
   *
   * @see [I18n](https://waline.js.org/jp/client/i18n.html)
   */
  locale?: WalineLocale;

  /** リストモードまたはアバターウォールモード */
  mode?: 'list' | 'wall';
}
```

戻り値：

```ts
interface WalineUserListResult {
  /** ユーザーデータ */
  users: WalineUser[];

  /** ウィジェットをアンマウントします */
  destroy: () => void;
}
```
