---
title: コメントフォーマットのサポート
icon: format
order: 2
---

コメントでサポートされている Markdown 構文は以下の通りです。

<!-- more -->

## Markdown サポート

::: details 見出し

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

::: details テキスト

この文は**太字**、_斜体_、~~取り消し線~~のスタイルを持っています。

```md
This sentence has **bold**、_italic_ and ~~delete~~ style text.
```

:::

::: details 段落

これは段落です。

これは別の段落です。

```md
This is a paragraph.

This is another paragraph.
```

:::

::: details 改行

ここで改行  
したい場合

```md
I would like to line break at  
this point
```

:::

::: details 引用

> 引用はネストすることもできます...
>
> > ...大なり記号を連続して使うことで...
> >
> > > ...または矢印の間にスペースを入れることで。

```md
> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.
```

:::

::: details 順不同リスト

- `-` で始まる行でリストを作成する
- 2スペースのインデントでサブリストを作成する:
  - マーカー文字を変えると新しいリストが始まる:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      改行

      新しい段落

- 簡単！

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

::: details 順序付きリスト

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   改行  
   もう一度改行
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa
```

:::

::: details 水平線

---

```md
---
```

:::

::: details リンク

[ホームページ](/)

```md
[HomePage](/)
```

:::

::: details 画像

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details テーブル

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

::: details コード

インラインコード: `code`

```md
Inline Code: `code`
```

ブロックコード:

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

## 上付き文字と下付き文字

`^` と `~` を使って上付き文字と下付き文字を記述します。

::: details デモ

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::

## 絵文字

ユーザーが設定した絵文字や組み込みの Weibo 絵文字に加えて、完全な Emoji ショートハンド絵文字もサポートしています。

::: details デモ

クラシック:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

ショートカット:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

## コードブロックのハイライト

ほぼすべての言語でハイライト表示をサポートしています。

::: details デモ

```html
<!doctype html>
<html lang="en">
  <head>
    <script>
      // Just a lil' script to show off that inline JS gets highlighted
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

## 数式

`$ ... $` を使ってインライン数式を、`$$ ... $$` を使ってブロックレベルの数式を作成できます。

:::
::: details デモ

オイラーの等式 $e^{i\pi}+1=0$ は $\mathbb{R}^2$ における美しい公式です。

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
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

## HTML の埋め込み

[保護機構](../guide/features/safety.md#comment-security)を引き起こさない限り、任意の HTML コンテンツを自由に追加できます。
