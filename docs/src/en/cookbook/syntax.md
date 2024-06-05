---
title: Comment Format Support
icon: format
order: 2
---

The supported Markdown syntax in comments is as follows.

<!-- more -->

## Markdown Support

::: details Headings

<!-- markdownlint-disable MD025 -->

# Heading1

<!-- markdownlint-enable MD025 -->

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading7

```md
# Heading1

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading7
```

:::

::: details Text

This sentence has **bold**、_italic_ and ~~delete~~ style text.

```md
This sentence has **bold**、_italic_ and ~~delete~~ style text.
```

:::

::: details Paragraph

This is a paragraph.

This is another paragraph.

```md
This is a paragraph.

This is another paragraph.
```

:::

::: details Line Break

I would like to line break at  
this point

```md
I would like to line break at  
this point
```

:::

::: details Blockquotes

> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

```md
> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.
```

:::

::: details Unordered List

- Create a list by starting a line with `-`
- Make sub-lists by indenting 2 spaces:

  - Marker character change forces new list start:

    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- It’s easy!

```md
- Create a list by starting a line with `-`
- Sub-lists are made by indenting 2 spaces:

  - Marker character change forces new list start:

    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- Very easy!
```

:::

::: details Ordered List

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa
```

:::

::: details HR

---

```md
---
```

:::

::: details Link

[HomePage](/)

```md
[HomePage](/)
```

:::

::: details Image

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details Table

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

```md
|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |
```

:::

::: details Code

Inline Code: `code`

```md
Inline Code: `code`
```

Block code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

````md
Block code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
````

:::

## Superscript and Subscript

Use `^` and `~` to mark the superscript and subscript.

::: details Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::

## Emojis

Besides user-configured or built-in Weibo emojis, we also support complete Emoji shorthand emoticons.

::: details Demo

Classic:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

Shortcuts:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

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

:::
::: details Demo

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

## Embed HTML

Feel free to add any HTML content unless triggering [the protection mechanism](../guide/features/safety.md#comment-security).
