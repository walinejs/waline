# Server Configuration

## Basic Configuration

Mose configuration for backend can be cofigured in environment variable, which can be set in <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> for Vercel. Please reminder that all change works after redeploy.

| Environment Variable | Required | Description                                                                       |
| -------------------- | -------- | --------------------------------------------------------------------------------- |
| `LEAN_ID`            | ✓        | LeanCloud Application ID                                                          |
| `LEAN_KEY`           | ✓        | LeanCloud Application Key                                                         |
| `LEAN_MASTER_KEY`    | ✓        | LeanCloud Application Master Key                                                  |
| `LEAN_SERVER`        |          | LeanCloud server address if you're leancloud china user                           |
| `SITE_NAME`          |          | site name                                                                         |
| `SITE_URL`           |          | site url                                                                          |
| `SECURE_DOMAINS`     |          | Secure Domains configuration. Supports multiple domain with Comma separated       |
| `DISABLE_USERAGENT`  |          | wether hide the user agent of commentor. Default value is `false`                 |
| `AKISMET_KEY`        |          | Akismet antispam service key, default is open, set `false` if you wanna close it. |
| `COMMENT_AUDIT`      |          | Comment audit switcher. We recommend to tip on the placeholder text if it's true. |

In addition to the above environment variables, different functions will also have many environment variable configurations, which can be viewed in the function items corresponding to the progress in the left column.

## Code Configuration

Except environment variables setting, we also support some configuration in project file.

### secureDomains

You can set secure domain with it. After configuration, requests from referrer other than the domain name will return a 403 status code. It supports String, Regexp, and Array type. Empty configuration means that all domain referrer are allowed.

```
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  secureDomains: 'waline.js.org'
});
```

> To facilitate local development, `localhost` and `127.0.0.1` will be added to the list of secure domain names by default. Env `SECURE_DOMAINS` will be disabled when the configuration has been set.

### forbiddenWords

If comment match forbidden word, it will be marked as spam.

```
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  forbiddenWords: [
    'Trump'
  ]
});
```

### disallowIPList

If comment ip match disallow ip list, it will return 403 error directly.

```
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  disallowIPList: [
    '8.8.8.8',
    '4.4.4.4'
  ]
});
```

### mailSubject

Customize the title of the comment reply email, which is equivalent to environment variable `MAIL_SUBJECT`.

### mailTemplate

Customize the title of the content reply email, which is equivalent to environment variable `MAIL_TEMPLATE`.

### mailSubjectAdmin

Customize the title of the new comment notification email, which is equivalent to the environment variable `MAIL_SUBJECT_ADMIN`.

### mailTemplateAdmin

Customize the content of the new comment notification email, which is equivalent to the environment variable `MAIL_TEMPLATE_ADMIN`.

### QQTemplate

The QQ comment notification template, which is equivalent to the environment variable `QQ_TEMPLATE`.

### TGTempalte

Telegram comment notification template, which is equivalent to the environment variable `TG_TEMPLATE`.

## Comment Hooks

In addition to environment variable configuration, Waline also provides some custom hooks to facilitate the processing of custom requirements. It only needs to be configured in the server entry file `index.js`.

### preSave(comment)

The hook will be triggered before comment posted, and will pass in comment data. If the method returns content, the interface will return directly without storing the comment data.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if (isSpam) {
      return { errmsg: "It's a spam!" };
    }
  },
});
```

### postSave(comment, pComment)

The action performed after the comment is posted. When the method is executed, the comment data will be passed in, and if it is a reply to the comment, the parent comment will also be passed in.

```js
//index.js
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

### preUpdate(comment)

The operation performed before the comment content is updated in the dashboard. If the method returns content, the interface will return directly without updating the comment data.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preUpdate(comment) {
    return "Then you can't update comment data";
  },
});
```

### afterUpdate(comment)

The operation performed after the comment content is updated in the dashboard. Comment data will be passed in when the method is executed.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postUpdate(comment) {
    console.log(`comment ${comment.objectId} has been updated!`);
  },
});
```

### preDelete(commentId)

The operation performed before the comment is deleted. When the method is executed, the comment Id to be operated will be passed in. If the method returns content, the interface will return directly without updating the comment data.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preDelete(commentId) {
    return "Then you can't delete comment";
  },
});
```

### afterDelete(commentId)

The operation performed after the comment is deleted, the comment Id to be operated will be passed in when the method is executed.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async postDelete(commentId) {
    console.log(`comment ${commentId} has been deleted!`);
  },
});
```
