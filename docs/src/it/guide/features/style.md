---
title: Personalizzazione dello stile
icon: style
order: -2
---

`@waline/client` mette a disposizione alcune variabili CSS. Grazie a queste variabili puoi configurare facilmente lo stile di Waline:

Inoltre, `@waline/client` supporta nativamente anche la modalità scura.

<!-- more -->

## Supporto alla modalità scura

Puoi usare l'opzione `dark` per abilitare il supporto alla modalità scura di Waline.

Di solito i siti web abilitano la modalità scura in due modi:

- Usano il selettore `@media` per passare automaticamente in base allo stato della modalità colore del dispositivo tramite `prefers-color-scheme`
- Applicano dinamicamente un altro stile di colore scuro modificando gli attributi e la classe dell'elemento radice del DOM (`html` o `body`).

Se abiliti Waline su un sito che usa il primo metodo, devi solo impostare `dark` su `'auto'`.

Per il secondo tipo di sito, devi impostare `dark` sul selettore CSS che rende effettiva la modalità scura. Ecco alcuni esempi:

::: tip Esempi

- **vuepress-theme-hop v2**: abilita la modalità scura impostando `data-theme="dark"` sul tag `<html>` stesso. Devi quindi impostare `'html[data-theme="dark"]'` come opzione `dark`.

- **hexo-theme-fluid**: abilita la modalità scura impostando `data-user-color-scheme="dark"` sul tag `<html>` stesso. Devi quindi impostare `'html[data-user-color-scheme="dark"]'` come opzione `dark`.

:::

## Icone dei metadati

Se vuoi aggiungere delle icone ai metadati dei commenti degli utenti, puoi importare `waline-meta.css`.

Per chi usa il CDN, l'import avviene tramite il seguente link:

```html
<!-- Meta icon (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Per chi usa NPM, puoi importarlo con:

```js
import '@waline/client/meta';
```

## Supporto RTL

`@waline/client` supporta il layout RTL: devi solo aggiungere `dir="rtl"` nel tag `<html>`.

## Personalizzare gli stili

### Variabili CSS

Nella pagina [Riferimento client → Variabili CSS](../../reference/client/style.md) trovi i valori predefiniti delle variabili CSS usate da Waline in modalità normale e scura.

Se non sono in linea con lo stile del tuo sito, puoi sovrascrivere tu stesso la variabile CSS corrispondente.

## Box Shadow

Se usi un tema che sfrutta le ombre (`box-shadow`) invece dei bordi, puoi modificare l'aspetto di Waline intervenendo su `--waline-border` e `--waline-box-shadow`, ad esempio:

```css
:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
```

### Altro

Se le variabili CSS qui sopra non bastano a soddisfare le tue esigenze di personalizzazione dello stile di Waline, puoi scrivere un tuo file CSS.
