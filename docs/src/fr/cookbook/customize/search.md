---
title: Personnaliser la recherche d'emojis
icon: search
---

Ce tutoriel vous explique comment personnaliser le service de recherche d'emoji via l'option `search` fournie par `@waline/client`.

<!-- more -->

## Conversion des résultats de recherche

Vous pouvez obtenir des résultats différents selon le service de recherche d'images tiers utilisé. Après avoir obtenu le résultat de recherche, vous devez le convertir au format attendu par `@waline/client`.

Pour chacune des opérations ci-dessous, `@waline/client` exige que vous renvoyiez un tableau d'informations d'image au format suivant :

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

Vous devez vous assurer que chaque objet du tableau contient au moins l'attribut `src` pour indiquer l'adresse de l'image.

De plus, lorsque c'est possible, vous devriez fournir un texte alternatif `title` pour l'accessibilité et en cas de défaillance du service d'images.

Afin d'accélérer le chargement de la liste, dès que le service d'images peut renvoyer des URL de tailles différentes, vous devriez choisir une image de petite taille comme `preview` pour améliorer la vitesse de chargement des images de la liste.

::: note

`@waline/client` ne se soucie pas de la présence de propriétés supplémentaires dans le résultat d'image ; vous n'avez donc pas besoin de supprimer délibérément d'autres clés du résultat renvoyé.

:::

## Option de recherche

`@waline/client` fournit trois sous-options pour contrôler le comportement de recherche :

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

Comme vous devez implémenter au moins la logique de recherche, `search` est obligatoire. `@waline/client` transmet le terme recherché par l'utilisateur et appelle cette fonction optionnelle, puis attend que cette fonction renvoie une Promise pour compléter le résultat de recherche.

Nous souhaitons que les utilisateurs voient des images populaires ou des emojis à l'ouverture ; nous fournissons donc la fonction `default` pour implémenter ce comportement. Si votre fournisseur de service propose une interface pour les images ou émoticônes populaires, vous devriez l'utiliser pour renvoyer du contenu. De plus, comme le comportement par défaut de cette fonction est de rechercher une chaîne vide, si votre fournisseur de recherche renvoie un résultat vide dans ce cas, nous vous recommandons d'ajouter une implémentation brève de mots préréglés aléatoires pour éviter d'afficher une liste vide.

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

Généralement, votre service de recherche prend en charge la pagination ; nous fournissons donc une fonction `more` déclenchée lorsque l'utilisateur fait défiler jusqu'en bas, afin de charger plus d'images et de vous permettre de renvoyer plus de résultats. Pour une meilleure expérience, nous recommandons de définir le nombre d'éléments par page entre 20 et 40, c'est-à-dire de charger 20 à 40 images à chaque fois.

::: tip Un exemple pour mieux comprendre

Lorsque l'utilisateur clique sur le bouton de recherche, nous déclenchons `default()` ; si cette fonction est absente, nous déclenchons `search('')`, puis nous attendons l'exécution de la Promise et effectuons le rendu avec le résultat renvoyé.

Lorsque l'utilisateur recherche `smile`, nous exécutons `search('smile')`. Supposons que vous renvoyiez 20 résultats à chaque fois : lorsque l'utilisateur continue de faire défiler, nous déclenchons `more('smile', 20)`, `more('smile', 40)`, `more('smile', 60 )`...

:::

## Exemples

::: details Implémentation par défaut

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
