# Why Waline?

[Valine](https://valine.js.org) an exquisite style, simple operation, and efficient deployment review system. The first time I came into contact, I was attracted by its exquisite style and serverless characteristics. It doesn't require the backend service. The frontend interacts with the LeanCloud storage service directly, which is really cool! But as I slowly understood it, I found that it had some problems.

## Problem of Valine

### Not Open Source

The author only push the compiled files to the GitHub repository starting from version `1.4.0`, and the source code stop updating. May be the author have a broken heart in open source. While for users like me who want to add or modify project, this problem is a bit uncomfortable.

### XSS

Since the very early version, users have reported Valine's XSS problems, and the community is also using various methods to fix these problems. Including the addition of verification codes, frontend XSS filtering and other methods. However, the author later realized that all the frontend verification can only prevent the gentleman, so the restriction such as verification code is removed.

Now when the frontend publishes a comment, Markdown will be converted into HTML, and then execute an XSS filter function on the frontend before be submitted to LeanCloud. After you get the data from LeanCloud, you can insert it directly for display because it's just HTML. Obviously, the process is problematic. As long as the HTML is submitted directly and displayed directly after the HTML is obtained, XSS cannot be eradicated fundamentally.

Is there a fundamental solution? In fact, there are. For stored XSS attacks, we can use escape codes to solve them. Just like old BBCode, we just submit to the database the Markdown content. The frontend reads the content and encodes all HTML before displaying it after Markdown conversion.

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

Since Valine does not have an open source code, it is not easy to pull requests. I can only wait for the author to discover this by himself. However, there is a problem with this method that it's incompatibility with old data. Because this is equivalent to modifying the rules of storage and display, and HTML content has been stored before. After the repair, the previous data will not be able to display HTML style.

In order to circumvent XSS security issues when the storage data is still HTML, the only way is to add a backend. This is why this project exists. But because Valine is not open source, I can only implement it from beginning to end, while most of the frontend code still refers to the old version of Valine. Thank you.

### Privacy Leak

After talking about the storage problem, let's look at the displaying problem again. In addition to direct access to storage, the attacker can also access displaying directly. When a field in a database has read permission, the content of the field is equivalent to transparent to the attacker.

In the comment data, there are two fields that are user sensitive data, namely IP and email. Another valine user even wrote an article specifically to criticize the problem ["Please stop using the Valine.js comment system immediately, unless it fixes the user privacy leak"] (https://ttys3.net/post/hugo/please- stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Even when the [JueJin](https://juejin.cn) community used LeanCloud in the early years, the security problem of [disclose user's mobile phone number](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999) was exposed.

In order to circumvent this problem, Valine authors added the `recordIP` configuration to set whether to allow recording of user IP. Since there is no server, all that can be thought of is a solution without storage. However, there is a problem with this configuration item, that the configuration right of the item is on the website, and the privacy problem is encountered by the commentor, which means that the commentor has no right to manage his own privacy.

In addition to this contradiction, there is also the problem of email. Essentially, the email only needs to return to md5 to get the Gravatar profile picture. However, due to the limitation of the server, the original content can only be returned and calculated by the frontend. And we need to get the original value of the mailbox to facilitate the comment reply email notification function. So we can't save it or store the value after md5.

The solution to this problem can only be to add a layer of server to solve this problem by filtering sensitive information on the server.

### Read Statistics Tampering

Valien 1.2.0 adds the function of article reading statistics, the user visits the page and records the number of visits according to the url in the counter table in the background. Since the data needs to be updated every time the page is accessed, the permissions must be set to be writable in order to perform subsequent field updates. This creates a problem. In fact, the data can be updated to any value. If you interested in it, you can open the <https://valine.js.org/visitor.html> official website and enter the console and enter the following code to try. Remember to change the number back after trying it~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

The only good thing about this problem is that the value of the `time` field is of type Number, and other values cannot be inserted. If it is a string type, it is another XSS vulnerability. There is a solution to this problem, which is to not use the accumulative storage method. Changed to store a read only access record for each visit, and use the `count()` method for statistics when reading. In this way, all data is read-only, and there is no problem of tampering. The only problem with this solution is that the amount of data will be relatively large, which will cause a certain pressure on the query.

Of course, if it is based on the original data unchanged, you can only add a layer of server to isolate the modification permissions.

## Waline

Based on the above reasons, Waline was born. Waline's original goal was only to add backend to Valine, but because Valine is not open source, it can only be implemented with the frontend. Of course, many codes and logic of the frontend have reference Valine in order to be consistent with Valine's configuration. Even in the project's name, I derived it from Valine, so that everyone can understand that this project is a derivative of Valine.
