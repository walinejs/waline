---
title: 客戶端 API
icon: config
---

## 客戶端 API

Waline 提供三個 API：

- `init`：初始化 Waline

- `commentCount`：留言數統計

- `pageviewCount`：瀏覽量統計

以及：

- `RecentComment`：最近留言

- `UserList`：使用者列表

- `version`：Waline 客戶端版本

## init

`init` 函式接收一個 `WalineInitOptions` 初始化選項，並傳回一個 `WalineInstance`。

型別：

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

傳回值：

```ts
interface WalineInstance {
  /**
   * Waline 被掛載到的元素
   *
   * 當透過 `el: null` 初始化時，值為 `null`
   */
  el: HTMLElement | null;

  /**
   * 更新 Waline 實例
   *
   * 只要不設定 `path` 選項，更新時它就會被重設為 `windows.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /** 取消掛載並銷毀 Waline 實例 */
  destroy: () => void;
}
```

初始化選項接受所有 [Waline 元件屬性](props.md)，此外新增下列選項。

### el

- 型別：`string | HTMLElement | null`
- 預設值：`'#waline'`

Waline 的初始化掛載目標。必須是有效的 **CSS 選擇器** 或 HTMLElement 物件。

如果你只需要下方的統計，請將此選項設為 `null`。

### comment

- 型別：`boolean | string`
- 預設值：`false`

文章留言數統計，填入字串時會作為 CSS 選擇器。

### pageview

- 型別：`boolean | string`
- 預設值：`false`

文章瀏覽量統計，填入字串時會作為 CSS 選擇器。

## commentCount

`commentCount` 函式接收 `WalineCommentCountOptions` 選項，負責更新頁面上的文章留言數，同時傳回一個可以取消目前操作的函式 `WalineAbort`。

型別：

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

選項：

```ts
interface WalineCommentCountOptions {
  /** Waline 伺服器位址 */
  serverURL: string;

  /**
   * 留言數 CSS 選擇器
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * 需要取得的預設路徑
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

傳回值：

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

`pageviewCount` 函式接收 `WalinePageviewCountOptions` 選項，負責更新頁面上的瀏覽量，同時傳回一個可以取消目前操作的函式 `WalineAbort`。

型別：

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

選項：

```ts
interface WalinePageviewCountOptions {
  /** Waline 伺服器位址 */
  serverURL: string;

  /**
   * 留言數 CSS 選擇器
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * 需要更新與取得的路徑
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * 是否在查詢時更新 path 的瀏覽量
   *
   * @default true
   */
  update?: boolean;
}
```

傳回值：

```ts
type WalineAbort = (reason?: any) => void;
```

## 小工具

### RecentComments

`RecentComments` 是一個顯示最近留言的小工具。

型別：

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

選項：

```ts
interface WalineRecentCommentsOptions {
  /** Waline 伺服器位址 */
  serverURL: string;

  /** 取得最新留言的數量 */
  count: number;

  /** 需要掛載的元素 */
  el?: string | HTMLElement;
}
```

傳回值：

```ts
interface WalineRecentCommentsResult {
  /** 留言資料 */
  comments: RecentCommentData[];

  /** 取消掛載小工具 */
  destroy: () => void;
}
```

### UserList

`UserList` 是一個顯示使用者互動排行榜或留言牆的小工具。

型別：

```ts
const UserList: (options: WalineUserListOptions) => Promise<WalineUserListResult>;
```

選項：

```ts
interface WalineUserListOptions {
  /** Waline 伺服器位址 */
  serverURL: string;

  /** 取得使用者列表的數量 */
  count: number;

  /** 需要掛載的元素 */
  el?: string | HTMLElement;

  /**
   * 錯誤提示訊息所使用的語言
   *
   * @default navigator.language
   */
  lang?: string;

  /**
   * 自訂 waline 語言顯示
   *
   * @see [自訂語言](https://waline.js.org/guide/features/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * 列表模式還是頭像牆模式
   *
   * List mode or avatar wall mode
   */
  mode?: 'list' | 'wall';
}
```

傳回值：

```ts
interface WalineUserListResult {
  /** 使用者資料 */
  users: WalineUser[];

  /** 取消掛載小工具 */
  destroy: () => void;
}
```
