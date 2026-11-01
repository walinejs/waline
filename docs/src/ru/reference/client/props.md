---
title: Свойства компонента
icon: config
---

## serverURL

- Тип: `string`
- Обязательно: да

URL-адрес сервера Waline

## path

- Тип: `string`
- Значение по умолчанию: `window.location.pathname`

Идентификатор пути статьи. Используется для различения разных _страниц статей_, чтобы под нужной _страницей статьи_ загружался правильный список комментариев.

::: warning

Убедитесь в уникальности пути каждой _страницы статьи_, иначе может загружаться один и тот же список комментариев.

- Пример 1: если на сайте `/example/path/` и `/example/path` — одна и та же страница, скорее всего, стоит задать `window.location.pathname.replace(/\/$/,'')`.
- Пример 2: если документация на английском размещена в корне, а документация других языков — в `/zh/`, `/ja/` и т. д., скорее всего, стоит задать `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Тип: `string`
- Значение по умолчанию: `navigator.language`
- Подробнее:
  - [Руководство → I18n](../../guide/features/i18n.md#установка-языка)

Язык отображения.

Допустимые значения:

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

- Тип: `WalineLocale`
- Значение по умолчанию: встроенное значение на основе `lang`
- Подробнее:
  - [Рецепты → Настройка локали](../../cookbook/customize/locale.md)

Локали Waline.

## emoji

- Тип: `(string | WalineEmojiInfo)[] | boolean`

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

- Значение по умолчанию: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Подробнее:
  - [Руководство → Эмодзи](../../guide/features/emoji.md)

Настройки эмодзи.

## dark

- Тип: `string | boolean`
- Значение по умолчанию: `false`

Поддержка тёмного режима

- Логическое значение включает или выключает тёмный режим в соответствии со своим значением.
- Значение `'auto'` включает тёмный режим в соответствии с настройками устройства.
- Если указать CSS-селектор, тёмный режим будет включаться только тогда, когда селектор совпадает с одним из родительских узлов Waline.

::: tip Примеры

- **Docusaurus**: включает тёмный режим, устанавливая `data-theme="dark"` на самом теге `<html>`. Поэтому в качестве параметра `dark` нужно задать `'html[data-theme="dark"]'`.

- **hexo-theme-fluid**: включает тёмный режим, устанавливая `data-user-color-scheme="dark"` на самом теге `<html>`. Поэтому в качестве параметра `dark` нужно задать `'html[data-user-color-scheme="dark"]'`.

- **vuepress-theme-hope**: включает тёмный режим, устанавливая класс `theme-dark` на самом теге `<body>`. Поэтому в качестве параметра `dark` нужно задать `'body.theme-dark'`.

:::

Подробнее о пользовательских стилях и тёмном режиме см. в разделе [Пользовательские стили](../../guide/features/style.md).

## commentSorting

- Тип: `WalineCommentSorting`
- Значение по умолчанию: `'latest'`

Способы сортировки списка комментариев. Допустимые значения: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Тип: `string[]`
- Значение по умолчанию: `['nick','mail','link']`

Атрибуты, запрашиваемые у пользователя, оставляющего комментарий. Допустимые значения: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Тип: `string[]`
- Значение по умолчанию: `[]`

Обязательные поля; по умолчанию комментарии анонимны. Допустимые значения:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Тип: `string`
- Значение по умолчанию: `'enable'`

Режим входа, допустимые значения:

- `'enable'`: вход включён (по умолчанию)
- `'disable'`: вход отключён, чтобы оставить комментарий, пользователи заполняют данные о себе
- `'force'`: принудительный вход, комментировать можно только после входа

## wordLimit

- Тип: `number | [number, number]`
- Значение по умолчанию: `0`

Ограничение длины комментария. Если указано одно число, это максимальное количество слов в комментарии. Значение `0` означает отсутствие ограничения.

## pageSize

- Тип: `number`
- Значение по умолчанию: `10`

Количество комментариев на странице.

## imageUploader

- Тип: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Обязательно: нет

- Подробнее:
  - [Рецепты → Загрузка изображений](../../cookbook/customize/upload-image.md)

Пользовательский способ загрузки изображений. По умолчанию изображения встраиваются в кодировке Base64; установите `false`, чтобы отключить загрузку изображений.

Функция должна принимать объект изображения и возвращать Promise с адресом изображения.

## highlighter

- Тип: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Обязательно: нет

- Подробнее:
  - [Рецепты → Настройка подсветки кода](../../cookbook/customize/highlighter.md)

**Подсветка кода**, по умолчанию используется `hanabi`. В функцию передаются исходное содержимое блока кода и язык этого блока. Функция должна вернуть строку напрямую.

Можно передать собственный подсветчик кода или установить `false`, чтобы отключить подсветку кода.

## texRenderer

- Тип: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Обязательно: нет

- Подробнее:
  - [Рецепты → Настройка отрисовки $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Настройка отрисовки $\TeX$; по умолчанию выводится сообщение о том, что режим предпросмотра не поддерживает $\TeX$. Функция принимает два параметра: первый указывает, нужно ли отрисовывать блоком, второй — строка содержимого $\TeX$; в качестве результата отрисовки возвращается HTML-строка.

Можно подключить собственный отрисовщик $\TeX$, чтобы обеспечить предпросмотр. Рекомендуем использовать KaTeX или MathJax, также можно установить `false`, чтобы отключить разбор $\TeX$.

## search

- Тип: `WalineSearchOptions | boolean`

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

- Обязательно: нет
- Подробнее:
  Настройка поиска, установите `false`, чтобы отключить функцию поиска.

## noCopyright

- Тип: `boolean`
- Значение по умолчанию: `false`

Скрывать ли копирайт и версию в нижнем колонтитуле.

::: tip

Надеемся, вы оставите эту возможность включённой в знак поддержки Waline.

:::

## noRss

- Тип: `boolean`
- Значение по умолчанию: `false`

Скрывать ли ссылки подписки на RSS.

## recaptchaV3Key

- Тип: `string`
- Обязательно: нет

reCAPTCHA V3 — сервис капчи от Google. Чтобы включить его, укажите ключ сайта reCAPTCHA V3 в параметре `recaptchaV3Key`. Учтите, что на сервере также нужно задать переменную окружения `RECAPTCHA_V3_SECRET`.

## turnstileKey

- Тип: `string`
- Обязательно: нет

Turnstile — сервис капчи от Cloudflare. Чтобы включить его, укажите ключ сайта Turnstile в параметре `turnstileKey`. Учтите, что на сервере также нужно задать переменную окружения `TURNSTILE_SECRET`.

## reaction

- Тип: `boolean | string[]`
- Значение по умолчанию: `false`

Добавляет статьям функцию эмодзи-реакций. Установите `true`, чтобы использовать эмодзи по умолчанию; можно также задать собственные изображения эмодзи, передав массив URL, — поддерживается не более 8 эмодзи.
