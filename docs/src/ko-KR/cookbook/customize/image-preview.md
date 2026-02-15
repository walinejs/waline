---
title: 댓글 목록 이미지 미리보기
icon: pic
---

라이트박스 효과를 구현할 수 있는 많은 플러그인이 있습니다. 다음은 이러한 플러그인의 몇 가지 예입니다:

- [lightGallery](https://www.lightgalleryjs.com/)
<!-- - [Slimbox2](https://www.digitalia.be/software/slimbox2/) -->
- [lightbox2](https://lokeshdhakar.com/projects/lightbox2/)
- [Fancybox](https://fancyapps.com/docs/ui/fancybox/)

<!-- more -->

## LightGallery

다음 내용을 HTML `<head>` 앞에 작성하세요. 여기서 `#waline-comment`는 Waline 댓글 상자이며, 실제 상황에 맞게 교체해야 합니다.

```html
<link rel="stylesheet" href="https://unpkg.com/lightgallery@v2/css/lightgallery-bundle.css" />
<srciprt src="https://unpkg.com/lightgallery@v2/lightgallery.umd.min.js" />
<script>
  document.addEventListener('click', (e) => {
    const images = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    if (images.indexOf(e.target) === -1) {
      return;
    }
    if (!e.target.gallery) {
      e.target.gallery = window.lightGallery(e.target.parentNode);
    }
    e.target.gallery.openGallery(0);
  });
</script>
```

<!--
##Slimbox2

Write the following content before your HTML `<head>`, where `#waline-comment` is your Waline comment box, which needs to be replaced according to the actual scene.

```html
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/gh/cbeyls/slimbox/css/slimbox2.css"
/>
<script src="https://unpkg.com/jquery@v1/dist/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/gh/cbeyls/slimbox/js/slimbox2.js"></script>
<script>
  document.addEventListener('click', (e) => {
    const images = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    const idx = images.indexOf(e.target);
    if (idx === -1) {
      return;
    }

    $.slimbox(e.target.src, e.target.alt, {});
  });
</script>
``` -->

## Lightbox2

다음 내용을 HTML `<head>` 앞에 작성하세요. 여기서 `#waline-comment`는 Waline 댓글 상자이며, 실제 상황에 맞게 교체해야 합니다.

```html
<link rel="stylesheet" href="https://unpkg.com/lightbox2@v2/dist/css/lightbox.min.css" />
<script src="https://unpkg.com/lightbox2@v2/dist/js/lightbox-plus-jquery.min.js"></script>
<script>
  document.addEventListener('click', (e) => {
    const lightbox = new Lightbox();
    const images = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    if (images.indexOf(e.target) === -1) {
      return;
    }

    const $link = $('<a />', {
      href: e.target.src,
      'data-title': e.target.alt,
      rel: 'lightbox',
    });
    lightbox.start($link);
  });
</script>
```

## Fancybox

다음 내용을 HTML `<head>` 앞에 작성하세요. 여기서 `#waline-comment`는 Waline 댓글 상자이며, 실제 상황에 맞게 교체해야 합니다.

```html
<script src="https://unpkg.com/@fancyapps/ui/dist/fancybox.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@fancyapps/ui/dist/fancybox.css" />
<script>
  Fancybox.bind('#waline-comment .vcontent img');
</script>
```
