---
title: コンポーネント Props
icon: config
---

## serverURL

- 型: `string`
- 必須: はい

Waline サーバーのアドレス URL

## path

- 型: `string`
- デフォルト: `window.location.pathname`

記事のパス ID。異なる _記事ページ_ を区別し、_記事ページ_ に対応する正しいコメントリストを読み込むために使用されます。

::: warning

各 _記事ページ_ のパスが一意であることを確認してください。そうでない場合、同じコメントリストが読み込まれる可能性があります。

- 例 1: サイト上の `/example/path/` と `/example/path` が同じページである場合、`window.location.pathname.replace(/\/$/,'')` と設定することを推奨します。
- 例 2: 英語ドキュメントをルートに配置し、他の言語のドキュメントを `/zh/`、`/ja/` などで提供する場合、`window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')` と設定することを推奨します。

:::

## lang

- 型: `string`
- デフォルト: `navigator.language`
- 詳細:
  - [ガイド → 国際化](../../guide/features/i18n.md#set-language)

表示言語。

使用可能な値:

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

- 型: `WalineLocale`
- デフォルト: `lang` に基づく組み込みの値
- 詳細:
  - [クックブック → ロケールのカスタマイズ](../../cookbook/customize/locale.md)

Waline のロケール設定。

## emoji

- 型: `(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /**
     * Emoji name show on tab
     */
    name: string;
    /**
     * Current folder link
     */
    folder?: string;
    /**
     * Common prefix of Emoji icons
     */
    prefix?: string;
    /**
     * Type of Emoji icons, will be regarded as file extension
     */
    type?: string;
    /**
     * Emoji icon show on tab
     */
    icon: string;
    /**
     * Emoji image list
     */
    items: string[];
  }
  ```

- デフォルト: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- 詳細:
  - [ガイド → 絵文字](../../guide/features/emoji.md)

絵文字の設定。

## dark

- 型: `string | boolean`
- デフォルト: `false`

ダークモードのサポート

- boolean を設定すると、その値に応じてダークモードが設定されます。
- `'auto'` に設定すると、デバイスの設定に応じてダークモードが表示されます。
- CSS セレクタを指定すると、そのセレクタが Waline の祖先ノードに一致する場合のみダークモードが有効になります。

::: tip 使用例

- **Docusaurus**: `<html>` タグ自体に `data-theme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションに `'html[data-theme="dark"]'` を設定する必要があります。

- **hexo-theme-fluid**: `<html>` タグ自体に `data-user-color-scheme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションに `'html[data-user-color-scheme="dark"]'` を設定する必要があります。

- **vuepress-theme-hope**: `<body>` タグ自体に `theme-dark` クラスを設定してダークモードを有効にします。そのため、`dark` オプションに `'body.theme-dark'` を設定する必要があります。

:::

カスタムスタイルとダークモードの詳細については、[カスタムスタイル](../../guide/features/style.md) を参照してください。

## commentSorting

- 型: `WalineCommentSorting`
- デフォルト: `'latest'`

コメントリストの並び替え方法。使用可能な値: `'latest'`、`'oldest'`、`'hottest'`

## meta

- 型: `string[]`
- デフォルト: `['nick','mail','link']`

レビュアーの属性。使用可能な値: `'nick'`、`'mail'`、`'link'`

## requiredMeta

- 型: `string[]`
- デフォルト: `[]`

必須フィールドを設定します。デフォルトは匿名で、使用可能な値:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- 型: `string`
- デフォルト値: `'enable'`

ログインモードのステータス。使用可能な値:

- `'enable'`: ログインを有効にする（デフォルト）
- `'disable'`: ログインを無効にする。ユーザーは情報を入力してコメントする必要があります
- `'force'`: 強制ログイン。ユーザーはログインしなければコメントできません

## wordLimit

- 型: `number | [number, number]`
- デフォルト: `0`

コメントの文字数制限。単一の数値を指定した場合、コメントの最大文字数になります。`0` に設定すると制限なしになります。

## pageSize

- 型: `number`
- デフォルト: `10`

1 ページあたりのコメント数。

## imageUploader

- 型: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- 必須: いいえ

- 詳細:
  - [クックブック → 画像のアップロード](../../cookbook/customize/upload-image.md)

カスタム画像アップロード方法。デフォルトの動作は画像を Base64 エンコードで埋め込みます。`false` に設定すると画像のアップロードを無効にできます。

この関数は画像オブジェクトを受け取り、画像アドレスを提供する Promise を返す必要があります。

## highlighter

- 型: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- 必須: いいえ

- 詳細:
  - [クックブック → ハイライターのカスタマイズ](../../cookbook/customize/highlighter.md)

**コードハイライト**。デフォルトでは `hanabi` を使用します。この関数はコードブロックの元のコンテンツとコードブロックの言語を受け取り、文字列を直接返す必要があります。

独自のコードハイライターを渡すことも、`false` に設定してコードハイライトを無効にすることもできます。

## texRenderer

- 型: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- 必須: いいえ

- 詳細:
  - [クックブック → $\TeX$ レンダラーのカスタマイズ](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

$\TeX$ レンダリングのカスタマイズ。デフォルトの動作は、プレビューモードが $\TeX$ をサポートしていないことを示すプロンプトを表示します。この関数は 2 つのパラメータを提供します。最初のパラメータはブロックレベルでレンダリングするかどうかを示し、2 番目のパラメータは $\TeX$ コンテンツの文字列で、レンダリング結果として HTML 文字列を返します。

$\TeX$ レンダラーをインポートしてプレビュー機能を提供できます。KaTeX または MathJax の使用を推奨します。または `false` に設定して $\TeX$ の解析を無効にすることもできます。

## search

- 型: `WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * Image link
     */
    src: string;

    /**
     * Image title
     *
     * @description Used for alt attribute of image
     */
    title?: string;

    /**
     * Image preview link
     *
     * @description For better loading performance, we will use this thumbnail first in the list
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * Search action
     */
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
     * @description It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- 必須: いいえ
- 詳細:
  検索機能をカスタマイズします。`false` に設定することで検索機能を無効にできます。

## noCopyright

- 型: `boolean`
- デフォルト: `false`

フッターに著作権とバージョン情報を非表示にするかどうか。

::: tip

Waline をサポートするために、この設定をオンのままにしておくことを希望します。

:::

## noRss

- 型: `boolean`
- デフォルト: `false`

RSS 購読リンクを非表示にするかどうか。

## recaptchaV3Key

- 型: `string`
- 必須: いいえ

reCAPTCHA V3 は Google が提供するキャプチャサービスです。`recaptchaV3Key` に reCAPTCHA V3 サイトキーを追加することで有効にできます。サーバー側で環境変数 `RECAPTCHA_V3_SECRET` も設定する必要があることに注意してください。

## turnstileKey

- 型: `string`
- 必須: いいえ

Turnstile は Cloudflare が提供するキャプチャサービスです。`turnstileKey` に Turnstile サイトキーを追加することで有効にできます。サーバー側で環境変数 `TURNSTILE_SECRET` も設定する必要があることに注意してください。

## reaction

- 型: `boolean | string[]`
- デフォルト: `false`

記事に絵文字インタラクション機能を追加します。`true` に設定するとデフォルトの絵文字が表示されます。絵文字の画像 URL の配列を設定してカスタマイズすることもでき、最大 8 つの絵文字をサポートします。
