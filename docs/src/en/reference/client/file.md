---
title: Client Files
icon: file
---

`@waline/client` provides multiple versions of files

<!-- more -->

## File List

- `dist/waline.js`: full version, UMD format

  This file is the default file for CDN import `@waline/client`, 53 KB Gzip size

- `dist/shim.mjs`: full version without dependency bundles, ES Module format

  This file is the default file for `import` to import `@waline/client`, 19.39 KB Gzip size

- `dist/shim.cjs`: full version without dependencies, in Common JS format

  This file is the default file for `require` to import `@waline/client`, 19.59 KB Gzip size

- `dist/waline.css`: Waline CSS styles

- `dist/waline-meta.css`: Waline Meta Icon CSS

- `dist/component.mjs`: Waline's Vue component, ES Module format, without dependency bundling

  This file is for using Waline comments in component mode in a Vue project, 18.28 KB Gzip size

- `dist/comment.js`: Waline's comment count module, UMD format, < 1KB Gzip size

  This file is used for CDN ingestion, when only the number of page comments is required

- `dist/pageview.js`: Waline's pageview module, UMD format, < 1KB Gzip size

  This file is used for CDN ingestion, when only page views are required

Other format files:

- `dist/waline.cjs`: Common JS format for `dist/waline.js` file

- `dist/waline.mjs`: ES Module format of `dist/waline.js` file

- `dist/comment.cjs`: Common JS format for `dist/comment.js` file

- `dist/comment.mjs`: ES Module format of `dist/comment.js` file

- `dist/pageview.cjs`: Common JS format for `dist/pageview.js` file

- `dist/pageview.mjs`: ES Module format of `dist/pageview.js` file

## Module exports

- `@waline/client`: Waline main entry without dependencies bundled

- `@waline/client/waline.css`: Waline style file

- `@waline/client/waline-meta.css`: Waline meta icon style file

- `@waline/client/comment`: Waline comment count module

- `@waline/client/pageview`: Waline pageview count module

- `@waline/client/api`: Client Api which can be used by 3rd party clients

- `@waline/client/full`: Waline main entry with all dependencies bundled
