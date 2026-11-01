---
title: Zeaburへのデプロイ
icon: zeabur
---

[Zeabur](https://zeabur.com)は、開発者が自分のサービスをワンクリックでデプロイできるようにするプラットフォームです。全体としてはRailwayに似ていますが、より多くの機能を備えており、クレジットカードの登録が不要で、無料枠もRailwayより大きくなっています。

<!-- more -->

## ワンクリックでデプロイ

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## ゼロからデプロイ

[Fork](https://github.com/walinejs/zeabur-starter/fork)ボタンをクリックして、Zeaburのスタータースキャフォールドを作成します。

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com>のZeaburコンソールにログインします。プロジェクトがない場合は、まず新しいプロジェクトの名前を設定する必要があります。

![zeabur2](../../../assets/zeabur-2.png)

入ったら<kbd>Add New Service</kbd>をクリックしてサービスを作成し、<kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd>を選択して、まずデータベースサービスを作成します。

MongoDBデータベースサービスに名前を付けて<kbd>Deploy</kbd>ボタンをクリックすると、データベースサービスのデプロイが完了します。

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

次に、引き続き<kbd>Add New Service</kbd>をクリックしてWalineサービスを作成します。今回は<kbd>Deploy Your Source Code</kbd>をクリックします。続いて表示されるGitHubプロジェクトの一覧から、最初にForkしたプロジェクトを探し、対応する<kbd>Import</kbd>ボタンをクリックします。

Walineサービスに名前を付けて<kbd>Deploy</kbd>ボタンをクリックすると、Walineサービスのデプロイが完了します。

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Walineサービスのパネルはすぐに閉じないでください。サービスのデプロイ後、サービスにアクセス用のドメイン名を追加する必要があります。<kbd>Domains</kbd>タブの下にある<kbd>Generate Domain</kbd>ボタンをクリックし、希望するドメイン名のプレフィックスを入力して<kbd>Save</kbd>ボタンをクリックすると、サービスにアクセス用ドメイン名が追加されます。

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

準備はすべて整いました。あとは結果を確かめるだけです。先ほど設定したアクセス用ドメイン名を開き、コメントの投稿をテストしてみましょう。すべて成功したら、あとはこのドメイン名をクライアントに設定するだけで、快適にコメントできます！

![zeabur2](../../../assets/zeabur-10.png)

## 更新方法

GitHubリポジトリに移動し、package.jsonファイル内の`@waline/vercel`のバージョン番号を最新バージョンに変更します。

## 環境変数の変更方法

<kbd>Variables</kbd>タブから環境変数の管理ページに入ることができ、変更後は自動的に再デプロイされます。

![zeabur11](../../../assets/zeabur-11.png)
