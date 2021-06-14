# Waline client v1 migration guide

V1 has several changes, the BREAKING CHANGEs are detailed in [Initialization](#initialization) and [Widget Change](#widget-change).

## New Features

- Emoji preset support: You can now directly fill in the Emoji preset link to complete the Emoji configuration
- Multiple Emoji tabs: Emoji can now contain multiple tabs to add different types of Emoji
- Picture upload optimization: We added a picture upload button to remind visitors that they can upload pictures
- Drag and drop support: You can now directly drag and drop text or images into the comment box to complete text input or image addition.
- Responsive and SPA: Now Waline will return a responsive instance and supports SPA applications, see [Responsive](#Responsive)

## Size reduction

The v1 version is a complete rewrite with Vue and TypeScript, so the size is reduced from 78.4kb to 54.0kb (gzip).

## Options Change

The following options are marked as `obsolete`, and will be removed in v2.

- `placeholder` → please use `locale.placeholder` option

  ::: tip

  This change is to allow the default placeholder to adapt to multiple languages

  :::

- `emojiCDN`, `emojiMaps` → Please use the new `emoji` option

  ::: tip

  We have brought support for multiple Emoji tabs and Emoji presets. Emoji config should be easier for most users.

  :::

- `anonymous` → please use the new `login` option

  ::: tip

  Since Waline brings login support, we will change:

  - `anonymous: undefined`: anonymous comment and login are both possible
  - `anonymous: true`: disable login
  - `anonymous: false`: Cannot comment anonymously, that is, you can comment only after logging in

  to:

  - `login:'enable'`: enable login
  - `login:'disable'`: disable login
  - `login:'force'`: Force login

  This option should be more intuitive.

  :::

## Options Rename

The original option has problems like unclear meaning and inconsistent naming. The following are the renamed options, and their behavior remains the same as before. These are also marked as `obsolete`, and will be removed in v2.

- `langmode` → renamed to `locale`

  ::: tip

  This change improves the English meaning of options.

  :::

- `requiredFields` → renamed to `requiredMeta`

  ::: tip

  This change is to align with the `meta` option.

  :::

## Behavior change

### Responsive

Now Waline will be fully responsive. Calling Waline will return a `WalineInstance`. You can update the options of Waline by calling the `update()` method on `WalineInstance`, or use `destroy()` method on `WalineInstance` to destroy the instance.

This change will enable Waline to support SPA applications, please see [SPA Support](../guide/client/spa.md) for details.

### Initialization

Since the Waline function now returns a Waline instance, we strengthened the detection when Waline was initialized. If Waline cannot mount correctly. We will return a `WalineErrorInstance` instance. There is only one `errMsg` property on the instance to indicate the cause of the initialization error.

::: warning BREAKING CHANGE

If you just want Waline to update the number of comments and pageviews in the page, and do not need Waline **mount on the current page**, please DONOT set **`el` option** explicitly.

:::

## Widget Change

::: warning BREAKING CHANGE

The `RecentComments` will now return `Promise<{ comment: CommentData[], destroy: () => void }>` instead of `Promise<CommentData[]>`.

:::
