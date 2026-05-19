---
title: Development Guide
icon: contribute
order: -1
---

We welcome everyone to open Pull Requests for waline! :tada:

If you want to contribute to waline, here is a guide.

<!-- more -->

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

- Run `pnpm run client:dev` to start `@waline/client` devServer

  ::: tip

  Since waline is based on Client/Server architecture, when debugging a client, you need to set `SERVERURL`, or start server devServer below at the same time and use the default `localhost:9090`.

  :::

- Run `pnpm run server:dev` to start `@waline/server` devServer

  ::: tip

  `pnpm run server:dev` will fall back to a local SQLite database at `./data` when no storage environment variables are set.

  If you want to use another storage backend locally, configure the required environment variables in `.env`.

  We provide an example for you in `.env.example`.

  :::
