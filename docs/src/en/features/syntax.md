---
title: Comment Format Support
icon: format
redirectFrom: /en/guide/client/syntax.html
---

You can add different contents to comment, including extended Markdown syntax and HTML tags.

<!-- more -->

## Format Support

We support the full CommonMark (standard Markdown syntax), along with the following extensions:

- GFM style table
- GFM style strike through
- Subscript and superscript
- Emoji
- Code block highlighting
- $\TeX$ formula

::: info GFM

Github Flavored Markdown

:::

Meanwhile, you can freely embed any HTML content without triggering the following protection mechanism.

## HTML Content Restrictions

::: info Spam protection

- To prevent users from creating submitable forms in the comment area to trick other visitors submitting information, `<form>` and `<input>` are not allowed

- To prevent users from using style tag to revise website pages or modify their own comment styles to implant spam ads, the `<style>` tag and the `style` attribute are not allowed.

- To prevent users from abusing media autoplay feature, `autoplay` attribute is not allowed.

:::

::: info XSS prevention

- We use [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize every comment input to prevent potential XSS attacks. This means you can't use `<iframe>` or any form of script.

- All links will be automatically set `rel="noreferrer noopener"` and opened in a new window with `target="_ blank"`.

:::

## Limited Preview Support

In order to control the size of the client, we only place a small Markdown parser in the official client `@waline/client`, which causes many grammars to not display correctly in the preview panel (they can be **correctly rendered in the comment area**).

This includes the following restrictions:

- Standard emoji syntax (eg :tada:`:tada:`) does not render correctly

- The upper and lower subscripts (eg: `H~2~O`, `x^2^`) cannot be rendered correctly

- Tex syntax, i.e. math formulas (eg: `$a = 1$`) cannot be rendered by default.

  When using the official client, you can customize the Tex rendering in preview by setting the `texRenderer` option, see [Cookbook → Use a custom TEX renderer](../../cookbook/tex.md).

- Under the default highlighter, code blocks will be highlighted with random colors with specific delimiters.

  When using the official client, you can customize the code highlighting when previewing by setting the `highlighter` option, see [Cookbook → Custom Code Highlighting](../../cookbook/highlight.md).

## More

::: tip Principle

1. Considering package size, the client uses `marked` for rendering and uses a < 1kb highlighter for highlighting by default, and does not include a Tex renderer, resulting in the above limitations.

1. When a user submits a comment, the client embeds a custom Emoji image and sends the original comment to the server.

1. The server receives the original text, uses `markdown-it` to render markdown correctly with relevant plug-ins, uses `prismjs` to highlight code blocks according to the language, and performs Tex rendering according to user settings, and finally performs XSS processing .

1. After the processing is completed, the server will store the correct rendering content and return it to the client when needed to ensure the normal display of the comment area.

:::