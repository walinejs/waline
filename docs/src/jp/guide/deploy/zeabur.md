---
title: Zeabur デプロイ
icon: zeabur
---

[Zeabur](https://zeabur.com) は開発者が自分のサービスをワンクリックでデプロイできるプラットフォームです。Railway に似ていますが、より多くの機能を持ち、クレジットカードの登録が不要で、無料枠も Railway より大きくなっています。

<!-- more -->

## ワンクリックデプロイ

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## ゼロからデプロイ

[Fork](https://github.com/walinejs/zeabur-starter/fork) ボタンをクリックして Zeabur スターターのスキャフォールドを作成します。

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> にアクセスして Zeabur コンソールにログインします。プロジェクトがない場合は、まず新しいプロジェクトの名前を設定する必要があります。

![zeabur2](../../../assets/zeabur-2.png)

入力後、<kbd>Add New Service</kbd> をクリックしてサービスを作成し、<kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> を選択してまずデータベースサービスを作成します。

MongoDB データベースサービスに名前を付け、<kbd>Deploy</kbd> ボタンをクリックすると、データベースサービスがデプロイされます。

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

次に、<kbd>Add New Service</kbd> を再度クリックして Waline サービスを作成します。今度は <kbd>Deploy Your Source Code</kbd> をクリックします。表示される GitHub プロジェクト一覧から最初に Fork したプロジェクトを見つけ、対応する <kbd>Import</kbd> ボタンをクリックします。

Waline サービスに名前を付け、<kbd>Deploy</kbd> ボタンをクリックすると、Waline サービスがデプロイされます。

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Waline サービスパネルをすぐに閉じないでください。サービスがデプロイされた後、アクセス用のドメイン名をサービスに追加する必要があります。<kbd>Domains</kbd> タブの下にある <kbd>Generate Domain</kbd> ボタンをクリックし、希望するドメイン名のプレフィックスを入力して <kbd>Save</kbd> ボタンをクリックすると、サービスへのアクセスドメイン名が追加されます。

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

準備はすべて整いました。奇跡を目撃する瞬間です。設定したアクセスドメイン名を開いてコメントの投稿をテストすると、すべてうまくいきます〜 次は、このドメイン名をクライアントに設定すれば、快適にコメントできます！

![zeabur2](../../../assets/zeabur-10.png)

## 更新方法

GitHub リポジトリに移動し、package.json ファイル内の `@waline/vercel` のバージョン番号を最新版に変更します。

## 環境変数の変更方法

<kbd>Variables</kbd> タブから環境変数管理ページに入ることができ、変更後は自動的に再デプロイされます。

![zeabur11](../../../assets/zeabur-11.png)
