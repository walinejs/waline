---
title: Stil anpassen
icon: style
order: -2
---

`@waline/client` bietet einige CSS-Variablen. Sie können den Stil von Waline durch diese Variablen einfach konfigurieren:

In der Zwischenzeit verfügt `@waline/client` auch über eine integrierte Unterstützung für den Dunkelmodus.

<!-- more -->

## Dunkelmodus-Unterstützung

Sie können die Option `dark` verwenden, um die Dunkelmodus-Unterstützung von Waline zu aktivieren.

Normalerweise aktivieren Websites die Dunkelmodus-Unterstützung auf zwei Arten:

- Verwenden Sie den `@media`-Selektor, um automatisch gemäß dem Gerätefarb-Modus-Status über `prefers-color-scheme` zu wechseln
- Dynamisches Anwenden anderer Dunkelmodus-Farbstile durch Ändern der Attribute und Klasse des Dom-Root-Elements (`html` oder `body`).

Wenn Sie Waline auf der Website der ersten Methode aktivieren, müssen Sie `dark` nur auf `'auto'` setzen.

Für die zweite Art von Website müssen Sie `dark` auf den CSS-Selektor setzen, der den Dunkelmodus effektiv macht. Hier sind einige Beispiele:

::: tip Beispiele

- **vuepress-theme-hop v2**: Es aktiviert den Dunkelmodus, indem es `data-theme="dark"` am `<html>`-Tag selbst setzt. Sie müssen also `'html[data-theme="dark"]'` als `dark`-Option festlegen.

- **hexo-theme-fluid**: Es aktiviert den Dunkelmodus, indem es `data-user-color-scheme="dark"` am `<html>`-Tag selbst setzt. Sie müssen also `'html[data-user-color-scheme="dark"]'` als `dark`-Option festlegen.

:::

## Meta-Symbole

Wenn Sie Symbole zu Benutzerkommentar-Metadaten hinzufügen möchten, können Sie `waline-meta.css` importieren, um sie zu verwenden.

Für CDN-Benutzer können Sie über den folgenden Link importieren:

```html
<!-- Meta-Symbol (optional) -->
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline-meta.css" />
```

Für NPM-Benutzer können Sie über importieren:

```js
import '@waline/client/meta';
```

## RTL-Unterstützung

`@waline/client` unterstützt RTL-Layout. Sie müssen nur `dir="rtl"` im `<html>`-Tag hinzufügen.

## Stile anpassen

### CSS-Variablen

Sie können Standardwerte für CSS-Variablen finden, die von Waline im Normal- und Dunkelmodus verwendet werden, unter [Clientreferenz → CSS-Variablen](../../reference/client/style.md).

Wenn es sich von Ihrem Website-Stil unterscheidet, können Sie die entsprechende CSS-Variable selbst überschreiben.

## Box Shadow

Wenn Sie ein Theme verwenden, das Schatten (`box-shadow`) anstelle von Rahmen verwendet, können Sie den Anzeigeeffekt von Waline ändern, indem Sie `--waline-border` und `--waline-box-shadow` ändern, z. B.:

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

### Mehr

Wenn die obigen CSS-Variablen Ihre benutzerdefinierten Anforderungen für Waline-Stile nicht erfüllen können, können Sie Ihre eigene CSS-Datei schreiben.
