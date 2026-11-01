---
title: Props do Componente
icon: config
---

## serverURL

- Tipo: `string`
- Obrigatório: Sim

URL do endereço do servidor Waline

## path

- Tipo: `string`
- Padrão: `window.location.pathname`

ID do caminho do artigo. Usado para distinguir diferentes _páginas de artigo_ e garantir que a lista de comentários correta seja carregada na _página do artigo_.

::: warning

Certifique-se de que o caminho de cada _página de artigo_ seja único, caso contrário a mesma lista de comentários pode ser carregada.

- Exemplo 1: Se no seu site `/example/path/` e `/example/path` são a mesma página, provavelmente você deve definir `window.location.pathname.replace(/\/$/,'')`.
- Exemplo 2: Se você publica a documentação em inglês na raiz e as documentações em outros idiomas em `/zh/`, `/ja/`, etc., provavelmente você deve definir `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Tipo: `string`
- Padrão: `navigator.language`
- Detalhes:
  - [Guia → I18n](../../guide/features/i18n.md#definir-idioma)

Idioma de exibição.

Valores possíveis:

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
- Padrão: valor interno baseado em `lang`
- Detalhes:
  - [Livro de receitas → Personalizar Locale](../../cookbook/customize/locale.md)

Textos de idioma do Waline.

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

- Padrão: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Detalhes:
  - [Guia → Emoji](../../guide/features/emoji.md)

Configurações de emoji.

## dark

- Tipo: `string | boolean`
- Padrão: `false`

Suporte a modo escuro

- Definir um booleano ajustará o modo escuro de acordo com o seu valor.
- Definir como `'auto'` exibirá o modo escuro conforme as configurações do dispositivo.
- Preencher um seletor CSS habilitará o modo escuro apenas quando o seletor corresponder a nós ancestrais do Waline.

::: tip Exemplos

- **Docusaurus**: habilita o modo escuro ao definir `data-theme="dark"` na própria tag `<html>`. Portanto, você precisa definir `'html[data-theme="dark"]'` como opção `dark`.

- **hexo-theme-fluid**: habilita o modo escuro ao definir `data-user-color-scheme="dark"` na própria tag `<html>`. Portanto, você precisa definir `'html[data-user-color-scheme="dark"]'` como opção `dark`.

- **vuepress-theme-hope**: habilita o modo escuro ao definir a classe `theme-dark` na própria tag `<body>`. Portanto, você precisa definir `'body.theme-dark'` como opção `dark`.

:::

Para detalhes sobre estilo personalizado e modo escuro, consulte [Estilo Personalizado](../../guide/features/style.md).

## commentSorting

- Tipo: `WalineCommentSorting`
- Padrão: `'latest'`

Métodos de ordenação da lista de comentários. Valores possíveis: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Tipo: `string[]`
- Padrão: `['nick','mail','link']`

Atributos do usuário que comenta. Valores possíveis: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Tipo: `string[]`
- Padrão: `[]`

Define os campos obrigatórios; por padrão, anônimo. Valores possíveis:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Tipo: `string`
- Valor padrão: `'enable'`

Status do modo de login, valores possíveis:

- `'enable'`: habilita o login (padrão)
- `'disable'`: o login está desativado, os usuários devem preencher as informações para comentar
- `'force'`: login forçado, os usuários precisam entrar para comentar

## wordLimit

- Tipo: `number | [number, number]`
- Padrão: `0`

Limite de palavras do comentário. Quando um único número é informado, ele define o número máximo de palavras por comentário. Sem limite quando definido como `0`.

## pageSize

- Tipo: `number`
- Padrão: `10`

Número de comentários por página.

## imageUploader

- Tipo: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Obrigatório: Não

- Detalhes:
  - [Livro de receitas → Enviar Imagem](../../cookbook/customize/upload-image.md)

Método personalizado de envio de imagem. O comportamento padrão é incorporar as imagens codificadas em Base 64; você pode definir como `false` para desativar o envio de imagens.

A função deve receber um objeto de imagem e retornar uma Promise que fornece o endereço da imagem.

## highlighter

- Tipo: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Obrigatório: Não

- Detalhes:
  - [Livro de receitas → Personalizar Highlighter](../../cookbook/customize/highlighter.md)

**Destaque de código**: usa `hanabi` por padrão. A função recebe o conteúdo original do bloco de código e a linguagem do bloco de código. Você deve retornar uma string diretamente.

Você pode passar seu próprio destacador de código ou definir como `false` para desativar o destaque de código.

## texRenderer

- Tipo: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Obrigatório: Não

- Detalhes:
  - [Livro de receitas → Personalizar Renderizador $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Renderização personalizada de $\TeX$; o comportamento padrão é avisar que o modo de pré-visualização não suporta $\TeX$. A função fornece dois parâmetros: o primeiro indica se o conteúdo deve ser renderizado em nível de bloco, o segundo é a string do conteúdo $\TeX$, e o retorno é uma string HTML com o resultado da renderização.

Você pode importar um renderizador de $\TeX$ para oferecer o recurso de pré-visualização. Recomendamos usar KaTeX ou MathJax, ou você pode definir como `false` para desativar a análise de $\TeX$.

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

- Obrigatório: Não
- Detalhes:
  Personalize os recursos de busca; você pode desativar a função de busca definindo-a como `false`.

## noCopyright

- Tipo: `boolean`
- Padrão: `false`

Se deve ocultar os direitos autorais e a versão no rodapé.

::: tip

Esperamos que você mantenha esta opção ativada para apoiar o Waline.

:::

## noRss

- Tipo: `boolean`
- Padrão: `false`

Se deve ocultar os links de assinatura RSS.

## recaptchaV3Key

- Tipo: `string`
- Obrigatório: Não

O reCAPTCHA V3 é um serviço de captcha fornecido pelo Google. Você pode adicionar a site key do reCAPTCHA V3 com `recaptchaV3Key` para habilitá-lo. Observe que você também deve definir a variável de ambiente `RECAPTCHA_V3_SECRET` no servidor.

## turnstileKey

- Tipo: `string`
- Obrigatório: Não

O Turnstile é um serviço de captcha fornecido pela Cloudflare. Você pode adicionar a site key do Turnstile com `turnstileKey` para habilitá-lo. Observe que você também deve definir a variável de ambiente `TURNSTILE_SECRET` no servidor.

## reaction

- Tipo: `boolean | string[]`
- Padrão: `false`

Adiciona a função de interação com emoji ao artigo. Defina como `true` para usar os emojis padrão; você também pode personalizar as imagens de emoji definindo um array de URLs de emoji, com suporte a no máximo 8 emojis.
