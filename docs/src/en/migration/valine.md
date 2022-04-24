---
title: Migration from Valine
icon: valine
---

Since Waline completely reuses Valine's data structure in storage, migrating from Valine to Waline is very simple.

1. Deploy backend according to [Vercel Deploy](../guide/get-started.md#deploy-to-vercel-server) in _Get Started_ section. `LEAN_ID` and `LEAN_KEY` should be the same as those applied for when using Valine before. Don't forget to set `LEAN_MASTER_KEY` for Waline.
1. Modifiy frontend scripts according to [HTML](../guide/get-started.md#importing-in-html-client) in _Get Started_ section. Please remind we should remove old configuration `appId` and `appKey` from Valine, and add `serverURL` option.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//cdn.jsdelivr.net/npm/@waline/client/dist/waline.js'></script>
   + <link href='//cdn.jsdelivr.net/npm/@waline/client/dist/waline.css' rel='stylesheet' />

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

For waline config, please refer to [Client Config](../reference/client.md). You can also check [Waline Client V2 Migration Guide](./client.md) to learn about the options that are not compatible with Valine.

:::

::: tip Using Leancloud China

Besides `LEAN_ID` and `LEAN_KEY`, you need to config `LEAN_SERVER` environment variable if you're the user of LeanCloud China.

Also, you need to complete Domain name filing to Local Communications Administration, that needs a Fixed IP。

:::

## Migration to Cloudbase

If you want to migrate your Valine data to Tencent Cloud Database, you can use the import function of LeanCloud with the import function of the cloud database. Select <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> in the LeanCloud background, and then you will receive a email notification.

Paste the content of export file into the textarea below, and click the convert button to obtain the file to be imported. Enter the [Tencent Cloud Development Backend → Database](https://console.cloud.tencent.com/tcb/db/index) page and select the `Comment` collection. If the collection doesn't exist, click <kbd>New Collection</kbd> in the upper left corner to create it. Click the import button above, select the converted file and wait a while to complete importing.

<MigrationTool />

<script setup lang="ts">
import MigrationTool from '@MigrationTool';
</script>
