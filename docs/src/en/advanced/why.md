---
title: Design Goal
icon: goal
---

[Valine](https://valine.js.org) an exquisite style, simple operation, and efficient deployment review system. The first time I came into contact, I was attracted by its exquisite style and serverless characteristics. It doesn't require the backend service. The frontend interacts with the LeanCloud storage service directly, which is really cool! But as I understand deeper, I find out it's problems.

## Problem of Valine

### Not Open Source

The author only push the compiled files to the GitHub repository starting from version `1.4.0`, and the source code stop updating. May be the author have a broken heart in open source. While for users like me who want to add or modify project, this problem is a bit uncomfortable.

### XSS

Since the very early version, users have reported Valine's XSS problems, and the community is also using various methods to fix these problems. Including the addition of verification codes, frontend XSS filtering and other methods. However, the author later realized that all the frontend verification can only prevent the gentleman, so the restriction such as verification code is removed.

Now when the frontend publishes a comment, Markdown will be converted into HTML, and then execute an XSS filter function on the frontend before be submitted to LeanCloud. After getting the data from LeanCloud, it is directly inserted to DOM. Obviously, the process is problematic. As long as the HTML is submitted directly and displayed directly after the HTML is obtained, XSS cannot be eradicated fundamentally.

::: note Fundamental solution

For stored XSS attacks, we can use escape HTML codes to solve them permanently. Just like old BBCode, only markdown content is submit to the database. The frontend reads the content and encodes all HTML before displaying it after Markdown conversion.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Since Valine is a serverless system, attackers can directly reach the storage stage. All precautions before data storage are invalid and can only be processed during the displaying process. Because all HTML cannot be parsed after being escaped, we can ensure that the converted HTML has no chance of being inserted.

Since Valine is no longer open source, pull requests cannot be opened.

:::

Since the above method will completely restrict users in the scope of Markdown, Waline inludes `DOMPurify` on the client side since `0.15.0` to prevent XSS. Besides the regular XSS sterilization:

- `<form>` and `<input>` are disabled
- style inject is disabled
- autoplay of the media is disabled
- all external links will be processed and opened in a new window with rel of `noopener noreferrer`.

### Privacy Leak

Besides direct access to storage, the attacker can also read any data directly. If a database field has read permission to everyone, the content of the field is completely transparent to the attacker.

In the comment data, the two fields IP and mailbox contain the user's sensitive data. Mr.Deng wrote an article specifically to criticize the problem [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Even when the [JueJin](https://juejin.cn) community used LeanCloud in early years, the security problem of [disclosed user's mobile phone number](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999) was exposed.

In order to circumvent this problem, the author of Valine added the `recordIP` configuration to set whether to allow recording of user IP. Since there is no server, it can only be solved by not storing the value.

There is still a problem with this option: Whether to record ip is based on the site owner's config, while commenters have no right to manage their own privacy.

Leaking of email address are another major privacy issue. It is completely feasible to calculate and report the md5 of the user's email at frontend to obtain the Gravatar avatar. But if sending email notification when a comment being replyed is needed, it is inevitable to store the original value of the user's email address. This problem can theoretically be solved by RSA encryption. The private key can be stored in the environment variable of LeanCloud. The client reports both the email md5 and the email encrypted by the public key. When LeanCloud wants to send email notifications, it reads the private key in the environment in the cloud function, and then decrypt to get the user email. However, considering the size and performance of the frontend RSA encryption library, it's not actual. Adding a server layer to filter sensitive information through the server side is definitely a better practice.

### Read Statistics Tampering

Valien 1.2.0 adds the function of article reading statistics, the user visits the page and records the number of visits according to the url in the counter table in the background. Since the data needs to be updated every time the page is accessed, the permissions must be set to be writable in order to perform subsequent field updates. This creates a problem. In fact, the data can be updated to any value. If you interested in it, you can open the <https://valine.js.org/visitor.html> official website and enter the console and enter the following code to try. Remember to change the number back after trying it~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Fortunately, the value of the `time` field is of type Number, so other values cannot be inserted. If the `time` field is of string type, it may be an XSS vulnerability. A possible solution to this problem is not to use the accumulative storage method. Changed to store a read-only access record for each visit, and use the `count()` method for statistics when reading. In this way, all data is read-only, which solves the problem of tampering. This solution also has a problem: when the amount of data is relatively large, it will cause a certain pressure on the query.

If it is based on remaining the original data, only server layer can be added to isolate the modification permissions.

## Born of Waline

Based on the above reasons, Waline was born. Waline's original goal was only to add backend to Valine, but because Valine is not open source, it can only be implemented with frontend. Of course, many codes and logic of the frontend have reference Valine in order to be consistent with Valine's configuration. Even in the project's name, I derived it from Valine, so that everyone can understand that this project is a derivative of Valine.

Besides solving the above-mentioned security problems. the addition of the server side implement many features previously limited by no server side, including email notifications, spam comment filtering, etc.
