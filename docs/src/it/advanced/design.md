---
title: Obiettivi di progettazione
icon: goal
order: 2
---

[Valine](https://valine.js.org) è un sistema di commenti dallo stile raffinato, semplice da usare e con un deploy efficiente. La prima volta che l'ho incontrato sono stato attratto dal suo stile curato e dalle sue caratteristiche serverless. Non richiede un servizio backend: il frontend interagisce direttamente con il servizio di archiviazione LeanCloud, davvero niente male! Ma approfondendo ho scoperto i suoi problemi.

## I problemi di Valine

### Non è open source

A partire dalla versione `1.4.0` l'autore pubblica nella repository GitHub solo i file compilati, e il codice sorgente non viene più aggiornato. Forse l'autore è rimasto deluso dall'open source. Per utenti come me che vogliono aggiungere o modificare qualcosa nel progetto, questo è un po' scomodo.

### XSS

Fin dalle primissime versioni gli utenti hanno segnalato problemi di XSS in Valine, e la community ha provato in vari modi a risolverli, aggiungendo codici di verifica, filtri XSS lato frontend e altro ancora. In seguito però l'autore ha capito che qualsiasi verifica lato frontend può fermare solo le persone oneste, quindi ha rimosso restrizioni come il codice di verifica.

Oggi, quando il frontend pubblica un commento, il Markdown viene convertito in HTML e poi viene eseguita una funzione di filtro XSS sul frontend prima dell'invio a LeanCloud. Dopo aver recuperato i dati da LeanCloud, questi vengono inseriti direttamente nel DOM. È evidente che il processo ha dei problemi: finché l'HTML viene inviato così com'è e mostrato direttamente appena recuperato, l'XSS non può essere eliminato alla radice.

::: note Soluzione definitiva

Per gli attacchi di tipo stored XSS possiamo usare la codifica (escape) dei codici HTML per risolverli in modo permanente. Come nel vecchio BBCode, nel database viene salvato solo il contenuto Markdown. Il frontend legge il contenuto e codifica tutto l'HTML prima di mostrarlo dopo la conversione da Markdown.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Poiché Valine è un sistema serverless, gli aggressori possono arrivare direttamente alla fase di archiviazione. Tutte le precauzioni prese prima del salvataggio dei dati sono inutili e si può intervenire solo durante la visualizzazione. Dato che dopo la codifica l'HTML non può più essere interpretato, possiamo garantire che l'HTML convertito non abbia alcuna possibilità di essere inserito.

Poiché Valine non è più open source, non è possibile aprire pull request.

:::

Dato che il metodo qui sopra restringerebbe completamente gli utenti all'ambito del Markdown, Waline aggiunge `DOMPurify` lato client a partire dalla versione `0.15.0` per prevenire l'XSS. Oltre alla normale sanitizzazione dell'XSS:

- `<form>` e `<input>` sono disabilitati
- l'iniezione di stili è disabilitata
- la riproduzione automatica dei contenuti multimediali è disabilitata
- tutti i link esterni vengono elaborati e aperti in una nuova finestra con `rel` impostato a `noopener noreferrer`.

### Fuga di dati personali

Oltre all'accesso diretto allo storage, un aggressore può anche leggere direttamente qualsiasi dato. Se un campo del database è leggibile da tutti, il contenuto di quel campo è completamente trasparente per l'aggressore.

Nei dati dei commenti, i campi IP e casella e-mail contengono dati sensibili dell'utente. Il signor Deng ha scritto un articolo apposta per criticare il problema: [Please stop using the Valine.js comment system immediately unless it fixes the user privacy leak](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Anche quando la community di [JueJin](https://juejin.cn) usava LeanCloud, negli anni passati, era emerso il problema di sicurezza della [divulgazione del numero di cellulare degli utenti](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999).

Per aggirare questo problema, l'autore di Valine ha aggiunto la configurazione `recordIP` per stabilire se consentire la registrazione dell'IP dell'utente. Poiché non c'è un server, l'unica soluzione è non memorizzare il valore.

Questa opzione presenta comunque un problema: la scelta di registrare l'IP dipende dalla configurazione del proprietario del sito, mentre chi commenta non ha alcun diritto di gestire la propria privacy.

La fuga dell'indirizzo e-mail è un altro grave problema di privacy. Calcolare nel frontend il valore md5 dell'e-mail dell'utente e inviarlo per ottenere l'avatar Gravatar è del tutto fattibile. Ma se serve inviare una notifica via e-mail quando un commento riceve una risposta, è inevitabile memorizzare il valore originale dell'indirizzo e-mail. In teoria il problema può essere risolto con la crittografia RSA: la chiave privata può essere salvata nella variabile d'ambiente di LeanCloud e il client invia sia il valore md5 dell'e-mail sia l'e-mail cifrata con la chiave pubblica; quando LeanCloud deve inviare le notifiche, la cloud function legge la chiave privata dall'ambiente e la decifra per ottenere l'e-mail dell'utente. Tuttavia, considerando dimensioni e prestazioni della libreria di crittografia RSA lato frontend, non è una soluzione realistica. Aggiungere uno strato server per filtrare le informazioni sensibili lato server è senz'altro una pratica migliore.

### Manomissione delle statistiche di lettura

Valine 1.2.0 aggiunge la funzione di statistiche di lettura degli articoli: quando l'utente visita la pagina, il numero di visite viene registrato in base all'url nella tabella counter nel backend. Poiché i dati devono essere aggiornati a ogni accesso alla pagina, i permessi devono essere impostati in scrittura per poter aggiornare i campi. Questo crea un problema: i dati possono essere aggiornati con qualsiasi valore. Se ti interessa, puoi aprire il sito ufficiale <https://valine.js.org/visitor.html>, entrare nella console e digitare il codice seguente per provarlo. Ricordati di ripristinare il numero dopo la prova~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Per fortuna il valore del campo `time` è di tipo Number, quindi non è possibile inserire altri valori. Se il campo `time` fosse di tipo stringa, potrebbe trattarsi di una vulnerabilità XSS. Una possibile soluzione è non usare l'archiviazione cumulativa, ma memorizzare un record di accesso in sola lettura per ogni visita e usare il metodo `count()` per le statistiche in fase di lettura. In questo modo tutti i dati sono in sola lettura, il che risolve il problema della manomissione. Anche questa soluzione però ha un problema: quando la quantità di dati è elevata, comporta una certa pressione sulle query.

Se invece si vuole mantenere la struttura dei dati originale, l'unico modo è aggiungere uno strato server per isolare i permessi di modifica.

## La nascita di Waline

Per i motivi sopra è nato Waline. L'obiettivo iniziale di Waline era solo aggiungere un backend a Valine, ma poiché Valine non è open source, si è potuto realizzare solo sul frontend. Naturalmente molti codici e logiche del frontend si ispirano a Valine, per restare coerenti con la sua configurazione. Anche il nome del progetto l'ho derivato da Valine, così che tutti possano capire che questo progetto è un derivato di Valine.

Oltre a risolvere i problemi di sicurezza citati, l'aggiunta del lato server ha permesso di implementare molte funzionalità che prima erano limitate dall'assenza di un server, tra cui le notifiche via e-mail, il filtraggio dei commenti spam e altro ancora.
