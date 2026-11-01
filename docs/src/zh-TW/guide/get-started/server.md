---
title: 伺服器介紹
icon: server
order: 2
---

## 部署

除了在 Vercel 免費部署外，你可以透過 docker 進行部署或直接部署在自架環境上，也可以部署到其他常見雲端平台。詳見

- [獨立部署](../deploy/vps.md)

- [阿里雲函數計算](../deploy/aliyun-fc.md)

- [阿里雲計算巢](../deploy/aliyun-computenest.md)

- [百度雲函數計算](../deploy/baidu-cfc.md)

- [Cloudbase](../deploy/cloudbase.md)

- [Railway](../deploy/railway.md)

## 多資料庫支援

Waline 支援多種資料庫，包括 MySQL、PostgreSQL、SQLite 以及 MongoDB。

你只需設定對應資料庫的環境變數，Waline 會自動根據你設定的環境變數切換到對應的資料儲存服務。

詳情請見 [多資料庫支援](../database.md)。

## 設定

伺服器大部分的設定可以透過環境變數進行設定，你也可以在主入口檔案中設定一些進階選項。

有關設定的詳細資訊，詳見 [伺服器參考 → 環境變數](../../reference/server/env.md) 和 [伺服器參考 → 設定](../../reference/server/config.md)。

## 留言通知

我們支援多種方式在使用者留言時向使用者或站長發出通知，詳見 [留言通知](../features/notification.md)。

## 社群登入

我們支援社群帳號登入，目前支援 GitHub、Twitter、Facebook。

::: tip

我們計畫在未來版本新增更多的社群應用支援，敬請期待。

:::
