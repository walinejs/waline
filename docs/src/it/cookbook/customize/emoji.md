---
title: Crea i tuoi preset Emoji
icon: emoji
---

Questa guida ti mostra come creare e usare i tuoi preset Emoji.

<!-- more -->

## Crea i tuoi preset

Per prima cosa devi preparare alcune immagini emoji. Poi segui questi passaggi per creare il tuo preset.

### Dai un nome alle emoji e caricarle

Per semplicità, Waline usa direttamente il nome del file immagine come chiave dell'emoji. Questo significa che se importi due preset diversi ed entrambi contengono un'immagine laugh.png, entrambi corrisponderanno alla stessa emoji `:laugh:`.

La buona pratica è quindi che chi crea un preset di emoji aggiunga a tutti i nomi dei file un prefisso legato al nome del preset.

Dopo aver assegnato loro un nome adeguato, devi caricarle sul tuo server.

### Scrivi le informazioni del preset

Supponiamo che tu abbia inserito alcune immagini emoji nella cartella `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

A questo punto devi anche creare un file `info.json` in questa cartella per indicare a Waline quali emoji contiene il preset.

Per prima cosa impostiamo un nome per il preset, ad esempio `My Emoji`; poiché hai impostato il prefisso `my_` per le immagini e i file sono in formato `png`, devi aggiungerli in `info.json`.

Il tuo `info.json` può essere:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Poi elenca tutti i nomi delle emoji in `items` nell'ordine che preferisci; ricorda di omettere il prefisso e il suffisso impostati in `prefix` e `type`.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Successivamente scegli un'emoji rappresentativa come icona mostrata nella scheda:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Fatto questo, il tuo `info.json` è pronto: caricalo nella stessa cartella.

Hai così creato con successo il preset `my-emoji` con `https://example.com/my-emoji/'`.

## Usa un mirror GitHub con i tag

Di solito avere un dominio proprio e caricare lì le immagini può risultare scomodo, e inoltre il link può scadere nel tempo. Un approccio più avanzato consiste nell'usare un repository GitHub e la funzione tag di git per ospitare il preset di emoji.

Analogamente ai passaggi precedenti, crea un nuovo repository GitHub, assegna alle emoji i nomi come sopra, crea `info.json` con gli stessi passaggi e carica tutto nel repository.

A questo punto crea un tag per il repository; consigliamo il formato `vx.x.x`, ad esempio `v1.0.0`.

Dopo aver aggiunto i tag puoi usare come preset il link CDN con la versione su [cdn.jsdelivr.net](https://www.jsdelivr.com/), nel formato `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Supponiamo che tu abbia creato il repository `example/emoji`, caricato direttamente le immagini emoji e `info.json` e creato il tag `v1.0.0`: puoi usare `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` come preset.

::: tip

È necessario specificare un tag nel link per evitare che i link delle immagini citati nei commenti storici diventino non validi quando modifichi il preset.

Il preset ufficiale di emoji è realizzato creando il repository [walinejs/emojis](https://github.com/walinejs/emojis) e usando il link CDN. Al momento usiamo la versione `v1.1.0`.

:::

::: warning

Poiché in Cina cdn.jsdelivr.net è soggetto a DNS poisoning, puoi sostituire `cdn.jsdelivr.net` con `gcore.jsdelivr.net`

:::

## Usare oggetti di configurazione

Come nell'esempio precedente, supponiamo che tu abbia la seguente struttura di file:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

Oltre a creare e caricare un `info.json` e a usare un link come preset, puoi anche usare direttamente i seguenti oggetti come preset:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

Qui aggiungiamo la proprietà `folder` per indicare a Waline dove sono archiviate le immagini.
