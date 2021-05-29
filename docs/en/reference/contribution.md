# Development Guide

We welcome everyone to open Pull Requests for waline! :tada:

If you want to contribute to waline, here is a guide.

## Preparation

1. Use Git to clone the project

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Installation dependencies

   ::: warning

   Node 14 and below use npm@v6 by default, you need to make sure you use the npm@v7 version:

   ```bash
   # Ensure that your npm version is 7
   npm i -g npm@7
   ```

   :::

   ```bash
   cd waline
   npm i
   ```

## Development

- Run `npm run client:dev` to start `@waline/client` devServer

  ::: tip

  Since waline is based on Client/Server architecture, when debugging a client, you need to set `SERVERURL`, or start server devServer below at the same time and use the default `localhost:9090`.

  :::

- Run `npm run server:dev` to start `@waline/server` devServer

  ::: tip

  In order to run `@waline/server` locally, you need to configure some local environment variables to `example/.env`.

  We provide an exmple for you in `example/.env.example`.

  :::
