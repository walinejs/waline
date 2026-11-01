---
title: Introduzione al client
icon: client
order: 1
---

Waline fornisce ufficialmente [`@waline/client`](https://www.npmjs.com/package/@waline/client), scritto in Vue + TypeScript e con una dimensione gzip di soli 100 KB.

## Importare

Puoi importare il client di Waline tramite CDN o npm; mettiamo a disposizione più versioni dei file per soddisfare esigenze diverse.

Se incontri problemi in questa fase, consulta:

- [Cookbook → Importare da CDN](../../cookbook/import/cdn.md)
- [Cookbook → Importare in un progetto](../../cookbook/import/project.md)

## Usare Waline

Il modo più semplice per usare Waline è [seguire la procedura descritta nella guida rapida](./README.md#importare-in-html): importa la funzione `init` da Waline e inizializza l'istanza di Waline con `init(yourOptions)`.

Tra le opzioni di `init`, `el` e `serverURL` sono obbligatorie. La prima è l'elemento o il selettore dell'elemento su cui montare Waline, la seconda è l'indirizzo del server. Per tutti i parametri di inizializzazione di `@waline/client` vedi [Riferimento client → API](../../reference/client/api.md).

## Numero di commenti

`@waline/client` fornisce anche un sotto-pacchetto per le statistiche dei commenti. Puoi usarlo per mostrare il numero di commenti nell'elenco degli articoli del blog o in altre pagine che non contengono commenti. Per i dettagli vedi [Funzionalità → Contatore dei commenti](../features/comment.md)

## Visualizzazioni

Waline supporta le statistiche delle visualizzazioni. Se non ti serve il servizio di commenti ma vuoi usare la funzione delle visualizzazioni, Waline offre un plugin dedicato con dimensione gzip inferiore a 1 KB.

Per maggiori informazioni sul conteggio delle visualizzazioni di `@waline/client` vedi [Funzionalità → Contatore delle visualizzazioni](../features/pageview.md)

## Formato dei commenti supportato

`@waline/client` supporta numerose sintassi dei commenti e una formattazione ricca. Oltre al Markdown standard e alle estensioni di sintassi GFM, chi commenta può incorporare tag HTML, usare formule matematiche e altro ancora. Per le altre sintassi vedi [Funzionalità → Sintassi supportata](../features/syntax.md).

`@waline/client` supporta anche l'anteprima in tempo reale di ciò che si scrive nel riquadro dei commenti. Detto questo, alcune funzioni sono escluse per impostazione predefinita per contenere le dimensioni. Se vuoi ripristinarle, consulta:

- [Cookbook → Personalizzare l'evidenziatore del codice in anteprima](../../cookbook/customize/highlighter.md)
- [Cookbook → Personalizzare il renderer $\TeX$ in anteprima](../../cookbook/customize/tex-renderer.md)

## Reazioni agli articoli

Trovi i commenti troppo macchinosi? Waline permette ai tuoi visitatori di esprimere rapidamente le proprie reazioni agli articoli, ad esempio mi piace, non mi piace, dubbio, noia, sorpresa e così via. Per abilitare manualmente questa funzione vedi [Funzionalità → Reazioni agli articoli](../features/reaction.md) .

## Funzionalità dei commenti

Waline supporta diverse funzionalità di base, tra cui l'accesso, gli avatar, le [lingue multiple](../features/i18n.md) e l'anteprima in tempo reale.

Waline ti permette di impostare etichette di livello in base alle interazioni e etichette personalizzate per i tuoi utenti. Per i dettagli vedi [Etichette utente](../features/label.md).

## Scheda emoji

`@waline/client` supporta più schede emoji e permette agli utenti di introdurle facilmente tramite i preset. Oltre a quelli ufficiali puoi creare con facilità i tuoi preset.

Per maggiori informazioni sulle schede emoji di `@waline/client` vedi:

- [Funzionalità → Scheda emoji](../features/emoji.md)
- [Cookbook → Personalizzare le emoji](../../cookbook/customize/emoji.md)

## Inserire immagini

`@waline/client` supporta nativamente il caricamento delle immagini. Per impostazione predefinita le immagini vengono convertite in base64. Puoi comunque usare il tuo servizio di hosting delle immagini.

Per maggiori informazioni sulle impostazioni di caricamento delle immagini di `@waline/client` vedi [Cookbook → Personalizzare il caricamento delle immagini](../../cookbook/customize/upload-image.md).

## Ricerca di emoji

`@waline/client` offre una funzione di ricerca di meme ed emoji tramite [giphy](https://giphy.com) e ti permette di personalizzare il servizio di ricerca. Vedi:

- [Funzionalità → Ricerca di emoji](../features/search.md)
- [Cookbook → Personalizzare la ricerca di emoticon](../../cookbook/customize/search.md)

## Supporto multilingua

`@waline/client` supporta nativamente più lingue e su questa base puoi aggiungere lingue o modificare i testi dell'interfaccia. Vedi:

- [Funzionalità → Impostare la lingua](../features/i18n.md).
- [Cookbook → Personalizzare la lingua](../../cookbook/customize/locale.md).

## Supporto all'accessibilità

Waline rispetta pienamente tutti gli standard di accessibilità:

- Tutte le icone e i controlli hanno le relative etichette di accessibilità.
- Puoi interagire con tutti i controlli di Waline usando la tastiera o un dispositivo di puntamento montato sulla testa.

È il nostro modo di essere vicini alle persone con disabilità visive e motorie di tutto il mondo! :heart:

## Stili personalizzabili

Waline supporta nativamente la modalità scura. Per facilitare la regolazione degli stili di Waline mettiamo a disposizione molte variabili CSS configurabili.

Per maggiori dettagli vedi [Stili personalizzati](../features/style.md).

## Sviluppo avanzato

### Supporto alle applicazioni a pagina singola

Waline supporta le SPA (**S**ingle **P**age **A**pplication).

Se vuoi usare Waline in un sito o in un'applicazione basata sulla history API, puoi usare il metodo `update()` sull'istanza inizializzata per aggiornare la configurazione dell'area dei commenti, oppure il metodo `destroy()` sull'istanza per distruggere Waline. Per saperne di più sulla reattività di `@waline/client` vedi [Cookbook → Reattività](../../cookbook/reactivity.md).

### Ecosistema

Puoi usare Waline facilmente tramite i plugin di strumenti come Hexo e VuePress, e persino tramite client di terze parti.

Per i client, i temi e i plugin di terze parti che supportano Waline vedi [Scopri di più → Ecosistema](../../advanced/ecosystem.md).
