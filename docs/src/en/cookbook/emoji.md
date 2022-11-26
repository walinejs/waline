---
title: Create your own Emoji presets
icon: emoji
---

This guide will show you how to create and use your own Emoji presets.

<!-- more -->

## Create your own presets

First of all, you need to prepare some emoji images. Then, pleaase follow the steps to create your prreset.

### Name the emoji and upload it

For the sake of simplicity, Waline will directly use the name of the emoji image as the key of the emoji. This means that if you import two different presets, and they both contain a laugh.png image, both emotes will correspond to the same emoji `:laugh:`.

Therefore, the best practice is that each emoji preset creator should add a prese-name-related prefix to all names in emoji files.

After naming them appropriately, you need to upload them to your server.

### Write preset information

We assume that you have placed some emoji images in the `

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

At this point, you'll also need to create an `info.json` file for this folder to let Waline know what emoji the Emoji presets contain.

First, let's set a name for the Emoji preset, such as `My Emoji`, because you have set the `my_` prefix for the image, and the files are in `png` format. You need to add them in `info.json`.

Your `info.json` can be:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Then, list all emoji names in `items` in the order you want, at the same time, remember to ignore the prefix and suffix you have set in `prefix` and `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

After that, please select a representative emoji as the icon displayed in the tab:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

With these, you are done writing `info.json`, please upload it to the same folder.

You now successfully created a `myemoji` preset with `https://example.com/myemoji/'`.

## Use GitHub mirror with tags

Usually, you might find it a bit cumbersome to have your own domain name and upload images to the domain name, and the link may expire over time, so an advanced approach is to use a GitHub repository and use tag function in git to mirror GitHub repo providing a emoji preset.

Similar to the steps above, you need to create a new GitHub repository, name the emoji as above, create `info.json` using the same steps, and upload them to the repository.

Then, please create a tag for the repository at this time, we recommend setting it in the format of `vx.x.x`, such as `v1.0.0`.

After adding tags, you can use the CDN link with the version on [cdn.jsdelivr.net](https://www.jsdelivr.com/) as your preset in the format `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

We assume that you have created the `example/emoji` repository, uploaded the emoji images and `info.json` directly, and have created the `v1.0.0` tag, then you can use `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` as your preset.

::: tip

It is necessary to specific a tag with link to prevent the image link referenced by the historical comment from being invalidated by modifying your preset.

The official emoji preset is achieved by creating the [walinejs/emojis](https://github.com/walinejs/emojis) repository and using the CDN link. Currently we are using the `v1.1.0` version.

:::

::: warning

Since cdn.jsdelivr.net is polluted in China, you can replace `cdn.jsdelivr.net` with `gcore.jsdelivr.net`

:::

## Using config objects

Similar to the previous article, we assume you have the following file structure:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

In addition to creating an `info.json` upload and using a link as a preset, you can also use the following objects directly as a preset:

```js
{
  name: "My Emoji",
  folder: "https://example.com/myemoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Here, we additionally add the `folder` property to tell Waline where the images are stored.
