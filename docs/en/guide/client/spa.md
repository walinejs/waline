# Single Page Application Support

Waline brings support for SPA (**S**ingle **P**age **A** application).

In an SPA, you need to store the `WalineInstance` returned by the Waline function when Waline is initialized.

You can find an instance property `el` and two methods: `update()` and `destroy()` on `WalineInstance`.

## el

The `el` property is the HTMLElement mounted by the current instance of Waline.

If you initialize Waline without `el: null` (only use comments and pageview statistics), this property will be `null`.

## update

You can call `update()` to update Waline. The `update` method receives an optional parameter `options`, except for the `el` and `dark` options, other Waline initial options can be updated by passing in new values.

E.g.:

```js
// in `/` route
const waline = Walien({
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

### Working Principle

When calling `update`, the current option and history option will be merged by **shallow copy**, and Waline instance will refresh with the new option (and save the new option).

The default behavior of this method is to always **regenerate default values** for options that haven't been set yet, and **use historical values** for options that have been set.

There are two options you may need to pay special attention to: `path` and `locale`.

::: warning Path precautions

You should be aware that the default value of the `path` option is `window.location.pathname`. As mentioned earlier:

> ... always **regenerate default values** for options that haven't been set yet, and **use historical values** for options that have been set.

If you just leave the `path` option, we will automatically update `path` to the current page path every time you call `update()`.

But once you set `path` previously, the behavior of calling `update()` without the `path` parameter is to use that historical value. In this case, you can call by setting `path` to `undefined` to make current and future calls dynamically read `window.location.pathname` again.

:::

::: warning locale precautions

Due to the shallow copy, the locale will be overided by the new `locale` option in `update`.

Our point is: users usually want to switch the display language when updating the locale, so we set it as the expected behavior of the plugin. This also means that you can use `update({ locale: {} })` to clear the custom locale config in history.

If you really need to update one or more certain fields in `locale`, you need to pass the entire updated `locale`.

:::

Meanwhile, the `update()` option has been optimized for asynchronous network requests, including:

- Refresh the comment area and re-request only when the path does change
- The new `update()` call will automatically terminate the no longer needed request from the previous `update()`.

## destroy

You use the `destroy()` method to destory Waline instance. This will also clear all the contents of the Waline mounted element.

## Initialization Failure

If you forget to set `serverURL` or Waline cannot find the mount location through the `el` option on the page, Waline will return a `WalineErrorInstance`.

There is only one attribute `errMsg` on `WalineErrorInstance` to indicate the reason for the initialization failure.
