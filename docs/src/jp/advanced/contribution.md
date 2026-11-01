---
title: 開発ガイド
icon: contribute
order: -1
---

WalineへのPull Requestを歓迎します！ :tada:

Walineへの貢献方法を以下に説明します。

<!-- more -->

## 準備

1. Gitを使ってプロジェクトをクローンします

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. 依存関係をインストールします

   ::: warning

   依存関係のインストールにはpnpmを使用してください。

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## 開発

- `pnpm run client:dev`を実行して`@waline/client`の開発サーバーを起動します

  ::: tip

  Walineはクライアント/サーバーアーキテクチャに基づいているため、クライアントをデバッグする際は`SERVERURL`を設定するか、以下で説明するサーバーの開発サーバーを同時に起動して、デフォルトの`localhost:9090`を使用する必要があります。

  :::

- `pnpm run server:dev`を実行して`@waline/server`の開発サーバーを起動します

  ::: tip

  `@waline/server`をローカルで実行するには、いくつかのローカル環境変数を`.env`に設定する必要があります。

  `.env.example`にサンプルを用意しています。

  :::
