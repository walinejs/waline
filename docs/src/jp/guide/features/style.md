---
title: スタイルのカスタマイズ
icon: style
order: -2
---

`@waline/client` はいくつかの CSS 変数を提供しています。これらの変数を使って Waline のスタイルを簡単に設定できます：

また、`@waline/client` はダークモードのサポートも標準で備えています。

<!-- more -->

## ダークモードのサポート

`dark` オプションで Waline のダークモードサポートを有効にできます。

通常、ウェブサイトがダークモード対応を行う方法は 2 つあります：

- `@media` セレクターと `prefers-color-scheme` を使い、デバイスのカラーモード状態に応じて自動的に切り替える
- DOM のルート要素（`html` または `body`）の属性やクラスを変更して、別のダークモード用カラースタイルを動的に適用する

1 つ目の方法を使っているサイトで Waline を有効にする場合は、`dark` を `'auto'` に設定するだけで済みます。

2 つ目のタイプのサイトでは、`dark` にダークモードが有効になる CSS セレクターを設定する必要があります。いくつか例を挙げます：

::: tip 例

- **vuepress-theme-hop v2**: `<html>` タグ自体に `data-theme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションには `'html[data-theme="dark"]'` を設定します。

- **hexo-theme-fluid**: `<html>` タグ自体に `data-user-color-scheme="dark"` を設定してダークモードを有効にします。そのため、`dark` オプションには `'html[data-user-color-scheme="dark"]'` を設定します。

:::

## メタアイコン

ユーザーのコメントメタデータにアイコンを追加したい場合は、`waline-meta.css` をインポートして利用できます。

CDN を利用する場合は、次のリンクからインポートできます：

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

NPM を利用する場合は、次のようにインポートできます：

```js
import '@waline/client/meta';
```

## RTL のサポート

`@waline/client` は RTL レイアウトに対応しています。`<html>` タグに `dir="rtl"` を追加するだけです。

## スタイルのカスタマイズ

### CSS 変数

通常時とダークモード時に Waline が使用する CSS 変数のデフォルト値は、[クライアントリファレンス → CSS 変数](../../reference/client/style.md) で確認できます。

サイトのスタイルと異なる場合は、該当する CSS 変数を自分で上書きできます。

## ボックスシャドウ

枠線の代わりに影（`box-shadow`）を使うテーマを利用している場合は、`--waline-border` と `--waline-box-shadow` を変更することで Waline の表示を調整できます。例：

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### さらに

上記の CSS 変数で Waline のスタイルのカスタマイズ要件を満たせない場合は、独自の CSS ファイルを作成できます。
