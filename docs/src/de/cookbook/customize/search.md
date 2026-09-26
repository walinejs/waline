---
title: Emoticons-Suche anpassen
icon: search
---

Dieses Tutorial zeigt Ihnen, wie Sie den Emoji-Suchdienst über die Option `search` anpassen können, die von `@waline/client` bereitgestellt wird.

<!-- more -->

## Sucherergebnis-Konvertierung

Sie können unterschiedliche Ergebnisse erhalten, wenn Sie verschiedene Drittanbieter-Bildsuchdienste verwenden. Nachdem Sie das Suchergebnis erhalten haben, müssen Sie es in das von `@waline/client` geforderte Format konvertieren.

Für alle nachfolgenden Operationen erfordert `@waline/client`, dass Sie ein Array von Bildinformationen im folgenden Format zurückgeben:

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * Bild-Link
   */
  src: string;

  /**
   * Bild-Titel
   *
   * @description Wird für das Alt-Attribut des Bildes verwendet
   */
  title?: string;

  /**
   * Bild-Vorschau-Link
   *
   * @description Für eine bessere Ladeleistung verwenden wir zuerst dieses Thumbnail in der Liste
   *
   * @default src
   */
  preview?: string;
}

type WalineSearchResult = WalineSearchImageData[];
```

Sie müssen sicherstellen, dass jedes Objekt des Arrays mindestens das Attribut `src` enthält, um die Adresse des Bildes anzugeben.

Soweit möglich sollten Sie auch einen Alt-Text `title` angeben, um die Barrierefreiheit zu unterstützen und für den Fall eines Ausfalls des Bilddienstes.

Um das Laden der Liste zu beschleunigen, sollten Sie, solange der Bilddienst mehrere Größen von Bild-URLs zurückgeben kann, ein kleines Bild als `preview` wählen, um die Ladegeschwindigkeit des Listenbildes zu verbessern.

::: note

`@waline/client` kümmert sich nicht darum, ob es zusätzliche Eigenschaften im Bildergebnis gibt, sodass Sie andere Schlüssel aus dem zurückgegebenen Ergebnis nicht absichtlich entfernen müssen.

:::

## Such-Option

`@waline/client` bietet drei Unteroptionen zur Steuerung des Suchverhaltens:

```ts
interface WalineSearchOptions {
  /**
   * Such-Aktion
   */
  search: (word: string) => Promise<WalineSearchResult>;

  /**
   * Standardergebnis beim Öffnen der Liste
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>;

  /**
   * Mehr-Laden-Aktion
   *
   * @description Wird ausgelöst, wenn die Liste nach unten scrollt. Wenn Ihr Suchdienst Paging unterstützt, sollten Sie dies festlegen, um unendliches Scrollen zu erreichen
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
}
```

Da Sie mindestens die Suchlogik implementieren müssen, ist `search` erforderlich. `@waline/client` übergibt den Benutzer-Suchbegriff und ruft diese Optionsfunktion auf und wartet darauf, dass diese Funktion ein Promise zurückgibt, um das Suchergebnis abzuschließen.

Wir möchten, dass Benutzer beim Öffnen einige beliebte Bilder oder Emoji-Ergebnisse sehen, daher bieten wir die Funktion `default` an, um dieses Verhalten zu implementieren. Wenn Ihr Dienstanbieter eine Schnittstelle für beliebte Bilder oder Emoticons bereitstellt, sollten Sie diese Schnittstelle verwenden, um Inhalte zurückzugeben. Da das Standardverhalten dieser Funktion darin besteht, nach leeren Strings zu suchen, empfehlen wir, wenn Ihr Suchanbieter in dieser Situation leere Ergebnisse zurückgibt, eine kurze Implementierung zufälliger voreingestellter Wörter hinzuzufügen, um die Anzeige einer leeren Liste zu vermeiden.

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

Normalerweise unterstützt Ihr Suchdienst Paginierung, daher bieten wir eine Funktion `more` an, die ausgeführt wird, wenn der Benutzer nach unten wischt, und weitere Bilder lädt, damit Sie mehr Ergebnisse zurückgeben können. Für eine bessere Benutzererfahrung empfehlen wir, die Anzahl der Paginierung auf 20 - 40 festzulegen, d. h. es werden jedes Mal 20 - 40 Bilder geladen.

::: tip Ein Beispiel zum besseren Verständnis

Wenn der Benutzer auf die Suchschaltfläche klickt, lösen wir `default()` aus. Wenn diese Funktion fehlt, lösen wir `search('')` aus, und wir warten auf die Ausführung des Promise und rendern mit dem zurückgegebenen Ergebnis.

Wenn der Benutzer nach `smile` sucht, führen wir `search('smile')` aus. Angenommen, Sie geben jedes Mal 20 Ergebnisse zurück. Wenn der Benutzer weiter nach unten scrollt, lösen wir `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60)` ... aus.

:::

## Beispiele

::: details Standardimplementierung

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
