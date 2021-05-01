# FAQ

Waline has a very clear position since its birth:

> A **simple** comment system **with backend**.

All versions released afterwards are modifications made around this position.

## What is the relationship with Valine?

Waline = **W**ith backend V**aline**

Consulting with the open source version of Valine, the comment list in frontend is rewritten with React. The style and structure as well as some internal tools and methods are all from Valine.

## Do I still need to deploy Valine-Admin on LeanCloud?

No. Waline is a three-in-one deployment of data storage, server, and client. The server interface is already equivalent to Valine's LeanCloud cloud engine. The server already includes comment management and email notifications feature provided by the previous cloud engine. It doesn't need the additional LeanCloud cloud engine, so it won't be restricted by the LeanCloud cloud engine's sleep strategy.

## How can I upgrade?

Waline is mainly composed of two parts: the frontend and the server.

### Frontend

The front end inserts comment lists and comment boxes by including JS scripts in the web page. In most scenarios, the link will use the address of the latest version of the online CDN, and the latest version will be automatically applied, without the need for users to manually update.

::: tip Need manually update in following situations

1. The version number is forcibly specified in the CDN address. In this situation, you need to manually modify the version number to be the latest.
2. Use NPM to require and pack the module into code. In this situation, you need to modify the version number in the dependency to ensure that the latest version of the dependency can be obtained during installation.

:::

### Server

The server refers to the backend service corresponding to the `serverURL` configured in frontend script, and its update will be slightly different depending on different deployment environments. Server updates will be more frequent.

#### Vercel

Go to the corresponding GitHub repository and modify the version number of `@waline/vercel` in the package.json file to the latest.

![vercel](../assets/vercel-update.png)

#### CloudBase

Enter the code editing page, click <kbd>Save and reinstall dependencies</kbd>. If it still doesn’t work, enter <kbd>My Application</kbd> and select <kbd>Deploy</kbd> to redeploy.

::: warning

Redeployment will clear the previous files. If there is a configuration in the previous file, it needs to be backed up first.

:::

![cloudBase](../assets/cloudbase-update.jpg)

#### Docker

Run `docker pull lizheming/waline` directly to pull the latest image.

## why posting comments are slow?

Due to some technical reasons, spam detection and comment notification are all serial operations when posting comments. The spam detection uses the service provided by Akismet abroad, which may be slow to access. Users can turn off the spam detection function through the `AKISMET_KEY=false` environment variable. Beside the spam detection service, the email notification in the comment notification may also cause a timeout. You can turn off the comment notification to test whether it is caused by this feature.

## At last

`Waline` may change in the future, but it will never change the original intention of **with backend**.
