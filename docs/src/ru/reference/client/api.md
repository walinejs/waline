---
title: API клиента
icon: config
---

## API клиента

Waline предоставляет три API:

- `init`: инициализация Waline

- `commentCount`: подсчёт комментариев

- `pageviewCount`: подсчёт просмотров страниц

А также:

- `RecentComment`: виджет последних комментариев Waline

- `UserList`: список пользователей

- `version`: версия клиента Waline

## init

API `init` принимает параметры `WalineInitOptions` и возвращает `WalineInstance`.

Тип:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Возвращаемое значение:

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

Параметры инициализации принимают все [свойства компонента Waline](props.md), кроме того, добавлены следующие параметры.

### el

- Тип: `string | HTMLElement | null`
- Значение по умолчанию: `'#waline'`

DOM-элемент, в который монтируется Waline при инициализации. Это должна быть корректная **строка CSS-селектора** или объект HTMLElement.

Если нужен только счётчик, установите этот параметр в `null`.

### comment

- Тип: `boolean | string`
- Значение по умолчанию: `false`

Счётчик количества комментариев статьи; если указана строка, она используется как CSS-селектор.

### pageview

- Тип: `boolean | string`
- Значение по умолчанию: `false`

Счётчик просмотров страниц. Если указана строка, она используется как CSS-селектор.

## commentCount

Функция `commentCount` принимает параметры `WalineCommentCountOptions`, обновляет количество комментариев статьи на странице и возвращает функцию `WalineAbort`, позволяющую отменить текущую операцию.

Тип:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Параметры:

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

Возвращает:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

Функция `pageviewCount` принимает параметры `WalinePageviewCountOptions`, обновляет количество просмотров на странице и возвращает функцию `WalineAbort`, позволяющую отменить текущую операцию.

Тип:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Параметры:

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

Возвращает:

```ts
type WalineAbort = (reason?: any) => void;
```

## Виджеты

### RecentComments

`RecentComments` — виджет, отображающий последние комментарии.

Тип:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Параметры:

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

Возвращает:

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` — виджет, отображающий рейтинг активности пользователей или стену комментариев.

Тип:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Параметры:

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
   * @see [I18n](https://waline.js.org/ru/client/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Возвращает:

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
