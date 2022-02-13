---
title: FAQ
icon: faq
---

Waline has a very clear position since its birth:

::: info A simple comment system with backend.

:::

All versions released afterwards are modifications made around this position.

## What is the relationship with Valine?

::: info Waline = With backend Valine

:::

Consulting with the open source version of Valine, the comment list in frontend is rewritten with React. The style and structure as well as some internal tools and methods are all from Valine.

## Do I still need to deploy Valine-Admin on LeanCloud?

No. Waline is a three-in-one deployment of data storage, server, and client. The server interface is already equivalent to Valine's LeanCloud cloud engine. The server already includes comment management and email notifications feature provided by the previous cloud engine. It doesn't need the additional LeanCloud cloud engine, so it won't be restricted by the LeanCloud cloud engine's sleep strategy.

## How can I upgrade?

Waline is mainly composed of two parts: the frontend and the server.

### Frontend

The front end inserts comment lists and comment boxes by including JS scripts in the web page. In most scenarios, the link will use the address of the latest version of the online CDN, and the latest version will be automatically applied, without the need for users to manually update.

::: note Need manually update in following situations

1. The version number is forcibly specified in the CDN address. In this situation, you need to manually modify the version number to be the latest.
1. Use NPM to require and pack the module into code. In this situation, you need to modify the version number in the dependency to ensure that the latest version of the dependency can be obtained during installation.

:::

### Server

The server refers to the backend service corresponding to the `serverURL` configured in frontend script, and its update will be slightly different depending on different deployment environments. Server updates will be more frequent.

#### Vercel

Go to the corresponding GitHub repository and modify the version number of `@waline/vercel` in the package.json file to the latest.

![vercel](./assets/vercel-update.png)

#### Deta

[Deta - How to update?](../guide/server/deta.md#how-to-update)

#### CloudBase

Enter the code editing page, click <kbd>Save and reinstall dependencies</kbd>. If it still doesn’t work, enter <kbd>My Application</kbd> and select <kbd>Deploy</kbd> to redeploy.

::: danger

Redeployment will clear the previous files. If there is a configuration in the previous file, it needs to be backed up first.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Run `docker pull lizheming/waline` directly to pull the latest image.

## Why posting comments are slow?

Due to some technical reasons, spam detection and comment notification are all serial operations when posting comments. The spam detection uses the service provided by Akismet abroad, which may be slow to access. Users can turn off the spam detection function through the `AKISMET_KEY=false` environment variable. Beside the spam detection service, the email notification in the comment notification may also cause a timeout. You can turn off the comment notification to test whether it is caused by this feature.

## How to add lightbox effects?

There has many plugin can implement it. Here we give a simple example for [lightGallery](https://www.lightgalleryjs.com/), [Slimbox2](https://www.digitalia.be/software/slimbox2/), [lightbox2](https://lokeshdhakar.com/projects/lightbox2/) and [Fancybox](https://fancyapps.com/docs/ui/fancybox/).

### LightGallery

Insert following code before `<head>` tag in your html content. `#waline-coment` is your Waline comment element selector, you need replace it by yourself.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/lightgallery@2.1.5/css/lightgallery-bundle.css"
/>
<script src="https://cdn.jsdelivr.net/npm/lightgallery@2.1.5/lightgallery.umd.min.js"></script>
<script>
  document.addEventListener('click', (e) => {
    const imgs = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    if (imgs.indexOf(e.target) === -1) {
      return;
    }
    if (!e.target.gallery) {
      e.target.gallery = window.lightGallery(e.target.parentNode);
    }
    e.target.gallery.openGallery(0);
  });
</script>
```

### Slimbox2

Insert following code before `<head>` tag in your html content. `#waline-coment` is your Waline comment element selector, you need replace it by yourself.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/cbeyls/slimbox/css/slimbox2.css"
/>
<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/cbeyls/slimbox/js/slimbox2.js"></script>
<script>
  document.addEventListener('click', (e) => {
    const imgs = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    const idx = imgs.indexOf(e.target);
    if (idx === -1) {
      return;
    }

    $.slimbox(e.target.src, e.target.alt, {});
  });
</script>
```

### Lightbox2

Insert following code before `<head>` tag in your html content. `#waline-coment` is your Waline comment element selector, you need replace it by yourself.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/css/lightbox.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/js/lightbox-plus-jquery.min.js"></script>
<script>
  document.addEventListener('click', (e) => {
    const lightbox = new Lightbox();
    const imgs = [].slice
      .call(document.querySelectorAll('#waline-comment .vcontent img'))
      .filter((img) => img.width > 20);

    if (imgs.indexOf(e.target) === -1) {
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

### Fancybox

Insert following code before `<head>` tag in your html content. `#waline-coment` is your Waline comment element selector, you need replace it by yourself.

```html
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"
/>
<script>
  Fancybox.bind('#waline-comment .vcontent img');
</script>
```
