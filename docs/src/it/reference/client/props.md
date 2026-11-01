---
title: Proprietà del componente
icon: config
---

## serverURL

- Tipo: `string`
- Obbligatorio: Sì

URL dell'indirizzo del server Waline

## path

- Tipo: `string`
- Valore predefinito: `window.location.pathname`

ID del percorso dell'articolo. Serve a distinguere le diverse _pagine articolo_ e a garantire che sotto la _pagina articolo_ venga caricata la lista di commenti corretta.

::: warning

Assicurati che il percorso di ogni _pagina articolo_ sia univoco, altrimenti potrebbe essere caricata la stessa lista di commenti.

- es. 1: se nel tuo sito `/example/path/` e `/example/path` sono la stessa pagina, probabilmente dovresti impostare `window.location.pathname.replace(/\/$/,'')`.
- es. 2: se archivi la documentazione inglese nella root e servi le altre lingue sotto `/zh/`, `/ja/` ecc., probabilmente dovresti impostare `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Tipo: `string`
- Valore predefinito: `navigator.language`
- Dettagli:
  - [Guida → I18n](../../guide/features/i18n.md#impostare-la-lingua)

Lingua di visualizzazione.

Valori disponibili:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'de'`
- `'es'`
- `'es-MX'`
- `'fr'`
- `'fr-FR'`
- `'id'`
- `'id-ID'`
- `'it'`
- `'it-IT'`
- `'jp'`
- `'jp-JP'`
- `'ko'`
- `'ko-KR'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`
- `'vi'`
- `'vi-VN'`

## locale

- Tipo: `WalineLocale`
- Valore predefinito: valore integrato in base a `lang`
- Dettagli:
  - [Ricettario → Personalizzare la localizzazione](../../cookbook/customize/locale.md)

Localizzazioni di Waline.

## emoji

