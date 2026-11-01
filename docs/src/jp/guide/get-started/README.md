---
title: 始める
icon: creative
dir:
  collapsible: false
  order: 1
---

Waline へようこそ。わずか数ステップで、あなたのサイトに Waline のコメントと閲覧数を導入できます。

<!-- more -->

## サーバーのデプロイ

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 上のボタンをクリックして Vercel に移動し、サーバーをデプロイします。

   ::: note

   ログインしていない場合は、Vercel が登録またはログインを求めます。GitHub アカウントで素早くログインしてください。

   :::

1. 好きな Vercel プロジェクト名を入力し、`Create` をクリックして続行します：

   ![create](../../../assets/vercel-1.png)

1. Vercel は Waline テンプレートを基に新しいリポジトリを作成して初期化します。リポジトリ名は先ほど入力したプロジェクト名になります。

   ![deploy](../../../assets/vercel-2.png)

   1〜2 分後、デプロイの成功を祝う花火が画面に表示されます。`Go to Dashboard` をクリックすると、アプリケーションのダッシュボードに移動します。

   ![deploy](../../../assets/vercel-3.png)

## データベースの作成

1. 上部の `Storage` をクリックしてストレージの設定ページに入り、`Create Database` を選択します。`Marketplace Database Providers` として `Neon` を選び、`Continue` をクリックして続行します。

   ![neon](../../../assets/vercel-5.png)

1. Neon アカウントの作成を求められます。`Accept and Create` をクリックして同意し、作成します。次に、リージョンやクォータなどのデータベースプランを選択します。すべてデフォルトのままで `Continue` をクリックして構いません。

   ![neon](../../../assets/vercel-6.png)

1. 続いてデータベース名の指定を求められます。こちらも変更せずに `Continue` をクリックして構いません。

   ![neon](../../../assets/vercel-7.png)

1. これで `Storage` の下に、作成したデータベースサービスが表示されます。それをクリックして `Open in Neon` を選択すると Neon に移動します。Neon の画面で左のサイドバーから `SQL Editor` を選び、[waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) の SQL 文をエディターに貼り付けて `Run` をクリックし、テーブルを作成します。

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. しばらくすると、作成に成功した旨の通知が届きます。Vercel に戻り、上部の `Deployments` をクリックして、最新のデプロイの右側にある `Redeploy` ボタンをクリックします。この手順により、新しく設定したデータベースサービスが有効になります。

   ![redeploy success](../../../assets/vercel-12.png)

1. `Overview` ページにリダイレクトされ、デプロイが開始されます。しばらくすると `STATUS` が `Ready` に変わります。`Visit` をクリックして、デプロイしたウェブサイトを開きます。この URL があなたのサーバーアドレスです。

   ![visit](../../../assets/vercel-14.png)

## カスタムドメインのバインド

1. 上部の `Settings` → `Domains` をクリックして、ドメイン設定ページに入ります。

1. バインドしたいドメインを入力し、`Add` をクリックします。

   ![Add domain](../../../assets/vercel-16.png)

1. ドメインプロバイダーで新しい `CNAME` レコードを追加します：

   | タイプ | 名前    | 値                   |
   | ------ | ------- | -------------------- |
   | CNAME  | example | cname.vercel-dns.com |

1. DNS レコードが反映されるのを待ちます。その後は自分のドメインで Waline にアクセスできます 🎉
   - コメントシステム: example.yourdomain.com
   - コメント管理: example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## HTML にインポートする

ウェブページやウェブサイトに Waline を追加する方法は次のとおりです：

1. `<head>` 内でスタイルシート `https://unpkg.com/@waline/client@v3/dist/waline.css` をインポートします。

1. `<script>` タグを作成し、`https://unpkg.com/@waline/client@v3/dist/waline.js` の `init()` で初期化します。その際、必要な `el` と `serverURL` オプションを渡します。
   - `el` オプションは Waline のレンダリングに使う要素です。文字列形式の CSS セレクターまたは HTMLElement オブジェクトを設定できます。
   - `serverURL` は、先ほど Vercel で作成したデプロイサーバーへのリンクです。
   - その他のオプションは [コンポーネントのプロパティページ](https://waline.js.org/jp/reference/client/props.html) を参照してください。

   例を挙げます：

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. これでコメントサービスがあなたのウェブサイトで正常に動作します :tada:

## コメント管理（管理画面）

1. デプロイが完了したら、`<serverURL>/ui/register` にアクセスして登録してください。最初に登録した人が管理者に設定されます。

1. 管理者としてログインすると、コメント管理のダッシュボードにアクセスできます。ここでコメントの編集、マーク、削除ができます。

1. ユーザーはコメント欄からもアカウントを登録でき、ログイン後はプロフィールページにリダイレクトされます。

## 動画チュートリアル

熱心な Waline ユーザーが次の動画チュートリアルを作成しました。上記の手順が分かりにくい場合は、動画を参照してください：

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
