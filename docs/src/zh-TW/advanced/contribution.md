---
title: 貢獻指南
icon: contribute
order: -1
---

歡迎大家為 waline 提交 Pull Request！:tada:

如果你想為 waline 貢獻自己的一份心力，以下是一份指南。

<!-- more -->

## 準備

1. 使用 Git 複製專案

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. 安裝相依套件

   ::: warning

   請使用 pnpm 安裝相依套件:

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## 開發

- 使用 `pnpm run client:dev` 啟動 `@waline/client` 本機開發

  ::: tip

  由於 waline 是 Client/Server 架構，在除錯 client 時，你需要設定 `SERVERURL` 為除錯伺服器，或同時啟動下方的 server 開發伺服器並使用預設的 `localhost:9090`。

  :::

- 使用 `pnpm run server:dev` 啟動 `@waline/server` 本機開發

  ::: tip

  為了讓 `@waline/server` 能在本機正常執行，你需要將必要的本機環境變數設定至 `.env`。

  在 `.env.example` 我們準備了範例供你參考

  :::
