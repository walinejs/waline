# Get Started

Welcome to Waline. In just a few steps, you can enable Waline to provide comments and pageviews on your website.

<!-- more -->

## LeanCloud settings (Database)

1. [sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) LeanCloud and enter [Console](https://console.leancloud.app/applist.html#/apps).

1. Click [Create app](https://console.leancloud.app/applist.html#/newapp) button to create a new app and enter a name you like:

   ![Create App](../../assets/leancloud-app-1.jpg)

1. Enter the app, then select `Settings` > `App Keys` at the left bottom corner. You will see `APP ID`, `APP Key` and `Master Key` of your app. We will use them later

   ![ID and Key](../../assets/leancloud-app-2.jpg)

## Deploy to Vercel (Server)

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/walinejs/waline/tree/main/example)

1. Click the blue button above, it will redirect you to vercel to deploy with waline template.

2. If you haven't logined, we recommend you to sign in with GitHub.

3. Input your Vercel project name then click `Create`.

   ![Create Project](../../assets/vercel-1.png)

4. Then Vercel will let you create Vercel Team account, click `Skip` and go on.

   ![skip team](../../assets/vercel-2.png)

5. Repo which named you input before will be created and initiallized automatically base on waline example template by Vercel.

   ![deploy](../../assets/vercel-3.png)

   After one minute or two, vercel should finish the deployment. Click `Go to Dashboard` button to redirect to your application dashboard.

   ![deploy](../../assets/vercel-4.png)

6. Click `Settings` menu on the top, and `Environment Variables` button on the side to go to envrionment variables setting page. Then set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY`. The variables' value should be the ones you got in the previous step. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

   ![set environment variables](../../assets/vercel-5.png)

7. To let your environment variables setting active, you need redeploy your application. Click `Deployments` menu on the top and find the latest deployment at the top of list, click `Redeploy` button in the right dropdown menu.

   ![redeploy](../../assets/vercel-6.png)

8. If everything is ok, vercel will redirect to `Overview` page to start redeployment. Wait a moment the `STATUS` will change to `Ready`. Now you can click `Visit` to visit the site. This link is your server address.

   ![redeploy success](../../assets/vercel-7.png)

## Importing in HTML (Client)

Make the following settings on your web page:

1. Use CDN to import Waline: `///cdn.jsdelivr.net/npm/@waline/client`.

1. Create a `<script>` tag and initialize with `Waline()` while passing in the necessary `el` and `serverURL` options.

   - The `el` option is the element used for Waline rendering. You can set a CSS selector in the form of a string or an HTMLElement object.
   - `serverURL` is the link of the server, which you just got.

   ```html:line-numbers
   <head>
     ..
     <script src="//cdn.jsdelivr.net/npm/@waline/client"></script>
     ...
   </head>
   <body>
     ...
     <div id="waline"></div>
     <script>
       Waline({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
       });
     </script>
   </body>
   ```

1. The comment service will now run successfully on your website :tada:

## Comment management (Management)

1. After the deployment is complete, please visit `<serverURL>/ui/register` to register. The first person to register will be set as an administrator.
1. After you log in as administrator, you can see the comment management interface. You can edit, mark or delete comments here.
1. Users can also register their account in the comment box, and they will be redirected to their profile page after logging in.
