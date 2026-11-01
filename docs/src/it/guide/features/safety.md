---
title: Sicurezza
icon: safe
order: -10
---

La sicurezza del sistema di commenti Waline è la nostra massima priorità. Qui vediamo come Waline garantisce la sicurezza.

<!-- more -->

## Sicurezza dei commenti

### Protezione dagli attacchi XSS

Waline usa [DOMPurify](https://github.com/cure53/DOMPurify) per filtrare ogni commento inserito sul lato server, così da prevenire potenziali attacchi XSS. Questo significa che non puoi usare `<iframe>` né alcuna forma di script.

### Impedire il tracciamento dei link

Tutti i link ricevono automaticamente `rel="noreferrer noopener"` e si aprono in una nuova finestra con `target="_blank"`.

### Impedire l'inserimento di contenuti malevoli

- Per evitare che gli utenti creino nell'area commenti moduli inviabili per indurre altri visitatori a inserire informazioni, non puoi usare `<form>` e `<input>`

- Per evitare che gli utenti modifichino le pagine del sito tramite gli stili o camuffino i propri commenti per inserire pubblicità indesiderata, il tag `<style>` e l'attributo `style` sugli elementi non sono disponibili.

- Per evitare abusi della riproduzione automatica dei contenuti multimediali, non puoi usare l'attributo `autoplay`.

### Impedire le contraffazioni

Waline supporta un sistema di account, quindi puoi obbligare gli utenti a registrarsi e ad accedere con un account. In questo modo i visitatori non possono falsificare i commenti altrui.

Per abilitare questa funzione devi imporre l'accesso obbligatorio sia sul client sia sul server; vedi [`login`](../../reference/client/props.md#login) e [`LOGIN`](../../reference/server/env.md#base) per i dettagli.

## Sicurezza del sito

### Limite di frequenza

Per evitare abusi nei commenti, Waline limita gli IP che commentano. Per impostazione predefinita lo stesso IP può inviare un solo commento al minuto. Puoi modificare questo limite in [Riferimento server → Variabili d'ambiente](../../reference/server/env.md#sicurezza).

### Impedire il flooding

Waline analizza i commenti già presenti nel momento in cui ne viene inserito uno nuovo: se rileva un commento troppo simile, rifiuta quello in arrivo. Così è possibile contenere in una certa misura il flooding.

### Revisione dei commenti

Quando il tuo sito è sotto attacco malevolo, in periodi delicati o quando sei occupato, puoi abilitare la funzione di revisione dei commenti. Per i dettagli vedi [Riferimento server → Variabili d'ambiente](../../reference/server/env.md#sicurezza).

Quando la revisione dei commenti è abilitata, tutti i nuovi commenti sono nascosti per impostazione predefinita. Puoi vederli e approvarli nel pannello di amministrazione di Waline o nel riquadro dei commenti della pagina corrispondente. Solo i commenti che approvi vengono mostrati.

## Sicurezza dei dati

Poiché Waline ha un lato server, nessuno può manomettere i dati dei commenti o le visualizzazioni.

Inoltre puoi impostare sul server le variabili `DISABLE_USERAGENT` e `DISABLE_REGION` per impedire ad altri di vedere lo user agent e la posizione geografica dei commenti degli utenti.
