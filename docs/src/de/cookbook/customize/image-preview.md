---
title: Bildvorschau für Kommentarliste
icon: pic
---

Es gibt viele Plugins, die den Lightbox-Effekt erzielen können. Hier sind einige Beispiele für diese Plugins:

- [lightGallery](https://www.lightgalleryjs.com/)
<!-- - [Slimbox2](https://www.digitalia.be/software/slimbox2/) -->
- [lightbox2](https://lokeshdhakar.com/projects/lightbox2/)
- [Fancybox](https://fancyapps.com/docs/ui/fancybox/)

<!-- more -->

## LightGallery

Schreiben Sie den folgenden Inhalt vor Ihr HTML `<head>`, wobei `#waline-comment` Ihre Waline-Kommentarbox ist, die je nach tatsächlichem Szenario ersetzt werden muss.

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

Schreiben Sie den folgenden Inhalt vor Ihr HTML `<head>`, wobei `#waline-comment` Ihre Waline-Kommentarbox ist, die je nach tatsächlichem Szenario ersetzt werden muss.

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

Schreiben Sie den folgenden Inhalt vor Ihr HTML `<head>`, wobei `#waline-comment` Ihre Waline-Kommentarbox ist, die je nach tatsächlichem Szenario ersetzt werden muss.

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

Schreiben Sie den folgenden Inhalt vor Ihr HTML `<head>`, wobei `#waline-comment` Ihre Waline-Kommentarbox ist, die je nach tatsächlichem Szenario ersetzt werden muss.

```html
<script src="https://unpkg.com/@fancyapps/ui/dist/fancybox.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@fancyapps/ui/dist/fancybox.css" />
<script>
  Fancybox.bind('#waline-comment .vcontent img');
</script>
```
