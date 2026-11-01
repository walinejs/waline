---
title: Propiedades del componente
icon: config
---

## serverURL

- Tipo: `string`
- Obligatorio: Sí

Dirección URL del servidor de Waline

## path

- Tipo: `string`
- Valor predeterminado: `window.location.pathname`

Identificador de ruta del artículo. Sirve para distinguir las distintas _páginas de artículo_ y garantizar que se cargue la lista de comentarios correcta en cada _página de artículo_.

::: warning

Asegúrate de que la ruta de cada _página de artículo_ sea única; de lo contrario, podría cargarse la misma lista de comentarios.

- Ej. 1: si en tu sitio `/example/path/` y `/example/path` son la misma página, probablemente debas usar `window.location.pathname.replace(/\/$/,'')`.
- Ej. 2: si guardas la documentación en inglés en la raíz y sirves la de otros idiomas en `/zh/`, `/ja/`, etc., probablemente debas usar `window.location.pathname.replace(/^\/(fr|jp|zh)\//, '/')`.

:::

## lang

- Tipo: `string`
- Valor predeterminado: `navigator.language`
- Detalles:
  - [Guía → I18n](../../guide/features/i18n.md#establecer-el-idioma)

Idioma de visualización.

Valores opcionales:

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
- Valor predeterminado: valor integrado según `lang`
- Detalles:
  - [Recetario → Personalizar el idioma](../../cookbook/customize/locale.md)

Configuración regional de Waline.

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

- Valor predeterminado: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`
- Detalles:
  - [Guía → Emoji](../../guide/features/emoji.md)

Configuración de los emojis.

## dark

- Tipo: `string | boolean`
- Valor predeterminado: `false`

Compatibilidad con el modo oscuro

- Si se indica un valor booleano, el modo oscuro se activará o desactivará según ese valor.
- Si lo estableces en `'auto'`, el modo oscuro se mostrará según la configuración del dispositivo.
- Si indicas un selector CSS, el modo oscuro solo se activará cuando el selector coincida con algún nodo antecesor de Waline.

::: tip Ejemplos

- **Docusaurus**: activa el modo oscuro estableciendo `data-theme="dark"` en la propia etiqueta `<html>`. Por eso debes usar `'html[data-theme="dark"]'` como opción `dark`.

- **hexo-theme-fluid**: activa el modo oscuro estableciendo `data-user-color-scheme="dark"` en la propia etiqueta `<html>`. Por eso debes usar `'html[data-user-color-scheme="dark"]'` como opción `dark`.

- **vuepress-theme-hope**: activa el modo oscuro añadiendo la clase `theme-dark` a la propia etiqueta `<body>`. Por eso debes usar `'body.theme-dark'` como opción `dark`.

:::

Para más detalles sobre estilos personalizados y el modo oscuro, consulta [Estilos personalizados](../../guide/features/style.md).

## commentSorting

- Tipo: `WalineCommentSorting`
- Valor predeterminado: `'latest'`

Métodos de ordenación de la lista de comentarios. Valores opcionales: `'latest'`, `'oldest'`, `'hottest'`

## meta

- Tipo: `string[]`
- Valor predeterminado: `['nick','mail','link']`

Atributos del usuario que comenta. Valores opcionales: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Tipo: `string[]`
- Valor predeterminado: `[]`

Campos obligatorios; de forma predeterminada, el comentario es anónimo. Valores opcionales:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Tipo: `string`
- Valor predeterminado: `'enable'`

Estado del modo de inicio de sesión, valores opcionales:

- `'enable'`: se permite iniciar sesión (predeterminado)
- `'disable'`: el inicio de sesión está desactivado, los usuarios deben rellenar sus datos para comentar
- `'force'`: inicio de sesión obligatorio, los usuarios deben iniciar sesión para comentar

## wordLimit

- Tipo: `number | [number, number]`
- Valor predeterminado: `0`

Límite de palabras del comentario. Si indicas un solo número, es el número máximo de palabras del comentario. No hay límite cuando se establece en `0`.

## pageSize

- Tipo: `number`
- Valor predeterminado: `10`

Número de comentarios por página.

## imageUploader

- Tipo: `WalineImageUploader | boolean`

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

- Obligatorio: No

- Detalles:
  - [Recetario → Subir imágenes](../../cookbook/customize/upload-image.md)

Método personalizado para subir imágenes. De forma predeterminada, las imágenes se incrustan codificadas en Base 64; puedes establecerlo en `false` para desactivar la subida de imágenes.

La función debe recibir un objeto de imagen y devolver una Promise que proporcione la dirección de la imagen.

## highlighter

- Tipo: `WalineHighlighter | boolean`

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

- Obligatorio: No

- Detalles:
  - [Recetario → Personalizar el resaltador](../../cookbook/customize/highlighter.md)

**Resaltado de código**; de forma predeterminada se usa `hanabi`. La función recibe el contenido original del bloque de código y el lenguaje del bloque. Debe devolver directamente una cadena.

Puedes usar tu propio resaltador de código o establecerlo en `false` para desactivar el resaltado.

## texRenderer

- Tipo: `WalineTeXRenderer | boolean`

  ```ts
  type WalineTeXRenderer = (blockMode: boolean, tex: string) => string;
  ```

- Obligatorio: No

- Detalles:
  - [Recetario → Personalizar el renderizador de $\TeX$](../../cookbook/customize/tex-renderer.md)
  - [MathJax](https://www.mathjax.org/)
  - [KaTeX](https://katex.org/)

Personaliza el renderizado de $\TeX$; de forma predeterminada se muestra un aviso de que el modo de vista previa no admite $\TeX$. La función recibe dos parámetros: el primero indica si debe renderizarse a nivel de bloque y el segundo es la cadena con el contenido $\TeX$; debe devolver una cadena HTML como resultado del renderizado.

Puedes importar un renderizador de $\TeX$ para ofrecer la vista previa. Te recomendamos usar KaTeX o MathJax, o puedes establecerlo en `false` para desactivar el análisis de $\TeX$.

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

- Obligatorio: No
- Detalles:
  Personaliza la función de búsqueda; puedes desactivarla estableciéndola en `false`.

## noCopyright

- Tipo: `boolean`
- Valor predeterminado: `false`

Indica si se ocultan el copyright y la versión en el pie de página.

::: tip

Esperamos que lo mantengas activo para apoyar a Waline.

:::

## noRss

- Tipo: `boolean`
- Valor predeterminado: `false`

Indica si se ocultan los enlaces de suscripción RSS.

## recaptchaV3Key

- Tipo: `string`
- Obligatorio: No

reCAPTCHA V3 es un servicio captcha de Google. Puedes añadir la clave de sitio de reCAPTCHA V3 con `recaptchaV3Key` para activarlo. Ten en cuenta que también debes configurar la variable de entorno `RECAPTCHA_V3_SECRET` en el servidor.

## turnstileKey

- Tipo: `string`
- Obligatorio: No

Turnstile es un servicio captcha de Cloudflare. Puedes añadir la clave de sitio de Turnstile con `turnstileKey` para activarlo. Ten en cuenta que también debes configurar la variable de entorno `TURNSTILE_SECRET` en el servidor.

## reaction

- Tipo: `boolean | string[]`
- Valor predeterminado: `false`

Añade la función de interacción con emojis al artículo: establece `true` para usar los emojis predeterminados, o personaliza las imágenes de los emojis indicando un array de URL de emojis. Admite un máximo de 8 emojis.
