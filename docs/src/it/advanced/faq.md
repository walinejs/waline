---
title: FAQ
icon: faq
order: 4
---

Waline ha una posizione molto chiara fin dalla nascita:

::: info Un semplice sistema di commenti con backend.

:::

Tutte le versioni pubblicate in seguito sono modifiche coerenti con questa posizione.

## Qual è il rapporto con Valine?

::: info Waline = Valine con backend

:::

Prendendo spunto dalla versione open source di Valine, la lista dei commenti nel frontend è stata riscritta con React. Lo stile e la struttura, così come alcuni strumenti e metodi interni, provengono tutti da Valine.

## Devo ancora distribuire Valine-Admin su LeanCloud?

No. Waline è un deploy tutto-in-uno di archiviazione dati, server e client. L'interfaccia del server è già equivalente al motore cloud di LeanCloud usato da Valine: il server include già la gestione dei commenti e le notifiche via e-mail fornite dal precedente motore cloud. Non serve un motore cloud LeanCloud aggiuntivo, quindi non si è vincolati alla strategia di sospensione (sleep) del motore cloud di LeanCloud.

## Come posso aggiornare?

Waline è composto principalmente da due parti: il frontend e il server.

### Frontend

Il frontend inserisce la lista dei commenti e il modulo dei commenti includendo uno script JS nella pagina web. Nella maggior parte dei casi il link usa l'indirizzo della versione più recente del CDN online e la versione più recente viene applicata automaticamente, senza che l'utente debba aggiornare manualmente.

::: note Aggiornamento manuale necessario nei seguenti casi

1. Il numero di versione è specificato forzatamente nell'indirizzo del CDN. In questo caso devi modificare manualmente il numero di versione con quello più recente.
1. Usi NPM per richiedere il modulo e includerlo nel codice. In questo caso devi modificare il numero di versione nella dipendenza per assicurarti che durante l'installazione venga ottenuta la versione più recente.

:::

### Server

Il server è il servizio backend corrispondente al `serverURL` configurato nello script del frontend, e il suo aggiornamento varia leggermente a seconda dell'ambiente di deploy. Gli aggiornamenti del server sono più frequenti.

#### Vercel

Vai nella repository GitHub corrispondente e modifica il numero di versione di `@waline/vercel` nel file package.json con quello più recente.

![vercel](./assets/vercel-update.png)

#### CloudBase

Entra nella pagina di modifica del codice e fai clic su <kbd>Save and reinstall dependencies</kbd>. Se ancora non funziona, entra in <kbd>My Application</kbd> e seleziona <kbd>Deploy</kbd> per rieseguire il deploy.

::: caution

Il nuovo deploy cancellerà i file precedenti. Se nel file precedente è presente una configurazione, è necessario eseguirne prima un backup.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Esegui `docker pull lizheming/waline` per scaricare direttamente l'immagine più recente.

## Perché pubblicare un commento è lento?

Per alcune ragioni tecniche, quando si pubblica un commento il rilevamento dello spam e la notifica dei commenti sono operazioni seriali. Il rilevamento dello spam usa il servizio fornito da Akismet all'estero, che potrebbe risultare lento da raggiungere. Gli utenti possono disattivare il rilevamento dello spam tramite la variabile d'ambiente `AKISMET_KEY=false`. Oltre al servizio di rilevamento dello spam, anche la notifica via e-mail potrebbe causare un timeout. Puoi disattivare la notifica dei commenti per verificare se il problema è causato da questa funzione.
