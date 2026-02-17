---
title: 컴포넌트 Props
icon: config
---

## serverURL

- 타입: `string`
- 필수: 예

Waline 서버 주소 URL

## path

- 타입: `string`
- 기본값: `window.location.pathname`

글 경로 ID. _글 페이지_ 에서 올바른 댓글 목록을 로드할 수 있도록 서로 다른 _글 페이지_ 를 구분하는 데 사용됩니다.

::: warning

각 _글 페이지_ 경로의 고유성을 확인하세요. 그렇지 않으면 동일한 댓글 목록이 로드될 수 있습니다.

- 예시 1: 사이트에서 `/example/path/`와 `/example/path`가 같은 페이지라면, `window.location.pathname.replace(/\/$/,'')`로 설정해야 합니다.
- 예시 2: 루트에 영문 문서를 저장하고 다른 언어 문서를 `/zh/`, `/ja/` 등에 제공하는 경우, `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`로 설정해야 합니다.

:::

## lang

- 타입: `string`
- 기본값: `navigator.language`
- 상세:
  - [가이드 → 다국어](../../guide/features/i18n.md#set-language)

표시 언어.

선택 가능한 값:

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

- 타입: `WalineLocale`
- 기본값: `lang`에 기반한 내장 값
- 상세:
  - [쿡북 → 로케일 커스터마이즈](../../cookbook/customize/locale.md)

Waline 로케일 설정.

## emoji

- 타입: `(string | WalineEmojiInfo)[] | boolean`

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

- 기본값: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- 상세:
  - [가이드 → 이모지](../../guide/features/emoji.md)

이모지 설정.

## dark

- 타입: `string | boolean`
- 기본값: `false`

다크 모드 지원

- 불리언 값을 설정하면 해당 값에 따라 다크 모드가 설정됩니다.
- `'auto'`로 설정하면 기기 설정에 따라 다크 모드가 표시됩니다.
- CSS 선택자를 입력하면 해당 선택자가 Waline 상위 노드와 일치할 때만 다크 모드가 활성화됩니다.

::: tip 예시

- **Docusaurus**: `<html>` 태그에 `data-theme="dark"`를 설정하여 다크 모드를 활성화합니다. 따라서 `dark` 옵션을 `'html[data-theme="dark"]'`로 설정해야 합니다.

- **hexo-theme-fluid**: `<html>` 태그에 `data-user-color-scheme="dark"`를 설정하여 다크 모드를 활성화합니다. 따라서 `dark` 옵션을 `'html[data-user-color-scheme="dark"]'`로 설정해야 합니다.

- **vuepress-theme-hope**: `<body>` 태그에 `theme-dark` 클래스를 설정하여 다크 모드를 활성화합니다. 따라서 `dark` 옵션을 `'body.theme-dark'`로 설정해야 합니다.

:::

커스텀 스타일과 다크 모드에 대한 자세한 내용은 [커스텀 스타일](../../guide/features/style.md)을 참조하세요.

## commentSorting

- 타입: `WalineCommentSorting`
- 기본값: `'latest'`

댓글 목록 정렬 방식. 선택 가능한 값: `'latest'`, `'oldest'`, `'hottest'`

## meta

- 타입: `string[]`
- 기본값: `['nick','mail','link']`

댓글 작성자 속성. 선택 가능한 값: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- 타입: `string[]`
- 기본값: `[]`

필수 입력 필드 설정, 기본값은 익명이며, 선택 가능한 값:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- 타입: `string`
- 기본값: `'enable'`

로그인 모드 상태, 선택 가능한 값:

- `'enable'`: 로그인 활성화 (기본값)
- `'disable'`: 로그인 비활성화, 사용자는 정보를 입력하여 댓글을 작성해야 합니다
- `'force'`: 강제 로그인, 사용자는 로그인해야 댓글을 작성할 수 있습니다

## wordLimit

- 타입: `number | [number, number]`
- 기본값: `0`

댓글 글자 수 제한. 단일 숫자를 입력하면 최대 댓글 글자 수가 됩니다. `0`으로 설정하면 제한이 없습니다.

## pageSize

- 타입: `number`
- 기본값: `10`

페이지당 댓글 수.

## imageUploader

- 타입: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- 필수: 아니오

- 상세:
  - [쿡북 → 이미지 업로드](../../cookbook/customize/upload-image.md)

커스텀 이미지 업로드 방법. 기본 동작은 이미지를 Base 64로 인코딩하여 삽입하는 것이며, `false`로 설정하면 이미지 업로드를 비활성화할 수 있습니다.

이 함수는 이미지 객체를 받아 이미지 주소를 제공하는 Promise를 반환해야 합니다.

## highlighter

- 타입: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- 필수: 아니오

- 상세:
  - [쿡북 → 코드 하이라이터 커스터마이즈](../../cookbook/customize/highlighter.md)

**코드 하이라이팅**, 기본적으로 `hanabi`를 사용합니다. 이 함수는 코드 블록의 원본 내용과 코드 블록의 언어를 전달받습니다. 문자열을 직접 반환해야 합니다.

자체 코드 하이라이터를 전달하거나, `false`로 설정하여 코드 하이라이팅을 비활성화할 수 있습니다.

## texRenderer

- 타입: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- 필수: 아니오

- 상세:
  - [쿡북 → $\TeX$ 렌더러 커스터마이즈](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

$\TeX$ 렌더링 커스터마이즈, 기본 동작은 미리보기 모드에서 $\TeX$를 지원하지 않는다는 안내를 표시합니다. 이 함수는 두 개의 매개변수를 제공하며, 첫 번째 매개변수는 블록 레벨로 렌더링해야 하는지 여부를 나타내고, 두 번째 매개변수는 $\TeX$ 내용의 문자열이며, 렌더링 결과로 HTML 문자열을 반환합니다.

$\TeX$ 렌더러를 가져와 미리보기 기능을 제공할 수 있습니다. KaTeX 또는 MathJax 사용을 권장하며, `false`로 설정하여 $\TeX$ 파싱을 비활성화할 수도 있습니다.

## search

- 타입: `WalineSearchOptions | boolean`

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

- 필수: 아니오
- 상세:
  검색 기능을 커스터마이즈하며, `false`로 설정하면 검색 기능을 비활성화할 수 있습니다.

## noCopyright

- 타입: `boolean`
- 기본값: `false`

푸터에서 저작권 및 버전 정보를 숨길지 여부.

::: tip

Waline을 지원하기 위해 이 옵션을 유지해 주시길 바랍니다.

:::

## rss

- 타입: `boolean`
- 기본값: `false`

RSS 구독 링크를 표시할지 여부.

## recaptchaV3Key

- 타입: `string`
- 필수: 아니오

reCAPTCHA V3는 Google에서 제공하는 캡차 서비스입니다. `recaptchaV3Key`에 reCAPTCHA V3 사이트 키를 추가하여 활성화할 수 있습니다. 서버에도 환경 변수 `RECAPTCHA_V3_SECRET`를 설정해야 합니다.

## turnstileKey

- 타입: `string`
- 필수: 아니오

Turnstile은 Cloudflare에서 제공하는 캡차 서비스입니다. `turnstileKey`에 Turnstile 사이트 키를 추가하여 활성화할 수 있습니다. 서버에도 환경 변수 `TURNSTILE_SECRET`를 설정해야 합니다.

## reaction

- 타입: `boolean | string[]`
- 기본값: `false`

글에 이모지 반응 기능을 추가합니다. `true`로 설정하면 기본 이모지를 제공하며, 이모지 URL 배열을 설정하여 이모지 이미지를 커스터마이즈할 수도 있습니다. 최대 8개의 이모지를 지원합니다.
