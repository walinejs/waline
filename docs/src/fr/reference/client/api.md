---
title: API du client
icon: config
---

## API du client

Waline fournit trois API :

- `init` : initialise Waline

- `commentCount` : compte les commentaires

- `pageviewCount` : compte les pages vues

Ainsi que :

- `RecentComment` : widget des commentaires récents de Waline

- `UserList` : liste des utilisateurs

- `version` : version du client Waline

## init

L'API `init` accepte un objet d'options `WalineInitOptions` et renvoie une `WalineInstance`.

Type :

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Retour :

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

Les options d'initialisation acceptent toutes les [props du composant Waline](props.md) ; les options suivantes s'y ajoutent.

### el

- Type : `string | HTMLElement | null`
- Valeur par défaut : `'#waline'`

Élément DOM sur lequel le composant est monté lors de l'initialisation. Il doit s'agir d'une **chaîne de sélecteur CSS** valide ou d'un objet HTMLElement.

Si vous ne souhaitez que le compteur ci-dessous, définissez cette option sur `null`.

### comment

- Type : `boolean | string`
- Valeur par défaut : `false`

Compteur du nombre de commentaires de l'article ; lorsqu'une chaîne est fournie, elle est utilisée comme sélecteur CSS.

### pageview

- Type : `boolean | string`
- Valeur par défaut : `false`

Compteur de pages vues. Lorsqu'une chaîne est fournie, elle est utilisée comme sélecteur CSS.

## commentCount

La fonction `commentCount` reçoit l'option `WalineCommentCountOptions`, met à jour le nombre de commentaires de l'article sur la page et renvoie une fonction `WalineAbort` permettant d'annuler l'opération en cours.

Type :

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Options :

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

Retour :

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

La fonction `pageviewCount` reçoit l'option `WalinePageviewCountOptions`, met à jour le nombre de pages vues sur la page et renvoie une fonction `WalineAbort` permettant d'annuler l'opération en cours.

Type :

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Options :

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

Retour :

```ts
type WalineAbort = (reason?: any) => void;
```

## Widgets

### RecentComments

`RecentComments` est un widget qui affiche les commentaires récents.

Type :

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Options :

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

Retour :

```ts
interface WalineRecentCommentsResult {
  /** Comment Data */
  comments: RecentCommentData[];

  /** Umount widget */
  destroy: () => void;
}
```

### UserList

`UserList` est un widget qui affiche des classements d'interaction entre utilisateurs ou des murs de commentaires.

Type :

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Options :

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
   * @see [I18n](https://waline.js.org/fr/client/i18n.html)
   */
  locale?: WalineLocale;

  /** List mode or avatar wall mode */
  mode?: 'list' | 'wall';
}
```

Retour :

```ts
interface WalineUserListResult {
  /** User Data */
  users: WalineUser[];

  /** Umount widget */
  destroy: () => void;
}
```
