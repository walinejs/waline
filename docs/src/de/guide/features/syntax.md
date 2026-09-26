---
title: Kommentarformat-Unterstützung
icon: format
order: 1
---

Sie können Ihrem Kommentar verschiedene Inhalte hinzufügen, einschließlich erweiterter Markdown-Syntax und HTML-Tags.

<!-- more -->

## Format-Unterstützung

Wir unterstützen die vollständige CommonMark (Standard-Markdown-Syntax) zusammen mit den folgenden Erweiterungen:

- GFM-Stil-Tabelle
- GFM-Stil durchgestrichen
- Tiefgestellt und hochgestellt
- Emoji
- Codeblock-Hervorhebung
- $\TeX$-Formel

::: info GFM

Github Flavored Markdown

:::

In der Zwischenzeit können Sie jeden HTML-Inhalt frei einbetten, ohne den [Schutzmechanismus](./safety.md#comment-security) auszulösen.

## Eingeschränkte Vorschau-Unterstützung

Um die Größe des Clients zu kontrollieren, platzieren wir nur einen kleinen Markdown-Parser im offiziellen Client `@waline/client`, was dazu führt, dass viele Grammatiken im Vorschaufenster nicht korrekt angezeigt werden (sie können im Kommentarbereich **korrekt gerendert** werden).

Dies umfasst die folgenden Einschränkungen:

- Standard-Emoji-Syntax (z. B. :tada:`:tada:`) wird nicht korrekt gerendert

- Die oberen und unteren Indizes (z. B.: `H~2~O`, `x^2^`) können nicht korrekt gerendert werden

- $\TeX$-Syntax, d. h. mathematische Formeln (z. B.: `$a = 1$`) können standardmäßig nicht gerendert werden.

  Bei Verwendung des offiziellen Clients können Sie das $\TeX$-Rendering in der Vorschau anpassen, indem Sie die Option `texRenderer` festlegen. Siehe [Kochbuch → Verwenden Sie einen benutzerdefinierten $\TeX$-Renderer](../../cookbook/customize/tex-renderer.md).

- Unter dem Standard-Highlighter werden Codeblöcke mit zufälligen Farben mit spezifischen Trennzeichen hervorgehoben.

  Bei Verwendung des offiziellen Clients können Sie die Code-Hervorhebung bei der Vorschau anpassen, indem Sie die Option `highlighter` festlegen. Siehe [Kochbuch → Benutzerdefinierte Code-Hervorhebung](../../cookbook/customize/highlighter.md).

## Mehr

::: tip Prinzip

1. Der Client verwendet `marked` zum Rendern unter Berücksichtigung der Paketgröße und verwendet standardmäßig einen < 1kb Highlighter zum Hervorheben und enthält keinen $\TeX$-Renderer, was zu den oben genannten Einschränkungen führt.

1. Wenn ein Benutzer einen Kommentar sendet, bettet der Client ein benutzerdefiniertes Emoji-Bild ein und sendet den ursprünglichen Kommentar an den Server.

1. Der Server empfängt den Originaltext, verwendet `markdown-it`, um Markdown mit relevanten Plugins korrekt zu rendern, verwendet `prismjs`, um Codeblöcke gemäß der Sprache hervorzuheben, und führt $\TeX$-Rendering gemäß den Benutzereinstellungen durch und führt schließlich eine XSS-Verarbeitung durch.

1. Nach Abschluss der Verarbeitung speichert der Server den korrekten Rendering-Inhalt und gibt ihn bei Bedarf an den Client zurück, um die normale Anzeige des Kommentarbereichs sicherzustellen.

:::
