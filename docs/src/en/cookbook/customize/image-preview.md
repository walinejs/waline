---
title: Image Preview for Comment List
icon: pic
---

There are many plugins that can achieve the lightbox effect, here are some examples of these plugins:

- [lightGallery](https://www.lightgalleryjs.com/)
<!-- - [Slimbox2](https://www.digitalia.be/software/slimbox2/) -->
- [lightbox2](https://lokeshdhakar.com/projects/lightbox2/)
- [Fancybox](https://fancyapps.com/docs/ui/fancybox/)

<!-- more -->

## LightGallery

Write the following content before your HTML `<head>`, where `#waline-comment` is your Waline comment box, which needs to be replaced according to the actual scene.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/lightgallery@v2/css/lightgallery-bundle.css"
/>
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

Write the following content before your HTML `<head>`, where `#waline-comment` is your Waline comment box, which needs to be replaced according to the actual scene.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/lightbox2@v2/dist/css/lightbox.min.css"
/>
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

Write the following content before your HTML `<head>`, where `#waline-comment` is your Waline comment box, which needs to be replaced according to the actual scene.

```html
<script src="https://unpkg.com/@fancyapps/ui/dist/fancybox.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/@fancyapps/ui/dist/fancybox.css"
/>
<script>
  Fancybox.bind('#waline-comment .vcontent img');
</script>
```
