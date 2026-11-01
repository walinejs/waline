---
title: Hỗ trợ định dạng bình luận
icon: format
order: 2
---

Các cú pháp Markdown được hỗ trợ trong bình luận như sau.

<!-- more -->

## Hỗ trợ Markdown

::: preview Tiêu đề

<!-- markdownlint-disable MD025 -->

# Tiêu đề 1

<!-- markdownlint-enable MD025 -->

## Tiêu đề 2

### Tiêu đề 3

#### Tiêu đề 4

##### Tiêu đề 5

###### Tiêu đề 7

:::

::: preview Văn bản

Câu này có văn bản **in đậm**、_in nghiêng_ và ~~gạch bỏ~~.

:::

::: preview Đoạn văn

Đây là một đoạn văn.

Đây là một đoạn văn khác.

:::

::: details Ngắt dòng

Tôi muốn ngắt dòng tại  
điểm này

```md
I would like to line break at  
this point
```

:::

::: preview Trích dẫn

> Trích dẫn cũng có thể lồng nhau...
>
> > ...bằng cách đặt các dấu lớn hơn ngay cạnh nhau...
> >
> > > ...hoặc có dấu cách giữa các dấu mũi tên.

:::

::: preview Danh sách không có thứ tự

- Tạo danh sách bằng cách bắt đầu dòng với `-`
- Tạo danh sách con bằng cách thụt lề 2 dấu cách:
  - Việc đổi ký tự đánh dấu sẽ buộc bắt đầu danh sách mới:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      ngắt dòng

      Đoạn văn mới

- Thật đơn giản!

:::

::: preview Danh sách có thứ tự

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   ngắt dòng  
   ngắt dòng lần nữa
1. Integer molestie lorem at massa

:::

::: preview Đường kẻ ngang

---

:::

::: preview Liên kết

[Trang chủ](/)

:::

::: preview Hình ảnh

![Logo](/logo.png)

:::

::: preview Bảng

|      căn giữa       |           căn phải | căn trái           |
| :-----------------: | -----------------: | :----------------- |
| Căn giữa dùng `:-:` | Căn phải dùng `-:` | Căn trái dùng `:-` |
|          b          |          aaaaaaaaa | aaaa               |
|          c          |               aaaa | a                  |

:::

::: preview Mã

Mã nội dòng: `code`

Khối mã:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::

## Chỉ số trên và chỉ số dưới

Dùng `^` và `~` để đánh dấu chỉ số trên và chỉ số dưới.

<!-- prettier-ignore-start -->

::: preview Bản demo

- 19^th^
- H~2~O

:::

<!-- prettier-ignore-end -->

## Emoji

Ngoài emoji Weibo do người dùng tự cấu hình hoặc emoji có sẵn, chúng tôi còn hỗ trợ đầy đủ các biểu tượng cảm xúc viết tắt dạng Emoji.

<!-- prettier-ignore-start -->

::: preview Bản demo

Cổ điển:

:wink: :cry: :laughing: :yum:

Viết tắt:

8-) :) :* :( :-) :-( ;)

:::

<!-- prettier-ignore-end -->

## Tô sáng khối mã

Chúng tôi hỗ trợ tô sáng gần như mọi ngôn ngữ.

::: details Bản demo

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

## Công thức toán học

Bạn có thể dùng `$ ... $` để tạo công thức nội dòng, hoặc dùng `$$ ... $$` để tạo công thức cấp khối.

::: preview Bản demo

Đồng nhất thức Euler $e^{i\pi}+1=0$ là một công thức đẹp trong $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## Nhúng HTML

Bạn có thể thoải mái thêm bất kỳ nội dung HTML nào, miễn là không kích hoạt [cơ chế bảo vệ](../guide/features/safety.md#bao-mat-binh-luan).
