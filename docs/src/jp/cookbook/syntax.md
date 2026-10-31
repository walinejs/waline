---
title: Comment Format Support
icon: format
order: 2
---

The supported Markdown syntax in comments is as follows.

<!-- more -->

## Markdown Support

::: preview Headings

<!-- markdownlint-disable MD025 -->

# Heading1

<!-- markdownlint-enable MD025 -->

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading7

:::

::: preview Text

This sentence has **bold**、_italic_ and ~~delete~~ style text.

:::

::: preview Paragraph

This is a paragraph.

This is another paragraph.

:::

::: details Line Break

I would like to line break at  
this point

```md
I would like to line break at  
this point
```

:::

::: preview Blockquotes

> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

:::

::: preview Unordered List

- Create a list by starting a line with `-`
- Make sub-lists by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- It’s easy!

:::

::: preview Ordered List

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa

:::

::: preview HR

---

:::

::: preview Link

[HomePage](/)

:::

::: preview Image

![Logo](/logo.png)

:::

::: preview Table

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

:::

::: preview Code

Inline Code: `code`

Block code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Superscript and Subscript

Use `^` and `~` to mark the superscript and subscript.

<!-- prettier-ignore-start -->

::: preview Demo

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emojis

Besides user-configured or built-in Weibo emojis, we also support complete Emoji shorthand emoticons.

<!-- prettier-ignore-start -->

::: preview Demo

Classic:

:wink: :cry: :laughing: :yum:

Shortcuts:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Code Block Highlight

We support highlighting in almost all languages.

::: details Demo

```html
<!doctype html>
<html lang="en">
  <head>
    <script>
      // Just a lil’ script to show off that inline JS gets highlighted
      window.console && console.log('foo');
    </script>
    <meta charset="utf-8" />
    <link rel="icon" href="assets/favicon.png" />
    <title>Prism</title>
    <link rel="stylesheet" href="assets/style.css" />
    <link rel="stylesheet" href="themes/prism.css" data-noprefix />
    <script src="assets/vendor/prefixfree.min.js"></script>

    <script>
      var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];
    </script>
    <script src="https://www.google-analytics.com/ga.js" async></script>
  </head>
  <body></body>
</html>
```

```js
/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
Prism.fileHighlight = function () {
  if (!logged) {
    console.warn(
      'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.',
    );
    logged = true;
  }
  Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};
```

```css
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
  src: url(https://lea.verou.me/logo.otf);
  font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
  font:
    100% Rockwell,
    Arvo,
    serif;
}
```

:::

## Mathematical formula

You can use `$ ... $` to create inline formulas, or use `$$ ... $$` to create block-level formulas.

::: preview Demo

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Embed HTML

Feel free to add any HTML content unless triggering [the protection mechanism](../guide/features/safety.md#comment-security).
