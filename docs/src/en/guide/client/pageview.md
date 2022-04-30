---
title: Pageview Counter
icon: counter
---

Waline supports pageview counting.

<!-- more -->

## Using with comment

Waline supIf you are using Waline's commenting service, you can enable pageview statistics by setting the `pageview` option to `true` during initialization:

```js
Waline.init({
  el: '#waline',
  // ...
  pageview: true, // pageview statistics
});
```

Waline will automatically find the elements with the `class` value of `waline-pageview-count` in the page, and get their `data-path` as the query condition. And fill it with the obtained value:

If you need a different selector, you can set the `pageview` option to this selector.

```html
<!-- data-path will be the query condition -->
Pageviews: <i class="waline-pageview-count" data-path="<Your/Path/Name>"></i>
```

Every time you call `WalineInstance.update()`, Waline will re-search the page content and automatically update the pageviews.

::: tip Examples

```html
The current page has been viewed
<i class="waline-pageview-count" data-path="/en/guide/client/count.html" />
times.
```

The current page has been viewed
<i class="waline-pageview-count" data-path="/en/guide/client/count.html" /> times.

:::

## Use Alone

If you only need to use the pageview statistics function, you can import the pageview module provided by Waline, its Gzip size is < 1KB.

```html
<ul>
  <li>
    Current page views:
    <span class="waline-pageview-count" />
  </li>
  <li>
    Page Views:
    <span class="waline-pageview-count" data-path="/" />
  </li>
</ul>
<script src="https://unpkg.com/@waline/client/dist/pageview.js"></script>
<script>
  Waline.pageviewCount({
    serverURL: '<YOUR_SERVER_URL>',
    path: window.location.pathname,

    // optional, for custom selectors, defaults to `'.waline-pageview-count'`
    // selector: 'waline-pageview-count',

    // optional, whether to increase the number of visits when fetching, the default is `true`
    // update: true,
  });
</script>
```

- Current pageviews: <span class="waline-pageview-count" />

- Pageviews: <span class="waline-pageview-count" data-path="/" />

::: info Abort

Since pageview fetching is an asynchronous network operation, you may need to cancel an ongoing pageview update operation under certain circumstances.

`pageviewCount` returns a function that can be called to cancel the update:

```js
const abort = Waline.pageviewCount({
  serverURL: '<YOUR_SERVER_URL>',
  path: window.location.pathname,
});

// After 500ms, if the network request has not been completed, cancel this operation
setTimeout(() => abort(), 500);
```

:::
