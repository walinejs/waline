---
title: 评论格式支持
icon: format
order: 2
---

评论中支持的 Markdown 语法如下。

<!-- more -->

## Markdown 支持

::: details 标题

<!-- markdownlint-disable MD025 -->

# 一级标题

<!-- markdownlint-enable MD025 -->

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

```md
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

:::

::: details 文本

这句话里拥有**加粗**、*倾斜*和~~删除~~

```md
这句话里拥有**加粗**、*倾斜*和~~删除~~
```

:::

::: details 段落

这是一个段落。

这是另一个段落。

```md
这是一个段落

这是另一个段落。
```

:::

::: details 换行

这是一句话不过我要在这里  
换行

```md
这是一句话不过我要在这里  
换行
```

:::

::: details 引用

> 引用也可以连用
>
> > 可以添加额外的大于号制造更深的引用

```md
> 引用也可以连用
>
> > 可以添加额外的大于号制造更深的引用
```

:::

::: details 无序列表

- 无序列表项
- 无序列表项

  - 列表中的列表项
    - 更多的列表项
    - 更多的列表项
    - 更多的列表项
  - 列表中的长列表项，这个列表项很长。

    而且由很多个段落构成。

    甚至最后一个段落还包含了[链接](#markdown-支持)。

- 无序列表项

```md
- 无序列表项
- 无序列表项

  - 列表中的列表项
    - 更多的列表项
    - 更多的列表项
    - 更多的列表项
  - 列表中的长列表项，这个列表项很长。

    而且由很多个段落构成。

    甚至最后一个段落还包含了[链接](#链接)。

- 无序列表项
```

:::

::: details 有序列表

1. 有序列表第一项
1. 有序列表第二项  
   第二项的需要换行  
   再次换行
1. 有序列表第三项

```md
1. 有序列表第一项
1. 有序列表第二项  
   第二项的需要换行  
   再次换行
1. 有序列表第三项
```

:::

::: details 分割线

---

```md
---
```

:::

::: details 链接

[主页](/)

```md
[主页](/)
```

:::

::: details 图片

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details 表格

|     居中      |         右对齐 | 左对齐         |
| :-----------: | -------------: | :------------- |
| 居中使用`:-:` | 右对齐使用`-:` | 左对齐使用`:-` |
|       b       |      aaaaaaaaa | aaaa           |
|       c       |           aaaa | a              |

```md
|     居中      |         右对齐 | 左对齐         |
| :-----------: | -------------: | :------------- |
| 居中使用`:-:` | 右对齐使用`-:` | 左对齐使用`:-` |
|       b       |      aaaaaaaaa | aaaa           |
|       c       |           aaaa | a              |
```

:::

::: details 代码

行内代码效果: `code`

```md
行内代码效果: `code`
```

块级代码:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

````md
块级代码:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
````

:::

## 上下角标

使用 `^` 和 `~` 进行上下角标的标记。

::: details 例子

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::

## Emoji 表情

除了用户自行配置或内置的微博表情包外，我们还支持完整的 Emoji 简写表情。

::: details 例子

经典方式:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

简写:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

## 代码块高亮

我们支持几乎所有语言的高亮。

::: details 例子

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

## 数学公式

你可以使用 `$ ... $` 创建行内公式，使用 `$$ ... $$` 创建块级公式。

::: details 例子

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

## 嵌入 HTML

你可以在不触发 [保护机制](../guide/features/safety.md#评论安全) 的情况下自由嵌入任何的 HTML 内容。
