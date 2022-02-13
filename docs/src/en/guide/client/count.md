---
title: Pageview statistics
icon: counter
---

Waline supports pageview statistics and comment number display.

<!-- more -->

## PageViews

Waline supports pageview statistics, you can enable it by setting the `visitor` option to `true`:

```js
Waline({
  el: '#waline',
  // ...
  visitor: true, // pageview statistics
});
```

Waline will automatically find the elements with the `class` value of `waline-visitor-count` in the page, and get their `id` as the query condition. And fill it with the obtained value:

```html
<!-- id will be the query condition -->
Pageviews: <i id="<Your/Path/Name>" class="waline-visitor-count"></i>
```

### Examples

```html
The current page has been viewed
<i id="/en/guide/client/count.html" class="waline-visitor-count" /> times.
```

The current page has been viewed
<i id="/en/guide/client/count.html" class="waline-visitor-count" /> times.

### Valine compatible

In order to facilitate the seamless migration of users, Waline is currently compatible with Valine's `.leancloud_visitors` and `.leancloud-visitors-count`:

```html
<!-- id will be the query condition -->
<span
  id="<Your/Path/Name>"
  class="leancloud_visitors"
  data-flag-title="Your Article Title"
>
  <em class="post-meta-item-text">阅读量 </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

But we will not be compatible with it in future V2 versions.

## Comment count

Waline supports separate display of the number of comments in the non-comment area, in a similar way to page views. Waline will automatically find the elements whose `class` value is `waline-comment-count` in the page, get their `id` as the query condition, and fill in the value.

```html
<!-- id will be the query condition -->
<span id="<Your/Path/Name>" class="waline-comment-count" /> comments
```

### Examples

```html
The current page has
<span id="/en/guide/client/count.html" class="waline-comment-count" /> comments.
```

The current page has
<span id="/en/guide/client/count.html" class="waline-comment-count" /> comments.
