---
title: Distribuzione su Vercel
icon: vercel
order: 1
---

Abbiamo pubblicato il pacchetto `@waline/vercel` come pacchetto del server: la distribuzione su Vercel è anche il nostro metodo più consigliato.

<!-- more -->

## Come distribuire

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Fai clic sul pulsante blu qui sopra: verrai reindirizzato a Vercel per distribuire con il template di Waline.

   ::: note

   Se non hai ancora effettuato l'accesso, ti consigliamo di accedere con GitHub.

   :::

1. Inserisci il nome del tuo progetto Vercel e fai clic su `Create`.

   ![Creare il progetto](../../../assets/vercel-1.png)

1. Vercel creerà e inizializzerà automaticamente un repository basato sul template di esempio di Waline, usando il nome che hai appena inserito.

   ![nuovo progetto](../../../assets/vercel-2.png)

   Dopo uno o due minuti Vercel dovrebbe aver completato la distribuzione. Fai clic sul pulsante `Go to Dashboard` per essere reindirizzato alla dashboard della tua applicazione.

   ![dashboard](../../../assets/vercel-3.png)

## Creare il database

1. Fai clic su `Storage` in alto per entrare nella pagina del servizio di archiviazione, scegli `Create Database`. In `Marketplace Database Providers` seleziona `Neon`, poi fai clic su `Continue`.

   ![archiviazione](../../../assets/vercel-5.png)

1. Ti verrà chiesto di creare un account Neon. Scegli `Accept and Create`. Poi seleziona la configurazione del piano del database, inclusi regione e quota. Puoi lasciare i valori predefiniti e fare clic su `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Definisci il nome del database. Puoi mantenere quello predefinito e fare clic su `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Ora il database compare sotto `Storage`. Fai clic e scegli `Open in Neon` per passare a Neon. In Neon seleziona `SQL Editor` a sinistra, incolla nell'editor l'SQL di [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) e fai clic su `Run` per creare le tabelle.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Dopo qualche istante dovresti vedere un messaggio di successo. Torna su Vercel, fai clic su `Deployments`, poi su `Redeploy` nell'ultima distribuzione per rendere effettiva la nuova configurazione del database.

   ![ridistribuzione riuscita](../../../assets/vercel-12.png)

1. Vercel ti reindirizzerà su `Overview` e inizierà la distribuzione. Quando `STATUS` diventa `Ready`, fai clic su `Visit` per aprire il sito distribuito. Questo URL è l'indirizzo del tuo server.

   ![visitare il sito](../../../assets/vercel-14.png)

## Assegnare un dominio

1. Fai clic su <kbd>Settings</kbd> - <kbd>Domains</kbd> per andare alla pagina delle impostazioni del dominio.

1. Inserisci il dominio che vuoi assegnare e fai clic sul pulsante <kbd>Add</kbd>.

   ![Aggiungere un dominio](../../../assets/vercel-16.png)

1. Aggiungi un nuovo record `CNAME` nel server del tuo servizio di dominio.

   | Tipo  | Nome    | Valore               |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Dopo che sarà effettivo, potrai usare il tuo dominio per visitare Waline. :tada:
   - Sistema di commenti: example.your-domain.com
   - Pannello di amministrazione: example.your-domain.com/ui

   ![successo](../../../assets/vercel-17.png)

## Importazione HTML

Configura quanto segue nella tua pagina web:

1. Importa gli stili di Waline da `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Crea un tag `<script>` che usa `init()` da `https://unpkg.com/@waline/client@v3/dist/waline.js` e passa le opzioni obbligatorie `el` e `serverURL`.
   - `el` è l'elemento usato per renderizzare Waline. Può essere una stringa selettore CSS o un HTMLElement.
   - `serverURL` è l'indirizzo del tuo server ottenuto nel passaggio precedente.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Amministrazione dei commenti

1. Dopo la distribuzione, visita `<serverURL>/ui/register` per registrarti. Il primo utente registrato diventa l'amministratore.
2. Dopo l'accesso, l'amministratore può gestire i commenti: modificarli, contrassegnarli o eliminarli.
3. Anche gli utenti possono registrarsi dal modulo dei commenti. Dopo l'accesso verranno reindirizzati alla pagina del proprio profilo.
