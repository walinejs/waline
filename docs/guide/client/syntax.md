# 评论格式支持

你可以在评论中添加多样化的内容，包括经过扩展的 Markdown 语法和 HTML 标签。

<!-- more -->

## Markdown 支持

我们支持完整的 Markdown 语法，同时支持以下扩展。

### Github 风格语法

::: details 删除线

~~此单词~~被删除。

```md
~~此单词~~被删除。
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

### 上下角标

使用 `^` 和 `~` 进行上下角标的标记。

::: details 案例

- 19<sup>th</sup>
- H<sub>2</sub>O

```md
- 19^th^
- H~2~O
```

:::

### Emoji 表情

除了用户自行配置或内置的微博表情包外，我们还支持完整的 Emoji 简写表情。

::: details 案例

:) :( :smile: :laughing: :blush: :smiley: :smirk: :heart_eyes: :kissing_heart:

```md
:) :( :smile: :laughing: :blush: :smiley: :smirk: :heart_eyes: :kissing_heart:
```

:::

### 代码块高亮

我们支持几乎所有语言的高亮。

::: details 案例

```html
<!DOCTYPE html>
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
      'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'
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
  font: 100% Rockwell, Arvo, serif;
}
```

:::

### 数学公式

你可以使用 `$ ... $` 创建行内公式，使用 `$$ ... $$` 创建块级公式。

::: details 例子

<MathML content='Euler’s identity <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mi>e</mi><mrow><mi>i</mi><mi>π</mi></mrow></msup><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></mrow></math> is a beautiful formula in <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mi mathvariant="double-struck">R</mi><mn>2</mn></msup></mrow></math>.' />

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

<MathML content='<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><msup><mi mathvariant="normal">∂</mi><mi>r</mi></msup><mrow><mi mathvariant="normal">∂</mi><msup><mi>ω</mi><mi>r</mi></msup></mrow></mfrac><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mo>=</mo><mrow><mo fence="true">(</mo><mfrac><msup><mi>y</mi><mi>ω</mi></msup><mi>ω</mi></mfrac><mo fence="true">)</mo></mrow><mrow><mo fence="true">{</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mi>r</mi></msup><mo>+</mo><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>r</mi></munderover><mfrac><mrow><mo stretchy="false">(</mo><mo>−</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mi>i</mi></msup><mi>r</mi><mo>⋯</mo><mo stretchy="false">(</mo><mi>r</mi><mo>−</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>y</mi><msup><mo stretchy="false">)</mo><mrow><mi>r</mi><mo>−</mo><mi>i</mi></mrow></msup></mrow><msup><mi>ω</mi><mi>i</mi></msup></mfrac><mo fence="true">}</mo></mrow></mrow></math>' />

<script>
import { h, ref } from 'vue'

const MathML = (props, ctx) => h(
  'div',
  {
    class: 'math-ml',
    innerHTML:props.content
  }
);

export default {
  components: {
    MathML,
  },
}
</script>

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

## 嵌入 HTML

你可以在不触发下文保护机制的情况下自由嵌入任何的 HTML 内容。

## 限制

### 防止恶意内容植入

- 为了防止用户在评论区创建可提交的表单欺骗其他访客提交信息，你无法使用 `<form>` 与 `<input>`

- 为了防止用户利用样式纂改网站页面或修改自身评论样式植入垃圾广告，`<style>` 标签和元素上的 `style` 属性均不可用。

- 为了防止用户滥用媒体自动播放功能，你无法使用 `autoplay` 属性。

### XSS 防范

- 我们在服务端使用 DOMPurify 过滤每一个评论输入，以防止潜在的 XSS 攻击。这意味着你将不能使用 `<iframe>` 以及任何形式的脚本。

- 所有的链接都会被自动设置 `rel="noreferrer noopener"` 并使用 `target="_blank"` 在新窗口中打开。

### 受限的预览功能

为了控制客户端一侧的 `@waline/client` 体积大小，很多功能会**正确的渲染在评论区**，但它们并**不能在预览模式正确显示**。

这包含如下限制:

- 标准的 emoji 语法 (如 :tada:`:tada:`) 无法正确渲染

- 上下角标 (如: `H~2~O`、`x^2^`) 无法正确渲染

- Tex 语法，也就是数学公式 (如: `$a = 1$`) 默认无法渲染。

  你可以通过设置 `math` 选项来设置预览时的 Tex 渲染。

- 代码块将通过特定分隔符使用随机颜色进行高亮

::: tip 运行原理

1. 考虑到体积问题，客户端使用 `marked` 进行渲染并默认使用 `hanabi` 进行高亮，同时不包含 Tex 渲染器，导致以上限制。

1. 用户提交评论时，客户端嵌入自定义 Emoji 表情图片、并将评论原文会发送到服务端。

1. 服务端接收到原文，使用 `markdown-it` 以相关插件对 markdown 进行正确的渲染，同时使用 `prismjs` 为代码块根据语言进行高亮，并按照用户设置进行 Tex 渲染，最后执行 XSS 处理。

1. 处理完成后，服务端会将正确的渲染内容进行储存，并在需要时返回给客户端，保证评论区正常显示。

:::
