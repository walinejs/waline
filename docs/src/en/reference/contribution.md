---
title: Development Guide
icon: guide
---

We welcome everyone to open Pull Requests for waline! :tada:

If you want to contribute to waline, here is a guide.

## Preparation

1. Use Git to clone the project

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Installation dependencies

   ::: warning

   Install and use pnpm to install dependencies.

   ```bash
   npm i -g pnpm@latest
   ```

   :::

   ```bash
   cd waline
   pnpm i
   ```

## Development

- Run `pnpm client:dev` to start `@waline/client` devServer

  ::: tip

  Since waline is based on Client/Server architecture, when debugging a client, you need to set `SERVERURL`, or start server devServer below at the same time and use the default `localhost:9090`.

  :::

- Run `pnpm server:dev` to start `@waline/server` devServer

  ::: tip

  In order to run `@waline/server` locally, you need to configure some local environment variables to `example/.env`.

  We provide an exmple for you in `example/.env.example`.

  :::
