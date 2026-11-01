---
title: Поддерживаемое форматирование комментариев
icon: format
order: 2
---

Поддерживаемый в комментариях синтаксис Markdown приведён ниже.

<!-- more -->

## Поддержка Markdown

::: preview Заголовки

<!-- markdownlint-disable MD025 -->

# Заголовок1

<!-- markdownlint-enable MD025 -->

## Заголовок2

### Заголовок3

#### Заголовок4

##### Заголовок5

###### Заголовок7

:::

::: preview Текст

В этом предложении есть **полужирный**、_курсивный_ и ~~зачёркнутый~~ текст.

:::

::: preview Абзац

Это абзац.

Это другой абзац.

:::

::: details Перенос строки

Я хочу сделать перенос строки  
в этом месте

```md
I would like to line break at  
this point
```

:::

::: preview Цитаты

> Цитаты тоже могут быть вложенными...
>
> > ...если ставить знаки «больше» вплотную друг к другу...
> >
> > > ...или с пробелами между стрелками.

:::

::: preview Неупорядоченный список

- Создайте список, начав строку с `-`
- Делайте подсписки с отступом в 2 пробела:
  - Смена символа маркера начинает новый список:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      перенос строки

      Новый абзац

- Это просто!

:::

::: preview Упорядоченный список

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   перенос строки  
   перенос строки снова
1. Integer molestie lorem at massa

:::

::: preview Горизонтальная линия

---

:::

::: preview Ссылка

[Главная страница](/)

:::

::: preview Изображение

![Логотип](/logo.png)

:::

::: preview Таблица

|                  по центру                   |                                            справа | слева                                            |
| :------------------------------------------: | ------------------------------------------------: | :----------------------------------------------- |
| Для выравнивания по центру используйте `:-:` | Для выравнивания по правому краю используйте `-:` | Для выравнивания по левому краю используйте `:-` |
|                      b                       |                                         aaaaaaaaa | aaaa                                             |
|                      c                       |                                              aaaa | a                                                |

:::

::: preview Код

Встроенный код: `code`

Блок кода:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Верхние и нижние индексы

Используйте `^` и `~` для обозначения верхнего и нижнего индексов.

<!-- prettier-ignore-start -->

::: preview Демонстрация

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Эмодзи

Помимо настроенных пользователем или встроенных эмодзи Weibo, поддерживаются и полные наборы сокращённых смайликов Emoji.

<!-- prettier-ignore-start -->

::: preview Демонстрация

Классические:

:wink: :cry: :laughing: :yum:

Сокращения:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Подсветка блоков кода

Поддерживается подсветка почти для всех языков.

::: details Демонстрация

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

## Математические формулы

С помощью `$ ... $` можно создавать встроенные формулы, а с помощью `$$ ... $$` — блочные.

::: preview Демонстрация

Тождество Эйлера $e^{i\pi}+1=0$ — красивая формула в $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Встраивание HTML

Можно свободно добавлять любое HTML-содержимое, если только оно не активирует [механизм защиты](../guide/features/safety.md#безопасность-комментариев).
