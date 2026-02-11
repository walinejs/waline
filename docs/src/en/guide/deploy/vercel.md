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

   ![](../../../assets/vercel-2.png)

   After one minute or two, vercel should finish the deployment. Click `Go to Dashboard` button to redirect to your application dashboard.

   ![](../../../assets/vercel-3.png)

## Create Database

1. Click `Storage` at the top to enter the storage service page, choose `Create Database`. Under `Marketplace Database Providers`, select `Neon`, then click `Continue`.

   ![](../../../assets/vercel-4.png)

1. You will be prompted to create a Neon account. Choose `Accept and Create`. Next, select the database plan configuration, including region and quota. You can leave defaults and click `Continue`.

   ![neon](../../../assets/vercel-5.png)

1. Define the database name. You can keep the default and click `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Now the database appears under `Storage`. Click it and choose `Open in Neon` to jump to Neon. In Neon, select `SQL Editor` on the left, paste the SQL from [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) into the editor, and click `Run` to create tables.

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. After a short while you should see a success message. Go back to Vercel, click `Deployments`, then click `Redeploy` on the latest deployment to make the new database configuration take effect.

   ![redeploy success](../../../assets/vercel-9.png)

1. Vercel will redirect to `Overview` and start deploying. When `STATUS` becomes `Ready`, click `Visit` to open the deployed site. This URL is your server address.

   ![visit](../../../assets/vercel-10.png)

## Assign Domain

1. Click <kbd>Settings</kbd> - <kbd>Domains</kbd> to go to domain setting page.

1. Input domain you want to assign and click <kbd>Add</kbd> button.

   ![Add domain](../../../assets/vercel-11.png)

1. Add a new `CNAME` record in your domain service server.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. You can use your own domain to visit Waline after it takes effect. :tada:
   - Comment system: example.your-domain.com
   - Admin panel: example.your-domain.com/ui

   ![success](../../../assets/vercel-12.png)

## HTML Import

Set up as follows in your webpage:

1. Import Waline styles from `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Create a `<script>` tag that uses `init()` from `https://unpkg.com/@waline/client@v3/dist/waline.js`, and pass required options `el` and `serverURL`.
   - `el` is the element used to render Waline. It can be a CSS selector string or an HTMLElement.
   - `serverURL` is your server address obtained in the previous step.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@waline/client@v3/dist/waline.css"
  />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Comment Admin

1. After deployment, visit `<serverURL>/ui/register` to register. The first registered user becomes the administrator.
2. After logging in, the administrator can manage comments: edit, mark, or delete.
3. Users can also register via the comment box. After login they will be redirected to their profile page.
