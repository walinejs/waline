---
title: Client Intro
icon: intro
redirectFrom: /en/guide/client/intro.html
---

Waline officially provides [`@waline/client`](https://www.npmjs.com/package/@waline/client), written in Vue + TypeScript, the size is only 53kb gzip.

## Import

You can use CDN or npm to import Waline client, and we provide multiple versions of files to meet different scenarios.

If you have problems during this process, see:

- [Cookbook → CDN import](../../cookbook/import/cdn.md)
- [Cookbook → Project Import](../../cookbook/import/project.md)

## Use Waline

The easiest way to use Waline is [the way in the quick start](./README.md#importing-in-html-client), import the `init` function from Waline and initialize the Waline instance through `init(yourOptions)`.

In `init` options, two options `el` and `serverURL` are required. The former is the element or element selector mounted by Waline, and the latter is the server address. For all initialization parameters of `@waline/client`, see [Client Reference → API](../../reference/client/api.md) for details.

## Comment Counts

`@waline/client` also provides a sub-package of comment statistics, you can use it to display comment numbers in blog post list or other pages without comments. , see [Features → Comment Count](../features/comment.md) for details

## Pageview Counts

Waline supports pageview statistics. If you don't need comment service but just pageview function, Waline provides a statistics plugin whose Gzip size is < 1KB.

About `@waline/client` pageview count, see [Features → Pageview Count](../features/pageview.md)

## Comment Format Support

`@waline/client` supports many comment syntax. Besides standard Markdown and GFM syntax extensions, you can also embed HTML tags, use mathematical formulas in comment box, see [Features → Supported syntax](../features/syntax.md) for details.

`@waline/client` also supports real-time preview of comment input in the comment box, but some functions are dropped by default due to size reasons. If you wish to restore these functions, see:

- [Cookbook → Customize Preview Code Highlighter](../../cookbook/customize/highlighter.md)
- [Cookbook → Customize Preview $\TeX$ Renderer](../../cookbook/customize/tex-renderer.md)

## Article Reaction

Feel that writing a comment is too complicated? Waline allows your visitors to quickly express reactions to articles, such as likes, dislikes, doubts, boredom, surprises, etc. You can manually enable this feature, see [Features → Article Reactions](../features/reaction.md) .

## Comment Features

Waline supports many basic functions, including login, avatar, [multilingual](../features/i18n.md) and real-time preview.

Waline allows you to set interaction level labels and custom labels for users, see [User Labels](../features/label.md) for details.

## Emoji tab

`@waline/client` supports multiple Emoji tabs, and allows users to easily introduce Emoji tabs through presets. In addition to the official presets, you can easily create your own presets.

For details about the expression tab of `@waline/client`, see:

- [Features → Emoji tab](../features/emoji.md)
- [Cookbook → Customize Emoji](../../cookbook/customize/emoji.md)

## Inset Image

`@waline/client` has built-in image upload support, and by default images are converted to base64. Of course, you can also use your own image hosting service.

For the image upload settings of `@waline/client`, see [Cookbook → Customize Image Upload](../../cookbook/customize/upload-image.md) for details.

## Emoji Search

`@waline/client` provides meme search function through [giphy](https://giphy.com), and allows you to customize search service, see:

- [Features → Emoji Search](../features/search.md)
- [Cookbook → Customize emoticon search](../../cookbook/customize/search.md)

## Multilingual Support

`@waline/client` has built-in support for multiple languages, and you can add language support or modify UI text based on this, see:

- [Features → Set language](../features/i18n.md).
- [Cookbook → Customize Language](../../cookbook/customize/locale.md).

## Accessibility Support

Waline fully supports all accessibility standards:

- All icons and controls have their corresponding accessibility labels.
- You can interact with all of Waline's controls using either a keyboard or a head-mounted pointing device.

This is our little support for the visually impaired and mobility impaired people around the world! :heart:

## Customize Outlook

Waline brings built-in dark mode support, and in order to facilitate users to adjust the Waline style, Waline provides many configurable CSS variables (CSS Variables).

See [Custom Styles](../features/style.md) for details.

## Advanced Development

### Single Page Application Support

Waline brings support for SPA(**S**ingle **P**age **A**application, Single Page Application).

If you want to use it in a website or application based on the history API, you can use the `update()` method on the initialized instance to refresh the configuration of the comment area, or use the `destroy()` method on the instance to destroy it Waline. To learn more about the reactivity of `@waline/client`, see [Cookbook → Reactivity](../../cookbook/reactivity.md).

### Ecosystem

You can easily use Waline through plugins on Hexo, VuePress and other tools, and even use third-party clients.

For third-party clients, themes and plugins that support Waline, see [Learn more → Ecosystem](../../advanced/ecosystem.md).
