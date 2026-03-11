---
title: ユーザーラベル
icon: label
order: 5
---

Waline では、インタラクション数に基づいたレベルラベルの設定と、ログインユーザー向けのカスタムラベルの設定が可能です。

## グレードラベル

この機能を有効にするには、サーバー上で `LEVELS` 変数を設定する必要があります。詳細は [サーバー環境変数の設定](../../reference/server/env.md#display) を参照してください。

`locales` オプションを使ってこれらのレベルラベルをカスタマイズできます。詳細は [多言語設定](./i18n.md#customize) を参照してください。

## 専用ラベル

管理画面からユーザーごとにカスタムラベルを設定できます。

![Admin Label](./assets/label-admin.jpg)

ログインユーザーはプロフィールページから自分の専用ラベルを更新することもできます。

![Profile Label](./assets/label-profile.jpg)
