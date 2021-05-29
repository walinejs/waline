# Importing Client

Waline provides two versions of client files: default (with its own style) and no-style.

## Via CDN

Recommend to use [jsdelivr](https://cdn.jsdelivr.net/npm/@waline/client/).

### Get the latest version

- Default:

  ```html
  <!-- Use the short link to get latest default file -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client"></script>

  <!-- Omit the version number to automatically apply the latest version -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>

  <!-- Or manually specify the latest version -->
  <script src="//cdn.jsdelivr.net/@waline/clien@latest/dist/Waline.min.js"></script>
  ```

- No Style:

  ```html
  <!-- Omit the version number to automatically apply the latest version -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.noStyle.js"></script>

  <!-- Or manually specify the latest version -->
  <script src="//cdn.jsdelivr.net/@waline/clien@latest/dist/Waline.noStyle.js"></script>
  ```

### Get the specified version

- Default:

  ```html
  <!-- You need to modify and replace `1.0.0` with the version number you want -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client@1.0.0/dist/Waline.min.js"></script>
  ```

- No Style:

  ```html
  <!-- You need to modify and replace `1.0.0` with the version number you want -->
  <script src="//cdn.jsdelivr.net/npm/@waline/client@1.0.0/dist/Waline.noStyle.js"></script>
  ```

## Via NPM

Waline client has been released to [npm](https://www.npmjs.com/package/@waline/client) via `@waline/client`, you can install it with the following command:

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @waline/client
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @waline/client
```

</CodeGroupItem>
</CodeGroup>

Then, please import and use in your source file:

- Default:

  ```js:line-numbers
  // Use import
  import Waline from '@waline/client';
  // or Use require
  const Waline = require('@waline/client');

  Waline({
    el: '#waline',
    // ...
  });
  ```

- No Style:

  ```js:line-numbers
  // Use import
  import Waline from '@waline/client/dist/Waline.noStyle';
  // or Use require
  const Waline = require('@waline/client/dist/Waline.noStyle');

  Waline({
    el: '#waline',
    // ...
  });
  ```
