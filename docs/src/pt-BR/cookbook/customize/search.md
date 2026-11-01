---
title: Personalizar a busca de emojis
icon: search
---

Este tutorial mostra como personalizar o serviço de busca de emojis por meio da opção `search` fornecida pelo `@waline/client`.

<!-- more -->

## Conversão do resultado da busca

Você pode obter resultados diferentes ao usar diferentes serviços de busca de imagens de terceiros. Depois de obter o resultado da busca, você precisa convertê-lo para o formato exigido pelo `@waline/client`.

Para qualquer uma das operações a seguir, o `@waline/client` exige que você retorne um array de informações de imagem no seguinte formato:

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

Você precisa garantir que cada objeto do array contenha ao menos o atributo `src`, que indica o endereço da imagem.

Além disso, quando possível, você deve fornecer um `title` com texto alternativo para ajudar na acessibilidade e em caso de falha do serviço de imagens.

Para que a lista carregue mais rápido, sempre que o serviço de imagens conseguir retornar URLs de imagens em vários tamanhos, você deve escolher uma imagem de tamanho pequeno como `preview` para melhorar a velocidade de carregamento das imagens da lista.

::: note

O `@waline/client` não se importa se houver propriedades extras no resultado da imagem, então você não precisa remover deliberadamente outras chaves do resultado retornado.

:::

## Opção de busca

O `@waline/client` fornece três subopções para controlar o comportamento da busca:

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

Como você precisa implementar ao menos a lógica de busca, `search` é obrigatório. O `@waline/client` passa o termo buscado pelo usuário, chama a função dessa opção e aguarda que ela retorne uma Promise com o resultado da busca.

Queremos que os usuários vejam algumas imagens populares ou resultados de emojis ao abrir a busca, por isso fornecemos a função `default` para implementar esse comportamento. Se o seu provedor de serviço oferecer uma interface para imagens ou emoticons populares, você deve usá-la para retornar conteúdo. Além disso, como o comportamento padrão dessa função é buscar por uma string vazia, se o seu provedor retornar resultados vazios nessa situação, recomendamos adicionar uma implementação simples com palavras predefinidas aleatórias para evitar mostrar uma lista vazia.

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

Normalmente, seu serviço de busca oferece paginação, por isso fornecemos a função `more`, acionada quando o usuário rola até o fim, para carregar mais imagens e permitir que você retorne mais resultados. Para uma melhor experiência, recomendamos definir o número de itens por página entre 20 e 40, ou seja, carregar de 20 a 40 imagens por vez.

::: tip Um exemplo para ajudar a entender

Quando o usuário clica no botão de busca, acionamos `default()`; se essa função não existir, acionamos `search('')` e aguardamos a execução da Promise para renderizar com o resultado retornado.

Quando o usuário busca por `smile`, executamos `search('smile')`. Suponha que você retorne 20 resultados por vez: quando o usuário continuar rolando, acionaremos `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )` ...

:::

## Exemplos

::: details Implementação padrão

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
