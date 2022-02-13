---
title: Avatar Configuration
icon: avatar
---

::: warning Obsolete

We recommand you to use lastest server and config it with `AVATAR_PROXY`.

:::

Waline currently uses [Libravatar][1] as the comment list avatar.

Libravatar is a free, open-source avatar provider features federated hosting and Gravatar-compatible APIs.

Users should log in or register by themselves [Libravatar][1], then set or modify their avatar. When commenting, just leave the email address you used when registering in [Libravatar][1]. Note that if an image is not found in the [Libravatar][1] database and the hash algorithm used was MD5, then Libravatar will first redirect to [Gravatar][2] in case the image exists there.

<!-- more -->

## Options

You should use `avatar` option to set the default avatar image, e.g.:

Currently there are 7 types of `default values` for `non-custom avatar`:

```js
Waline({
  // ...
  avatar: '',
});
```

## Available Values

|     Value     |                                                                  Demo                                                                   | Style                                               |
| :-----------: | :-------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------- |
|     `''`      |                  ![Libravatar official graphics](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40)                  | Libravatar official graphics                        |
|    `'mp'`     |                  ![Mystic man (a grayhead)](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=mp)                  | Mystic man (a grayhead)                             |
| `'identicon'` |                 ![Abstract geometry](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=identicon)                  | Abstract geometry                                   |
| `'monsterid'` |                   ![little monster](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=monsterid)                   | little monster                                      |
|  `'wavatar'`  |   ![A combination of different faces and backgrounds](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=wavatar)   | A combination of different faces and backgrounds    |
| `'robohash'`  | ![a generated robot with different colors, faces, etc](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=robohash) | a generated robot with different colors, faces, etc |
|   `'retro'`   |               ![Eight-pixel retro portrait](//seccdn.libravatar.org/avatar/d41d8cd98f00b204e9800998ecf8427e?s=40&d=retro)               | Eight-pixel retro portrait                          |
|   `'hide'`    |                                                                   N/A                                                                   | Hidden avatar                                       |

[1]: https://www.libravatar.org/
[2]: http://gravatar.com/

## Attentions

::: warning

Please note that though email providers such as Google and QQ do not distinguish upper and lower case user names, you still need to ensure that the email address registered on Gravatar corresponds to the email address inputed.

Although most large mail providers in the world do not distinguish case-sensitive email user names, according to RFC 5231, emails are case-sensitive.

This means that the email provider can treat `abc@xxx.com` and `ABC@xxx.com` as different accounts, and there are indeed email providers that handle in this way.

Therefore, in order to prevent users who use such email providers from being unable to receive emails or displaying wrong avatars, we do not perform case conversion on mailboxes.

:::
