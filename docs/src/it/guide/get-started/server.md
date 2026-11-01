---
title: Introduzione al server
icon: server
order: 2
---

## Distribuzione

Oltre alla distribuzione gratuita su Vercel, puoi distribuire Waline tramite Docker o direttamente in un ambiente self-hosted, così come su altre comuni piattaforme cloud. Per maggiori informazioni vedi:

- [Distribuzione autonoma](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Supporto a più database

Waline supporta diversi database, tra cui MySQL, PostgreSQL, SQLite e MongoDB.

Devi solo configurare le variabili d'ambiente del database corrispondente e Waline passerà automaticamente al servizio di archiviazione dati adeguato.

Per maggiori dettagli vedi [supporto a più database](../database.md).

## Configurazione

La maggior parte delle configurazioni lato server si effettua tramite variabili d'ambiente; puoi comunque impostare alcune opzioni avanzate nel file di entry principale.

Per i dettagli sulla configurazione vedi [Riferimento server → Variabili d'ambiente](../../reference/server/env.md) e [Riferimento server → Configurazione](../../reference/server/ config.md).

## Notifica dei commenti

Supportiamo diversi modi per avvisarti quando qualcuno commenta o risponde, e per avvisare chi commenta. Per maggiori dettagli vedi [Notifiche dei commenti](../features/notification.md).

## Registrazione account utente e accesso social

Waline supporta la creazione di account all'interno dell'app e l'accesso social tramite GitHub, Twitter e Facebook.

::: tip

Tieniti aggiornato: nelle prossime versioni prevediamo di aggiungere il supporto ad altre applicazioni social.

:::
