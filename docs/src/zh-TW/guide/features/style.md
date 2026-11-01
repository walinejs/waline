---
title: 自訂樣式
icon: style
order: -2
---

`@waline/client` 提供了一些 CSS 變數。你可以很輕鬆地透過這些變數設定 waline 的樣式。

同時 `@waline/client` 還擁有內建的暗黑模式支援。

<!-- more -->

## 暗黑模式支援

你可以使用 `dark` 選項來啟用 Waline 的暗黑模式支援。

通常網站會透過兩種方式啟用暗黑模式支援:

- 使用 `@media` 選擇器透過 `prefers-color-scheme` 來根據裝置色彩模式狀態自動切換
- 透過修改 dom 根元素 (`html` 或 `body`) 的屬性與 class 來動態套用或取消暗黑模式的色彩樣式。

如果你在第一種方式的網站上啟用 Waline，你只需將 `dark` 設定為 `'auto'`。

對於第二種網站，你需要將 dark 設定為令暗黑模式生效的 CSS 選擇器。以下是幾個範例

::: tip 不同主題的範例

- **vuepress-theme-hope v2**: 它會在 `<html>` 上透過設定 `data-theme="dark"` 開啟暗黑模式，那麼你需要將 `dark` 選項設定為 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它會在 `<html>` 上透過設定 `data-user-color-scheme="dark"` 開啟暗黑模式。那麼你需要將 `dark` 選項設定為 `'html[data-user-color-scheme="dark"]'`。

:::

## Meta 圖示

如果你希望給使用者留言的 meta 資料加上圖示的話，你可以匯入 `waline-meta.css` 來使用它。

對於 CDN 使用者，你可以透過以下連結匯入:

```html
<!-- Meta 圖示 (選填) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

對於 NPM 使用者，你可以透過以下方式匯入:

```js
import '@waline/client/meta';
```

## RTL 支援

`@waline/client` 支援 RTL 版面配置，你只需要在 `<html>` 標籤加入 `dir="rtl"` 即可。

## 自訂樣式

### CSS 變數

你可以在 [客戶端參考 → CSS 變數](../../reference/client/style.md) 找到 Waline 正常和夜間模式下使用的 CSS 變數預設值。

如果它和你的網站樣式不同，你可以自行覆蓋對應的 CSS 變數。

### 陰影樣式

如果你在使用一個大量運用陰影 (`box-shadow`) 的主題，你可以透過修改 `--waline-border` 和 `--waline-box-shadow` 來變更 Waline 的顯示效果，如:

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

### 更多

如果上面的 CSS 變數無法滿足你對 Waline 樣式的自訂要求，你可以停止匯入 Waline 官方提供的樣式，並自行製作 CSS。
