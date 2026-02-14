---
title: Kommentarformat-Unterstützung
icon: format
order: 2
---

Die unterstützte Markdown-Syntax in Kommentaren ist wie folgt.

<!-- more -->

## Markdown-Unterstützung

::: details Überschriften

<!-- markdownlint-disable MD025 -->

# Überschrift1

<!-- markdownlint-enable MD025 -->

## Überschrift2

### Überschrift3

#### Überschrift4

##### Überschrift5

###### Überschrift7

```md
# Überschrift1

## Überschrift2

### Überschrift3

#### Überschrift4

##### Überschrift5

###### Überschrift7
```

:::

::: details Text

Dieser Satz hat **fett**, _kursiv_ und ~~durchgestrichen~~ Stiltext.

```md
Dieser Satz hat **fett**, _kursiv_ und ~~durchgestrichen~~ Stiltext.
```

:::

::: details Absatz

Dies ist ein Absatz.

Dies ist ein weiterer Absatz.

```md
Dies ist ein Absatz.

Dies ist ein weiterer Absatz.
```

:::

::: details Zeilenumbruch

Ich möchte einen Zeilenumbruch  
an diesem Punkt

```md
Ich möchte einen Zeilenumbruch  
an diesem Punkt
```

:::

::: details Blockzitate

> Blockzitate können auch verschachtelt werden...
>
> > ...indem man Größer-als-Zeichen direkt nebeneinander verwendet...
> >
> > > ...oder mit Leerzeichen zwischen den Pfeilen.

```md
> Blockzitate können auch verschachtelt werden...
>
> > ...indem man Größer-als-Zeichen direkt nebeneinander verwendet...
> >
> > > ...oder mit Leerzeichen zwischen den Pfeilen.
```

:::

::: details Ungeordnete Liste

- Erstellen Sie eine Liste, indem Sie eine Zeile mit `-` beginnen
- Erstellen Sie Unterlisten durch Einrücken von 2 Leerzeichen:
  - Änderung des Marker-Zeichens erzwingt neuen Listenstart:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      Zeilenumbruch

      Neuer Absatz

- Es ist einfach!

```md
- Erstellen Sie eine Liste, indem Sie eine Zeile mit `-` beginnen
- Unterlisten werden durch Einrücken von 2 Leerzeichen erstellt:
  - Änderung des Marker-Zeichens erzwingt neuen Listenstart:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      Zeilenumbruch

      Neuer Absatz

- Sehr einfach!
```

:::

::: details Geordnete Liste

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   Zeilenumbruch  
   Zeilenumbruch wieder
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   Zeilenumbruch  
   Zeilenumbruch wieder
1. Integer molestie lorem at mass a
```

:::

::: details HR

---

```md
---
```

:::

::: details Link

[Startseite](/)

```md
[Startseite](/)
```

:::

::: details Bild

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

:::

::: details Tabelle

|              Mitte               |                      rechts | links                      |
| :------------------------------: | --------------------------: | :------------------------- |
| Für zentrierte Ausrichtung `:-:` | Für rechte Ausrichtung `-:` | Für linke Ausrichtung `:-` |
|                b                 |                   aaaaaaaaa | aaaa                       |
|                c                 |                        aaaa | a                          |

```md
|              Mitte               |                      rechts | links                      |
| :------------------------------: | --------------------------: | :------------------------- |
| Für zentrierte Ausrichtung `:-:` | Für rechte Ausrichtung `-:` | Für linke Ausrichtung `:-` |
|                b                 |                   aaaaaaaaa | aaaa                       |
|                c                 |                        aaaa | a                          |
```

:::

::: details Code

Inline-Code: `code`

```md
Inline-Code: `code`
```

Block-Code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

````md
Block-Code:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
````

:::

## Hochgestellt und Tiefgestellt

Verwenden Sie `^` und `~`, um Hochgestellt und Tiefgestellt zu markieren.

::: details Demo

- 19^te^
- H~2~O

```md
- 19^te^
- H~2~O
```

:::

## Emojis

Neben benutzerkonfigurierten oder integrierten Weibo-Emojis unterstützen wir auch vollständige Emoji-Kurzschrift-Emoticons.

::: details Demo

Klassisch:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

Verknüpfungen:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

:::

## Code-Block-Hervorhebung

Wir unterstützen Hervorhebung in fast allen Sprachen.

::: details Demo

```html
<!doctype html>
<html lang="de">
  <head>
    <script>
      // Nur ein kleines Skript, um zu zeigen, dass Inline-JS hervorgehoben wird
      window.console && console.log('foo');
    </script>
    <meta charset="utf-8" />
    <link rel="icon" href="assets/favicon.png" />
    <title>Prism</title>
    <link rel="stylesheet" href="assets/style.css" />
    <link rel="stylesheet" href="themes/prism.css" data-noprefix />
    <script src="assets/vendor/prefixfree.min.js"></script>

    <script>
      var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];
    </script>
    <script src="https://www.google-analytics.com/ga.js" async></script>
  </head>
  <body></body>
</html>
```

```js
/** @deprecated Verwenden Sie stattdessen `Prism.plugins.fileHighlight.highlight`. */
Prism.fileHighlight = function () {
  if (!logged) {
    console.warn(
      'Prism.fileHighlight ist veraltet. Verwenden Sie stattdessen `Prism.plugins.fileHighlight.highlight`.',
    );
    logged = true;
  }
  Prism.plugins.fileHighlight.highlight.apply(this, arguments);
};
```

```css
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
  src: url(https://lea.verou.me/logo.otf);
  font-family: 'LeaVerou';
}

/*
 Gemeinsame Stile
 */

section h1,
#features li strong,
header h2,
footer p {
  font:
    100% Rockwell,
    Arvo,
    serif;
}
```

:::

## Mathematische Formel

Sie können `$ ... $` verwenden, um Inline-Formeln zu erstellen, oder `$$ ... $$` verwenden, um Block-Level-Formeln zu erstellen.

:::
::: details Demo

Eulers Identität $e^{i\pi}+1=0$ ist eine schöne Formel in $\mathbb{R}^2$.

```md
Eulers Identität $e^{i\pi}+1=0$ ist eine schöne Formel in $\mathbb{R}^2$.
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

## HTML einbetten

Fügen Sie gerne beliebigen HTML-Inhalt hinzu, es sei denn, [der Schutzmechanismus](../guide/features/safety.md#comment-security) wird ausgelöst.
