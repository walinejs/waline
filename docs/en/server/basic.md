# Server Configuration

## Basic Configuration

Mose configuration for backend can be cofigured in environment variable, which can be set in <kbd>Settings</kbd> - <kbd>Environment Variables</kbd> for Vercel. Please reminder that all change works after redeploy.

| Environment Variable | Required | Description                                             |
| -------------------- | -------- | ------------------------------------------------------- |
| `LEAN_ID`            | √        | LeanCloud Application ID                                |
| `LEAN_KEY`           | √        | LeanCloud Application Key                               |
| `LEAN_MASTER_KEY`    | √        | LeanCloud Application Master Key                        |
| `LEAN_SERVER`        |          | LeanCloud server address if you're leancloud china user |
| `SITE_NAME`          |          | site name                                               |
| `SITE_URL`           |          | site url                                                |

In addition to the above environment variables, different functions will also have many environment variable configurations, which can be viewed in the function items corresponding to the progress in the left column.

## Code Configuration

Except environment variables setting, we also support some configuration in project file.

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
## Comment Submit Hooks

In addition to environment variable configuration, Waline also provides some custom hooks to facilitate the processing of custom requirements. Currently supports hooks before and after posting comments. It only needs to be configured in the server entry file `index.js`.

### preSave(comment)

Pass in comment data. If the method returns content, the interface will return directly without storing the comment data.

```js
//index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  async preSave(comment) {
    const isSapm = await Akismet.check(comment);
    if(isSpam) {
      return { errmsg: 'It\'s a spam!' };
    }
  }
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
      text: `${comment.nick} replied your comment!`
    });
  }
});
```
