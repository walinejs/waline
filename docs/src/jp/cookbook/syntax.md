---
title: コメントで利用できる書式
icon: format
order: 2
---

コメントで利用できる Markdown 記法は次のとおりです。

<!-- more -->

## Markdown のサポート

::: preview 見出し

<!-- markdownlint-disable MD025 -->

# 見出し1

<!-- markdownlint-enable MD025 -->

## 見出し2

### 見出し3

#### 見出し4

##### 見出し5

###### 見出し7

:::

::: preview テキスト

この文には **太字**、_斜体_、~~打ち消し線~~ のテキストが含まれています。

:::

::: preview 段落

これは段落です。

これは別の段落です。

:::

::: details 改行

この位置で改行したい  
この行が続きます

```md
I would like to line break at  
this point
```

:::

::: preview 引用

> 引用は入れ子にもできます...
>
> > ...引用記号を隣り合わせて使うことで...
> >
> > > ...または記号の間にスペースを入れて入れ子にできます。

:::

::: preview 箇条書き

- `-` で行を始めるとリストを作成できます
- 2 スペースのインデントでサブリストを作成できます:
  - マーカー文字を変えると新しいリストが始まります:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      改行

      新しい段落

- 簡単です！

:::

::: preview 番号付きリスト

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   改行  
   もう一度改行
1. Integer molestie lorem at massa

:::

::: preview 水平線

---

:::

::: preview リンク

[ホームページ](/)

:::

::: preview 画像

![ロゴ](/logo.png)

:::

::: preview 表

|           中央            |                     右 | 左                     |
| :-----------------------: | ---------------------: | :--------------------- |
| 中央揃えには `:-:` を使用 | 右揃えには `-:` を使用 | 左揃えには `:-` を使用 |
|             b             |              aaaaaaaaa | aaaa                   |
|             c             |                   aaaa | a                      |

:::

::: preview コード

インラインコード: `code`

ブロックコード:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## 上付き文字と下付き文字

`^` と `~` を使って上付き文字と下付き文字を表します。

<!-- prettier-ignore-start -->

::: preview デモ

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## 絵文字

ユーザーが設定した絵文字や組み込みの Weibo 絵文字に加えて、完全な絵文字ショートハンド（顔文字）にも対応しています。

<!-- prettier-ignore-start -->

::: preview デモ

クラシック:

:wink: :cry: :laughing: :yum:

ショートカット:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## コードブロックのハイライト

ほぼすべての言語のシンタックスハイライトに対応しています。

::: details デモ

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

## 数式

`$ ... $` でインライン数式を、`$$ ... $$` でブロックレベルの数式を作成できます。

::: preview デモ

オイラーの等式 $e^{i\pi}+1=0$ は $\mathbb{R}^2$ における美しい数式です。

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## HTML の埋め込み

[保護機構](../guide/features/safety.md#コメントのセキュリティ) が作動しない限り、任意の HTML コンテンツを自由に追加できます。
