---
title: Distribuzione su Netlify
icon: netlify
---

[Netlify](https://netlify.com) è un noto fornitore di servizi di distribuzione di siti web statici, mentre [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) è una piattaforma lanciata da Netlify che consente di eseguire codice JavaScript sui nodi edge dei siti web.

<!-- more -->

## Come distribuire

Fai clic sul pulsante [Fork](https://github.com/walinejs/netlify-starter/fork) per creare uno scaffold di avvio Netlify.

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> Accedi alla console di Netlify, seleziona <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd> per aggiungere il sito. Seleziona GitHub Certified per leggere l'elenco dei nostri progetti GitHub. Cerca nell'elenco il nome del repository generato poco fa con il Fork e fai clic sul progetto per iniziare a creare il nostro sito Netlify basato su questo repository.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Prima di creare un sito Netlify dobbiamo inserire alcune informazioni di configurazione. Oltre alle variabili d'ambiente, per le altre informazioni puoi lasciare i valori predefiniti. Consulta [Supporto a più database](../database.md) per aggiungere le variabili d'ambiente del servizio di archiviazione corrispondente, poi fai clic su <kbd>Deploy site</kbd> in basso per iniziare la distribuzione del sito.

![netlify](../../../assets/netlify-4.png)

Dopo qualche istante il nostro sito Netlify è distribuito correttamente. Possiamo fare clic sulla barra di navigazione <kbd>Functions</kbd> in alto per passare all'elenco delle funzioni cloud, dove `comment` è il nostro servizio Waline distribuito. Fai clic per entrare nella pagina dei dettagli della funzione cloud.

![netlify](../../../assets/netlify-5.png)

Nella pagina dei dettagli, l'indirizzo indicato in `Endpoint` è l'indirizzo di distribuzione del nostro servizio Waline. Fai clic sul pulsante di copia a destra, aprilo in una nuova scheda, prova a pubblicare un commento: se tutto va a buon fine il gioco è fatto~ Ora configura questo dominio nel client e potrai commentare in tutta tranquillità!

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## Come aggiornare

Vai al repository GitHub e modifica il numero di versione di `@waline/vercel` nel file package.json portandolo all'ultima versione.

## Come modificare le variabili d'ambiente

Fai clic sulla barra di navigazione `Site settings` in alto, seleziona la barra laterale `Environments variables` ed entra nella pagina di gestione delle variabili d'ambiente. Fai clic sul pulsante `Add a variable` per aggiungere una variabile d'ambiente.

Dopo aver modificato le variabili d'ambiente, devi entrare nella pagina `Deploys`, selezionare `Trigger deploy` - `Deploy site` per ridistribuire il sito, in modo che le variabili d'ambiente abbiano effetto.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
