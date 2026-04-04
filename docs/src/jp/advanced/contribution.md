---
title: 開発ガイド
icon: contribute
order: -1
---

waline への Pull Request を歓迎します！ :tada:

waline にコントリビュートしたい場合は、以下のガイドをご参照ください。

<!-- more -->

## 準備

1. Git を使ってプロジェクトをクローンします

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. 依存関係のインストール

   ::: warning

   pnpm をインストールし、依存関係のインストールに使用してください。

   ```bash
   npm i -g pnpm@latest
   ```

   :::

   ```bash
   cd waline
   pnpm i
   ```

## 開発

- `pnpm client:dev` を実行して `@waline/client` の開発サーバーを起動します

  ::: tip

  waline は Client/Server アーキテクチャをベースにしているため、クライアントをデバッグする際には `SERVERURL` を設定するか、以下のサーバー開発サーバーを同時に起動してデフォルトの `localhost:9090` を使用する必要があります。

  :::

- `pnpm server:dev` を実行して `@waline/server` の開発サーバーを起動します

  ::: tip

  `@waline/server` をローカルで実行するには、いくつかのローカル環境変数を `.env` に設定する必要があります。

  `.env.example` にサンプルを用意しています。

  :::
