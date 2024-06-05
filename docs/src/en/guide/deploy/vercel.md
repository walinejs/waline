---
title: Vercel Deployment
icon: vercel
order: 1
---

We released the `@waline/vercel` package as server package, Vercel deployment is also our most recommended way.

<!-- more -->

## How to Deploy

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Click the blue button above, it will redirect you to vercel to deploy with waline template.

   ::: note

   If you haven't logined, we recommend you to sign in with GitHub.

   :::

1. Input your Vercel project name then click `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Repo which named you input before will be created and initialized automatically base on waline example template by Vercel.

   ![deploy](../../../assets/vercel-3.png)

   After one minute or two, vercel should finish the deployment. Click `Go to Dashboard` button to redirect to your application dashboard.

   ![deploy](../../../assets/vercel-4.png)

1. Click `Settings` menu on the top, and `Environment Variables` button on the side to go to environment variables setting page. Then set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY`. The variables' value should be the ones you got in the previous step. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

   ![set environment variables](../../../assets/vercel-5.png)

1. To let your environment variables setting active, you need redeploy your application. Click `Deployments` menu on the top and find the latest deployment at the top of list, click `Redeploy` button in the right dropdown menu.

   ![redeploy](../../../assets/vercel-6.png)

1. If everything is ok, vercel will redirect to `Overview` page to start redeployment. Wait a moment the `STATUS` will change to `Ready`. Now you can click `Visit` to visit the site. This link is your server address.

   ![redeploy success](../../../assets/vercel-7.png)

## Assign Domain (Optional)

1. Click <kbd>Settings</kbd> - <kbd>Domains</kbd> to go to domain setting page.

1. Input domain you want to assign and click <kbd>Add</kbd> button.

   ![Add domain](../../../assets/vercel-8.png)

1. Add a new `CNAME` record in your domain service server.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. You can use your own domain to visit waline comment system after go into effect. :tada:

   - serverURL：example.your-domain.com
   - admin panel：example.your-domain.com/ui

   ![success](../../../assets/vercel-9.png)
