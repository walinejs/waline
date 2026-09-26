---
title: Client-API
icon: config
---

## Client-API

Waline bietet drei APIs:

- `init`: Waline initialisieren

- `commentCount`: Kommentare zählen

- `pageviewCount`: Seitenaufrufe zählen

Sowie:

- `RecentComment`: Waline-Widget für neueste Kommentare

- `UserList`: Benutzerliste

- `version`: Waline-Client-Version

## init

Die `init`-API akzeptiert eine `WalineInitOptions`-Option und gibt eine `WalineInstance` zurück.

Typ:

```ts
const init: (options: WalineInitOptions) => WalineInstance;
```

Rückgabe:

```ts
interface WalineInstance {
  /**
   * Element, an dem Waline eingebunden ist
   *
   * @description Wenn mit `el: null` initialisiert, wird es `null` sein
   */
  el: HTMLElement | null;

  /**
   * Waline-Instanz aktualisieren
   *
   * @description Wenn die `path`-Option nicht gesetzt ist, wird sie auf `window.location.pathname` zurückgesetzt
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * Waline-Instanz aushängen und zerstören
   */
  destroy: () => void;
}
```

Die Initialisierungsoptionen akzeptieren alle [Waline-Komponenten-Eigenschaften](props.md), zusätzlich werden die folgenden Optionen hinzugefügt.

### el

- Typ: `string | HTMLElement | null`
- Standard: `'#waline'`

Das DOM-Element, das bei der Initialisierung eingebunden werden soll. Es muss ein gültiger **CSS-Selektor-String** oder ein HTMLElement-Objekt sein.

Wenn Sie nur den Zähler unten möchten, setzen Sie diese Option auf `null`.

### comment

- Typ: `boolean | string`
- Standard: `false`

Artikelkommentaranzahl-Zähler, wenn ein String eingegeben wird, wird er als CSS-Selektor verwendet.

### pageview

- Typ: `boolean | string`
- Standard: `false`

Seitenaufrufe-Zähler. Wenn ein String eingegeben wird, wird er als CSS-Selektor verwendet.

## commentCount

Die `commentCount`-Funktion empfängt die `WalineCommentCountOptions`-Option und aktualisiert die Anzahl der Artikelkommentare auf der Seite und gibt eine Funktion `WalineAbort` zurück, die die aktuelle Operation abbrechen kann.

Typ:

```ts
const commentCount: (options: WalineCommentCountOptions) => WalineAbort;
```

Optionen:

```ts
interface WalineCommentCountOptions {
  /**
   * Waline-Server-URL
   */
  serverURL: string;

  /**
   * Kommentaranzahl-CSS-Selektor
   *
   * @default '.waline-comment-count'
   */
  selector?: string;

  /**
   * Pfad, der standardmäßig abgerufen werden soll
   *
   * @default window.location.pathname
   */
  path?: string;
}
```

Returns:

```ts
type WalineAbort = (reason?: any) => void;
```

## pageviewCount

Die `pageviewCount`-Funktion empfängt die `WalinePageviewCountOptions`-Option und aktualisiert die Anzahl der Artikelkommentare auf der Seite und gibt eine Funktion `WalineAbort` zurück, die die aktuelle Operation abbrechen kann.

Typ:

```ts
const pageviewCount: (options: WalinePageviewCountOptions) => WalineAbort;
```

Optionen:

```ts
interface WalinePageviewCountOptions {
  /**
   * Waline-Server-URL
   */
  serverURL: string;

  /**
   * Seitenaufruf-CSS-Selektor
   *
   * @default '.waline-pageview-count'
   */
  selector?: string;

  /**
   * Pfad, der abgerufen und aktualisiert werden soll
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * Ob Seitenaufrufe beim Abrufen des Pfadergebnisses aktualisiert werden sollen
   *
   * @default true
   */
  update?: boolean;
}
```

Returns:

```ts
type WalineAbort = (reason?: any) => void;
```

## Widgets

### RecentComments

`RecentComments` ist ein Widget, das die neuesten Kommentare anzeigt.

Typ:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Optionen:

```ts
interface WalineRecentCommentsOptions {
  /**
   * Waline-Server-URL
   */
  serverURL: string;

  /**
   * Anzahl der neuesten Kommentare abrufen
   */
  count: number;

  /**
   * Element zum Einbinden
   */
  el?: string | HTMLElement;
}
```

Rückgabe:

```ts
interface WalineRecentCommentsResult {
  /**
   * Kommentardaten
   */
  comments: WalineComment[];

  /**
   * Widget aushängen
   */
  destroy: () => void;
}
```

### UserList

`UserList` ist ein Widget, das Benutzerinteraktions-Bestenlisten oder Kommentarwände anzeigt.

Typ:

```ts
const RecentComments: (options: WalineRecentCommentsOptions) => Promise<WalineRecentCommentsResult>;
```

Optionen:

```ts
interface WalineUserListOptions {
  /**
   * Waline-Server-URL
   */
  serverURL: string;

  /**
   * Anzahl der Benutzerliste abrufen
   */
  count: number;

  /**
   * Element zum Einbinden
   */
  el?: string | HTMLElement;

  /**
   * Sprache der Fehlermeldung
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * Benutzerdefinierte Anzeigesprache in Waline
   *
   * @see [I18n](https://waline.js.org/de/client/i18n.html)
   */
  locale?: WalineLocale;

  /**
   * Listenmodus oder Avatar-Wand-Modus
   */
  mode: 'list' | 'wall';
}
```

Rückgabe:

```ts
interface WalineUserListResult {
  /**
   * Benutzerdaten
   */
  users: WalineUser[];

  /**
   * Widget aushängen
   */
  destroy: () => void;
}
```
