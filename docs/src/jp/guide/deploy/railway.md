---
title: Railway デプロイ
icon: railway
---

[Railway](https://railway.app/) は無料の Serverless プラットフォームで、Waline を Railway プラットフォームに簡単にデプロイできます。

<!-- more -->

## デプロイ方法

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

このボタンをクリックすると railway.app プラットフォームへリダイレクトされ、素早くデプロイできます。ログイン後、新しい GitHub リポジトリ名を入力するかデフォルトのまま使用し、下部の <kbd>Deploy</kbd> ボタンをクリックしてデプロイします。環境変数の部分は変更しないよう注意してください。

![railway1](../../../assets/railway-1.jpg)

しばらくするとダッシュボードページにリダイレクトされます。<kbd>PostgreSQL</kbd> - <kbd>Query</kbd> をクリックし、[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) のファイル内容をテキストエリアに貼り付けて、下部の <kbd>Run Query</kbd> ボタンをクリックしてデータベースを初期化します。

![railway2](../../../assets/railway-2.jpg)

最後に <kbd>Deployments</kbd> - <kbd>Domains</kbd> をクリックしてサーバー URL を取得します。サイトの URL をコピーして、クライアントの `serverURL` 設定に入力すれば、Waline をお楽しみいただけます！

![railway3](../../../assets/railway-3.jpg)

## 更新方法

対応する GitHub リポジトリに移動し、package.json ファイル内の `@waline/vercel` のバージョン番号を最新版に変更します。

## 環境変数の変更方法

<kbd>Variables</kbd> タブをクリックして環境変数管理ページに移動します。変数を変更すると自動的に再デプロイされます。

![railway4](../../../assets/railway-4.jpg)
