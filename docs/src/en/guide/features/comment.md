---
title: Comment Counter
icon: counter
redirectFrom: /en/guide/client/comment.html
---

Waline supports displaying the number of comments separately in the non-comment area.

<!-- more -->

## Automatically Update

You can enable comment counting in the `init` function by setting the `comment` option to `true`.

```html
<script type="module">
  import { init } from 'https://unpkg.com/@waline/client@v2/dist/waline.mjs';

  init({
    el: '#waline',
    // ...
    comment: true, // enable comment counting
  });
</script>
```

Waline will try to fill in or update comment count whenever you called `init` function or update the path.

waline finds the elements having `waline-comment-count` class in the page, and get their `data-path` attribute as the query condition. And fill it with the obtained value:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

If you need a different selector, you can set the `comment` option to that selector.

Every time you call `WalineInstance.update()`, Waline will search the page content and automatically update the comment count.

::: tip Examples

```html
The current page has
<span class="waline-comment-count" data-path="/en/cookbook/comment" />
comments.
```

The current page has
<span data-path="/en/cookbook/comment" class="waline-comment-count" /> comments.

:::

## Manual Update

Besides automatically update via the `init` function, you can manually update the current page's comment count via the `commentCount` API:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v2/dist/comment.mjs';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```

::: info Aborting

Since the comment count fetch is an asynchronous network operation, you may need to cancel an ongoing comment count update operation in certain circumstances.

`commentCount` returns a function that can be called to cancel the update:

```js
const abort = Waline.commentCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::

## Import Counter Only

Sometimes, you may want to display the comment count of some pages in the article list or homepage, but do not want to load the entire Waline. At this point you can use a Gzip < 1KB `comment` module:

```html
<script type="module">
  import { commentCount } from 'https://unpkg.com/@waline/client@v2/dist/comment.mjs';

  commentCount({
    serverURL,
    path,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: '.waline-pageview-count',
  });
</script>
```
