---
title: Vercel デプロイ
icon: vercel
order: 1
---

サーバーパッケージとして `@waline/vercel` をリリースしました。Vercel へのデプロイは最も推奨する方法です。

<!-- more -->

## デプロイ方法

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 上の青いボタンをクリックすると、Waline テンプレートを使って Vercel にデプロイするページへリダイレクトされます。

   ::: note

   まだログインしていない場合は、GitHub でサインインすることをお勧めします。

   :::

1. Vercel プロジェクト名を入力し、`Create` をクリックします。

   ![Create Project](../../../assets/vercel-1.png)

1. 入力した名前のリポジトリが Vercel によって Waline のサンプルテンプレートをもとに自動的に作成・初期化されます。

   ![new project](../../../assets/vercel-2.png)

   1〜2分ほどで Vercel のデプロイが完了します。`Go to Dashboard` ボタンをクリックしてアプリケーションのダッシュボードに移動してください。

   ![dashboard](../../../assets/vercel-3.png)

## データベースの作成

1. 上部の `Storage` をクリックしてストレージサービスページに進み、`Create Database` を選択します。`Marketplace Database Providers` の中から `Neon` を選択し、`Continue` をクリックします。

   ![storage](../../../assets/vercel-4.png)

1. Neon アカウントの作成を求めるプロンプトが表示されます。`Accept and Create` を選択します。次に、リージョンやクォータなどのデータベースプラン設定を選択します。デフォルトのままにして `Continue` をクリックしても構いません。

   ![neon](../../../assets/vercel-5.png)

1. データベース名を定義します。デフォルトのままにして `Continue` をクリックできます。

   ![neon](../../../assets/vercel-6.png)

1. `Storage` の下にデータベースが表示されます。それをクリックして `Open in Neon` を選択し、Neon に移動します。Neon では左側の `SQL Editor` を選択し、[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) の SQL をエディタに貼り付けて `Run` をクリックしてテーブルを作成します。

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. しばらくすると成功メッセージが表示されます。Vercel に戻り、`Deployments` をクリックし、最新のデプロイの `Redeploy` をクリックして新しいデータベース設定を反映させます。

   ![redeploy success](../../../assets/vercel-9.png)

1. Vercel が `Overview` にリダイレクトしてデプロイを開始します。`STATUS` が `Ready` になったら、`Visit` をクリックしてデプロイされたサイトを開きます。この URL がサーバーアドレスになります。

   ![visit](../../../assets/vercel-10.png)

## ドメインの設定

1. <kbd>Settings</kbd> - <kbd>Domains</kbd> をクリックしてドメイン設定ページに移動します。

1. 割り当てたいドメインを入力し、<kbd>Add</kbd> ボタンをクリックします。

   ![Add domain](../../../assets/vercel-11.png)

1. ドメインサービスのサーバーに新しい `CNAME` レコードを追加します。

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. 反映後は独自ドメインで Waline にアクセスできます。 :tada:
   - コメントシステム: example.your-domain.com
   - 管理パネル: example.your-domain.com/ui

   ![success](../../../assets/vercel-12.png)

## HTML への組み込み

ウェブページに以下のように設定します:

1. `https://unpkg.com/@waline/client@v3/dist/waline.css` から Waline のスタイルをインポートします。
2. `https://unpkg.com/@waline/client@v3/dist/waline.js` から `init()` を使用する `<script>` タグを作成し、必須オプション `el` と `serverURL` を渡します。
   - `el` は Waline をレンダリングする要素です。CSS セレクター文字列または HTMLElement を指定できます。
   - `serverURL` は前のステップで取得したサーバーアドレスです。

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## コメント管理

1. デプロイ後、`<serverURL>/ui/register` にアクセスして登録します。最初に登録したユーザーが管理者になります。
2. ログイン後、管理者はコメントの編集・マーク・削除などの管理ができます。
3. ユーザーはコメント欄からも登録できます。ログイン後はプロフィールページにリダイレクトされます。
