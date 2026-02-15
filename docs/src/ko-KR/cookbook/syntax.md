---
title: 댓글 형식 지원
icon: format
order: 2
---

댓글에서 지원되는 Markdown 문법은 다음과 같습니다.

<!-- more -->

## Markdown 지원

::: details 제목

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

::: details 텍스트

이 문장에는 **굵은체**、_기울임체_ 및 ~~취소선~~ 스타일 텍스트가 있습니다.

```md
This sentence has **bold**、_italic_ and ~~delete~~ style text.
```

:::

::: details 단락

이것은 단락입니다.

이것은 또 다른 단락입니다.

```md
This is a paragraph.

This is another paragraph.
```

:::

::: details 줄 바꾸기

이 지점에서  
줄 바꿈을 하고 싶습니다

```md
I would like to line break at  
this point
```

:::

::: details 인용문

> 인용문은 중첩할 수도 있습니다...
>
> > ...꺽쇠 기호를 바로 옆에 연속으로 사용하거나...
> >
> > > ...화살표 사이에 공백을 넣어서 중첩합니다.

```md
> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.
```

:::

::: details 비순서 목록

- `-`로 줄을 시작하여 목록을 만듭니다
- 2칸 들여쓰기로 하위 목록을 만듭니다:
  - 마커 문자를 변경하면 새 목록이 시작됩니다:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      줄 바꿈

      새 단락

- 정말 간단합니다!

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

::: details 순서 목록

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   줄 바꿈  
   또 줄 바꿈
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break  
   line break again
1. Integer molestie lorem at massa
```

:::

::: details 구분선

---

```md
---
```

:::

::: details 링크

[홈페이지](/)

```md
[HomePage](/)
```

:::

::: details 이미지

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details 테이블

|          가운데          |                  오른쪽 | 왼쪽                  |
| :----------------------: | ----------------------: | :-------------------- |
| 가운데 정렬은 `:-:` 사용 | 오른쪽 정렬은 `-:` 사용 | 왼쪽 정렬은 `:-` 사용 |
|            b             |               aaaaaaaaa | aaaa                  |
|            c             |                    aaaa | a                     |

```md
|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |
```

:::

::: details 코드

인라인 코드: `code`

```md
인라인 코드: `code`
```

블록 코드:

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

## 위 첨자 및 아래 첨자

`^`와 `~`를 사용하여 위 첨자와 아래 첨자를 표시합니다.

::: details 데모

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::

## 이모지

사용자가 구성한 이모티콘이나 기본 제공되는 Weibo 이모티콘 외에도, 완전한 Emoji 단축 이모티콘을 지원합니다.

::: details 데모

클래식:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

단축키:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

## 코드 블록 하이라이트

거의 모든 언어의 하이라이팅을 지원합니다.

::: details 데모

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

## 수학 공식

`$ ... $`를 사용하여 인라인 공식을, `$$ ... $$`를 사용하여 블록 레벨 공식을 만들 수 있습니다.

:::
::: details 데모

오일러 항등식 $e^{i\pi}+1=0$은 $\mathbb{R}^2$에서 아름다운 공식입니다.

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

## HTML 삽입

[보호 메커니즘](../guide/features/safety.md#comment-security)이 트리거되지 않는 한 HTML 콘텐츠를 자유롭게 추가할 수 있습니다.
