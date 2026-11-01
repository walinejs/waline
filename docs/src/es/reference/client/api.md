---
title: API del cliente
icon: config
---

## API del cliente

Waline ofrece tres API:

- `init`: inicializa Waline

- `commentCount`: cuenta los comentarios

- `pageviewCount`: cuenta las visitas a la página

Además de:

- `RecentComment`: widget de comentarios recientes de Waline

- `UserList`: lista de usuarios

- `version`: versión del cliente de Waline

## init

La API `init` acepta las opciones de `WalineInitOptions` y devuelve una `WalineInstance`.

Tipo:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Devuelve:

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

Las opciones de inicialización aceptan todas las [propiedades del componente Waline](props.md) y, además, se añaden las siguientes opciones.

### el

- Tipo: `string | HTMLElement | null`
- Valor predeterminado: `'#waline'`

El elemento DOM sobre el que se monta la instancia al inicializar. Debe ser una **cadena de selector CSS** válida o un objeto HTMLElement.

Si solo quieres el contador que aparece debajo, establece esta opción en `null`.

### comment

- Tipo: `boolean | string`
- Valor predeterminado: `false`

Contador del número de comentarios del artículo; si indicas una cadena, se usará como selector CSS.

### pageview

- Tipo: `boolean | string`
- Valor predeterminado: `false`

Contador de visitas a la página. Si indicas una cadena, se usará como selector CSS.

## commentCount

La función `commentCount` recibe la opción `WalineCommentCountOptions`, actualiza el número de comentarios del artículo en la página y devuelve una función `WalineAbort` que permite cancelar la operación en curso.

Tipo:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Opciones:

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

Devuelve:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

La función `pageviewCount` recibe la opción `WalinePageviewCountOptions`, actualiza el número de visitas a la página y devuelve una función `WalineAbort` que permite cancelar la operación en curso.

Tipo:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Opciones:

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

Devuelve:

```ts
type WalineAbort = (reason?: any) => void;
```

## Widgets

### RecentComments

`RecentComments` es un widget que muestra los comentarios recientes.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opciones:

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

Devuelve:

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` es un widget que muestra tablas de clasificación de interacción entre usuarios o muros de comentarios.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opciones:

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
   * @see [I18n](https://waline.js.org/es/guide/features/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Devuelve:

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
