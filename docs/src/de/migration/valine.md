---
title: Migration von Valine
icon: valine
---

1. Backend gemäß [Vercel Deploy](../guide/get-started/README.md#deploy-to-vercel-server) im Abschnitt _Get Started_ bereitstellen.

2. Frontend-Skripte gemäß [HTML](../guide/get-started/README.md#importing-in-html-client) im Abschnitt _Get Started_ ändern.

   ```diff
   - <script src='//unpkg.com/valine/dist/Valine.min.js'></script>
   + <script src='//unpkg.com/@waline/client@v2/dist/waline.js'></script>
   + <link href='//unpkg.com/@waline/client@v2/dist/waline.css' rel='stylesheet' />

     <script>
   -  new Valine({
   +  Waline.init({
       el: '#vcomments',
   -   appId: 'Your appId',
   -   appKey: 'Your appKey'
   +   serverURL: 'YOUR SERVER URL'
     });
     </script>
   ```

::: tip Konfiguration

Waline V2 hat die Valine-Unterstützung entfernt und zu einer besseren Konfiguration gewechselt. Das Folgende ist eine Migrationszusammenfassung einiger Optionen:

- `placeholder`: verwenden Sie `locales.placeholder`
- `highlight`: verwenden Sie `highlighter`
- `avatarForce`, `avatar`: verwenden Sie die Umgebungsvariable `AVATAR_PROXY` des Servers
- `recordIP`: zeigt die Benutzer-IP nicht mehr an und stellt die Umgebungsvariable `DISABLE_USERAGENT` auf dem Server bereit
- `requiredFields`: umbenannt in `requiredMeta`
- `langMode`: umbenannt in `locales`
- `emojiCDN`, `emojiMap`: verwenden Sie leistungsstärkere `emoji`-Optionen

Für die Waline-Konfiguration siehe [Client-Konfiguration](../reference/client/api.md). Sie können auch den [Waline-Client-V2-Migrationsleitfaden](./v2.md) ansehen, um mehr über die Optionen zu erfahren, die nicht mit Valine kompatibel sind.

:::

1. Daten migrieren

Wählen Sie im LeanCloud-Hintergrund <kbd>Import/Export</kbd> > <kbd>Limit to certain classes</kbd> > <kbd>Comment</kbd> > <kbd>Export</kbd>, und dann erhalten Sie eine E-Mail-Benachrichtigung.

Fügen Sie den Inhalt der Exportdatei in das Textfeld unten ein und klicken Sie auf die Schaltfläche "Konvertieren", um die zu importierende Datei zu erhalten.

<MigrationTool />

::: tip

Nachdem Sie die exportierte Datei über das obige Tool erhalten haben, können Sie sie in der entsprechenden Speicherdienstkonsole importieren.

:::

## Waline-Highlights

Im Vergleich zu Valine hat Waline die folgenden Highlights:

### Mehr Funktionen

1. Markdown unterstützt mehr Syntax, einschließlich Hoch- und Tiefstellung, Emoji, Tabellen, Durchstreichung, mathematische Formeln, HTML-Tags, Fußnoten usw.
1. Bild-Upload-Funktion, die angepassten Bildanbieterdienst ermöglicht oder Bilder direkt einbettet.
1. Das brandneue Label-System fügt Level-Labels für Benutzer entsprechend der Häufigkeit der Benutzerinteraktion hinzu und unterstützt benutzerdefinierte Labels für registrierte Benutzer.
1. Emoji-Presets und Tab-Unterstützung, die mehrere Emoji-Sets ermöglichen, während jeder Emoji-Presets veröffentlichen und verwenden kann.
1. Ein brandneues Reaktionssystem, das Besuchern ermöglicht, ihre Einstellung zum Artikel auszudrücken.
1. Kommentar-Likes, um Unterstützung für den Kommentar auszudrücken, den Sie mögen.
1. Seitenaufrufe, genaueres Anzeigen und Manipulationsschutz.
1. Emoji-Suche. Anpassbarer Dienst, der Benutzern ermöglicht, Emoticons frei zu suchen und einzufügen.
1. Unterstützung registrierter Benutzer zum Bearbeiten und Löschen ihrer veröffentlichten Kommentare.

### Sicherer

1. Null Datenschutzverletzung, wird keine Benutzer-Mailboxen, IP-Adressen und andere sensible Informationen offenlegen und kann wählen, Benutzer-Standort, Browser und Betriebssystem auf dem Server zu verbergen
1. Vollständiges Anti-Spam-System.

- Alle Kommentare können von Anti-Spam-Diensten authentifiziert werden und unterstützen zusätzliche Validierungslogik.
- Sie können das Kommentar-Geschwindigkeitslimit für eine einzelne IP oder einen einzelnen Benutzer festlegen, und Waline identifiziert automatisch doppelte Kommentare.

1. Kommentar-Prüfungsfunktion, in sensiblen Zeiten oder wenn die Website angegriffen wird, können Sie die Kommentar-Prüfung aktivieren, Kommentare manuell prüfen und die Anzeige von Kommentaren genehmigen und verhindern, dass bösartige Kommentare zur Schließung der Website führen.
1. Unterstützung von Benutzerkonten. Neben der Registrierung eines Kontos unterstützt Waline auch Social-Media-Konten, synchronisiert schnell Avatare und Nicknamen mit autorisiertem Label, um Identitätsbetrug zu verhindern.

### Bequemer

1. Verschiedene Methoden (QQ, WeChat, DingTalk, E-Mail) usw., um Blogger über Kommentare zu benachrichtigen
1. Leistungsstarker Verwaltungsdienst, Sie können alle Benutzer und Kommentare anzeigen und zugehörige Operationen durchführen und benutzerdefinierte Labels und Administratoren für Benutzer festlegen
1. Frontend-Verwaltung, Administratoren können Kommentare direkt über die Waline-Kommentarkomponente überprüfen, bearbeiten oder löschen.

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
