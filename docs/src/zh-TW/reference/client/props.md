---
title: 元件屬性
icon: config
---

## serverURL

- 型別：`string`
- 必填：是

Waline 的伺服器位址。

## path

- 型別：`string`
- 預設值：`window.location.pathname`

目前 _文章頁_ 的路徑，用於區分不同的 _文章頁_，以確保正確讀取該 _文章頁_ 下的留言列表。

::: warning

請確保每個 _文章頁_ 路徑的唯一性，否則可能會出現不同 _文章頁_ 下載入相同留言列表的情況。

- 範例 1：如果你網站的 `/example/path/` 和 `/example/path` 對應同一個頁面，你可以將其設為 `window.location.pathname.replace(/\/$/,'')`。
- 範例 2：如果你想在網站的根目錄下存放中文文件，但在 `/en/`、`/ja/` 等資料夾存放其他語言文件，你可以將其設為 `window.location.pathname.replace(/^\/(en|fr|jp)\//, '/')`。

:::

## lang

- 型別：`string`
- 預設值：`navigator.language`
- 詳情：
  - [功能 → 多語言](../../guide/features/i18n.md#設定語言)

多語言支援。

可選值：

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

- 型別：`WalineLocale`
- 預設值：透過 `lang` 選項自動設定
- 詳情：
  - [Cookbook → 自訂語言](../../cookbook/customize/locale.md)

Waline 多語言設定。

## emoji

- 型別：`(WalineEmojiInfo | WalineEmojiPresets)[] | boolean`

  ```ts
  type WalineEmojiPresets = `http://${string}` | `https://${string}`;

  interface WalineEmojiInfo {
    /** 分頁標籤上的 Emoji 名稱 */
    name: string;
    /** 所在資料夾的連結 */
    folder?: string;
    /** Emoji 通用路徑前綴 */
    prefix?: string;
    /** Emoji 圖片的型別，會作為檔案副檔名使用 */
    type?: string;
    /** 分頁標籤顯示的 Emoji 圖示 */
    icon: string;
    /** Emoji 圖片列表 */
    items: string[];
  }
  ```

- 預設值：`['//unpkg.com/@waline/emojis@1.1.0/weibo']`

表情符號設定，詳見 [自訂表情符號](../../guide/features/emoji.md)

## dark

- 型別：`string | boolean`
- 預設值：`false`

深色模式支援。

- 設定布林值會依其值設定深色模式。
- 設定 `'auto'` 會依裝置的深色模式自動適應。
- 填入 CSS 選擇器會在對應選擇器生效時啟用深色模式。

::: tip 針對不同主題的範例

- **Docusaurus**：它會在 `<html>` 上透過設定 `data-theme="dark"` 開啟深色模式，那麼你需要將 `dark` 選項設為 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**：它會在 `<html>` 上透過設定 `data-user-color-scheme="dark"` 開啟深色模式。那麼你需要將 `dark` 選項設為 `'html[data-user-color-scheme="dark"]'`。

- **vuepress-theme-hope**：它會在 `<body>` 上新增 `theme-dark` class 來開啟深色模式。那麼你需要將 `dark` 選項設為 `body.theme-dark`。

:::

自訂樣式與深色模式詳見 [自訂樣式](../../guide/features/style.md)。

## commentSorting

- 型別：`WalineCommentSorting`
- 預設值：`'latest'`

留言列表排序方式。可選值：`'latest'`、`'oldest'`、`'hottest'`

## meta

- 型別：`string[]`
- 預設值：`['nick', 'mail', 'link']`

留言者相關屬性。可選值：`'nick'`、`'mail'`、`'link'`

## requiredMeta

- 型別：`string[]`
- 預設值：`[]`

設定**必填欄位**，預設為匿名，可選值：

- `[]`
- `['nick']`
- `['nick', 'mail']`

## login

- 型別：`string`
- 預設值：`'enable'`

登入模式狀態，可選值：

- `'enable'`：啟用登入（預設）
- `'disable'`：停用登入，使用者只能填寫資訊後留言
- `'force'`：強制登入，使用者必須註冊並登入後才能發表留言

## wordLimit

- 型別：`number | [number, number]`
- 預設值：`0`

留言字數限制。填入單一數字時為最大字數限制。設為 `0` 時無限制。

## pageSize

- 型別：`number`
- 預設值：`10`

留言列表分頁，每頁筆數。

## imageUploader

- 型別：`WalineImageUploader | boolean`
- 必填：否
- 詳情：

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- 參考：
  - [Cookbook → 自訂圖片上傳](../../cookbook/customize/upload-image.md)

自訂圖片上傳方法。預設行為是將圖片以 Base 64 編碼嵌入，你可以設為 `false` 以停用圖片上傳功能。

函式應該接收圖片物件，並傳回一個提供圖片位址的 Promise。

## highlighter

- 型別：`WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- 必填：否

- 詳情：
  - [Cookbook → 自訂程式碼高亮](../../cookbook/customize/highlighter.md)

**程式碼高亮**，預設使用一個 < 1kb 的簡單高亮器。函式傳入程式碼區塊的原始字元與程式碼區塊的語言。你應該直接傳回一個字串。

你可以傳入自己的程式碼高亮器，也可以設為 `false` 以停用程式碼高亮功能。

## texRenderer

- 型別：`WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- 必填：否

- 詳情：
  - [Cookbook → 自訂 $\TeX$ 渲染器](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

自訂 $\TeX$ 渲染，預設行為是提示預覽模式不支援 $\TeX$。函式提供兩個參數，第一個參數表示渲染模式是否為區塊層級，第二個參數是 $\TeX$ 的字串，並傳回一段 HTML 字串作為渲染結果。

你可以自行引入 $\TeX$ 渲染器並提供預覽渲染，建議使用 KaTeX 或 MathJax，也可以設為 `false` 以禁止渲染 $\TeX$。

## search

- 型別：`WalineSearchOptions | boolean`

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /** 圖片連結 */
    src: string;

    /**
     * 圖片標題
     *
     * 用於圖片的 alt 屬性
     */
    title?: string;

    /**
     * 圖片縮圖
     *
     * 為了更好的載入效能，我們會優先於列表中使用此縮圖
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /** 搜尋操作 */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * 開啟列表時顯示的預設結果
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * 取得更多的操作
     *
     * 會在列表捲動到底部時觸發，如果你的搜尋服務支援分頁功能，你應該設定此項以實現無限捲動
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currentCount: number) => Promise<WalineSearchResult>;
  }
  ```

- 必填：否
- 詳情：

自訂搜尋功能，設定 `false` 可停用搜尋。

## noCopyright

- 型別：`boolean`
- 預設值：`false`

是否隱藏頁尾版權資訊。

::: tip

我們希望你保持開啟以支援 Waline。

:::

## noRss

- 型別：`boolean`
- 預設值：`false`

是否隱藏 RSS 訂閱連結。

## recaptchaV3Key

- 型別：`string`
- 必填：否

reCAPTCHA V3 是 Google 提供的驗證碼服務，設定 reCAPTCHA V3 網站金鑰即可開啟該功能。伺服器需要同步設定 `RECAPTCHA_V3_SECRET` 環境變數。

## turnstileKey

- 型別：`string`
- 必填：否

Turnstile 是 Cloudflare 提供的驗證碼服務，設定 turnstileKey 網站金鑰即可開啟該功能。伺服器需要同步設定 `TURNSTILE_SECRET` 環境變數。

## reaction

- 型別：`boolean | string[]`
- 預設值：`false`

為文章增加表情符號互動功能，設為 `true` 會提供預設表情符號，也可以透過設定表情符號位址陣列來自訂表情符號圖片，最多支援 8 個表情符號。
