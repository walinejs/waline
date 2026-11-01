---
title: Props du composant
icon: config
---

## serverURL

- Type : `string`
- Requis : Oui

URL du serveur Waline

## path

- Type : `string`
- Valeur par défaut : `window.location.pathname`

Identifiant du chemin de l'article. Sert à distinguer les différentes _pages d'article_ afin de garantir le chargement de la bonne liste de commentaires sous la _page d'article_ concernée.

::: warning

Veuillez vous assurer de l'unicité du chemin de chaque _page d'article_, sinon la même liste de commentaires risque d'être chargée .

- Exemple 1 : si sur votre site `/example/path/` et `/example/path` correspondent à la même page, vous devriez probablement définir `window.location.pathname.replace(/\/$/,'')`.
- Exemple 2 : si vous stockez la documentation anglaise à la racine et servez les autres langues sous `/zh/`, `/ja/`, etc., vous devriez probablement définir `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Type : `string`
- Valeur par défaut : `navigator.language`
- Détails :
  - [Guide → I18n](../../guide/features/i18n.md#definir-la-langue)

Langue d'affichage.

Valeurs possibles :

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

- Type : `WalineLocale`
- Valeur par défaut : valeur intégrée en fonction de `lang`
- Détails :
  - [Livre de recettes → Personnaliser les locales](../../cookbook/customize/locale.md)

Locales de Waline.

## emoji

- Type : `(string | WalineEmojiInfo)[] | boolean`

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

- Valeur par défaut : `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Détails :
  - [Guide → Emoji](../../guide/features/emoji.md)

Configuration des emojis.

## dark

- Type : `string | boolean`
- Valeur par défaut : `false`

Prise en charge du mode sombre

- Définir un booléen active ou désactive le mode sombre selon sa valeur.
- Le définir sur `'auto'` affiche le mode sombre selon les paramètres de l'appareil.
- Indiquer un sélecteur CSS n'active le mode sombre que lorsque le sélecteur correspond à un nœud ancêtre de Waline.

::: tip Exemples

- **Docusaurus** : il active le mode sombre en définissant `data-theme="dark"` sur la balise `<html>` elle-même. Vous devez donc définir `'html[data-theme="dark"]'` comme option `dark`.

- **hexo-theme-fluid** : il active le mode sombre en définissant `data-user-color-scheme="dark"` sur la balise `<html>` elle-même. Vous devez donc définir `'html[data-user-color-scheme="dark"]'` comme option `dark`.

- **vuepress-theme-hope** : il active le mode sombre en ajoutant la classe `theme-dark` sur la balise `<body>` elle-même. Vous devez donc définir `'body.theme-dark'` comme option `dark`.

:::

Pour en savoir plus sur les styles personnalisés et le mode sombre, consultez [Style personnalisé](../../guide/features/style.md).

## commentSorting

- Type : `WalineCommentSorting`
- Valeur par défaut : `'latest'`

Méthodes de tri de la liste des commentaires. Valeurs possibles : `'latest'`, `'oldest'`, `'hottest'`

## meta

- Type : `string[]`
- Valeur par défaut : `['nick','mail','link']`

Champs du commentateur. Valeurs possibles : `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type : `string[]`
- Valeur par défaut : `[]`

Définit les champs obligatoires ; par défaut, les commentaires sont anonymes. Valeurs possibles :

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type : `string`
- Valeur par défaut : `'enable'`

État du mode de connexion, valeurs possibles :

- `'enable'` : active la connexion (par défaut)
- `'disable'` : la connexion est désactivée, les utilisateurs doivent renseigner leurs informations pour commenter
- `'force'` : connexion forcée, les utilisateurs doivent se connecter pour commenter

## wordLimit

- Type : `number | [number, number]`
- Valeur par défaut : `0`

Limite de mots d'un commentaire. Lorsqu'un nombre unique est fourni, il correspond au nombre maximal de mots du commentaire. Aucune limite lorsque la valeur est `0`.

## pageSize

- Type : `number`
- Valeur par défaut : `10`

Nombre de commentaires par page.

## imageUploader

- Type : `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Requis : Non

- Détails :
  - [Livre de recettes → Téléverser une image](../../cookbook/customize/upload-image.md)

Méthode personnalisée de téléversement des images. Le comportement par défaut consiste à intégrer les images encodées en Base 64 ; vous pouvez définir cette option sur `false` pour désactiver le téléversement d'images.

La fonction doit recevoir un objet image et renvoyer une promesse fournissant l'adresse de l'image.

## highlighter

- Type : `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Requis : Non

- Détails :
  - [Livre de recettes → Personnaliser la coloration syntaxique](../../cookbook/customize/highlighter.md)

**Coloration syntaxique du code**, `hanabi` est utilisé par défaut. La fonction reçoit le contenu d'origine du bloc de code et le langage de ce bloc. Vous devez renvoyer directement une chaîne.

Vous pouvez fournir votre propre coloriseur de code, ou définir cette option sur `false` pour désactiver la coloration syntaxique.

## texRenderer

- Type : `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Requis : Non

- Détails :
  - [Livre de recettes → Personnaliser le rendu $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Personnalisez le rendu $\TeX$ ; le comportement par défaut consiste à indiquer que le mode aperçu ne prend pas en charge $\TeX$. La fonction reçoit deux paramètres : le premier indique si le rendu doit se faire au niveau bloc, le second est la chaîne du contenu $\TeX$ ; elle doit renvoyer une chaîne HTML comme résultat de rendu.

Vous pouvez importer un moteur de rendu $\TeX$ pour fournir la fonctionnalité d'aperçu. Nous vous recommandons d'utiliser KaTeX ou MathJax, ou vous pouvez définir cette option sur `false` pour désactiver l'analyse de $\TeX$.

## search

- Type : `WalineSearchOptions | boolean`

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

- Requis : Non
- Détails :
  Personnalisez la fonctionnalité de recherche ; vous pouvez désactiver la fonction de recherche en définissant cette option sur `false`.

## noCopyright

- Type : `boolean`
- Valeur par défaut : `false`

Indique s'il faut masquer le copyright et la version dans le pied de page.

::: tip

Nous espérons que vous le laisserez activé pour soutenir Waline.

:::

## noRss

- Type : `boolean`
- Valeur par défaut : `false`

Indique s'il faut masquer les liens d'abonnement RSS.

## recaptchaV3Key

- Type : `string`
- Requis : Non

reCAPTCHA V3 est un service de captcha fourni par Google. Vous pouvez ajouter la clé de site reCAPTCHA V3 avec `recaptchaV3Key` pour l'activer. Notez que vous devez également définir la variable d'environnement `RECAPTCHA_V3_SECRET` côté serveur.

## turnstileKey

- Type : `string`
- Requis : Non

Turnstile est un service de captcha fourni par Cloudflare. Vous pouvez ajouter la clé de site Turnstile avec `turnstileKey` pour l'activer. Notez que vous devez également définir la variable d'environnement `TURNSTILE_SECRET` côté serveur.

## reaction

- Type : `boolean | string[]`
- Valeur par défaut : `false`

Ajoute une fonction d'interaction par emoji à l'article ; définissez cette option sur `true` pour utiliser les emojis par défaut. Vous pouvez également personnaliser les images d'emoji en fournissant un tableau d'URL d'emojis, avec un maximum de 8 emojis.
