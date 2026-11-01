---
title: Vercelへのデプロイ
icon: vercel
order: 1
---

サーバーパッケージとして`@waline/vercel`パッケージを公開しており、Vercelへのデプロイは最も推奨される方法でもあります。

<!-- more -->

## デプロイ方法

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 上の青いボタンをクリックすると、Vercelにリダイレクトされ、Walineテンプレートでデプロイできます。

   ::: note

   まだログインしていない場合は、GitHubでのサインインをおすすめします。

   :::

1. Vercelプロジェクト名を入力し、`Create`をクリックします。

   ![プロジェクトの作成](../../../assets/vercel-1.png)

1. 先ほど入力した名前のリポジトリが、Walineのサンプルテンプレートに基づいてVercelにより自動作成・初期化されます。

   ![新しいプロジェクト](../../../assets/vercel-2.png)

   1〜2分ほどでVercelのデプロイが完了します。`Go to Dashboard`ボタンをクリックすると、アプリケーションのダッシュボードに移動します。

   ![ダッシュボード](../../../assets/vercel-3.png)

## データベースの作成

1. 上部の`Storage`をクリックしてストレージサービスのページに入り、`Create Database`を選択します。`Marketplace Database Providers`で`Neon`を選択し、`Continue`をクリックします。

   ![ストレージ](../../../assets/vercel-5.png)

1. Neonアカウントの作成を求められます。`Accept and Create`を選択します。次に、リージョンやクォータなどのデータベースプランの設定を選択します。デフォルトのままで問題ないので、`Continue`をクリックします。

   ![neon](../../../assets/vercel-6.png)

1. データベース名を定義します。デフォルトのままで問題ないので、`Continue`をクリックします。

   ![neon](../../../assets/vercel-7.png)

1. これでデータベースが`Storage`の下に表示されます。これをクリックして`Open in Neon`を選択するとNeonに移動します。Neonで左側の`SQL Editor`を選択し、[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql)のSQLをエディターに貼り付けて、`Run`をクリックするとテーブルが作成されます。

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. しばらくすると成功メッセージが表示されます。Vercelに戻り、`Deployments`をクリックしてから、最新のデプロイで`Redeploy`をクリックし、新しいデータベース設定を反映させます。

   ![再デプロイの成功](../../../assets/vercel-12.png)

1. Vercelは`Overview`にリダイレクトしてデプロイを開始します。`STATUS`が`Ready`になったら、`Visit`をクリックしてデプロイ済みのサイトを開きます。このURLがサーバーアドレスです。

   ![アクセス](../../../assets/vercel-14.png)

## ドメインの割り当て

1. <kbd>Settings</kbd> - <kbd>Domains</kbd>をクリックしてドメイン設定ページに移動します。

1. 割り当てたいドメインを入力し、<kbd>Add</kbd>ボタンをクリックします。

   ![ドメインの追加](../../../assets/vercel-16.png)

1. ドメインサービスのサーバーで新しい`CNAME`レコードを追加します。

   | タイプ | 名前    | 値                   |
   | ------ | ------- | -------------------- |
   | CNAME  | example | cname.vercel-dns.com |

1. 反映されれば、自分のドメインでWalineにアクセスできます。 :tada:
   - コメントシステム: example.your-domain.com
   - 管理画面: example.your-domain.com/ui

   ![成功](../../../assets/vercel-17.png)

## HTMLへの組み込み

ウェブページで次のように設定します：

1. `https://unpkg.com/@waline/client@v3/dist/waline.css`からWalineのスタイルを読み込みます。
2. `https://unpkg.com/@waline/client@v3/dist/waline.js`の`init()`を使用する`<script>`タグを作成し、必須オプションの`el`と`serverURL`を渡します。
   - `el`はWalineの描画に使用する要素です。CSSセレクターの文字列またはHTMLElementを指定できます。
   - `serverURL`は前の手順で取得したサーバーアドレスです。

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

1. デプロイ後、`<serverURL>/ui/register`にアクセスして登録します。最初に登録したユーザーが管理者になります。
2. ログイン後、管理者はコメントの編集・マーク・削除などの管理ができます。
3. ユーザーはコメント欄から登録することもできます。ログイン後は自分のプロフィールページにリダイレクトされます。
