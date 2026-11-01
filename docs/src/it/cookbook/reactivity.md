---
title: Istanza reattiva di Waline
icon: spa
order: -1
---

Il client ufficiale `@waline/client` si basa su Vue3, fornisce componenti e istanze reattive e supporta le SPA (**S**ingle **P**age **A**pplication).

<!-- more -->

## Componente Vue

Se stai realizzando un progetto Vue, puoi ottenere e usare il componente Waline importando l'esportazione con nome `Waline` da `@waline/client/components`.

Tutte le proprietà dei componenti sono reattive: questo significa che quando modifichi le proprietà, il modulo dei commenti si aggiornerà automaticamente.

## Altri progetti

Negli altri casi di SPA devi conservare l'oggetto `WalineInstance` restituito dalla funzione Waline al momento dell'inizializzazione.

Su `WalineInstance` trovi la proprietà `el` e due metodi: `update()` e `destroy()`.

### update

Puoi chiamare `update()` per aggiornare Waline in qualsiasi momento (ad esempio quando l'utente visita una nuova rotta). Il metodo `update` riceve un parametro opzionale `options`: a eccezione di `el`, tutte le altre opzioni di inizializzazione di Waline possono essere aggiornate passando i nuovi valori.

Ad esempio:

```js
// in `/` route
const waline = Waline.init({
  serverURL: 'https://example.com',
});

/* User: after some time, route has changed to `/a.html` */

waline.update(); // Now waline will start clear the comment and show a loading state.
// After some time, the counter and comments will be all updated

waline.update({
  lang: 'en',
  login: 'disable',
}); // waline will now display in English, and disable user login
```

#### Come funziona

Quando chiami `update`, l'opzione corrente e quella storica vengono unite tramite **copia superficiale**, e l'istanza di Waline si aggiorna con le nuove opzioni (salvandole).

Il comportamento predefinito di questo metodo è **rigenerare i valori predefiniti** per le opzioni non ancora impostate e **usare i valori storici** per quelle già impostate.

Ci sono due opzioni a cui potresti dover prestare particolare attenzione: `path` e `locale`.

::: warning Attenzione a path

In V2, il parametro `path` viene **sempre reimpostato** durante `update()`.

Questo significa che in qualsiasi aggiornamento, se non specifichi `path`, questo verrà reimpostato a `window.location.pathname`.

:::

::: warning Attenzione a locale

A causa della copia superficiale, le vecchie opzioni `locale` vengono completamente sovrascritte dalle nuove opzioni `locale` passate a `update`.

Il nostro punto di vista è: gli utenti di solito vogliono cambiare la lingua di visualizzazione quando aggiornano la locale, quindi abbiamo impostato questo come comportamento previsto del plugin. Questo significa anche che puoi usare `update({ locale: {} })` per cancellare dalla cronologia la configurazione della locale personalizzata.

Se hai davvero bisogno di aggiornare uno o più campi specifici di `locale`, devi passare l'intera `locale` aggiornata.

:::

Nel frattempo, l'opzione di `update()` è stata ottimizzata per le richieste di rete asincrone, tra cui:

- Aggiorna l'area dei commenti e ripete la richiesta solo quando il percorso cambia davvero
- La nuova chiamata a `update()` termina automaticamente la richiesta non più necessaria della precedente `update()`.

### el

La proprietà `el` è l'HTMLElement su cui è montata l'istanza corrente di Waline.

Se inizializzi Waline con `el: null` (usando solo i commenti e le statistiche delle visualizzazioni), questa proprietà sarà `null`.

### destroy

Se dimentichi di passare `serverURL` o se Waline non riesce a trovare la posizione di montaggio tramite l'opzione `el` nella pagina, Waline genererà un Error che indica il motivo dell'errore.

### Errore di inizializzazione

Se dimentichi di impostare `serverURL` o se Waline non riesce a trovare la posizione di montaggio tramite l'opzione `el` nella pagina, Waline restituirà un `WalineErrorInstance`.

Su `WalineErrorInstance` c'è un solo attributo, `errMsg`, che indica il motivo del fallimento dell'inizializzazione.

### Precauzioni

::: warning Ricordati di distruggere l'istanza

Per permettere a Waline di rilasciare correttamente le risorse, chiama manualmente `WalineInstance.destroy()` prima di rimuovere l'elemento in cui è montato Waline.

Altrimenti alcuni listener potrebbero non essere rimossi correttamente.

:::
