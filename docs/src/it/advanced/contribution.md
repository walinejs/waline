---
title: Guida allo sviluppo
icon: contribute
order: -1
---

Diamo il benvenuto a chiunque voglia aprire una Pull Request per Waline! :tada:

Se vuoi contribuire a Waline, ecco una guida.

<!-- more -->

## Preparazione

1. Usa Git per clonare il progetto

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Installa le dipendenze

   ::: warning

   Installa e usa pnpm per installare le dipendenze.

   ```bash
   corepack enable
   ```

   :::

   ```bash
   cd waline
   pnpm ci
   ```

## Sviluppo

- Esegui `pnpm run client:dev` per avviare il devServer di `@waline/client`

  ::: tip

  Poiché Waline si basa su un'architettura Client/Server, durante il debug del client devi impostare `SERVERURL`, oppure avviare contemporaneamente il devServer del server descritto qui sotto e usare il valore predefinito `localhost:9090`.

  :::

- Esegui `pnpm run server:dev` per avviare il devServer di `@waline/server`

  ::: tip

  Per eseguire `@waline/server` in locale devi configurare alcune variabili d'ambiente locali in `.env`.

  Trovi un esempio in `.env.example`.

  :::
