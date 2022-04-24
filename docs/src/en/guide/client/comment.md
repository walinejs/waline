---
title: Comment Counter
icon: counter
---

Waline supports displaying the number of comments separately in the non-comment area.

<!-- more -->

## Automatically Update

You can enable comment counting in the `init` function by setting the `comment` option to `true`.

```js
Waline.init({
  el: '#waline',
  // ...
  comment: true, // comment counting
});
```

Waline will automatically find the elements with the `class` value of `waline-comment-count` in the page, and get their `data-path` as the query condition. And fill it with the obtained value:

```html
<!-- data-path will be the query condition -->
<span data-path="<Your/Path/Name>" class="waline-comment-count" /> comments
```

If you need a different selector, you can set the `comment` option to that selector.

Every time you call `WalineInstance.update()`, Waline will search the page content and automatically update the comment count.

::: tip Examples

```html
The current page has
<span data-path="/en/guide/client/count.html" class="waline-comment-count" />
comments.
```

The current page has
<span data-path="/en/guide/client/count.html" class="waline-comment-count" /> comments.

:::

## Manual Update

Besides automatically update via the `init` function, you can manually update the current page's comment count via the `commentCount` API:

```js
Waline.commentCount({
  serverURL,
  path,

  // optional, for custom selectors, defaults to `'.waline-pageview-count'`
  // selector: 'waline-pageview-count',
});
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
