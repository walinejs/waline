---
title: Client Files
icon: file
---

`@waline/client` provides multiple versions of files

<!-- more -->

## CDN File List

- `dist/waline.js`: full version, ESM format

  This file is the recommend version to import `@waline/client`, 53 KB Gzip size

- `dist/waline.umd.js`: full version, UMD format

- `dist/slim.js`: full version without dependency bundles, ES Module format

  This file is the default file to import `@waline/client` with Node.js, 19.39 KB Gzip size

- `dist/waline.css`: Waline CSS styles

- `dist/waline-meta.css`: Waline Meta Icon CSS

- `dist/component.js`: Waline's Vue component, ES Module format, without dependency bundling

  This file is for using Waline comments in component mode in a Vue project, 18.28 KB Gzip size

- `dist/comment.js`: Waline's comment count module, ESM format, < 1KB Gzip size

  This file is used for CDN import, when only the number of page comments is required

- `dist/pageview.js`: Waline's pageview module, ESM format, < 1KB Gzip size

  This file is used for CDN import, when only page views are required

## Module exports

`@waline/client` is a standard ESM module, requiring Node.js version >= 18:

- `@waline/client`: Waline main entry without dependencies bundled

- `@waline/client/waline.css`: Waline style file

- `@waline/client/waline-meta.css`: Waline meta icon style file

- `@waline/client/comment`: Waline comment count module

- `@waline/client/pageview`: Waline pageview count module

- `@waline/client/full`: Waline main entry with all dependencies bundled
