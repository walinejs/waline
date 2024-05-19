---
title: Customize Locale
icon: i18n
---

This cookbook guides you to customize Waline multilingual and display text.

<!-- more -->

## Customize client language and text

`@waline/client` provides the `locale` option, through which you can customize multiple languages and display text.

By default it uses the built-in multilingual literals and falls back to `en-US` (English US) if the language is not supported.

You can pass a completed multilingual configuration to the `locale` option to add language support, or set several of these to override existing UI text.

### Locale Options

- Level related:

  - `level${number}`: Label for level number

  ::: tip

  For example, you can customize the labels for 6 levels like this:

  ```ts
  Waline.init({
    locale: {
      level0: '炼体',
      level1: '炼气',
      level2: '筑基',
      level3: '金丹',
      level4: '元婴',
      level5: '化神',
    },
  });
  ```

  :::

- Reaction related:

  - `reactionTitle`: Reaction title
  - `reaction0`: Reaction 1 text
  - `reaction1`: Reaction 2 text
  - `reaction2`: Reaction 3 text
  - `reaction3`: Reaction 4 text
  - `reaction4`: Reaction 5 text
  - `reaction5`: Reaction 6 text
  - `reaction6`: Reaction 7 text
  - `reaction7`: Reaction 8 text
  - `reaction8`: Reaction 9 text

- UI related:

  - `nick`: nickname
  - `mail`: Email
  - `link`: Link
  - `placeholder`: Default text of comment box
  - `sofa`: Display text when the comment area is empty
  - `submit`: Submit button text
  - `comment`: Comment button text
  - `refresh`: Refresh button text
  - `more`: Load more button text
  - `uploading`: display text when uploading
  - `login`: login button text
  - `admin`: The label of the administrator
  - `sticky`: Sticky text
  - `word`: word
  - `anonymous`: anonymous user default name
  - `optional`: text indicating optional options
  - `gifSearchPlaceholder`: emoji search placeholder text
  - `oldest`: oldest comment
  - `latest`: latest comment
  - `hottest`: hottest comment

  ::: info

  The above text will be displayed in page.

  :::

- Prompt information related:

  - `nickError`: Error message that the nickname does not meet the conditions
  - `mailError`: The error message that the mailbox does not meet the conditions
  - `wordHint`: Error prompt for comment word count, where `$0` `$1` `$2` will be automatically replaced with the lower limit of the allowed word count, the upper limit of the allowed word count, and the current word count.

- Comment time related:

  - `seconds`: seconds ago
  - `minutes`: minutes ago
  - `hours`: hours ago
  - `days`: days ago
  - `now`: just now

- Management related:

  - `approved`: Button which marks comment as approved
  - `waiting`: Button which marks comment waiting for review
  - `spam`: Button which marks comments as spam
  - `unsticky`: Button which unsticky comment

- Accessibility related:

  - `like`: the label text of like button
  - `cancelLike`: the label text of the cancel like button
  - `reply`: the label text of the reply button
  - `cancelReply`: the label text of the cancel reply button
  - `preview`: Preview button label text
  - `emoji`: the label text of the emoji button
  - `gif`: The label text of Gif button
  - `uploadImage`: the label text of the upload image button
  - `profile`: The link title of profile page
  - `logout`: the label text of the logout button

  ::: info

  These texts are only for accessibility purpose and will not be displayed on the page.

  :::

### Example

```js
// en default
const locale = {
  nick: 'NickName',
  nickError: 'NickName cannot be less than 3 bytes.',
  mail: 'E-Mail',
  mailError: 'Please confirm your email address.',
  link: 'Website',
  optional: 'Optional',
  placeholder: 'Comment here...',
  sofa: 'No comment yet.',
  submit: 'Submit',
  like: 'Like',
  cancelLike: 'Cancel like',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comment: 'Comments',
  refresh: 'Refresh',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  uploadImage: 'Upload Image',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading',
  login: 'Login',
  logout: 'logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Words',
  wordHint:
    'Please input comments between $0 and $1 words!\n Current word number: $2',
  anonymous: 'Anonymous',
  level0: 'Dwarves',
  level1: 'Hobbits',
  level2: 'Ents',
  level3: 'Wizards',
  level4: 'Elves',
  level5: 'Maiar',
  gif: 'GIF',
  gifSearchPlaceholder: 'Search GIF',
  profile: 'Profile',
  approved: 'Approved',
  waiting: 'Waiting',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Oldest',
  latest: 'Latest',
  hottest: 'Hottest',
  reactionTitle: 'What do you think?',
};

Waline.init({
  el: '#waline',
  path: location.pathname,
  serverURL: 'YOUR_SERVER_URL',
  // ...
  locale,
});
```

## Customize server response text

`@waline/vercel` provides a `locales` option that allows you to customize the response text.

By default, it uses the built-in multilingual text, and falls back to `en-US` language text if the language is not supported.

You can pass a completed multilingual configuration to the `locales` option to add language support, or set some of them to override the existing text.
::: tip

All custom text will eventually be rendered using the nunjucks template engine, which supports writing some relatively complex logical expressions. For example:

```
Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.
```

:::

### locale 选项

- Prompt information related:

  - `import data format not support!`
  - `USER_EXIST`
  - `USER_NOT_EXIST`
  - `USER_REGISTERED`
  - `TOKEN_EXPIRED`
  - `TWO_FACTOR_AUTH_ERROR_DETAIL`
  - `Duplicate Content`
  - `Comment too fast`

- Register/Login mail notification related:

  - `[{{name | safe}}] Registration Confirm Mail`
  - `Please click <a href=\"{{url}}\">{{url}}<a/> to confirm registration, the link is valid for 1 hour. If you are not registering, please ignore this email.`
  - `[{{name | safe}}] Reset Password`
  - `Please click <a href=\"{{url}}\">{{url}}</a> to login and change your password as soon as possible!`
  - `Registration confirm mail send failed, please {%- if isAdmin -%}check your mail configuration{%- else -%}check your email address and contact administrator{%- endif -%}.`

- Comment mail notification related:
  - `MAIL_SUBJECT`：`Your comment on {{site.name | safe}} received a reply`
  - `MAIL_TEMPLATE`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> Your comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> received a reply </h2>{{parent.nick}}, you wrote: <div style='padding:0 12px 0 12px;margin-top:18px'> <div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{parent.comment | safe}}</div><p><strong>{{self.nick}}</strong> replied:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View full reply</a> or visit <a style='text-decoration:none; color:#12addb' href='{{site.url}}' target='_blank'>{{site.name}}</a>.</p><br/> </div></div>`
  - `MAIL_SUBJECT_ADMIN`：`New comment on {{site.name | safe}}`
  - `MAIL_TEMPLATE_ADMIN`：`<div style='border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;'> <h2 style='border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;'> New comment on <a style='text-decoration:none;color: #12ADDB;' href='{{site.url}}' target='_blank'>{{site.name}}</a> </h2> <p><strong>{{self.nick}}</strong> wrote:</p><div style='background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;'>{{self.comment | safe}}</div><p><a style='text-decoration:none; color:#12addb' href='{{site.postUrl}}' target='_blank'>View page</a></p><br/></div>`

### Example

```js
// index.js
const Waline = require('@waline/vercel');

module.exports = Waline({
  locales: {
    'en-US': {
      USER_EXIST: 'Warning! User exist!',
    },
  },
});
```