- Tipo: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /** Emoji name show on tab */
    name: string;
    /** Current folder link */
    folder?: string;
    /** Common prefix of Emoji icons */
    prefix?: string;
    /** Type of Emoji icons, will be regarded as file extension */
    type?: string;
    /** Emoji icon show on tab */
    icon: string;
    /** Emoji image list */
    items: string[];
  }
  ```

- Valore predefinito: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Dettagli:
  - [Guida → Emoji](../../guide/features/emoji.md)

Impostazioni delle emoji.

## dark

- Tipo: `string | boolean`
- Valore predefinito: `false`

Supporto alla modalità scura

- Impostando un valore booleano, la modalità scura viene attivata o disattivata in base al suo valore.
- Impostandolo a `'auto'`, la modalità scura segue le impostazioni del dispositivo.
- Inserendo un selettore CSS, la modalità scura si attiva solo quando il selettore corrisponde a un nodo antenato di Waline.

::: tip Esempi

- **Docusaurus**: attiva la modalità scura impostando `data-theme="dark"` sull'elemento `<html>`. Devi quindi impostare `'html[data-theme="dark"]'` come opzione `dark`.

- **hexo-theme-fluid**: attiva la modalità scura impostando `data-user-color-scheme="dark"` sull'elemento `<html>`. Devi quindi impostare `'html[data-user-color-scheme="dark"]'` come opzione `dark`.

- **vuepress-theme-hope**: attiva la modalità scura aggiungendo la classe `theme-dark` all'elemento `<body>`. Devi quindi impostare `'body.theme-dark'` come opzione `dark`.

:::

Per i dettagli su stile personalizzato e modalità scura, vedi [Stile personalizzato](../../guide/features/style.md).

## commentSorting

- Tipo: `WalineCommentSorting`
- Valore predefinito: `'latest'`

Metodi di ordinamento della lista dei commenti. Valori disponibili: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Tipo: `string[]`
- Valore predefinito: `['nick','mail','link']`

Attributi dell'utente che commenta. Valori disponibili: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Tipo: `string[]`
- Valore predefinito: `[]`

Imposta i campi obbligatori; per impostazione predefinita il commento è anonimo. Valori disponibili:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Tipo: `string`
- Valore predefinito: `'enable'`

Stato della modalità di accesso. Valori disponibili:

- `'enable'`: abilita l'accesso (predefinito)
- `'disable'`: accesso disabilitato, gli utenti devono compilare i propri dati per commentare
- `'force'`: accesso forzato, gli utenti devono accedere per poter commentare

## wordLimit

- Tipo: `number | [number, number]`
- Valore predefinito: `0`

Limite di parole per commento. Se inserisci un singolo numero, indica il numero massimo di parole del commento. Nessun limite se impostato a `0`.

## pageSize

- Tipo: `number`
- Valore predefinito: `10`

Numero di commenti per pagina.

## imageUploader

- Tipo: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Obbligatorio: No

- Dettagli:
  - [Ricettario → Caricare immagini](../../cookbook/customize/upload-image.md)

Metodo personalizzato per caricare le immagini. Per impostazione predefinita le immagini vengono incorporate codificate in Base 64; puoi impostare questa opzione a `false` per disabilitare il caricamento delle immagini.

La funzione deve ricevere un oggetto immagine e restituire una Promise che fornisce l'indirizzo dell'immagine.

## highlighter

- Tipo: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Obbligatorio: No

- Dettagli:
  - [Ricettario → Personalizzare l'evidenziatore](../../cookbook/customize/highlighter.md)

**Evidenziazione del codice**: per impostazione predefinita usa `hanabi`. Alla funzione vengono passati il contenuto originale del blocco di codice e la lingua del blocco; deve restituire direttamente una stringa.

Puoi passare un tuo evidenziatore di codice oppure impostare `false` per disabilitare l'evidenziazione del codice.

## texRenderer

- Tipo: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Obbligatorio: No

- Dettagli:
  - [Ricettario → Personalizzare il renderer $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Personalizza il rendering di $\TeX$; per impostazione predefinita viene segnalato che la modalità anteprima non supporta $\TeX$. La funzione riceve due parametri: il primo indica se il contenuto va renderizzato a livello di blocco, il secondo è la stringa del contenuto $\TeX$; deve restituire una stringa HTML come risultato del rendering.

Puoi importare un renderer $\TeX$ per offrire la funzione di anteprima. Ti consigliamo di usare KaTeX o MathJax, oppure puoi impostare `false` per disabilitare l'analisi di $\TeX$.

## search

- Tipo: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /** Image link */
    src: string;

    /**
     * Image title
     *
     * Used for alt attribute of image
     */
    title?: string;

    /**
     * Image preview link
     *
     * For better loading performance, we will use this thumbnail first in the list
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /** Search action */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * Default result when opening list
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * Fetch more action
     *
     * It will be triggered when the list scrolls to the bottom. If your search service supports
     * paging, you should set this to achieve infinite scrolling
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- Obbligatorio: No
- Dettagli:
  Personalizza la funzione di ricerca; puoi disabilitarla impostando `false`.

## noCopyright

- Tipo: `boolean`
- Valore predefinito: `false`

Indica se nascondere copyright e versione nel piè di pagina.

::: tip

Ci auguriamo che tu lo lasci attivo per supportare Waline.

:::

## noRss

- Tipo: `boolean`
- Valore predefinito: `false`

Indica se nascondere i link di iscrizione RSS.

## recaptchaV3Key

- Tipo: `string`
- Obbligatorio: No

reCAPTCHA V3 è un servizio captcha fornito da Google. Puoi abilitarlo aggiungendo la site key di reCAPTCHA V3 con `recaptchaV3Key`. Ricorda che devi impostare anche la variabile d'ambiente `RECAPTCHA_V3_SECRET` sul server.

## turnstileKey

- Tipo: `string`
- Obbligatorio: No

Turnstile è un servizio captcha fornito da Cloudflare. Puoi abilitarlo aggiungendo la site key di Turnstile con `turnstileKey`. Ricorda che devi impostare anche la variabile d'ambiente `TURNSTILE_SECRET` sul server.

## reaction

- Tipo: `boolean | string[]`
- Valore predefinito: `false`

Aggiunge all'articolo la funzione di interazione con le emoji. Imposta `true` per usare le emoji predefinite; puoi anche personalizzare le immagini delle emoji passando un array di URL, con un massimo di 8 emoji.
