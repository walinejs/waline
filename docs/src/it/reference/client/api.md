---
title: API del client
icon: config
---

## API del client

Waline fornisce tre API:

- `init`: inizializza Waline

- `commentCount`: conta i commenti

- `pageviewCount`: conta le visualizzazioni

E inoltre:

- `RecentComment`: widget dei commenti recenti di Waline

- `UserList`: lista degli utenti

- `version`: versione del client Waline

## init

L'API `init` accetta le opzioni `WalineInitOptions` e restituisce una `WalineInstance`.

Tipo:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Restituisce:

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

Le opzioni di inizializzazione accettano tutte le [proprietà del componente Waline](props.md) e in più aggiungono le seguenti opzioni.

### el

- Tipo: `string | HTMLElement | null`
- Valore predefinito: `'#waline'`

L'elemento DOM su cui montare Waline all'inizializzazione. Deve essere una **stringa di selettore CSS** valida oppure un oggetto HTMLElement.

Se vuoi solo il contatore sottostante, imposta questa opzione a `null`.

### comment

- Tipo: `boolean | string`
- Valore predefinito: `false`

Contatore del numero di commenti dell'articolo: se inserisci una stringa, verrà usata come selettore CSS.

### pageview

- Tipo: `boolean | string`
- Valore predefinito: `false`

Contatore delle visualizzazioni della pagina. Se inserisci una stringa, verrà usata come selettore CSS.

## commentCount

La funzione `commentCount` riceve le opzioni `WalineCommentCountOptions`, aggiorna il numero di commenti dell'articolo nella pagina e restituisce una funzione `WalineAbort` che annulla l'operazione in corso.

Tipo:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Opzioni:

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

Restituisce:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

La funzione `pageviewCount` riceve le opzioni `WalinePageviewCountOptions`, aggiorna il numero di visualizzazioni della pagina e restituisce una funzione `WalineAbort` che annulla l'operazione in corso.

Tipo:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Opzioni:

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

Restituisce:

```ts
type WalineAbort = (reason?: any) => void;
```

## Widget

### RecentComments

`RecentComments` è un widget che mostra i commenti recenti.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opzioni:

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

Restituisce:

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` è un widget che mostra classifiche di interazione degli utenti o muri di commenti.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opzioni:

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
   * @see [I18n](https://waline.js.org/it/client/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Restituisce:

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
