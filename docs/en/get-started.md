# Get Started

If you want to use Waline in your site, please follow this guide.

<!-- more -->

## Get APP ID and APP Key

First you need [sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) LeanCloud. Then go to [Console](https://console.leancloud.app/applist.html#/apps) click button [Create app](https://console.leancloud.app/applist.html#/newapp) to create a new app：

![](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

After app created, we need click into it. Select <kbd>Settings</kbd> > <kbd>App Keys</kbd> at the left bottom side, then you can see `APP ID`, `APP Key` and `Master Key` for your app!

![](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

## Deploy to Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Click the blue button, and it will redirect to vercel to deploy with waline template. You need login if you have not, we recommends you sign in with GitHub. You can input your Vercel project name after you login.

![](https://p2.ssl.qhimg.com/t018cd2a91a8896a555.png)

Click <kbd>Continue</kbd> go to the next step，and input your new github repo name。The repo will be created and initiallized automatically base on waline example template by Vercel.

![](https://p4.ssl.qhimg.com/t01bb30e74f85ddf5b3.png)

OK, repo has been initialized. It's ready to deploy to Vercel! We must set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY` the three environment variables in the "Environment Variables" column. The variables' value are what you get on the previous step in LeanCloud. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

![](https://p5.ssl.qhimg.com/t019aec05e3e5fea5cc.png)

Click <kbd>Deploy</kbd> button to deploy. It will show you deploy successfully after a minitues time. It'll go to deployed site when you click <kbd>Visit</kbd> button. Please remember the site's url, we will use it to set `serverURL` configuration in the next step.

![](https://p0.ssl.qhimg.com/t0142b58c2e8f886b28.png)

## HTML References

Let us set the `serverURL` value to the site url previous step got in the configuration object.

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
      path: location.pathname,
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## NPM

You can alose use [npm](https://www.npmjs.com/package/@waline/client) to install Waline instead of CDN link. Install in the CLI like this:

```bash
# Install waline
npm install @waline/client --save-dev
```

```js
// Use import
import Waline from '@waline/client';
// or Use require
const Waline = require('@waline/client');

new Waline({
  el: '#waline',
  // other config
});
```

## Comment Managment

Waline has a simple admin control panel, we can mange comment data in it. We can register in your site url `<serverURL>/ui/register` after we deployed successfully. The first register one is administrator. You can see comment management UI after login. Collection it for the next use!
