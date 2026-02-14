---
title: Client Intro
icon: client
order: 1
---

Waline officially provides the [`@waline/client`](https://www.npmjs.com/package/@waline/client), which is written in Vue + TypeScript and is only 53kb gzip in size.

## Import

You can use CDN or npm to import Waline client, and we provide multiple versions of files to meet different scenarios.

If you have problems during this process, see:

- [Cookbook → CDN import](../../cookbook/import/cdn.md)
- [Cookbook → Project Import](../../cookbook/import/project.md)

## Use Waline

The easiest way to use Waline is [using the method detailed in the quick start](./README.md#importing-in-html-client): import the `init` function from Waline and initialize the Waline instance through `init(yourOptions)`.

Among the `init` options, the `el` and `serverURL` are required. The former is the element or element selector on which Waline is mounted, and the latter is the server address. For all initialization parameters for `@waline/client`, see [Client Reference → API](../../reference/client/api.md).

## Comment Counts

`@waline/client` also provides a sub-package for comment statistics. You can use it to display the comment count in the blog post list or other pages that don't contain comments. For more details, see [Features → Comment Count](../features/comment.md) for details

## Pageview Counts

Waline supports pageview statistics. If you don't need a comment service but would like to use the pageview function, Waline provides a pageview statistics plugin whose Gzip size is < 1KB.

For more information about the `@waline/client` pageview count, see [Features → Pageview Count](../features/pageview.md)

## Comment Format Support

`@waline/client` supports many comment syntax and rich formatting. In addition to supporting standard Markdown and GFM syntax extensions, commenters can also embed HTML tags, use math equations, and more. For other syntax, see [Features → Supported syntax](../features/syntax.md) for details.

`@waline/client` also supports real-time preview of comment input in the comment box. That said, some functions are dropped by default due to size. If you wish to restore these functions, see:

- [Cookbook → Customize Preview Code Highlighter](../../cookbook/customize/highlighter.md)
- [Cookbook → Customize Preview $\TeX$ Renderer](../../cookbook/customize/tex-renderer.md)

## Article Reaction

Find comments too cumbersome? Waline allows your visitors to quickly express their reactions to articles, such as like, dislike, doubt, boredom, surprise, etc. To manually enable this feature, see [Features → Article Reactions](../features/reaction.md) .

## Comment Features

Waline supports a number of basic features, including login, avatars, [multiple languages](../features/i18n.md) and real-time preview.

Waline allows you to set up interaction level labels and custom labels for your users. For more details, see [User Labels](../features/label.md).

## Emoji tab

`@waline/client` supports multiple Emoji tabs, and allows users to easily introduce Emoji tabs via presets. You can easily create your own presets in addition to the official ones.

For more information about `@waline/client` emoji tabs, see:

- [Features → Emoji tab](../features/emoji.md)
- [Cookbook → Customize Emoji](../../cookbook/customize/emoji.md)

## Inset Image

`@waline/client` has a built-in image upload support. By default, images are converted to base64. That said, you can also use your own image hosting service.

For more info about the image upload settings of `@waline/client`, see [Cookbook → Customize Image Upload](../../cookbook/customize/upload-image.md).

## Emoji Search

`@waline/client` provides a meme and emoji search function via [giphy](https://giphy.com), and allows you to customize search service. See:

- [Features → Emoji Search](../features/search.md)
- [Cookbook → Customize emoticon search](../../cookbook/customize/search.md)

## Multilingual Support

`@waline/client` has built-in support for multiple languages, and you can add language support or modify UI text based on this. See:

- [Features → Set language](../features/i18n.md).
- [Cookbook → Customize Language](../../cookbook/customize/locale.md).

## Accessibility Support

Waline fully supports all accessibility standards:

- All icons and controls have their corresponding accessibility labels.
- You can interact with all of Waline's controls using either a keyboard or a head-mounted pointing device.

This is our way of supporting the visually impaired and mobility impaired people around the world! :heart:

## Customizable Styles

Waline comes with built-in dark mode support. To make it easier for users to adjust Waline's styles, we provide many configurable CSS variables.

See [Custom Styles](../features/style.md) for more details.

## Advanced Development

### Single Page Application Support

Waline supports SPAs (**S**ingle **P**age **A**applications).

If you want to use Waline in a website or application based on the history API, you can use the `update()` method on the initialized instance to refresh the configuration of the comment area, or use the `destroy()` method on the instance to destroy Waline. To learn more about the reactivity of `@waline/client`, see [Cookbook → Reactivity](../../cookbook/reactivity.md).

### Ecosystem

You can easily use Waline through plugins on tools like Hexo, VuePress, and even third-party clients.

For third-party clients, themes, and plugins that support Waline, see [Learn more → Ecosystem](../../advanced/ecosystem.md).
