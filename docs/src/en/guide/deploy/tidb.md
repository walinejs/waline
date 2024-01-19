---
title: Create a database on TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) is an open source NewSQL database. [TiDB Cloud](https://tidbcloud.com/) is the official online version, which provides 5GB of free storage for everyone to use. The following describes how to create a Waline database on TiDB Cloud.

## Create Database

1. After logging in to [TiDB Cloud](https://tidbcloud.com), a TiDB instance will be created automatically, directly click <kbd>cluster0</kbd> to enter the instance

   ![Enter instance](../../../assets/tidb-1.png)

2. Select <kbd>Chat2Query</kbd> in the list on the left and change the content of [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) to `;` The distribution of statements is executed close to the interface. Click the <kbd>Run</kbd> blue button in the upper right corner for each sentence, or use the <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> shortcut key to execute
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

So far the Waline database has been created!

## Get Connection Configuration

Click the <kbd>Overview</kbd> button on the left to enter the homepage, and select <kbd>Connect</kbd> in the upper right corner to get connection information.

'Connect with' select `Node.js`. In addition, you need to click <kbd>Reset password</kbd> in the lower right corner to generate a password.

In this way, you can get the configuration related to the connection.

![Connection](../../../assets/tidb-7.png)
