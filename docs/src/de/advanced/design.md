---
title: Designziel
icon: goal
order: 2
---

[Valine](https://valine.js.org) ist ein exquisites, einfach zu bedienendes und effizient einzusetzendes Bewertungssystem. Als ich das erste Mal damit in Kontakt kam, wurde ich von seinem exquisiten Stil und seinen Serverless-Eigenschaften angezogen. Es benötigt keinen Backend-Dienst. Das Frontend interagiert direkt mit dem LeanCloud-Speicherdienst, was wirklich cool ist! Aber je tiefer ich verstehe, desto mehr entdecke ich seine Probleme.

## Probleme von Valine

### Nicht Open Source

Der Autor pusht nur die kompilierten Dateien ab Version `1.4.0` in das GitHub-Repository, und der Quellcode wird nicht mehr aktualisiert. Vielleicht hat der Autor ein gebrochenes Herz in Open Source. Für Benutzer wie mich, die das Projekt hinzufügen oder ändern möchten, ist dieses Problem etwas unangenehm.

### XSS

Seit der sehr frühen Version haben Benutzer über Valines XSS-Probleme berichtet, und die Community verwendet auch verschiedene Methoden, um diese Probleme zu beheben. Einschließlich der Hinzufügung von Verifizierungscodes, Frontend-XSS-Filterung und anderen Methoden. Der Autor erkannte jedoch später, dass alle Frontend-Überprüfungen nur den Gentleman verhindern können, sodass die Einschränkung wie der Verifizierungscode entfernt wurde.

Jetzt wird beim Frontend-Veröffentlichen eines Kommentars Markdown in HTML konvertiert und dann eine XSS-Filterfunktion im Frontend ausgeführt, bevor es an LeanCloud übermittelt wird. Nach dem Abrufen der Daten von LeanCloud wird es direkt in das DOM eingefügt. Offensichtlich ist der Prozess problematisch. Solange das HTML direkt übermittelt wird und direkt angezeigt wird, nachdem das HTML abgerufen wurde, kann XSS nicht grundlegend ausgemerzt werden.

::: note Grundlegende Lösung

Bei gespeicherten XSS-Angriffen können wir HTML-Codes maskieren, um sie dauerhaft zu lösen. Genau wie beim alten BBCode wird nur Markdown-Inhalt an die Datenbank übermittelt. Das Frontend liest den Inhalt und codiert alle HTML, bevor es nach der Markdown-Konvertierung angezeigt wird.

```js
function encodeForHTML(str) {
  return ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

Da Valine ein Serverless-System ist, können Angreifer direkt die Speicherstufe erreichen. Alle Vorsichtsmaßnahmen vor der Datenspeicherung sind ungültig und können nur während des Anzeigeprozesses verarbeitet werden. Da alle HTML nach dem Maskieren nicht mehr geparst werden können, können wir sicherstellen, dass das konvertierte HTML keine Chance hat, eingefügt zu werden.

Da Valine nicht mehr Open Source ist, können keine Pull-Requests geöffnet werden.

:::

Da die obige Methode Benutzer vollständig im Bereich von Markdown einschränkt, fügt Waline seit `0.15.0` `DOMPurify` auf der Client-Seite hinzu, um XSS zu verhindern. Neben der regulären XSS-Sterilisation:

- `<form>` und `<input>` sind deaktiviert
- Style-Injection ist deaktiviert
- Autoplay der Medien ist deaktiviert
- Alle externen Links werden verarbeitet und in einem neuen Fenster mit rel von `noopener noreferrer` geöffnet.

### Datenschutzverletzung

Neben dem direkten Zugriff auf den Speicher kann der Angreifer auch jede Daten direkt lesen. Wenn ein Datenbankfeld Leseberechtigungen für alle hat, ist der Inhalt des Feldes für den Angreifer vollständig transparent.

In den Kommentardaten enthalten die beiden Felder IP und Mailbox die sensiblen Daten des Benutzers. Herr Deng hat einen Artikel speziell geschrieben, um das Problem zu kritisieren [Bitte stoppen Sie die Verwendung des Valine.js-Kommentarsystems sofort, es sei denn, es behebt die Datenschutzverletzung durch Benutzer](https://ttys3.net/post/hugo/please-stop-using-valine-js-comment-system-until-it-fixed-the-privacy-leaking-problem/). Selbst als die [JueJin](https://juejin.cn)-Community in früheren Jahren LeanCloud verwendete, wurde das Sicherheitsproblem der [offengelegten Handynummer des Benutzers](https://m.weibo.cn/detail/4568007327622344?cid=4568044392682999) aufgedeckt.

Um dieses Problem zu umgehen, hat der Autor von Valine die Konfiguration `recordIP` hinzugefügt, um festzulegen, ob die Aufzeichnung der Benutzer-IP zulässig ist. Da es keinen Server gibt, kann es nur gelöst werden, indem der Wert nicht gespeichert wird.

Es gibt immer noch ein Problem mit dieser Option: Ob IP aufgezeichnet wird, basiert auf der Konfiguration des Website-Eigentümers, während Kommentatoren kein Recht haben, ihre eigene Privatsphäre zu verwalten.

Das Durchsickern der E-Mail-Adresse ist ein weiteres großes Datenschutzproblem. Es ist vollständig machbar, das md5 der E-Mail des Benutzers im Frontend zu berechnen und zu melden, um den Gravatar-Avatar zu erhalten. Aber wenn eine E-Mail-Benachrichtigung gesendet werden muss, wenn ein Kommentar beantwortet wird, ist es unvermeidlich, den ursprünglichen Wert der E-Mail-Adresse des Benutzers zu speichern. Dieses Problem kann theoretisch durch RSA-Verschlüsselung gelöst werden. Der private Schlüssel kann in der Umgebungsvariable von LeanCloud gespeichert werden. Der Client meldet sowohl das E-Mail-md5 als auch die vom öffentlichen Schlüssel verschlüsselte E-Mail. Wenn LeanCloud E-Mail-Benachrichtigungen senden möchte, liest es den privaten Schlüssel in der Umgebung in der Cloud-Funktion und entschlüsselt dann, um die Benutzer-E-Mail zu erhalten. Angesichts der Größe und Leistung der Frontend-RSA-Verschlüsselungsbibliothek ist es jedoch nicht praktikabel. Das Hinzufügen einer Serverebene zum Filtern sensibler Informationen über die Serverseite ist definitiv eine bessere Praxis.

### Manipulation der Lesestatistik

Valine 1.2.0 fügt die Funktion der Artikellesestatistik hinzu. Der Benutzer besucht die Seite und zeichnet die Anzahl der Besuche nach der URL in der Zählertabelle im Hintergrund auf. Da die Daten jedes Mal aktualisiert werden müssen, wenn auf die Seite zugegriffen wird, müssen die Berechtigungen auf beschreibbar gesetzt werden, um nachfolgende Feldaktualisierungen durchzuführen. Dies schafft ein Problem. Tatsächlich können die Daten auf jeden Wert aktualisiert werden. Wenn Sie daran interessiert sind, können Sie die offizielle Website <https://valine.js.org/visitor.html> öffnen und die Konsole eingeben und den folgenden Code eingeben, um es auszuprobieren. Denken Sie daran, die Nummer nach dem Versuch zurückzuändern~

```js
const counter = new AV.Query('Counter');
const resp = await counter.equalTo('url', '/visitor.html').find();
resp[0].set('time', -100000).save();
location.reload();
```

Glücklicherweise ist der Wert des Feldes `time` vom Typ Number, sodass andere Werte nicht eingefügt werden können. Wenn das Feld `time` vom Typ String wäre, könnte es eine XSS-Schwachstelle sein. Eine mögliche Lösung für dieses Problem ist, nicht die kumulative Speichermethode zu verwenden. Geändert, um einen schreibgeschützten Zugriffsdatensatz für jeden Besuch zu speichern und die Methode `count()` für Statistiken beim Lesen zu verwenden. Auf diese Weise sind alle Daten schreibgeschützt, was das Problem der Manipulation löst. Diese Lösung hat auch ein Problem: Wenn die Datenmenge relativ groß ist, verursacht sie einen gewissen Druck auf die Abfrage.

Wenn es auf dem Verbleiben der ursprünglichen Daten basiert, kann nur eine Serverebene hinzugefügt werden, um die Änderungsberechtigungen zu isolieren.

## Geburt von Waline

Aufgrund der oben genannten Gründe wurde Waline geboren. Das ursprüngliche Ziel von Waline war es nur, Backend zu Valine hinzuzufügen, aber da Valine nicht Open Source ist, kann es nur mit dem Frontend implementiert werden. Natürlich haben viele Codes und Logik des Frontends Valine referenziert, um mit der Konfiguration von Valine konsistent zu sein. Sogar im Namen des Projekts habe ich es von Valine abgeleitet, damit jeder verstehen kann, dass dieses Projekt ein Derivat von Valine ist.

Neben der Lösung der oben genannten Sicherheitsprobleme implementiert die Hinzufügung der Serverseite viele Funktionen, die zuvor durch keine Serverseite eingeschränkt waren, einschließlich E-Mail-Benachrichtigungen, Spam-Kommentarfilterung usw.
