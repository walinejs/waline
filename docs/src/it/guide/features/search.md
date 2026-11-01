---
title: Ricerca di emoticon
icon: search
order: 3
---

`@waline/client` permette agli utenti di aggiungere servizi di ricerca emoji e di personalizzare questa funzionalità.

Per impostazione predefinita, `@waline/client` offre un servizio di ricerca di meme tramite [Giphy](https://giphy.com/). In questo modo puoi cercare immagini e aggiungerle al commento.

<!-- more -->

## Disabilitare la ricerca

Se non ti serve il servizio di ricerca immagini predefinito, puoi disabilitarlo impostando l'opzione `search` su `false`.

```js
Waline.init({
  el: '#waline',
  // ...
  search: false,
});
```

## Personalizzare

Puoi personalizzare il servizio di ricerca immagini tramite l'opzione search.

Per ogni operazione devi restituire un array contenente le informazioni sulle immagini come risultato della ricerca; ogni elemento deve essere un oggetto con le seguenti proprietà:

- `src`: indirizzo del link dell'immagine
- `title`: titolo dell'immagine e testo alternativo (facoltativo)
- `preview`: miniatura dell'immagine da usare nell'elenco dei risultati (facoltativo)

L'opzione accetta tre funzioni, ognuna delle quali deve restituire una Promise il cui risultato è l'array di risultati di ricerca descritto sopra.

- `search`: operazione di ricerca; il termine cercato viene passato come primo parametro della funzione
- `default`: elenco di immagini da mostrare per impostazione predefinita (facoltativo)
- `more`: funzione attivata quando si scorre fino in fondo all'elenco di immagini; il termine cercato e il numero corrente vengono passati come primi due parametri (facoltativo)

Per un tutorial sulla ricerca personalizzata, vedi [Cookbook → Ricerca emoji personalizzata](../../cookbook/customize/search.md).
