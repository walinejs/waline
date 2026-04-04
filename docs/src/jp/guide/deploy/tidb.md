---
title: TiDB でデータベースを作成する
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) はオープンソースの NewSQL データベースです。[TiDB Cloud](https://tidbcloud.com/) は公式のオンライン版で、誰でも 5GB の無料ストレージを利用できます。以下では TiDB Cloud 上に Waline のデータベースを作成する方法を説明します。

## データベースの作成

1. [TiDB Cloud](https://tidbcloud.com) にログインすると TiDB インスタンスが自動的に作成されます。<kbd>cluster0</kbd> をクリックしてインスタンスに入ります。

   ![Enter instance](../../../assets/tidb-1.png)

2. 左側のリストで <kbd>SQL Editor</kbd> を選択し、[waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) の内容を `;` で区切られた文に分けてインターフェースに近い形で実行します。各文について右上の <kbd>Run</kbd> 青ボタンをクリックするか、<kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> のショートカットキーで実行します。
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

これで Waline データベースの作成は完了です！

## 接続設定の取得

左側の <kbd>Overview</kbd> ボタンをクリックしてホームページに入り、右上の <kbd>Connect</kbd> を選択して接続情報を取得します。

「Connect with」を `General` に設定します。また、次の行の <kbd>Reset password</kbd> をクリックして新しいパスワードを生成します。

これで接続に関する設定情報を取得できます。

![Connection](../../../assets/tidb-7.png)

## Vercel デプロイ

Vercel アカウントを作成し、プロジェクトを追加して Waline サービスをデプロイします。次にプロジェクトの <kbd>Settings</kbd> を開き、`Environment Variables` に移動します。<kbd>Add Environment Variable</kbd> をクリックして、`TIDB_HOST`、`TIDB_PORT`、`TIDB_DB`、`TIDB_USER`、`TIDB_PASSWORD` の各変数を追加します。追加後、プロジェクトを再デプロイします。

![Configure TiDB connection](../../../assets/tidb-8.png)
