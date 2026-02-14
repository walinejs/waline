---
title: Vercel-Bereitstellung
icon: vercel
order: 1
---

Wir haben das Paket `@waline/vercel` als Serverpaket veröffentlicht. Die Vercel-Bereitstellung ist auch unsere am meisten empfohlene Methode.

<!-- more -->

## Wie bereitstellen

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Klicken Sie auf die blaue Schaltfläche oben, Sie werden zu Vercel weitergeleitet, um mit der Waline-Vorlage bereitzustellen.

   ::: note

   Wenn Sie noch nicht angemeldet sind, empfehlen wir Ihnen, sich mit GitHub anzumelden.

   :::

1. Geben Sie Ihren Vercel-Projektnamen ein und klicken Sie dann auf `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Das Repo, das Sie zuvor benannt haben, wird von Vercel automatisch basierend auf der Waline-Beispielvorlage erstellt und initialisiert.

   ![new project](../../../assets/vercel-2.png)

   Nach ein oder zwei Minuten sollte Vercel die Bereitstellung abgeschlossen haben. Klicken Sie auf die Schaltfläche `Go to Dashboard`, um zum Anwendungs-Dashboard weiterzuleiten.

   ![dashboard](../../../assets/vercel-3.png)

## Datenbank erstellen

1. Klicken Sie oben auf `Storage`, um die Speicherdienst-Seite aufzurufen, wählen Sie `Create Database`. Wählen Sie unter `Marketplace Database Providers` `Neon` aus und klicken Sie dann auf `Continue`.

   ![storage](../../../assets/vercel-4.png)

1. Sie werden aufgefordert, ein Neon-Konto zu erstellen. Wählen Sie `Accept and Create`. Wählen Sie als Nächstes die Datenbankkonfiguration aus, einschließlich Region und Quota. Sie können die Standardeinstellungen beibehalten und auf `Continue` klicken.

   ![neon](../../../assets/vercel-5.png)

1. Definieren Sie den Datenbanknamen. Sie können die Standardeinstellung beibehalten und auf `Continue` klicken.

   ![neon](../../../assets/vercel-6.png)

1. Jetzt wird die Datenbank unter `Storage` angezeigt. Klicken Sie darauf und wählen Sie `Open in Neon`, um zu Neon zu springen. Wählen Sie in Neon auf der linken Seite `SQL Editor`, fügen Sie das SQL aus [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) in den Editor ein und klicken Sie auf `Run`, um Tabellen zu erstellen.

   ![neon](../../../assets/vercel-7.png)

   ![neon](../../../assets/vercel-8.png)

1. Nach kurzer Zeit sollten Sie eine Erfolgsmeldung sehen. Gehen Sie zurück zu Vercel, klicken Sie auf `Deployments` und dann auf `Redeploy` bei der letzten Bereitstellung, damit die neue Datenbankkonfiguration wirksam wird.

   ![redeploy success](../../../assets/vercel-9.png)

1. Vercel wird zu `Overview` weitergeleitet und beginnt mit der Bereitstellung. Wenn `STATUS` `Ready` wird, klicken Sie auf `Visit`, um die bereitgestellte Site zu öffnen. Diese URL ist Ihre Serveradresse.

   ![visit](../../../assets/vercel-10.png)

## Domain zuweisen

1. Klicken Sie auf <kbd>Settings</kbd> - <kbd>Domains</kbd>, um zur Domain-Einstellungsseite zu gelangen.

1. Geben Sie die Domain ein, die Sie zuweisen möchten, und klicken Sie auf die Schaltfläche <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-11.png)

1. Fügen Sie einen neuen `CNAME`-Eintrag in Ihrem Domain-Dienstserver hinzu.

   | Typ   | Name    | Wert                 |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. Sie können Ihre eigene Domain verwenden, um Waline zu besuchen, nachdem sie wirksam geworden ist. :tada:
   - Kommentarsystem: example.your-domain.com
   - Admin-Panel: example.your-domain.com/ui

   ![success](../../../assets/vercel-12.png)

## HTML-Import

Richten Sie wie folgt auf Ihrer Webseite ein:

1. Importieren Sie Waline-Stile von `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Erstellen Sie ein `<script>`-Tag, das `init()` von `https://unpkg.com/@waline/client@v3/dist/waline.js` verwendet, und übergeben Sie die erforderlichen Optionen `el` und `serverURL`.
   - `el` ist das Element, das zum Rendern von Waline verwendet wird. Es kann eine CSS-Selektorzeichenfolge oder ein HTMLElement sein.
   - `serverURL` ist Ihre im vorherigen Schritt erhaltene Serveradresse.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Kommentar-Admin

1. Besuchen Sie nach der Bereitstellung `<serverURL>/ui/register`, um sich zu registrieren. Der erste registrierte Benutzer wird zum Administrator.
2. Nach der Anmeldung kann der Administrator Kommentare verwalten: bearbeiten, markieren oder löschen.
3. Benutzer können sich auch über das Kommentarfeld registrieren. Nach der Anmeldung werden sie zu ihrer Profilseite weitergeleitet.
