# Get Started

If you want to use Waline in your site, please follow this guide.

<!-- more -->

## Get APP ID and APP Key

First you need [sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) LeanCloud. Then go to [Console](https://console.leancloud.app/applist.html#/apps) and click [Create app](https://console.leancloud.app/applist.html#/newapp) button to create a new app:

![Create App](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

After app is created, we need click into it. Select `Settings` > `App Keys` at the left bottom side, then you can see `APP ID`, `APP Key` and `Master Key` of your app!

![ID and Key](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

## Deploy to Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Click the blue button above, it will redirect you to vercel to deploy with waline template. We recommend you to sign in with GitHub if you don't have a vercel account. Input your Vercel project name after login.

![Create project](https://p2.ssl.qhimg.com/t018cd2a91a8896a555.png)

Click `Continue` to the next step then input your new GitHub repo name. The repo will be created and initiallized automatically base on waline example template by Vercel.

![Select repo](https://p4.ssl.qhimg.com/t01bb30e74f85ddf5b3.png)

Now the repo is initialized. It's ready to deploy to Vercel! Setting `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY` environment variables in the "Environment Variables" column is required. The variables' value are what you get on the previous step in LeanCloud. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

![Set environment variables](https://p5.ssl.qhimg.com/t019aec05e3e5fea5cc.png)

Finally click `Deploy` button, and vercel will tell you the deployment finishes successfully after one or two minutes. Now you can click `Visit` button to visit the site. Please memorize the site's url, we will use it in next step.

![Deploy](https://p0.ssl.qhimg.com/t0142b58c2e8f886b28.png)

## HTML References

Set `serverURL` option with the site url in options.

```html
<head>
  ..
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>
  ...
</head>
<body>
  ...
  <div id="waline"></div>
  <script>
    new Waline({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## NPM

You can use [npm](https://www.npmjs.com/package/@waline/client) to install Waline instead of CDN link. Install in CLI like this:

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

```js
// Use import
import Waline from '@waline/client';
// or Use require
const Waline = require('@waline/client');

new Waline({
  el: '#waline',
  // other config
  ...
});
```

## Comment Management

Waline provides a simple admin control panel for us to manage comment data. You can register in `<serverURL>/ui/register` after deployed successfully. The first person registered will be administrator.
