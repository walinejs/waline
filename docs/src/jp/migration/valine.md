---
title: Valineからの移行
icon: valine
---

1. 「_始める_」セクションの[Vercelデプロイ](../guide/get-started/README.md#サーバーのデプロイ)に従ってバックエンドをデプロイします。

2. 「_始める_」セクションの[HTML](../guide/get-started/README.md#html-にインポートする)に従ってフロントエンドスクリプトを変更します。

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

   ::: tip 設定

   Waline V2はValineのサポートを削除し、より優れた設定に移行しました。以下は一部のオプションの移行概要です：

   - `placeholder`: `locale.placeholder`を使用してください
   - `highlight`: `highlighter`を使用してください
   - `avatarForce`、`avatar`: サーバーの`AVATAR_PROXY`環境変数を使用してください
   - `recordIP`: ユーザーIPを表示しなくなり、サーバー側で`DISABLE_USERAGENT`環境変数が提供されます
   - `requiredFields`: `requiredMeta`に名前が変更されました
   - `langMode`: `locale`に名前が変更されました
   - `emojiCDN`、`emojiMap`: より強力な`emoji`オプションを使用してください

   Walineの設定については[クライアント設定](../reference/client/api.md)を参照してください。Valineと互換性のないオプションについては、[WalineクライアントV2移行ガイド](./v2.md)も確認できます。

   :::

3. データを移行する

LeanCloudの管理画面で<kbd>インポート/エクスポート</kbd> > <kbd>特定のクラスに限定</kbd> > <kbd>Comment</kbd> > <kbd>エクスポート</kbd>を選択すると、メール通知が届きます。

エクスポートファイルの内容を下のテキストエリアに貼り付け、変換ボタンをクリックすると、インポート用のファイルが取得できます。

<MigrationTool />

::: tip

上記のツールでエクスポートしたファイルを取得したら、対応するストレージサービスのコンソールでインポートできます。

:::

## Walineのハイライト

Valineと比較して、Walineには以下のハイライトがあります：

### より多くの機能

1. Markdownは上付き文字、下付き文字、絵文字、テーブル、打ち消し線、数式、HTMLタグ、脚注など、より多くの構文をサポートします。
1. 画像アップロード機能。画像プロバイダーサービスをカスタマイズしたり、画像を直接埋め込んだりできます。
1. 新しいラベルシステム。ユーザーのインタラクション頻度に応じてレベルラベルを追加し、登録ユーザーにはカスタムラベルをサポートします。
1. 絵文字プリセットとタブのサポート。複数セットの絵文字を利用でき、誰でも絵文字プリセットを公開・使用できます。
1. 新しいリアクションシステム。訪問者が記事への態度を表現できます。
1. コメントへのいいね。気に入ったコメントを支持できます。
1. ページビュー。より正確な閲覧数と改ざん防止。
1. 絵文字検索。カスタマイズ可能なサービスで、ユーザーは自由に絵文字を検索・挿入できます。
1. 登録ユーザーが投稿したコメントを編集・削除できるようサポートします。

### より安全

1. プライバシー漏洩ゼロ。ユーザーのメールアドレス、IPアドレスなどの機密情報を公開せず、サーバー側でユーザーの地理位置情報、ブラウザ、OSを隠すこともできます
1. 完全なスパム対策システム。
   - すべてのコメントはスパム対策サービスで認証でき、追加の検証ロジックもサポートします。
   - 単一のIPまたは単一のユーザーに対してコメントの速度制限を設定でき、Walineは重複コメントを自動的に識別します。
1. コメント承認機能。敏感な時期やウェブサイトが攻撃を受けているときにコメント承認を有効にし、手動でレビュー・承認してコメントの表示を制御し、悪意のあるコメントによるサイト閉鎖を防ぎます。
1. ユーザーアカウントのサポート。アカウント登録に加えて、Walineはソーシャルメディアアカウントもサポートし、認証されたラベルとともにアバターとニックネームを素早く同期して、なりすましを防ぎます。

### より便利

1. ブロガーにコメントを通知するさまざまな方法（QQ、WeChat、DingTalk、メールなど）
1. 強力な管理サービス。すべてのユーザーとコメントを表示して関連操作を実行でき、ユーザーにカスタムラベルと管理者を設定できます
1. フロントエンド管理。管理者はWalineコメントコンポーネントから直接コメントを承認、編集、削除できます。

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
