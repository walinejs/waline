---
title: Client Intro
icon: intro
---

Waline official provides the [`@waline/client`](https://www.npmjs.com/package/@waline/client), written in Vue + TypeScript, and the size is only 54kb gzip.

## Introduce

You can use CDN or npm to import Waline. We provide with-style and no-style versions.

For details about Waline import, please refer to [Importing Client](./import.md).

## Initialization

You can use `Waline(options)` to initialize a Waline instance, where `el` and `serverURL` options are required. The `el` option should be the element or element selector that Waline mounts, and `serverURL` options should be the server URL.

For available options, please refer to [Reference → Client Options](../../reference/client.md).

## Syntax support

Waline has a good support for syntax.Besides using standard Markdown and GFM in the comment box, you can also embed HTML tags or use mathematical formulas.

You can learn about the complete syntax supported by Waline in the [Supported Syntax](./syntax.md) section.

## Features

Waline has many features, including login, avatar, multi-language, custom Emoji, image upload and real-time preview. You can try these features in the demo below.

Waline officially added support for simplified Chinese, traditional Chinese, English and Japanese, and you can also customize locales. See [I18n support](./i18n.md) for details.

Waline uses Gravatar, and also supports you to customize the default avatar, see [Server → Avatar config](../server/intro.md#avatar) for details.

You can easily use the presets provided by Waline or create new presets to customize the Emoji popup in the comment box, see [Custom Emoji](./emoji.md) for details.

Waline has built-in image upload support, coverting image to Base64 , you can customize the image upload through [`uploadImage`](../../reference/client.md#uploadimage) option.

## Custom Style

To let users adjust the style of Waline, Waline provides some configurable CSS variables. Waline also brings a built-in [Dark Mode Support](../../reference/client.md#dark), see [Custom Style](./style.md) for details.

## Comment and pageview statistics

Waline supports comment and pageview statistics. For more information, please refer to [View Statistics](./count.md).

## SPA support

Waline brings support for SPA (**S**ingle **P**age **A**pplication). If you are using an app with `history.pushState`, you can use the `update()` method of the `Waline()` instance to refresh config for the comment area, or you can use the `destory()` method on the instance to destroy Waline instance. See [SPA Support](./spa.md) for details.

## Accessibility support

Waline fully complies with all accessibility standards in the V1 version:

- All icons and controls have their corresponding accessibility labels.
- You can use the keyboard or head-mounted pointing device to complete the interaction with all Waline controls.

This is our little support for the visually impaired and mobility impaired people around the world! :heart:

## Ecosystem

You can easily use Waline with plugins on Hexo, VuePress and other tools, and even use third-party clients.

For details about third-party clients, themes and plugins that support Waline, please see [Learn more → Ecosystem](../../advanced/ecosystem.md).
