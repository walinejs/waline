---
title: Netlify デプロイ
icon: netlify
---

[Netlify](https://netlify.com) はよく知られた静的ウェブサイトのデプロイサービスプロバイダーであり、[Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) は Netlify が提供するウェブサイトのエッジノードで JavaScript コードを実行できるサービスです。

<!-- more -->

## デプロイ方法

[Fork](https://github.com/walinejs/netlify-starter/fork) ボタンをクリックして、Netlify スターターのスキャフォールドを作成します。

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> にアクセスして Netlify コンソールにログインし、<kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> を選択してサイトを追加します。GitHub 認証を選択して GitHub プロジェクトの一覧を読み込みます。一覧から先ほど Fork したリポジトリ名を検索し、プロジェクトをクリックしてそのリポジトリをもとに Netlify ウェブサイトの作成を開始します。

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Netlify ウェブサイトを作成する前に、いくつかの設定情報を入力する必要があります。環境変数以外の情報はデフォルトのままで構いません。[マルチデータベースサポート](../database.md) を参照して対応するストレージサービスの環境変数を追加し、下部の <kbd>Deploy site</kbd> をクリックしてサイトのデプロイを開始します。

![netlify](../../../assets/netlify-4.png)

しばらくすると Netlify ウェブサイトのデプロイが完了します。上部の <kbd>Functions</kbd> ナビゲーションバーをクリックしてクラウド関数の一覧に切り替えると、`comment` がデプロイされた Waline サービスです。クリックするとクラウド関数の詳細ページに移動します。

![netlify](../../../assets/netlify-5.png)

詳細ページでは、`Endpoint` に表示されているアドレスが Waline サービスのデプロイアドレスです。右側のコピーボタンをクリックし、新しいタブで開いてコメントの投稿をテストすると、すべてうまくいきます〜 次は、このドメイン名をクライアントに設定すれば、快適にコメントできます！

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## 更新方法

GitHub リポジトリに移動し、package.json ファイル内の `@waline/vercel` のバージョン番号を最新版に変更します。

## 環境変数の変更方法

上部の `Site settings` ナビゲーションバーをクリックし、`Environments variables` サイドバーを選択して環境変数管理ページに入ります。`Add a variable` ボタンをクリックして環境変数を追加します。

環境変数を編集した後、`Deploys` ページに移動し、`Trigger deploy` - `Deploy site` を選択してウェブサイトを再デプロイし、環境変数を反映させます。

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
