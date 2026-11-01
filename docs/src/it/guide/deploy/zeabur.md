---
title: Distribuzione su Zeabur
icon: zeabur
---

[Zeabur](https://zeabur.com) è una piattaforma che aiuta gli sviluppatori a distribuire i propri servizi con un clic. Nel complesso è simile a Railway, ma offre più funzionalità, non richiede l'associazione di una carta di credito e ha un limite gratuito più alto.

<!-- more -->

## Distribuzione con un clic

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## Distribuzione da zero

Fai clic sul pulsante [Fork](https://github.com/walinejs/zeabur-starter/fork) per creare uno scaffold di avvio Zeabur.

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> Accedi alla console di Zeabur. Se non hai ancora nessun progetto, devi prima assegnare un nome al nuovo progetto.

![zeabur2](../../../assets/zeabur-2.png)

Dopo essere entrato, fai clic su <kbd>Add New Service</kbd> per creare un servizio: seleziona <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd> per creare prima un servizio di database.

Assegna un nome al nostro servizio di database MongoDB, fai clic sul pulsante <kbd>Deploy</kbd> e il nostro servizio di database è distribuito.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

Quindi continuiamo a fare clic su <kbd>Add New Service</kbd> per creare il servizio Waline: questa volta scegliamo di fare clic su <kbd>Deploy Your Source Code</kbd>. Nell'elenco dei progetti GitHub che segue, individua il progetto di cui abbiamo fatto il fork all'inizio e fai clic sul pulsante <kbd>Import</kbd> corrispondente.

Assegna un nome al nostro servizio Waline, fai clic sul pulsante <kbd>Deploy</kbd> e il nostro servizio Waline è distribuito.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Non chiudere subito il pannello del servizio Waline. Dopo la distribuzione del servizio dobbiamo aggiungere un dominio di accesso. Fai clic sul pulsante <kbd>Generate Domain</kbd> nella scheda <kbd>Domains</kbd>, inserisci il prefisso di dominio che desideri e fai clic sul pulsante <kbd>Save</kbd> per aggiungere il dominio di accesso al nostro servizio.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

Tutto è pronto: il passo successivo è assistere al miracolo. Apri il dominio di accesso appena impostato, prova a pubblicare un commento: se tutto va a buon fine il gioco è fatto~ Ora configura questo dominio nel client e potrai commentare in tutta tranquillità!

![zeabur2](../../../assets/zeabur-10.png)

## Come aggiornare

Vai al repository GitHub e modifica il numero di versione di `@waline/vercel` nel file package.json portandolo all'ultima versione.

## Come modificare le variabili d'ambiente

Puoi accedere alla pagina di gestione delle variabili d'ambiente tramite la scheda <kbd>Variables</kbd>; dopo la modifica la ridistribuzione avverrà automaticamente.

![zeabur11](../../../assets/zeabur-11.png)
