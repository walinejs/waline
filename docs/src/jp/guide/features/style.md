---
title: スタイルのカスタマイズ
icon: style
order: -2
---

`@waline/client` はいくつかの CSS 変数を提供しています。これらの変数を使って Waline のスタイルを簡単に設定できます:

また、`@waline/client` にはダークモードのサポートも組み込まれています。

<!-- more -->

## ダークモードのサポート

`dark` オプションを使用して Waline のダークモードサポートを有効にできます。

ウェブサイトがダークモードを有効にする方法は通常 2 種類あります:

- `@media` セレクターを使用して `prefers-color-scheme` によりデバイスのカラーモード状態に応じて自動的に切り替える方法
- DOM のルート要素（`html` または `body`）の属性やクラスを変更することで動的にダークモードの色スタイルを適用する方法

最初の方法を使用しているサイトで Waline を有効にする場合は、`dark` を `'auto'` に設定するだけです。

2 番目の方法のサイトでは、ダークモードを有効にする CSS セレクターを `dark` に設定する必要があります。以下にいくつかの例を示します:

::: tip 例

- **vuepress-theme-hop v2**: `<html>` タグに `data-theme="dark"` を設定することでダークモードを有効にします。そのため、`dark` オプションに `'html[data-theme="dark"]'` を設定する必要があります。

- **hexo-theme-fluid**: `<html>` タグに `data-user-color-scheme="dark"` を設定することでダークモードを有効にします。そのため、`dark` オプションに `'html[data-user-color-scheme="dark"]'` を設定する必要があります。

:::

## メタアイコン

ユーザーコメントのメタデータにアイコンを追加したい場合は、`waline-meta.css` をインポートして使用できます。

CDN ユーザーは以下のリンクからインポートできます:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

NPM ユーザーは以下のようにインポートできます:

```js
import '@waline/client/meta';
```

## RTL サポート

`@waline/client` は RTL レイアウトをサポートしています。`<html>` タグに `dir="rtl"` を追加するだけで使用できます。

## スタイルのカスタマイズ

### CSS 変数

通常モードとダークモードで Waline が使用する CSS 変数のデフォルト値は [クライアントリファレンス → CSS 変数](../../reference/client/style.md) で確認できます。

サイトのスタイルと異なる場合は、対応する CSS 変数を自分でオーバーライドできます。

## ボックスシャドウ

ボーダーの代わりにシャドウ（`box-shadow`）を使用するテーマを利用している場合は、`--waline-border` と `--waline-box-shadow` を変更することで Waline の表示効果を調整できます。例:

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

### その他

上記の CSS 変数で Waline スタイルのカスタマイズ要件を満たせない場合は、独自の CSS ファイルを記述することができます。
