---
title: 留言格式支援
icon: format
order: 2
---

留言中支援的 Markdown 語法如下。

<!-- more -->

## Markdown 支援

::: preview 標題

<!-- markdownlint-disable MD025 -->

# 一級標題

<!-- markdownlint-enable MD025 -->

## 二級標題

### 三級標題

#### 四級標題

##### 五級標題

###### 六級標題

:::

::: preview 文字

這句話裡有**粗體**、*斜體*和~~刪除線~~

:::

::: preview 段落

這是一個段落。

這是另一個段落。

:::

::: details 換行

這是一句話不過我要在這裡  
換行

```md
這是一句話不過我要在這裡  
換行
```

:::

::: preview 引用

> 引用也可以連用
>
> > 可以加入額外的大於符號製造更深的引用

:::

::: preview 無序清單

- 無序清單項目
- 無序清單項目
  - 清單中的清單項目
    - 更多的清單項目
    - 更多的清單項目
    - 更多的清單項目
  - 清單中的長清單項目，這個清單項目很長。

    而且由很多個段落構成。

    甚至最後一個段落還包含了[連結](#markdown-支援)。

- 無序清單項目

:::

::: preview 有序清單

1. 有序清單第一項
1. 有序清單第二項  
   第二項需要換行  
   再次換行
1. 有序清單第三項

:::

::: preview 分隔線

---

:::

::: preview 連結

[首頁](/)

:::

::: preview 圖片

![Logo](/logo.png)

:::

::: preview 表格

|     置中      |         靠右對齊 | 靠左對齊         |
| :-----------: | ---------------: | :--------------- |
| 置中使用`:-:` | 靠右對齊使用`-:` | 靠左對齊使用`:-` |
|       b       |        aaaaaaaaa | aaaa             |
|       c       |             aaaa | a                |

:::

::: preview 程式碼

行內程式碼效果：`code`

區塊程式碼：

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## 上標與下標

使用 `^` 和 `~` 來標記上標與下標。

<!-- prettier-ignore-start -->

::: preview 範例

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emoji 表情符號

除了使用者自行設定或內建的微博表情符號外，我們還支援完整的 Emoji 簡寫表情。

<!-- prettier-ignore-start -->

::: preview 範例

經典方式：

:wink: :cry: :laughing: :yum:

簡寫：

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## 程式碼區塊高亮

我們支援幾乎所有語言的語法高亮。

::: details 範例

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

## 數學公式

你可以使用 `$ ... $` 建立行內公式，使用 `$$ ... $$` 建立區塊公式。

::: preview 範例

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## 嵌入 HTML

你可以在不觸發 [保護機制](../guide/features/safety.md#留言安全) 的情況下自由嵌入任何的 HTML 內容。
