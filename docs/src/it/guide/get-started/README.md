---
title: Inizia
icon: creative
dir:
  collapsible: false
  order: 1
---

Ti diamo il benvenuto in Waline. In pochi passaggi puoi abilitare Waline per offrire commenti e visualizzazioni sul tuo sito.

<!-- more -->

## Distribuire il server

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Clicca il pulsante qui sopra per andare su Vercel e distribuire il server.

   ::: note

   Se non hai effettuato l'accesso, Vercel ti chiederà di registrarti o accedere. Usa il tuo account GitHub per un accesso rapido.

   :::

1. Inserisci il nome di progetto Vercel che preferisci e clicca `Create` per continuare:

   ![create](../../../assets/vercel-1.png)

1. Vercel creerà e inizializzerà un nuovo repository basato sul template di Waline. Il nome del repository sarà quello del progetto appena inserito.

   ![deploy](../../../assets/vercel-2.png)

   Dopo uno o due minuti sullo schermo compariranno i fuochi d'artificio per festeggiare la distribuzione riuscita. Clicca `Go to Dashboard` per passare alla dashboard dell'applicazione.

   ![deploy](../../../assets/vercel-3.png)

## Creare un database

1. Clicca `Storage` in alto per entrare nella pagina di configurazione dell'archiviazione, poi scegli `Create Database`. Seleziona `Neon` come `Marketplace Database Providers` e clicca `Continue` per proseguire.

   ![neon](../../../assets/vercel-5.png)

1. Ti verrà chiesto di creare un account Neon. Clicca `Accept and Create` per accettare e crearlo. Poi sceglierai il piano del database, inclusi regione e quota. Puoi lasciare tutto predefinito e cliccare `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Ti verrà quindi chiesto di definire il nome del database. Puoi anche lasciarlo invariato e cliccare `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Ora dovresti vedere il servizio di database appena creato sotto `Storage`. Cliccalo e seleziona `Open in Neon` per passare a Neon. Nell'interfaccia di Neon scegli `SQL Editor` dalla barra laterale sinistra, incolla nell'editor le istruzioni SQL di [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) e clicca `Run` per creare le tabelle.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Dopo poco riceverai la conferma che la creazione è riuscita. Torna su Vercel, clicca `Deployments` in alto e clicca il pulsante `Redeploy` a destra dell'ultima distribuzione. Questo passaggio assicura che il servizio di database appena configurato entri in vigore.

   ![redeploy success](../../../assets/vercel-12.png)

1. Verrai reindirizzato alla pagina `Overview` e la distribuzione avrà inizio. Dopo qualche istante lo `STATUS` diventerà `Ready`. Clicca `Visit` per aprire il sito distribuito. Questo URL è l'indirizzo del tuo server.

   ![visit](../../../assets/vercel-14.png)

## Collegare un dominio personalizzato

1. Clicca `Settings` → `Domains` in alto per entrare nella pagina di configurazione dei domini.

1. Inserisci il dominio che vuoi collegare e clicca `Add`.

   ![Add domain](../../../assets/vercel-16.png)

1. Aggiungi un nuovo record `CNAME` presso il tuo provider di dominio:

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Attendi che il record DNS diventi effettivo. Potrai quindi accedere a Waline con il tuo dominio 🎉
   - Sistema di commenti: example.yourdomain.com
   - Gestione dei commenti: example.yourdomain.com/ui

   ![success](../../../assets/vercel-17.png)

## Importare in HTML

Ecco come aggiungere Waline alla tua pagina web o al tuo sito:

1. Importa il foglio di stile `https://unpkg.com/@waline/client@v3/dist/waline.css` nel `<head>`

1. Crea un tag `<script>` e inizializza con `init()` da `https://unpkg.com/@waline/client@v3/dist/waline.js` passando le opzioni necessarie `el` e `serverURL`.
   - L'opzione `el` è l'elemento usato per il rendering di Waline. Puoi impostare un selettore CSS sotto forma di stringa oppure un oggetto HTMLElement.
   - `serverURL` è il link al tuo server distribuito, quello appena creato su Vercel.
   - Per ulteriori opzioni visita la [pagina delle proprietà del componente](https://waline.js.org/it/reference/client/props.html)

   Ecco un esempio:

   ```html {3-7,12-18}:line-numbers
   <head>
     <!-- ... -->
     <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
   </head>
   <body>
     <!-- ... -->
     <div id="waline"></div>
     <script type="module">
       import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

       init({
         el: '#waline',
         serverURL: 'https://your-domain.vercel.app',
         lang: 'en',
       });
     </script>
   </body>
   ```

1. Il servizio di commenti ora funziona correttamente sul tuo sito :tada:!

## Gestione dei commenti (pannello di amministrazione)

1. Al termine della distribuzione visita `<serverURL>/ui/register` per registrarti. La prima persona che si registra diventa amministratore.

1. Dopo aver effettuato l'accesso come amministratore potrai entrare nella dashboard di gestione dei commenti. Qui puoi modificare, marcare o eliminare i commenti.

1. Anche gli utenti possono registrare un account dal riquadro dei commenti e, dopo l'accesso, verranno reindirizzati alla pagina del proprio profilo.

## Tutorial video

Un entusiasta utente di Waline ha realizzato il seguente tutorial video. Se le istruzioni qui sopra non sono chiare, puoi fare riferimento al video:

<VidStack src="https://www.youtube.com/watch?v=SzEHzsme8uY" />
