---
title: Entwicklungsleitfaden
icon: contribute
order: -1
---

Wir begrüßen alle, die Pull-Requests für Waline öffnen! :tada:

Wenn Sie zu Waline beitragen möchten, ist hier ein Leitfaden.

<!-- more -->

## Vorbereitung

1. Verwenden Sie Git, um das Projekt zu klonen

   ```bash
   git clone https://github.com/walinejs/waline.git
   ```

1. Abhängigkeiten installieren

   ::: warning

   Installieren und verwenden Sie pnpm, um Abhängigkeiten zu installieren.

   ```bash
   npm i -g pnpm@latest
   ```

   :::

   ```bash
   cd waline
   pnpm i
   ```

## Entwicklung

- Führen Sie `pnpm client:dev` aus, um den `@waline/client` devServer zu starten

  ::: tip

  Da Waline auf einer Client/Server-Architektur basiert, müssen Sie beim Debuggen eines Clients `SERVERURL` festlegen oder gleichzeitig den Server-devServer unten starten und den Standard `localhost:9090` verwenden.

  :::

- Führen Sie `pnpm server:dev` aus, um den `@waline/server` devServer zu starten

  ::: tip

  Um `@waline/server` lokal auszuführen, müssen Sie einige lokale Umgebungsvariablen in `.env` konfigurieren.

  Wir bieten Ihnen ein Beispiel in `.env.example`.

  :::
