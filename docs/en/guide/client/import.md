#### NPM

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

```js
// Use import
import Waline from '@waline/client';
// or Use require
const Waline = require('@waline/client');

Waline({
  el: '#waline',
  // other config
  ...
});
```
