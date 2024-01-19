---
title: Customize Locale
icon: i18n
---

This cookbook guides you to customize `@waline/client` multilingual and display text.

<!-- more -->

## Introduction

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

## Example

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
