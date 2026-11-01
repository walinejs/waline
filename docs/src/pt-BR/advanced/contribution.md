---
title: Guia de desenvolvimento
icon: contribute
order: -1
---

Todos são bem-vindos para abrir Pull Requests para o Waline! :tada:

Se você quiser contribuir com o Waline, aqui está um guia.

<!-- more -->

## Preparação

1. Use o Git para clonar o projeto

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Instale as dependências

   ::: warning

   Instale e use o pnpm para instalar as dependências.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Desenvolvimento

- Execute `pnpm run client:dev` para iniciar o devServer do `@waline/client`

  ::: tip

  Como o Waline é baseado na arquitetura Cliente/Servidor, ao depurar o cliente você precisa definir `SERVERURL`, ou iniciar ao mesmo tempo o devServer do servidor abaixo e usar o padrão `localhost:9090`.

  :::

- Execute `pnpm run server:dev` para iniciar o devServer do `@waline/server`

  ::: tip

  Para executar o `@waline/server` localmente, você precisa configurar algumas variáveis de ambiente locais no arquivo `.env`.

  Fornecemos um exemplo em `.env.example`.

  :::
