---
title: Railwayへのデプロイ
icon: railway
---

[Railway](https://railway.app/)は無料のServerlessプラットフォームで、WalineをRailwayプラットフォームへ簡単にデプロイできます。

<!-- more -->

## デプロイ方法

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

このボタンをクリックするとrailway.appプラットフォームにリダイレクトされ、すぐにデプロイできます。ログイン後、新しいGitHubリポジトリ名を入力するか、デフォルトのままにして、下部の<kbd>Deploy</kbd>ボタンをクリックしてデプロイします。環境変数の部分は変更しないでください。

![railway1](../../../assets/railway-1.jpg)

しばらくするとダッシュボードページにリダイレクトされます。<kbd>PostgreSQL</kbd> - <kbd>Query</kbd>をクリックし、[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)のファイル内容をテキストエリアに貼り付けて、下部の<kbd>Run Query</kbd>ボタンをクリックしてデータベースを初期化します。

![railway2](../../../assets/railway-2.jpg)

最後に<kbd>Deployments</kbd> - <kbd>Domains</kbd>をクリックするとサーバーのURLを取得できます。そのサイトURLをコピーしてクライアントの`serverURL`設定に入力すれば、Walineを楽しめます！

![railway3](../../../assets/railway-3.jpg)

## 更新方法

対応するGitHubリポジトリに移動し、package.jsonファイル内の`@waline/vercel`のバージョン番号を最新バージョンに変更します。

## 環境変数の変更方法

<kbd>Variables</kbd>タブをクリックして環境変数の管理ページに移動します。変数を変更すると自動的にデプロイされます。

![railway4](../../../assets/railway-4.jpg)
