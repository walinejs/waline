---
title: クライアントファイル
icon: file
---

`@waline/client` は複数バージョンのファイルを提供しています

<!-- more -->

## CDN ファイル一覧

- `dist/waline.js`: フルバージョン、ESM 形式

  このファイルは `@waline/client` をインポートする際に推奨されるバージョンです。Gzip サイズは 53 KB です。

- `dist/waline.umd.js`: フルバージョン、UMD 形式

- `dist/slim.js`: 依存関係をバンドルしないフルバージョン、ES Module 形式

  このファイルは Node.js で `@waline/client` をインポートする際のデフォルトファイルです。Gzip サイズは 19.39 KB です。

- `dist/waline.css`: Waline の CSS スタイル

- `dist/waline-meta.css`: Waline メタアイコンの CSS

- `dist/component.js`: Waline の Vue コンポーネント、ES Module 形式、依存関係のバンドルなし

  このファイルは Vue プロジェクトでコンポーネントモードとして Waline コメントを使用するためのものです。Gzip サイズは 18.28 KB です。

- `dist/comment.js`: Waline のコメント数モジュール、ESM 形式、Gzip サイズ 1KB 未満

  このファイルは CDN インポート用で、ページのコメント数のみが必要な場合に使用します。

- `dist/pageview.js`: Waline のページビューモジュール、ESM 形式、Gzip サイズ 1KB 未満

  このファイルは CDN インポート用で、ページビュー数のみが必要な場合に使用します。

## モジュールエクスポート

`@waline/client` は標準の ESM モジュールであり、Node.js バージョン >= 18 が必要です:

- `@waline/client`: 依存関係をバンドルしない Waline のメインエントリ

- `@waline/client/waline.css`: Waline スタイルファイル

- `@waline/client/waline-meta.css`: Waline メタアイコンスタイルファイル

- `@waline/client/comment`: Waline コメント数モジュール

- `@waline/client/pageview`: Waline ページビュー数モジュール

- `@waline/client/full`: すべての依存関係をバンドルした Waline のメインエントリ
