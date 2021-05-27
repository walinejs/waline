# Comment Count

Waline supports separate display of the count of comments in the other side, and the effect is similar to the article reading statistics. Waline will automatically find the element whose `class` value is `waline-comment-count` on the page, get its `id` as the query condition, and fill in the value.

```html
<!-- id as query condition -->
<span id="<Your/Path/Name>" class="waline-comment-count"></span> Comments
```

Current page has <span id="/en/client/count.html" class="waline-comment-count"></span> comments.
