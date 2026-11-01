---
title: API do Cliente
icon: config
---

## API do Cliente

O Waline fornece três APIs:

- `init`: inicializa o Waline

- `commentCount`: conta os comentários

- `pageviewCount`: conta as visualizações de página

Além disso:

- `RecentComment`: widget de comentários recentes do Waline

- `UserList`: lista de usuários

- `version`: versão do cliente Waline

## init

A API `init` aceita as opções `WalineInitOptions` e retorna uma `WalineInstance`.

Tipo:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Retorno:

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

As opções de inicialização aceitam todas as [Props do Componente Waline](props.md) e, além disso, adicionam as seguintes opções.

### el

- Tipo: `string | HTMLElement | null`
- Padrão: `'#waline'`

O elemento DOM no qual o Waline será montado na inicialização. Deve ser uma **string de seletor CSS** válida ou um objeto HTMLElement.

Se você quiser apenas o contador abaixo, defina esta opção como `null`.

### comment

- Tipo: `boolean | string`
- Padrão: `false`

Contador do número de comentários do artigo. Quando preenchido com uma string, ela será usada como seletor CSS.

### pageview

- Tipo: `boolean | string`
- Padrão: `false`

Contador de visualizações de página. Quando preenchido com uma string, ela será usada como seletor CSS.

## commentCount

A função `commentCount` recebe a opção `WalineCommentCountOptions` e atualiza o número de comentários do artigo na página, retornando uma função `WalineAbort` que pode cancelar a operação atual.

Tipo:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Opções:

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

Retorna:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

A função `pageviewCount` recebe a opção `WalinePageviewCountOptions` e atualiza o número de comentários do artigo na página, retornando uma função `WalineAbort` que pode cancelar a operação atual.

Tipo:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Opções:

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

Retorna:

```ts
type WalineAbort = (reason?: any) => void;
```

## Widgets

### RecentComments

`RecentComments` é um widget que exibe os comentários recentes.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opções:

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

Retorna:

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` é um widget que exibe o ranking de interações dos usuários ou o mural de comentários.

Tipo:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Opções:

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
   * @see [I18n](https://waline.js.org/pt-BR/client/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Retorna:

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
