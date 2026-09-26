---
title: Sicherheit
icon: safe
order: -10
---

Die Sicherheit des Waline-Kommentarsystems hat für uns oberste Priorität. Wir werden hier die Sicherheit von Waline behandeln.

<!-- more -->

## Kommentar-Sicherheit

### Anti-XSS-Angriff

Waline verwendet [DOMPurify](https://github.com/cure53/DOMPurify), um jede Kommentareingabe auf der Serverseite zu filtern, um potenzielle XSS-Angriffe zu verhindern. Das bedeutet, dass Sie `<iframe>` oder jede Form von Skripten nicht verwenden können.

### Link-Tracking verhindern

Alle Links werden automatisch auf `rel="noreferrer noopener"` gesetzt und mit `target="_blank"` in einem neuen Fenster geöffnet.

### Böswillige Inhaltsimplantation verhindern

- Um zu verhindern, dass Benutzer im Kommentarbereich absendbare Formulare erstellen, um andere Besucher dazu zu bringen, Informationen zu übermitteln, können Sie `<form>` und `<input>` nicht verwenden

- Um zu verhindern, dass Benutzer Stile verwenden, um Websiteseiten zu ändern oder ihre eigenen Kommentarstile zu ändern, um Spam-Anzeigen zu pflanzen, sind das `<style>`-Tag und das `style`-Attribut für das Element nicht verfügbar.

- Um zu verhindern, dass Benutzer die automatische Wiedergabefunktionalität von Medien missbrauchen, können Sie das Attribut `autoplay` nicht verwenden.

### Fälschung verhindern

Waline unterstützt ein Kontosystem, sodass Sie Benutzer zwingen können, sich mit einem Konto zu registrieren und anzumelden. Auf diese Weise können Besucher keine Kommentare anderer Personen fälschen.

Um diese Funktion zu aktivieren, müssen Sie die obligatorische Anmeldung sowohl auf dem Client als auch auf dem Server festlegen. Weitere Informationen finden Sie unter [`login`](../../reference/client/props.md#login) und [`LOGIN`](../../reference/server/env.md#basic).

## Website-Sicherheit

### Frequenzbegrenzung

Um zu verhindern, dass Benutzer kommentieren, schränkt Waline die IP für Kommentare ein. Standardmäßig kann dieselbe IP nur einen Kommentar innerhalb einer Minute senden. Sie können diese Grenze in [Serverreferenz → Umgebungsvariablen](../../reference/server/env.md#safety) ändern.

### Flooding verhindern

Waline erkennt vorhandene Kommentare beim Eingeben von Kommentaren, und wenn es einen Kommentar mit zu hoher Ähnlichkeit erkennt, lehnt es den entsprechenden Kommentar ab. Dies kann Flooding bis zu einem gewissen Grad verhindern.

### Kommentarüberprüfung

Wenn Ihre Website unter böswilligen Angriffen steht, in sensiblen Perioden oder wenn Sie beschäftigt sind, können Sie die Kommentarüberprüfungsfunktion aktivieren. Einzelheiten finden Sie unter [Serverreferenz → Umgebungsvariablen](../../reference/server/env.md#safety).

Wenn die Kommentarüberprüfung aktiviert ist, werden alle neuen Kommentare standardmäßig ausgeblendet. Sie können Kommentare im Waline-Verwaltungsterminal oder im Kommentarfeld auf der entsprechenden Seite anzeigen und überprüfen. Nur die von Ihnen genehmigten Kommentare können angezeigt werden.

## Datensicherheit

Da Waline serverseitig ist, kann niemand Kommentardaten oder Seitenaufrufe manipulieren.

In der Zwischenzeit können Sie die Variablen `DISABLE_USERAGENT` und `DISABLE_REGION` auf der Serverseite festlegen, um zu verhindern, dass andere die UA und den geografischen Standort von Benutzerkommentaren anzeigen.
