---
title: Guía de desarrollo
icon: contribute
order: -1
---

¡Damos la bienvenida a todos a abrir Pull Requests para waline! :tada:

Si quieres contribuir a waline, aquí tienes una guía.

<!-- more -->

## Preparación

1. Usa Git para clonar el proyecto

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Instala las dependencias

   ::: warning

   Instala y usa pnpm para instalar las dependencias.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Desarrollo

- Ejecuta `pnpm run client:dev` para iniciar el devServer de `@waline/client`

  ::: tip

  Como waline se basa en una arquitectura Cliente/Servidor, al depurar un cliente necesitas configurar `SERVERURL`, o iniciar al mismo tiempo el devServer del servidor que se indica abajo y usar el `localhost:9090` predeterminado.

  :::

- Ejecuta `pnpm run server:dev` para iniciar el devServer de `@waline/server`

  ::: tip

  Para ejecutar `@waline/server` en local, necesitas configurar algunas variables de entorno locales en `.env`.

  Te proporcionamos un ejemplo en `.env.example`.

  :::
