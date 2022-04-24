---
title: Client API
icon: config
---

## Client API

Waline provides three APIs:

- `init(options: WalineInitOptions): WalineInstance`

- `commentCount(options: WalineCommentCountOptions): WalineAbort`

- `pageviewCount(options: WalinePageviewCountOptions): Abort`

As well as:

- `widgets: Record<string, WalineWidget>`: Waline widget collection

- `version: string`: Waline client version

## init

The `init` API accepts a `WalineInitOptions` options and returns a `WalineInstance`.

```ts
export interface WalineInstance {
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
  update: (newOptions: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * Unmount and destroy Waline instance
   */
  destroy: () => void;
}
```

The initialization options accept all options supported by [Waline Component](component.md), in addition, the following options are added.

### el

- Type: `string | HTMLElement | null`
- Default: `'#waline'`

The DOM element to be mounted on initialization. It must be a valid **CSS selector string** or HTMLElement Object.

If you only want the counter below, set this option to `null`.

### comment

- Type: `boolean | string`
- Default: `false`

Article comment count counter, when filled in a string, it will be used as a CSS selector.

### pageview

- Type: `boolean | string`
- Default: `false`

Pageview counter. When filled in a string, it will be used as a CSS selector.

## commentCount

The `commentCount` function receives the `WalineCommentCountOptions` option and updates the number of article comments on the page, and returns a function `WalineAbort` that can cancel the current operation.

```ts
interface WalineCommentCountOptions {
  /**
   * Waline server url
   */
  serverURL: string;

  /**
   * Commment count CSS selector
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

type WalineAbort = (reason?: any) => void;
```

## pageviewCount

The `pageviewCount` function receives the `WalinePageviewCountOptions` option and updates the number of article comments on the page, and returns a function `WalineAbort` that can cancel the current operation.

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

type WalineAbort = (reason?: any) => void;
```
