---
title: 建立自己的表情符號預設
icon: emoji
---

本教學將指引你如何建立並使用自己的表情符號預設。

<!-- more -->

## 建立自己的預設

首先，你需要準備一些表情符號圖片，作為你的表情符號包。接下來，你需要按照步驟完成下列流程。

### 為表情符號包命名並上傳

基於簡便性的考量，Waline 會將表情符號圖片的名稱直接作為表情符號的 key。這意味著，如果你引入了兩個不同的預設，而它們都含有 laugh.png 圖片的話，這兩個表情符號會對應到同一個表情符號 `:laugh:`。

所以，我們建議的最佳做法是，每個表情符號預設的建立者應該在表情符號檔案的所有名稱中，加上一個與預設名稱相關的前置字串。

將它們妥善命名後，你需要將它們上傳到你的伺服器。

### 撰寫預設資訊

我們假定你已經在 `https://example.com` 的 `my-emoji` 目錄下放置了一些表情符號圖片，如下所示：

```
https://example.com/my-emoji/
  ├─ my_laugh.png
  ├─ my_cute.png
  ├─ my_rage.png
  ├─ my_sob.png
  └─ ...
```

此時，你還需要為這個資料夾建立一個 `info.json` 檔案，讓 Waline 知曉 Emoji 預設所包含的表情符號。

首先，我們先為 Emoji 預設取一個名稱，例如叫 `我的 Emoji`，由於你已經為圖片設定了 `my_` 前置字串，且檔案均為 `png` 格式。你需要將它們加入 `info.json` 中。

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png"
}
```

之後，你需要在 `items` 中按照你希望的順序列出所有的表情符號圖片名稱，同時，請記得忽略你已經在 `prefix` 和 `type` 中設定的前置字串和副檔名。

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png",
  "items": ["laugh", "cute", "rage", "sob"]
}
```

之後，請選擇一個有代表性的表情符號作為在分頁中展示的圖示：

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

這樣，你就完成了 `info.json` 的撰寫，請將它上傳到同一個資料夾。

這樣你就成功地建立了一個 `my-emoji` 預設，位址為 `https://example.com/my-emoji/'` 的預設。

## 利用 GitHub 標籤與儲存庫鏡像

通常情況下，你可能會覺得擁有自己的網域並將圖片上傳到網域有些繁瑣，而且連結可能會隨時間失效，所以一個進階的做法是使用 GitHub 儲存庫，並利用 Git 的標籤功能，透過 GitHub 鏡像來提供表情符號。

與上面的步驟類似，這次，你需要新建 GitHub 儲存庫，並將表情符號按照上述的方法進行命名，使用相同步驟建立 `info.json`，並將它們上傳到儲存庫中。

之後，為此時的儲存庫建立一個標籤，我們推薦使用 `vx.x.x` 的格式進行設定，如 `v1.0.0`。

加入標籤後，你可以使用 [cdn.jsdelivr.net](https://www.jsdelivr.com/) 上帶有版本的 CDN 連結作為你的預設，其格式為 `https://cdn.jsdelivr.net/gh/user/repo@version/file`。

我們假定你建立了 `example/emoji` 儲存庫，直接上傳了表情符號圖片和 `info.json`，並且已經建立了 `v1.0.0` 標籤，那麼你可以使用 `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` 作為你的預設。

::: tip

為連結綁定標籤是十分必要的，這可以防止因修改你的預設導致歷史留言引用的圖片連結失效。

官方的表情符號包預設，就是透過建立 [walinejs/emojis](https://github.com/walinejs/emojis) 儲存庫，並使用 CDN 連結來實現的。目前我們正在使用 `v1.2.0` 版本。

:::

::: warning

cdn.jsdelivr.net 在中國大陸可能受到污染，你可以將 `cdn.jsdelivr.net` 換成 `gcore.jsdelivr.net`，或代理 `cdn.jsdelivr.net` 使用，

:::

## 使用設定物件

和前文類似，我們假設你有下列檔案結構：

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

在建立 `info.json` 上傳並使用連結作為預設之外，你也可以直接使用下列物件作為預設：

```js
{
  name: "我的 Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

這裡，我們額外加入了 `folder` 屬性來告知 Waline 圖片的存放位置。
