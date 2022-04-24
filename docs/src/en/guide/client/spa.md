---
title: Single Page Application Support
icon: spa
---

Waline brings support for SPA (**S**ingle **P**age **A** application).

## Vue Component

If you are building a Vue project, you can use Waline components by importing `@waline/client/dist/components`.

All component properties are reactive, which means that when you change the properties, the comment box will get an automatically update.

## Other projects

In other SPA, you need to store the `WalineInstance` returned by the Waline function when Waline is initialized.

You can find an instance property `el` and two methods: `update()` and `destroy()` on `WalineInstance`.

### update

You can call `update()`to update Waline at any time (e.g.: when user visite a new route). The `update` method receives an optional parameter `options`, except for `el`, other Waline initial options can be updated by passing in new values.

E.g.:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Working Principle

When calling `update`, the current option and history option will be merged by **shallow copy**, and Waline instance will refresh with the new option (and save the new option).

The default behavior of this method is to always **regenerate default values** for options that haven't been set yet, and **use historical values** for options that have been set.

There are two options you may need to pay special attention to: `path` and `locale`.

::: warning Path precautions

In V2, the `path` parameter **always reset** on `update()`.

This means that in any update as long as you don't specify `path`, `path` will be reset to `window.location.pathname`.

:::

::: warning locale precautions

Due to the shallow copy, the old `locale` options are completely overwritten by the new `locale` options passed in by `update`.

Our point is: users usually want to switch the display language when updating the locale, so we set it as the expected behavior of the plugin. This also means that you can use `update({ locale: {} })` to clear the custom locale config in history.

If you really need to update one or more certain fields in `locale`, you need to pass the entire updated `locale`.

:::

Meanwhile, the `update()` option has been optimized for asynchronous network requests, including:

- Refresh the comment area and re-request only when the path does change
- The new `update()` call will automatically terminate the no longer needed request from the previous `update()`.

### el

The `el` property is the HTMLElement mounted by the current instance of Waline.

If you initialize Waline with `el: null` (only use comments and pageview statistics), this property will be `null`.

### destroy

If you forget to pass in the `serverURL` or Waline cannot find the mount location via the `el` option on the page, Waline will throw an Error indicating the reason for the error.

### Initialization Failure

If you forget to set `serverURL` or Waline cannot find the mount location through the `el` option on the page, Waline will return a `WalineErrorInstance`.

There is only one attribute `errMsg` on `WalineErrorInstance` to indicate the reason for the initialization failure.
