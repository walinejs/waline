---
title: Valineからの移行
icon: valine
---

1. _はじめに_ セクションの [Vercel Deploy](../guide/get-started/README.md#deploy-to-vercel-server) に従ってバックエンドをデプロイします。

2. _はじめに_ セクションの [HTML](../guide/get-started/README.md#importing-in-html-client) に従ってフロントエンドのスクリプトを修正します。

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

Waline V2 では Valine サポートが削除され、より良い設定に移行しました。以下はいくつかのオプションの移行概要です：

- `placeholder`: `locales.placeholder` を使用
- `highlight`: `highlighter` を使用
- `avatarForce`, `avatar`: サーバーの `AVATAR_PROXY` 環境変数を使用
- `recordIP`: ユーザーの IP を表示しなくなり、サーバー側で `DISABLE_USERAGENT` 環境変数を提供
- `requiredFields`: `requiredMeta` に名称変更
- `langMode`: `locales` に名称変更
- `emojiCDN`, `emojiMap`: より強力な `emoji` オプションを使用

Waline の設定については [クライアント設定](../reference/client/api.md) を参照してください。また、[Waline Client V2 移行ガイド](./v2.md) で Valine と互換性のないオプションについて確認することもできます。

:::

1. データの移行

LeanCloud の管理画面で <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd> を選択すると、メール通知が届きます。

エクスポートファイルの内容を以下のテキストエリアに貼り付け、変換ボタンをクリックしてインポート用のファイルを取得します。

<MigrationTool />

::: tip

上記のツールでエクスポートファイルを取得したら、対応するストレージサービスのコンソールでインポートできます。

:::

## Waline の特長

Valine と比較して、Waline には以下の特長があります：

### より多くの機能

1. Markdown でより多くの構文をサポート。上付き・下付き文字、絵文字、テーブル、取り消し線、数式、HTML タグ、脚注などを含みます。
1. 画像アップロード機能。カスタム画像プロバイダーサービスの使用や、直接画像を埋め込むことが可能です。
1. 新しいラベルシステムにより、ユーザーのインタラクション頻度に応じてレベルラベルが付与され、登録ユーザーへのカスタムラベルもサポートします。
1. 絵文字プリセットとタブサポートにより、複数の絵文字セットを使用でき、誰でも絵文字プリセットを公開・使用できます。
1. 新しいリアクションシステムにより、訪問者が記事に対する気持ちを表現できます。
1. コメントへのいいね機能で、気に入ったコメントへの支持を表明できます。
1. ページビュー機能。より正確な閲覧数カウントと改ざん防止を実現します。
1. 絵文字検索機能。カスタマイズ可能なサービスで、ユーザーが自由に絵文字を検索・挿入できます。
1. 登録ユーザーが自分の投稿したコメントを編集・削除できます。

### より安全

1. プライバシー漏洩ゼロ。ユーザーのメールアドレスや IP アドレスなどの機密情報を公開せず、サーバー側でユーザーの地理的位置、ブラウザ、OS の表示を非表示にすることができます。
1. 完全なスパム対策システム。
   - すべてのコメントはスパム対策サービスによる認証が可能で、追加の検証ロジックもサポートします。
   - 単一 IP または単一ユーザーへのコメント速度制限を設定でき、Waline は重複コメントを自動的に識別します。
1. コメント審査機能。敏感な時期やサイトが攻撃を受けている場合に、コメント審査を有効にして手動でコメントの表示を確認・承認し、悪意あるコメントによるサイト閉鎖を防ぎます。
1. ユーザーアカウントをサポート。アカウント登録に加えて、Waline はソーシャルメディアアカウントもサポートし、認証済みラベルでアバターとニックネームを素早く同期してなりすましを防ぎます。

### より便利

1. QQ、WeChat、DingTalk、メールなど様々な方法でブロガーにコメントを通知します。
1. 強力な管理サービス。すべてのユーザーとコメントを閲覧して関連操作を実行し、ユーザーにカスタムラベルや管理者権限を設定できます。
1. フロントエンド管理機能。管理者は Waline コメントコンポーネントを通じて直接コメントの審査、編集、削除ができます。

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
