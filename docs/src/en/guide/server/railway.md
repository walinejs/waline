---
title: Railway Deployment
icon: railway
---

[Railway](https://railway.app/) is a free Serverless platform, we can deploy Waline to Railway platform easily.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fwalinejs%2Frailway-starter&plugins=postgresql&envs=PG_HOST%2CPG_PORT%2CPG_USER%2CPG_PASSWORD%2CPG_DB%2CPG_PREFIX%2CPORT&referralCode=lizheming&PG_HOSTDefault=%24%7B%7B+PGHOST+%7D%7D&PG_HOSTDesc=Don%27t+modify+it&PG_PORTDefault=%24%7B%7B+PGPORT+%7D%7D&PG_PORTDesc=Don%27t+modify+it&PG_USERDefault=%24%7B%7B+PGUSER+%7D%7D&PG_USERDesc=Don%27t+modify+it&PG_PASSWORDDefault=%24%7B%7B+PGPASSWORD+%7D%7D&PG_PASSWORDDesc=Don%27t+modify+it&PG_DBDefault=%24%7B%7B+PGDATABASE+%7D%7D&PG_DBDesc=Don%27t+modify+it&PG_PREFIXDefault=wl_&PG_PREFIXDesc=Don%27t+modify+it&PORTDefault=3000&PORTDesc=Don%27t+modify+it)

Click this button and it'll redirect to railway.app platform to quickly deploy. You can input your new GitHub repo name or just use default after login, then click <kbd>Deploy</kbd> button at the bottom to deploy. You should notice that the part of environment variables should not be modified.

![](../../../assets/railway-1.jpg)

After a moment you will redirect to dashboard page. Click <kbd>PostgreSQL</kbd> - <kbd>Query</kbd> and paste [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) this file content into textarea, then click <kbd>Run Query</kbd> button at the bottom to initialized database.

![](../../../assets/railway-2.jpg)

At last you can click <kbd>Deployments</kbd> - <kbd>Domains</kbd> to get server URL. Copy the site url and input it into client `serverURL` configuration. Then you can enjoy waline!

![](../../../assets/railway-3.jpg)

## How to update

Go to the corresponding GitHub repository and modify the version number of `@waline/vercel` in the package.json file to the latest.

## How to modify environment variables

Click <kbd>Variables</kbd> Tab to go to enviroment variables management page. It will deploy automatically after variable was changed.

![](../../../assets/railway-4.jpg)
