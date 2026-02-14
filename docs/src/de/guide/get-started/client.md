---
title: Client-Einführung
icon: client
order: 1
---

Waline bietet offiziell den [`@waline/client`](https://www.npmjs.com/package/@waline/client) an, der in Vue + TypeScript geschrieben ist und nur 53kb gzip groß ist.

## Import

Sie können CDN oder npm verwenden, um den Waline-Client zu importieren, und wir bieten mehrere Versionen von Dateien an, um verschiedene Szenarien zu erfüllen.

Wenn Sie während dieses Prozesses Probleme haben, siehe:

- [Cookbook → CDN-Import](../../cookbook/import/cdn.md)
- [Cookbook → Projekt-Import](../../cookbook/import/project.md)

## Waline verwenden

Der einfachste Weg, Waline zu verwenden, ist [die in der Schnellstartanleitung beschriebene Methode](./README.md#import-in-html): Importieren Sie die Funktion `init` von Waline und initialisieren Sie die Waline-Instanz über `init(yourOptions)`.

Unter den `init`-Optionen sind `el` und `serverURL` erforderlich. Ersteres ist das Element oder der Elementselektor, auf dem Waline montiert ist, und Letzteres ist die Serveradresse. Für alle Initialisierungsparameter für `@waline/client` siehe [Client-Referenz → API](../../reference/client/api.md).

## Kommentarzähler

`@waline/client` bietet auch ein Unterpaket für Kommentarstatistiken. Sie können es verwenden, um die Anzahl der Kommentare in der Blog-Beitragsliste oder auf anderen Seiten anzuzeigen, die keine Kommentare enthalten. Weitere Details finden Sie unter [Funktionen → Kommentarzähler](../features/comment.md)

## Seitenaufruf-Zähler

Waline unterstützt Seitenaufruf-Statistiken. Wenn Sie keinen Kommentardienst benötigen, aber die Seitenaufruf-Funktion verwenden möchten, bietet Waline ein Seitenaufruf-Statistik-Plugin, dessen Gzip-Größe < 1KB beträgt.

Weitere Informationen zum Seitenaufruf-Zähler von `@waline/client` finden Sie unter [Funktionen → Seitenaufruf-Zähler](../features/pageview.md)

## Unterstützung für Kommentarformate

`@waline/client` unterstützt viele Kommentarsyntaxen und umfangreiche Formatierungen. Neben der Unterstützung von Standard-Markdown und GFM-Syntaxerweiterungen können Kommentatoren auch HTML-Tags einbetten, mathematische Gleichungen verwenden und mehr. Für andere Syntaxen siehe [Funktionen → Unterstützte Syntax](../features/syntax.md) für Details.

`@waline/client` unterstützt auch die Echtzeitvorschau der Kommentareingabe im Kommentarfeld. Das heißt, einige Funktionen werden standardmäßig aufgrund der Größe weggelassen. Wenn Sie diese Funktionen wiederherstellen möchten, siehe:

- [Cookbook → Vorschau-Code-Highlighter anpassen](../../cookbook/customize/highlighter.md)
- [Cookbook → Vorschau-$\TeX$-Renderer anpassen](../../cookbook/customize/tex-renderer.md)

## Artikel-Reaktionen

Finden Sie Kommentare zu umständlich? Waline ermöglicht es Ihren Besuchern, schnell ihre Reaktionen auf Artikel auszudrücken, wie z.B. Like, Dislike, Zweifel, Langeweile, Überraschung usw. Um diese Funktion manuell zu aktivieren, siehe [Funktionen → Artikel-Reaktionen](../features/reaction.md).

## Kommentarfunktionen

Waline unterstützt eine Reihe grundlegender Funktionen, einschließlich Login, Avatare, [mehrere Sprachen](../features/i18n.md) und Echtzeitvorschau.

Waline ermöglicht es Ihnen, Interaktionsebenen-Labels und benutzerdefinierte Labels für Ihre Benutzer festzulegen. Weitere Details finden Sie unter [Benutzerlabels](../features/label.md).

## Emoji-Tab

`@waline/client` unterstützt mehrere Emoji-Tabs und ermöglicht es Benutzern, Emoji-Tabs einfach über Voreinstellungen einzuführen. Sie können neben den offiziellen auch problemlos Ihre eigenen Voreinstellungen erstellen.

Weitere Informationen zu `@waline/client` Emoji-Tabs finden Sie unter:

- [Funktionen → Emoji-Tab](../features/emoji.md)
- [Cookbook → Emoji anpassen](../../cookbook/customize/emoji.md)

## Bild einfügen

`@waline/client` verfügt über eine integrierte Bildupload-Unterstützung. Standardmäßig werden Bilder in base64 konvertiert. Das heißt, Sie können auch Ihren eigenen Bildhosting-Dienst verwenden.

Weitere Informationen zu den Bildupload-Einstellungen von `@waline/client` finden Sie unter [Cookbook → Bildupload anpassen](../../cookbook/customize/upload-image.md).

## Emoji-Suche

`@waline/client` bietet eine Meme- und Emoji-Suchfunktion über [giphy](https://giphy.com) und ermöglicht es Ihnen, den Suchdienst anzupassen. Siehe:

- [Funktionen → Emoji-Suche](../features/search.md)
- [Cookbook → Emoticon-Suche anpassen](../../cookbook/customize/search.md)

## Mehrsprachige Unterstützung

`@waline/client` verfügt über integrierte Unterstützung für mehrere Sprachen, und Sie können basierend darauf Sprachunterstützung hinzufügen oder UI-Text ändern. Siehe:

- [Funktionen → Sprache festlegen](../features/i18n.md).
- [Cookbook → Sprache anpassen](../../cookbook/customize/locale.md).

## Barrierefreiheitsunterstützung

Waline unterstützt vollständig alle Barrierefreiheitsstandards:

- Alle Symbole und Steuerelemente haben ihre entsprechenden Barrierefreiheitslabels.
- Sie können mit allen Steuerelementen von Waline entweder mit einer Tastatur oder einem am Kopf montierten Zeigegerät interagieren.

Dies ist unsere Art, sehbehinderte und mobilitätseingeschränkte Menschen auf der ganzen Welt zu unterstützen! :heart:

## Anpassbare Stile

Waline verfügt über integrierte Dark-Mode-Unterstützung. Um es Benutzern zu erleichtern, die Stile von Waline anzupassen, bieten wir viele konfigurierbare CSS-Variablen an.

Siehe [Benutzerdefinierte Stile](../features/style.md) für weitere Details.

## Erweiterte Entwicklung

### Unterstützung für Single Page Applications

Waline unterstützt SPAs (**S**ingle **P**age **A**pplications).

Wenn Sie Waline in einer Website oder Anwendung verwenden möchten, die auf der History-API basiert, können Sie die Methode `update()` auf der initialisierten Instanz verwenden, um die Konfiguration des Kommentarbereichs zu aktualisieren, oder die Methode `destroy()` auf der Instanz verwenden, um Waline zu zerstören. Um mehr über die Reaktivität von `@waline/client` zu erfahren, siehe [Cookbook → Reaktivität](../../cookbook/reactivity.md).

### Ökosystem

Sie können Waline problemlos über Plugins auf Tools wie Hexo, VuePress und sogar Drittanbieter-Clients verwenden.

Für Drittanbieter-Clients, -Themes und -Plugins, die Waline unterstützen, siehe [Mehr erfahren → Ökosystem](../../advanced/ecosystem.md).
