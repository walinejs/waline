# Article reading statistics

Like Valine, Waline also supports article reading statistics, and the data structure is consistent with Valine, facilitating seamless migration for Valine users.

```js
new Waline({
    el:'#waline',
    ...
    visitor: true // reading statistics
})
```

Valine will automatically find the elements whose `class` value is `leancloud_visitors` on the page, and get their `id` as the query condition. And fill the obtained value into the child element whose `class` value is `leancloud-visitors-count`:

```html
<!-- id will be used as the query condition -->
<span id="<Your/Path/Name>" class="leancloud_visitors">
  <em class="post-meta-item-text">Visit Statistics </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

<span id="/visitor.html" class="leancloud_visitors" data-flag-title="reading statistics">
    <em class="post-meta-item-text"> Current page visits </em>
    <i class="leancloud-visitors-count"></i>
</span>
