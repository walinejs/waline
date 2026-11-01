---
title: Руководство по разработке
icon: contribute
order: -1
---

Мы будем рады, если вы откроете Pull Request для Waline! :tada:

Если вы хотите внести вклад в Waline, это руководство поможет вам начать.

<!-- more -->

## Подготовка

1. Клонируйте проект с помощью Git

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Установите зависимости

   ::: warning

   Для установки зависимостей используйте pnpm.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Разработка

- Выполните `pnpm run client:dev`, чтобы запустить devServer `@waline/client`

  ::: tip

  Waline построен на архитектуре «клиент — сервер», поэтому при отладке клиента нужно задать `SERVERURL` либо одновременно запустить описанный ниже devServer сервера и использовать значение по умолчанию `localhost:9090`.

  :::

- Выполните `pnpm run server:dev`, чтобы запустить devServer `@waline/server`

  ::: tip

  Чтобы запустить `@waline/server` локально, нужно задать несколько локальных переменных окружения в файле `.env`.

  Пример приведён в файле `.env.example`.

  :::
