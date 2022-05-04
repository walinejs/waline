---
title: 客户端 API
icon: config
---

## 客户端 API

Waline 提供三个 API:

- `init`: 初始化 Waline

- `commentCount`: 评论数统计

- `pageviewCount`: 访问量统计

以及:

- `RecentComment`: 最近评论

- `version: string`: Waline 客户端版本

## init

`init` 函数接收一个 `WalineInitOptions` 初始化选项，并返回一个 `WalineInstance`。

类型:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

返回值:

```ts
interface WalineInstance {
  /**
   * Waline 被挂载到的元素
   *
   * @description 当通过 `el: null` 初始化，值为 `null`
   */
  el: HTMLElement | null;

  /**
   * 更新 Waline 实例
   *
   * @description 只要不设置`path` 选项，更新时它就会被重置为 `windows.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * 取消挂载并摧毁 Waline 实例
   */
  destroy: () => void;
}
```

初始化选项接受所有 [Waline 组件](component.md) 支持的选项，此外，新增下列选项。

### el

- 类型: `string | HTMLElement | null`
- 默认值: `'#waline'`

Waline 的初始化挂载器。必须是一个有效的 **CSS 选择器** 或 HTMLELement 对象。

如果你只需要下方的统计，请将此选项设置为 `null`。

### comment

- 类型: `boolean | string`
- 默认值: `false`

文章评论数统计，填入字符串时会作为 CSS 选择器。

### pageview

- 类型: `boolean | string`
- 默认值: `false`

文章浏览量统计，填入字符串时会作为 CSS 选择器。

## commentCount

`commentCount` 函数接收 `WalineCommentCountOptions` 选项，并负责更新页面上的文章评论数，同时返回一个可以取消当前操作的函数 `WalineAbort`。

类型:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

选项:

```ts
interface WalineCommentCountOptions {
  /**
   * Waline 服务端地址
   */
  serverURL: string;

  /**
   * 评论数 CSS 选择器
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * 需要获取的默认路径
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

返回值:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

`pageviewCount` 函数接收 `WalinePageviewCountOptions` 选项，并负责更新页面上的文章评论数，同时返回一个可以取消当前操作的函数 `WalineAbort`。

类型:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

选项:

```ts
interface WalinePageviewCountOptions {
  /**
   * Waline 服务端地址
   */
  serverURL: string;

  /**
   * 评论数 CSS 选择器
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * 需要更新和获取的路径
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * 是否在查询时更新 path 的浏览量
   *
   * @default true
   */
  update?: boolean;
}
```

返回值:

```ts
type WalineAbort = (reason?: any) => void;
```

## 挂件

### RecentComments

`RecentComments` 是一个展示最近评论的挂件。

类型:

```ts
const RecentComments: (
  options: WalineRecentCommentsOptions
) => Promise<WalineRecentCommentsResult>;
```

选项:

```ts
interface WalineRecentCommentsOptions {
  /**
   * Waline 服务端地址
   */
  serverURL: string;

  /**
   * 获取最新评论的数量
   */
  count: number;

  /**
   * 需要挂载的元素
   */
  el?: string | HTMLElement;
}
```

返回值:

```ts
interface WalineRecentCommentsResult {
  /**
   * 评论数据
   */
  comments: WalineComment[];

  /**
   * 取消挂载挂件
   */
  destroy: () => void;
}
```
