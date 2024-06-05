---
title: Emoticons Search
icon: search
order: 3
---

`@waline/client` allows users to add emoji search services and customize this functionality.

By default, `@waline/client` provides meme search service via [Giphy](https://giphy.com/). This will allow you to search images and add them to the comment.

<!-- more -->

## Disable

If you don't need the default images search service, you can disable it by setting the `search` option to `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Customize

You can customize the image search service through the search option.

For each operation, you should return an array containing the image information as the search result, and each item should be an object with the following properties:

- `src`: the link address of the image
- `title`: image title and alt text (optional)
- `preview`: Thumbnail of the image to use in the result list (optional)

The option accepts three functions, each of which should return a Promise, and the result is the array of search results above.

- `search`: search operation, the search term will be passed as the first parameter of the function
- `default`: list of images to display by default (optional)
- `more`: The function that starts when the image is scrolled to the bottom, where the search term and the current number are passed in as the first two parameters (optional)

For tutorials on custom search, see [Cookbook → Custom Emoji Search](../../cookbook/customize/search.md).
