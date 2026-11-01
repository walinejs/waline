---
title: Personalizza la ricerca delle emoji
icon: search
---

Questo tutorial ti mostra come personalizzare il servizio di ricerca delle emoji tramite l'opzione `search` fornita da `@waline/client`.

<!-- more -->

## Conversione dei risultati di ricerca

Servizi di ricerca immagini di terze parti diversi possono restituire risultati diversi. Dopo aver ottenuto il risultato della ricerca devi convertirlo nel formato richiesto da `@waline/client`.

Per ciascuna delle operazioni seguenti, `@waline/client` richiede che tu restituisca un array di informazioni sulle immagini nel seguente formato:

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
```

Devi assicurarti che ogni oggetto dell'array contenga almeno la proprietà `src` con l'indirizzo dell'immagine.

Quando possibile fornisci anche un testo alternativo `title`, utile per l'accessibilità e in caso di errore del servizio immagini.

Per rendere più rapido il caricamento della lista, se il servizio immagini può restituire URL di più dimensioni scegli un'immagine di piccole dimensioni come `preview`, così da velocizzare il caricamento delle immagini nell'elenco.

::: note

`@waline/client` non si preoccupa della presenza di proprietà aggiuntive nel risultato, quindi non devi rimuovere appositamente altre chiavi dall'oggetto restituito.

:::

## Opzione di ricerca

`@waline/client` fornisce tre sotto-opzioni per controllare il comportamento della ricerca:

```ts
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

Poiché devi implementare almeno la logica di ricerca, `search` è obbligatoria. `@waline/client` passa il termine cercato dall'utente, chiama questa funzione e attende che restituisca una Promise con il risultato della ricerca.

Vogliamo che gli utenti vedano subito alcune immagini o emoji popolari all'apertura: per questo forniamo la funzione `default`. Se il tuo provider offre un'API per le immagini o le emoji più popolari, usala per restituire i contenuti. Inoltre, poiché il comportamento predefinito di questa funzione è cercare una stringa vuota, se in questa situazione il provider restituisce risultati vuoti ti consigliamo di aggiungere una semplice implementazione che usi parole casuali predefinite, per evitare di mostrare una lista vuota.

```js
const search = (word) => {
  // ...
  // returning result
};

Waline.init({
  el: '#waline',
  // ...
  search: {
    search,
    default: () =>
      search(
        // random between 3 words
        ['laugh', 'cry', 'smile'][(Math.random() * 3) | 0],
      ),
  },
});
```

Di solito il tuo servizio di ricerca supporta la paginazione: per questo forniamo la funzione `more`, attivata quando l'utente scorre fino in fondo, che ti permette di restituire altri risultati. Per un'esperienza migliore consigliamo di impostare la dimensione della pagina tra 20 e 40, cioè caricare 20-40 immagini alla volta.

::: tip Un esempio per capire meglio

Quando l'utente clicca il pulsante di ricerca attiviamo `default()`; se questa funzione non è definita attiviamo `search('')`, poi attendiamo l'esecuzione della Promise e renderizziamo il risultato restituito.

Quando l'utente cerca `smile` eseguiamo `search('smile')`. Supponendo che tu restituisca 20 risultati alla volta, se l'utente continua a scorrere attiveremo `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60)` ...

:::

## Esempi

::: details Implementazione predefinita

@[code{33-79}](../../../../../packages/client/src/config/default.ts)

:::

::: details Tenor V1

```ts
interface FetchGifRequest {
  keyword: string;
  pos?: string;
}

type GifFormat =
  | 'gif'
  | 'mediumgif'
  | 'tinygif'
  | 'nanogif'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm';

interface MediaObject {
  preview: string;
  url: string;
  dims: number[];
  size: number;
}

interface GifObject {
  created: number;
  hasaudio: boolean;
  id: string;
  media: Record<GifFormat, MediaObject>[];
  tags: string[];
  title: string;
  itemurl: string;
  hascaption: boolean;
  url: string;
}

interface FetchGifResponse {
  next: string;
  results: GifObject[];
}

export const getTenorV1SearchOptions = (key = 'PAY5JLFIH6V6'): WalineSearchOptions => {
  const state = { next: '' };

  const fetchGif = ({ keyword, pos }: FetchGifRequest): Promise<FetchGifResponse> => {
    const baseUrl = `https://g.tenor.com/v1/search`;
    const query = new URLSearchParams('media_filter=minimal');

    query.set('key', key);
    query.set('limit', '20');
    query.set('pos', pos || '');
    query.set('q', keyword);

    return fetch(`${baseUrl}?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => <Promise<FetchGifResponse>>resp.json())
      .catch(() => ({ next: pos || '', results: [] }));
  };

  return {
    search: (word = '') =>
      fetchGif({ keyword: word }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
    more: (word) =>
      fetchGif({ keyword: word, pos: state.next }).then((resp) => {
        state.next = resp.next;

        return resp.results.map((item) => ({
          title: item.title,
          src: item.media[0].tinygif.url,
        }));
      }),
  };
};
```

:::
