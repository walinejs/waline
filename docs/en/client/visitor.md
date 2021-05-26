# Article reading statistics

Same as Valine, Waline also supports article reading statistics, and the data structure is consistent with Valine, facilitating seamless migration for Valine users.

```js
Waline({
  el: '#waline',
  // ...
  visitor: true, // reading statistics
});
```

Valine will automatically find the elements which have `leancloud_visitors` class in current page and use their `id` as the query condition. And fill the obtained value into the child element whose `class` value is `leancloud-visitors-count`:

```html
<!-- id will be used as the query condition -->
<span id="<Your/Path/Name>" class="leancloud_visitors">
  <em class="post-meta-item-text">Visit Statistics </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

::: tip Demo

```html
<span id="/visitor.html" class="leancloud_visitors">
  <em class="post-meta-item-text"> Current page visits </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

<span id="/visitor.html" class="leancloud_visitors">
  <em class="post-meta-item-text"> Current page visits </em>
  <i class="leancloud-visitors-count"></i>
</span>

:::
