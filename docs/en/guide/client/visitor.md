# Article reading statistics

Waline supports article reading statistics, you can enable it by setting the `visitor` option to `true`:

```js
Waline({
  el: '#waline',
  // ...
  visitor: true, // reading statistics
});
```

Waline will automatically find the elements which have `leancloud-visitors` class in current page and use their `id` as the query condition. And fill the obtained value into the child element has a `leancloud-visitors-count` class:

```html
<!-- id will be used as the query condition -->
<span id="<Your/Path/Name>" class="leancloud_visitors">
  <em class="post-meta-item-text">Visit Statistics </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

::: tip

If Waline can not find any child element with the right class, Waline will directly output numbers in the `.leancloud-visitors` element.

:::

## Example

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

## Valine compatible

In order to facilitate the seamless migration of users, Waline will be compatible with Valine's `.leancloud_visitors` and `.leancloud-visitors-count`.

But we will not be compatible with it in future V2 versions.
