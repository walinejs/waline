---
title: Migration from Valine
icon: valine
---

1. Deploy backend according to [Vercel Deploy](../guide/get-started/README.md#deploy-to-vercel-server) in _Get Started_ section.

2. Modify frontend scripts according to [HTML](../guide/get-started/README.md#importing-in-html-client) in _Get Started_ section.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

::: tip Config

Waline V2 has removed Valine support and moved to a better configuration. The following is a migration summary of some options:

- `placeholder`: use `locales.placeholder`
- `highlight`: use `highlighter`
- `avatarForce`, `avatar`: use the server's `AVATAR_PROXY` environment variable
- `recordIP`: no longer display the user IP, and provide the `DISABLE_USERAGENT` environment variable on the server
- `requiredFields`: renamed to `requiredMeta`
- `langMode`: renamed to `locales`
- `emojiCDN`, `emojiMap`: use more powerful `emoji` options

For waline config, please refer to [Client Config](../reference/client/api.md). You can also check [Waline Client V2 Migration Guide](./v2.md) to learn about the options that are not compatible with Valine.

:::

3. Migrate data

Select <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> in the LeanCloud background, and then you will receive a email notification.

Paste the content of export file into the textarea below, and click the convert button to obtain the file to be imported.

<MigrationTool />

::: tip

After you get the exported file through the tool above, you can import it in the corresponding storage service console.

:::

## Waline Highlights

Compared with Valine, Waline has the following highlights:

### More features

1. Markdown supports more syntax, including superscript and subscript, emoji, tables, strike-through, mathematical formulas, HTML tags, footnotes, etc.
1. Image upload feature, which allows customized image provider service or embedding images directly.
1. The brand new label system adds level labels for users according to the frequency of user interaction, and support custom labels for registered users.
1. Emoji presets and tab support, allowing multiple sets of Emoji, while allowing anyone to publish and use Emoji presets.
1. A brand new reaction system that allows visitors to express their attitude towards the article.
1. Comment likes, express support for the comment you like.
1. Pageviews, more accurate viewing and anti-tampering.
1. Emoji search. Customizable service, allowing users to search and insert emoticons freely.
1. Support registered users to edit and delete their published comments.

### Safer

1. Zero privacy leakage, will not expose user mailboxes, IP addresses and other sensitive information, and can choose to hide user geographic location, browser and operating system at server
1. Complete anti-spam system.
   - All comments can be authenticated by anti-spam services and support additional validation logic.
   - You can set the comment speed limit for a single IP or a single user, and Waline automatically identify duplicate comments.
1. Comment review feature, in sensitive periods or when the website is under attack, you can enable comment review, manually review and approve the display of comments, and prevent malicious comments from causing site closure.
1. Support user accounts. Besides registering an account, Waline also supports social media accounts, quickly synchronizes avatars and nicknames with authorized label to prevent identity fraud.

### more convenient

1. Various methods (QQ, WeChat, DingTalk, E-mail), etc. to notify bloggers about comments
1. Powerful management service, you can view all users and comments and perform related operations, and set custom labels and administrators for users
1. Front-end management, administrators can review, edit or delete comments directly through the Waline comment component.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
