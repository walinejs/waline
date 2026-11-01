---
title: クライアントのファイル
icon: file
---

`@waline/client` は複数のバージョンのファイルを提供しています。

<!-- more -->

## CDN のファイル一覧

- `dist/waline.js`：完全版、ESM 形式

  このファイルは `@waline/client` をインポートする際の推奨バージョンで、Gzip サイズは 100 KB です。

- `dist/waline.umd.js`：完全版、UMD 形式

- `dist/slim.js`：依存関係をバンドルしない完全版、ES Module 形式

  このファイルは Node.js で `@waline/client` をインポートする際のデフォルトファイルで、Gzip サイズは 27 KB です。

- `dist/waline.css`：Waline の CSS スタイル

- `dist/waline-meta.css`：Waline Meta アイコンの CSS

- `dist/component.js`：Waline の Vue コンポーネント、ES Module 形式、依存関係はバンドルされません

  このファイルは Vue プロジェクトでコンポーネントモードの Waline コメントを使用するためのもので、Gzip サイズは 25 KB です。

- `dist/comment.js`：Waline のコメント数モジュール、ESM 形式、Gzip サイズは 1KB 未満

  このファイルは CDN からインポートする用途で、ページのコメント数のみが必要な場合に使用します。

- `dist/pageview.js`：Waline の閲覧数モジュール、ESM 形式、Gzip サイズは 1KB 未満

  このファイルは CDN からインポートする用途で、閲覧数のみが必要な場合に使用します。

## モジュールのエクスポート

`@waline/client` は標準的な ESM モジュールで、Node.js バージョン 22 以上が必要です：

- `@waline/client`：依存関係をバンドルしない Waline のメインエントリー

- `@waline/client/waline.css`：Waline のスタイルファイル

- `@waline/client/waline-meta.css`：Waline メタアイコンのスタイルファイル

- `@waline/client/comment`：Waline のコメント数モジュール

- `@waline/client/pageview`：Waline の閲覧数カウントモジュール

- `@waline/client/full`：すべての依存関係をバンドルした Waline のメインエントリー
