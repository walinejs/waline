---
title: Personalizar la búsqueda de emoticonos
icon: search
---

Este tutorial te explica cómo personalizar el servicio de búsqueda de emojis mediante la opción `search` que ofrece `@waline/client`.

<!-- more -->

## Conversión de los resultados de búsqueda

Puede que obtengas resultados distintos al usar distintos servicios de búsqueda de imágenes de terceros. Después de obtener el resultado de la búsqueda, debes convertirlo al formato que requiere `@waline/client`.

En cualquiera de las operaciones siguientes, `@waline/client` requiere que devuelvas un array con la información de las imágenes en el siguiente formato:

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

Debes asegurarte de que cada objeto del array contenga al menos el atributo `src` para indicar la dirección de la imagen.

Además, cuando sea posible, deberías proporcionar un texto alternativo `title` que ayude con la accesibilidad y sirva de respaldo por si falla el servicio de imágenes.

Para que la lista cargue más rápido, siempre que el servicio de imágenes pueda devolver URLs de varios tamaños, deberías elegir una imagen de tamaño pequeño como `preview` para mejorar la velocidad de carga de las imágenes de la lista.

::: note

A `@waline/client` no le importa que el resultado de la imagen tenga propiedades adicionales, así que no necesitas eliminar a propósito otras claves del resultado devuelto.

:::

## Opción de búsqueda

`@waline/client` ofrece tres subopciones para controlar el comportamiento de la búsqueda:

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

Como mínimo necesitas implementar la lógica de búsqueda, por lo que `search` es obligatorio. `@waline/client` pasará el término de búsqueda del usuario y llamará a esta opción, y esperará a que la función devuelva una Promise para obtener el resultado de la búsqueda.

Queremos que los usuarios vean algunas imágenes populares o resultados de emojis al abrir la búsqueda, así que ofrecemos la función `default` para implementar este comportamiento. Si tu proveedor de servicios ofrece una interfaz para imágenes o emoticonos populares, deberías usar esa interfaz para devolver el contenido. Además, como el comportamiento predeterminado de esta función es buscar una cadena vacía, si tu proveedor de búsqueda devuelve resultados vacíos en ese caso, te recomendamos añadir una implementación breve con palabras predefinidas aleatorias para evitar mostrar una lista vacía.

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

Normalmente, tu servicio de búsqueda admitirá paginación, así que ofrecemos una función `more` que se activa cuando el usuario se desplaza hasta el final y carga más imágenes, para que devuelvas más resultados. Para una mejor experiencia, recomendamos fijar el número de resultados por página entre 20 y 40, es decir, cargar de 20 a 40 imágenes cada vez.

::: tip Un ejemplo para entenderlo mejor

Cuando el usuario hace clic en el botón de búsqueda, activamos `default()`; si esta función no existe, activamos `search('')`, y esperamos a que la Promise se ejecute y renderizamos con el resultado devuelto.

Cuando el usuario busca `smile`, ejecutamos `search('smile')`. Supongamos que devuelves 20 resultados cada vez; cuando el usuario siga desplazándose hacia abajo, activaremos `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

## Ejemplos

::: details Implementación predeterminada

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
