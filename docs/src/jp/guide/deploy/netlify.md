---
title: Netlifyへのデプロイ
icon: netlify
---

[Netlify](https://netlify.com)は有名な静的ウェブサイトのデプロイサービスプロバイダーで、[Edge Functions](https://www.netlify.com/blog/edge-functions-explained/)は、ウェブサイトのエッジノード上でJavaScriptコードを実行できるNetlifyのサービスです。

<!-- more -->

## デプロイ方法

[Fork](https://github.com/walinejs/netlify-starter/fork)ボタンをクリックして、Netlifyのスタータースキャフォールドを作成します。

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com>のNetlifyコンソールにログインし、<kbd>Add new site</kbd> - <kbd>Import an exist project</kbd>を選択してサイトを追加します。GitHub認証を選択してGitHubプロジェクトの一覧を読み取ります。一覧から先ほどForkで生成したリポジトリ名を検索し、そのプロジェクトをクリックして、このリポジトリに基づくNetlifyウェブサイトの作成を開始します。

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Netlifyウェブサイトを作成する前に、いくつかの設定情報を入力する必要があります。環境変数以外の情報はデフォルトのままで問題ありません。追加するストレージサービスの環境変数については[複数データベースサービスのサポート](../database.md)を参照し、最後に下部の<kbd>Deploy site</kbd>をクリックしてサイトのデプロイを開始します。

![netlify](../../../assets/netlify-4.png)

しばらくするとNetlifyウェブサイトのデプロイが完了します。上部の<kbd>Functions</kbd>ナビゲーションバーをクリックするとクラウド関数の一覧に切り替わり、`comment`がデプロイ済みのWalineサービスです。これをクリックするとクラウド関数の詳細ページに入ります。

![netlify](../../../assets/netlify-5.png)

詳細ページで`Endpoint`に表示されているアドレスが、Walineサービスのデプロイアドレスです。右側のコピーボタンをクリックし、新しいタブで開いてコメントの投稿をテストしてみましょう。すべて成功したら、あとはこのドメイン名をクライアントに設定するだけで、快適にコメントできます！

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## 更新方法

GitHubリポジトリに移動し、package.jsonファイル内の`@waline/vercel`のバージョン番号を最新バージョンに変更します。

## 環境変数の変更方法

上部の`Site settings`ナビゲーションバーをクリックし、`Environments variables`サイドバーを選択して環境変数の管理ページに入ります。`Add a variable`ボタンをクリックして環境変数を追加します。

環境変数を編集した後は、`Deploys`ページに入り、`Trigger deploy` - `Deploy site`を選択してウェブサイトを再デプロイし、環境変数を反映させる必要があります。

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
