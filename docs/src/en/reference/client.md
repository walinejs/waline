---
title: Initialize Options
icon: config
---

The initialization options accept all options supported by [Waline Component](component.md), in addition, the following options are added.

## el

- Type: `string | HTMLElement | null`
- Default: `'#waline'`

The DOM element to be mounted on initialization. It must be a valid **CSS selector string** or HTMLElement Object.

If you only want the counter below, set this option to `null`.

## comment

- Type: `boolean | string`
- Default: `false`

Article comment count counter, when filled in a string, it will be used as a CSS selector.

## pageview

- Type: `boolean | string`
- Default: `false`

Pageview counter. When filled in a string, it will be used as a CSS selector.
