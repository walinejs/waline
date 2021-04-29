# 文章阅读量统计

同 Valine 一样，Waline 也支持文章阅读量统计，数据结构和 Valine 一致，方便 Valine 用户无缝进行迁移。

```js
new Waline({
    el:'#waline',
    ...
    visitor: true // 阅读量统计
})
```

Valine 会自动查找页面中`class`值为`leancloud_visitors`的元素，获取其`id`为查询条件。并将得到的值填充到其`class`的值为`leancloud-visitors-count`的子元素里：

```html
<!-- id 将作为查询条件 -->
<span id="<Your/Path/Name>" class="leancloud_visitors">
  <em class="post-meta-item-text">阅读量 </em>
  <i class="leancloud-visitors-count"></i>
</span>
```

<span id="/visitor.html" class="leancloud_visitors" data-flag-title="文章阅读量统计">
    <em class="post-meta-item-text"> 当前页访问次数 </em>
    <i class="leancloud-visitors-count"></i>
</span>
