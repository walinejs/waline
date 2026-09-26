---
title: Komponenten-Eigenschaften
icon: config
---

## serverURL

- Typ: `string`
- Erforderlich: Ja

Waline-Server-Adress-URL

## path

- Typ: `string`
- Standard: `window.location.pathname`

Artikel-Pfad-ID. Wird verwendet, um verschiedene _Artikelseiten_ zu unterscheiden und sicherzustellen, dass die richtige Kommentarliste unter der _Artikelseite_ geladen wird.

::: warning

Bitte stellen Sie die Eindeutigkeit jedes _Artikelseiten_-Pfads sicher, andernfalls kann dieselbe Kommentarliste geladen werden.

- Beispiel 1: Wenn auf Ihrer Website `/example/path/` und `/example/path` dieselbe Seite sind, sollten Sie wahrscheinlich `window.location.pathname.replace(/\/$/,'')` setzen.
- Beispiel 2: Wenn Sie englische Dokumente im Stammverzeichnis speichern, während Sie andere Sprachdokumente unter `/zh/`, `/ja/` usw. bereitstellen, sollten Sie wahrscheinlich `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')` setzen.

:::

## lang

- Typ: `string`
- Standard: `navigator.language`
- Details:
  - [Anleitung → I18n](../../guide/features/i18n.md#set-language)

Anzeigesprache.

Optionale Werte:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`
- `fr-FR`
- `fr`
- `'es'`
- `'es-MX'`

## locale

- Typ: `WalineLocale`
- Standard: Eingebauter Wert basierend auf `lang`
- Details:
  - [Kochbuch → Sprache anpassen](../../cookbook/customize/locale.md)

Waline-Lokalisierungen.

## emoji

- Typ: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /**
     * Emoji-Name, der auf der Registerkarte angezeigt wird
     */
    name: string;
    /**
     * Aktueller Ordner-Link
     */
    folder?: string;
    /**
     * Gemeinsames Präfix der Emoji-Symbole
     */
    prefix?: string;
    /**
     * Typ der Emoji-Symbole, wird als Dateierweiterung betrachtet
     */
    type?: string;
    /**
     * Emoji-Symbol, das auf der Registerkarte angezeigt wird
     */
    icon: string;
    /**
     * Emoji-Bildliste
     */
    items: string[];
  }
  ```

- Standard: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Details:
  - [Anleitung → Emoji](../../guide/features/emoji.md)

Emoji-Einstellungen.

## dark

- Typ: `string | boolean`
- Standard: `false`

Dunkelmodus-Unterstützung

- Das Setzen eines Booleschen Werts aktiviert den Dunkelmodus entsprechend seinem Wert.
- Setzen Sie es auf `'auto'`, um den Dunkelmodus entsprechend den Geräteeinstellungen anzuzeigen.
- Das Ausfüllen mit einem CSS-Selektor aktiviert den Dunkelmodus nur, wenn der Selektor mit Waline-Vorgängerknoten übereinstimmt.

::: tip Beispiele

- **Docusaurus**: Es aktiviert den Dunkelmodus, indem `data-theme="dark"` auf dem `<html>`-Tag selbst gesetzt wird. Sie müssen also `'html[data-theme="dark"]'` als `dark`-Option setzen.

- **hexo-theme-fluid**: Es aktiviert den Dunkelmodus, indem `data-user-color-scheme="dark"` auf dem `<html>`-Tag selbst gesetzt wird. Sie müssen also `'html[data-user-color-scheme="dark"]'` als `dark`-Option setzen.

- **vuepress-theme-hope**: Es aktiviert den Dunkelmodus, indem die Klasse `theme-dark` auf dem `<body>`-Tag selbst gesetzt wird. Sie müssen also `'body.theme-dark'` als `dark`-Option setzen.

:::

Für Details zu benutzerdefinierten Stilen und Dunkelmodus siehe [Benutzerdefinierter Stil](../../guide/features/style.md).

## commentSorting

- Typ: `WalineCommentSorting`
- Standard: `'latest'`

Sortiermethoden für Kommentarlisten. Optionale Werte: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Typ: `string[]`
- Standard: `['nick','mail','link']`

Reviewer-Attribute. Optionale Werte: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Typ: `string[]`
- Standard: `[]`

Pflichtfelder festlegen, standardmäßig anonym, optionale Werte:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Typ: `string`
- Standardwert: `'enable'`

Login-Modus-Status, optionale Werte:

- `'enable'`: Login aktivieren (Standard)
- `'disable'`: Login ist deaktiviert, Benutzer müssen Informationen ausfüllen, um zu kommentieren
- `'force'`: Erzwungene Anmeldung, Benutzer müssen sich anmelden, um zu kommentieren

## wordLimit

- Typ: `number | [number, number]`
- Standard: `0`

Kommentarwörter-Limit. Wenn eine einzelne Zahl eingegeben wird, ist dies die maximale Anzahl von Kommentarwörtern. Keine Begrenzung, wenn auf `0` gesetzt.

## pageSize

- Typ: `number`
- Standard: `10`

Anzahl der Kommentare pro Seite.

## imageUploader

- Typ: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Erforderlich: Nein

- Details:
  - [Kochbuch → Bild hochladen](../../cookbook/customize/upload-image.md)

Benutzerdefinierte Bild-Upload-Methode. Das Standardverhalten besteht darin, Bilder Base64-kodiert einzubetten. Sie können dies auf `false` setzen, um das Hochladen von Bildern zu deaktivieren.

Die Funktion sollte ein Bildobjekt empfangen und ein Promise zurückgeben, das die Bildadresse bereitstellt.

## highlighter

- Typ: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Erforderlich: Nein

- Details:
  - [Kochbuch → Highlighter anpassen](../../cookbook/customize/highlighter.md)

**Code-Hervorhebung**, verwendet standardmäßig `hanabi`. Die Funktion übergibt den ursprünglichen Inhalt des Codeblocks und die Sprache des Codeblocks. Sie sollten direkt einen String zurückgeben.

Sie können einen eigenen Code-Highlighter übergeben oder auf `false` setzen, um die Code-Hervorhebung zu deaktivieren.

## texRenderer

- Typ: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Erforderlich: Nein

- Details:
  - [Kochbuch → $\TeX$ Renderer anpassen](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

$\TeX$-Rendering anpassen, das Standardverhalten besteht darin, darauf hinzuweisen, dass der Vorschaumodus $\TeX$ nicht unterstützt. Die Funktion bietet zwei Parameter: Der erste Parameter gibt an, ob auf Blockebene gerendert werden soll, und der zweite Parameter ist die Zeichenfolge des $\TeX$-Inhalts, und gibt einen HTML-String als Render-Ergebnis zurück.

Sie können einen $\TeX$-Renderer importieren, um die Vorschaufunktion bereitzustellen. Wir empfehlen Ihnen, KaTeX oder MathJax zu verwenden, oder Sie können es auf `false` setzen, um das Parsen von $\TeX$ zu deaktivieren.

## search

- Typ: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * Bild-Link
     */
    src: string;

    /**
     * Bildtitel
     *
     * @description Wird für das alt-Attribut des Bildes verwendet
     */
    title?: string;

    /**
     * Bild-Vorschau-Link
     *
     * @description Für bessere Ladeleistung verwenden wir zuerst dieses Thumbnail in der Liste
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * Suchaktion
     */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * Standardergebnis beim Öffnen der Liste
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * Weitere Aktion abrufen
     *
     * @description Es wird ausgelöst, wenn die Liste zum unteren Rand scrollt. Wenn Ihr Suchdienst Paginierung unterstützt, sollten Sie dies setzen, um unendliches Scrollen zu erreichen
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- Erforderlich: Nein
- Details:
  Suchfunktionen anpassen, Sie können die Suchfunktion deaktivieren, indem Sie sie auf `false` setzen.

## noCopyright

- Typ: `boolean`
- Standard: `false`

Ob Copyright und Version in der Fußzeile verborgen werden sollen.

::: tip

Wir hoffen, dass Sie es eingeschaltet lassen können, um Waline zu unterstützen.

:::

## noRss

- Typ: `boolean`
- Standard: `false`

Ob RSS-Abonnement-Links verborgen werden sollen.

## recaptchaV3Key

- Typ: `string`
- Erforderlich: Nein

reCAPTCHA V3 ist ein von Google bereitgestellter Captcha-Dienst. Sie können den reCAPTCHA V3-Seitenschlüssel mit `recaptchaV3Key` hinzufügen, um ihn zu aktivieren. Beachten Sie, dass Sie auch die Umgebungsvariable `RECAPTCHA_V3_SECRET` für den Server setzen sollten.

## turnstileKey

- Typ: `string`
- Erforderlich: Nein

Turnstile ist ein von Cloudflare bereitgestellter Captcha-Dienst. Sie können den Turnstile-Seitenschlüssel mit `turnstileKey` hinzufügen, um ihn zu aktivieren. Beachten Sie, dass Sie auch die Umgebungsvariable `TURNSTILE_SECRET` für den Server setzen sollten.

## reaction

- Typ: `boolean | string[]`
- Standard: `false`

Emoji-Interaktionsfunktion zum Artikel hinzufügen, setzen Sie es auf `true`, um das Standard-Emoji bereitzustellen. Sie können das Emoji-Bild auch anpassen, indem Sie das Emoji-URL-Array setzen, und unterstützt maximal 8 Emojis.
