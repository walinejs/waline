---
title: Server Config
icon: config
---

The following options need to be configured in the server entry file `index.js`.

::: warning

If you are using template, please note that you need to save these configurations yourself, because they will be overwritten when you pull the latest official template.

We recommend you to create a repo from the official template and make your changes there.

:::

## Basic Options

### plugins

- Type: `plugin[]`

See [Plugin System](./plugin.md) for details

### secureDomains

- Type: `string | RegExp | string[] | RegExp[]`

Secure domain settings. Requests from other domain will receive 403 status code. It supports String, Regexp, and Array type. Leaving this config means that all domain referrer are allowed.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org',
});
```

:::

::: tip

- To make local development easier, `localhost` and `127.0.0.1` will be added to the list of secure domain names by default.
- Env variable `SECURE_DOMAINS` won't work when this option is set.

:::

### forbiddenWords

- Type: `string[]`

If a comment match forbidden word, it will be marked as spam.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: ['Trump'],
});
```

:::

### disallowIPList

- Type: `string[]`

If a comment ip match this list, 403 status code is returned.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: ['8.8.8.8', '4.4.4.4'],
});
```

:::

### mailSubject

- Type: `string`

Customize the title of the comment reply email, which is equivalent to environment variable `MAIL_SUBJECT`.

### mailTemplate

- Type: `string`

Customize the content of the comment reply email, which is equivalent to environment variable `MAIL_TEMPLATE`.

### mailSubjectAdmin

- Type: `string`

Customize the title of the new comment notification email, which is equivalent to the environment variable `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

- Type: `string`

Customize the content of the new comment notification email, which is equivalent to the environment variable `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

- Type: `string`

The QQ comment notification template, which is equivalent to the environment variable `QQ_TEMPLATE`.

### TGTemplate

- Type: `string`

Telegram comment notification template, which is equivalent to the environment variable `TG_TEMPLATE`.

### model

- type: `class`

For details, see [Customize Database Service](../../cookbook/customize/database.md)

### encryptPassword

- type: `function`

See [Customize User System](../../cookbook/customize/userdb.md) for details

### locales

- type: `Record<string, Record<string, string>>`

See [Custom Locale](../../cookbook/customize/locale.md)

## Comment Hooks

Besides environment variable configuration, Waline also provides some custom hooks to facilitate the processing of custom requirements. It only needs to be configured in the server entry file `index.js`.

### preSave(comment)

Waline provides some custom hooks to let users customize Waline server behavior according to their own needs.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSpam = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

:::

### postSave(comment, pComment)

The action performed after the comment is posted.

When the method is executed, the comment data will be passed as the first param, and if it's a reply to the comment, the parent comment will be passed as the second param.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postSave(comment, pComment) {
    await mailto({
      mail: pComment.mail,
      text: `${comment.nick} replied your comment!`,
    });
  },
});
```

:::

### preUpdate(comment)

Action before a comment content is updated in the dashboard. If the method returns content, the interface will return directly without updating the comment data.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

:::

### afterUpdate(comment)

Action after a comment content is updated in the dashboard. Comment data will be passed in when the method is executed.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

:::

### preDelete(commentId)

Action before a comment is deleted. When the method is executed, the comment Id to be operated will be passed in. If the method returns content, the interface will return directly without updating the comment data.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

:::

### afterDelete(commentId)

Action after a comment is deleted, the comment Id will be passed as the only param.

::: details Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```

:::
