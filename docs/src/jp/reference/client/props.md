---
title: コンポーネントのプロパティ
icon: config
---

## serverURL

- 型：`string`
- 必須：はい

Waline サーバーのアドレス URL

## path

- 型：`string`
- デフォルト：`window.location.pathname`

記事のパス ID です。異なる _記事ページ_ を区別し、_記事ページ_ の下で正しいコメントリストが読み込まれるようにするために使用します。

::: warning

各 _記事ページ_ のパスが一意であることを確認してください。そうでない場合、同じコメントリストが読み込まれる可能性があります。

- 例 1：サイト上で `/example/path/` と `/example/path` が同じページである場合は、`window.location.pathname.replace(/\/$/,'')` を設定するとよいでしょう。
- 例 2：英語のドキュメントをルートに置き、他の言語のドキュメントを `/zh/`、`/ja/` などで提供している場合は、`window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')` を設定するとよいでしょう。

:::

## lang

- 型：`string`
- デフォルト：`navigator.language`
- 詳細：
  - [ガイド → I18n](../../guide/features/i18n.md#言語を設定する)

表示言語です。

指定可能な値：

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

- 型：`WalineLocale`
- デフォルト：`lang` に基づく組み込み値
- 詳細：
  - [クックブック → ロケールのカスタマイズ](../../cookbook/customize/locale.md)

Waline のロケールです。

## emoji

- 型：`(string | WalineEmojiInfo)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /** タブに表示する絵文字の名前 */
    name: string;
    /** 現在のフォルダーへのリンク */
    folder?: string;
    /** 絵文字アイコンの共通プレフィックス */
    prefix?: string;
    /** 絵文字アイコンの種類。ファイル拡張子として扱われます */
    type?: string;
    /** タブに表示する絵文字アイコン */
    icon: string;
    /** 絵文字画像のリスト */
    items: string[];
  }
  ```

- デフォルト：`['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- 詳細：
  - [ガイド → 絵文字](../../guide/features/emoji.md)

絵文字の設定です。

## dark

- 型：`string | boolean`
- デフォルト：`false`

ダークモードのサポート

- 真偽値を設定すると、その値に応じてダークモードが設定されます。
- `'auto'` に設定すると、デバイスの設定に応じてダークモードが表示されます。
- CSS セレクターを指定すると、そのセレクターが Waline の祖先ノードに一致する場合にのみダークモードが有効になります。

::: tip 例

- **Docusaurus**：`<html>` タグ自体に `data-theme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションに `'html[data-theme="dark"]'` を設定する必要があります。

- **hexo-theme-fluid**：`<html>` タグ自体に `data-user-color-scheme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションに `'html[data-user-color-scheme="dark"]'` を設定する必要があります。

- **vuepress-theme-hope**：`<body>` タグ自体に `theme-dark` クラスを設定してダークモードを有効にします。そのため、`dark` オプションに `'body.theme-dark'` を設定する必要があります。

:::

カスタムスタイルとダークモードの詳細については、[カスタムスタイル](../../guide/features/style.md) を参照してください。

## commentSorting

- 型：`WalineCommentSorting`
- デフォルト：`'latest'`

コメントリストの並び替え方法です。指定可能な値：`'latest'`、`'oldest'`、`'hottest'`

## meta

- 型：`string[]`
- デフォルト：`['nick','mail','link']`

コメントしたユーザーの属性です。指定可能な値：`'nick'`、`'mail'`、`'link'`

## requiredMeta

- 型：`string[]`
- デフォルト：`[]`

必須フィールドを設定します。デフォルトでは匿名です。指定可能な値：

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- 型：`string`
- デフォルト値：`'enable'`

ログインモードの状態です。指定可能な値：

- `'enable'`：ログインを有効にします（デフォルト）
- `'disable'`：ログインを無効にします。ユーザーは情報を入力してコメントする必要があります
- `'force'`：強制ログイン。ユーザーはログインしないとコメントできません

## wordLimit

- 型：`number | [number, number]`
- デフォルト：`0`

コメントの文字数制限です。単一の数値を指定した場合はコメントの最大文字数になります。`0` に設定すると制限はありません。

## pageSize

- 型：`number`
- デフォルト：`10`

1 ページあたりのコメント数です。

## imageUploader

- 型：`WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- 必須：いいえ

- 詳細：
  - [クックブック → 画像のアップロード](../../cookbook/customize/upload-image.md)

カスタムの画像アップロード方法です。デフォルトの動作では画像を Base 64 エンコードで埋め込みます。`false` に設定すると画像のアップロードを無効にできます。

関数は画像オブジェクトを受け取り、画像のアドレスを提供する Promise を返す必要があります。

## highlighter

- 型：`WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- 必須：いいえ

- 詳細：
  - [クックブック → ハイライターのカスタマイズ](../../cookbook/customize/highlighter.md)

**コードのハイライト**。デフォルトでは `hanabi` を使用します。関数にはコードブロックの元の内容と言語が渡されます。文字列を直接返してください。

独自のコードハイライターを渡すことも、`false` に設定してコードのハイライトを無効にすることもできます。

## texRenderer

- 型：`WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- 必須：いいえ

- 詳細：
  - [クックブック → $\TeX$ レンダラーのカスタマイズ](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

$\TeX$ のレンダリングをカスタマイズします。デフォルトの動作では、プレビューモードが $\TeX$ をサポートしていないことを通知します。関数には 2 つの引数が渡され、1 つ目はブロックレベルでレンダリングするかどうか、2 つ目は $\TeX$ コンテンツの文字列です。レンダリング結果として HTML 文字列を返してください。

$\TeX$ レンダラーをインポートしてプレビュー機能を提供できます。KaTeX または MathJax の使用をおすすめします。`false` に設定して $\TeX$ の解析を無効にすることもできます。

## search

- 型：`WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /** 画像へのリンク */
    src: string;

    /**
     * 画像のタイトル
     *
     * 画像の alt 属性に使用されます
     */
    title?: string;

    /**
     * 画像プレビューへのリンク
     *
     * 読み込みパフォーマンスを向上させるため、リストではこのサムネイルを優先して使用します
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /** 検索アクション */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * リストを開いたときのデフォルトの結果
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * さらに読み込むアクション
     *
     * リストが一番下までスクロールされたときに実行されます。検索サービスがページネーションに対応している場合は、無限スクロールを実現するためにここを設定してください
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- 必須：いいえ
- 詳細：
  検索機能をカスタマイズします。`false` に設定すると検索機能を無効にできます。

## noCopyright

- 型：`boolean`
- デフォルト：`false`

フッターの著作権表示とバージョンを非表示にするかどうか。

::: tip

Waline をサポートするため、表示したままにしていただけると嬉しいです。

:::

## noRss

- 型：`boolean`
- デフォルト：`false`

RSS 購読リンクを非表示にするかどうか。

## recaptchaV3Key

- 型：`string`
- 必須：いいえ

reCAPTCHA V3 は Google が提供するキャプチャサービスです。`recaptchaV3Key` で reCAPTCHA V3 のサイトキーを追加すると有効になります。サーバー側で環境変数 `RECAPTCHA_V3_SECRET` も設定する必要がある点に注意してください。

## turnstileKey

- 型：`string`
- 必須：いいえ

Turnstile は Cloudflare が提供するキャプチャサービスです。`turnstileKey` で Turnstile のサイトキーを追加すると有効になります。サーバー側で環境変数 `TURNSTILE_SECRET` も設定する必要がある点に注意してください。

## reaction

- 型：`boolean | string[]`
- デフォルト：`false`

記事に絵文字のインタラクション機能を追加します。`true` に設定するとデフォルトの絵文字が提供され、絵文字の URL 配列を設定して絵文字画像をカスタマイズすることもできます。最大 8 個の絵文字に対応しています。
