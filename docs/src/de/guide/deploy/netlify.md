---
title: Netlify-Bereitstellung
icon: netlify
---

[Netlify](https://netlify.com) ist ein bekannter Anbieter für die Bereitstellung statischer Websites, und [Edge Functions](https://www.netlify.com/blog/edge-functions-explained/) ist ein von Netlify gestarteter Dienst, mit dem JavaScript-Code auf Edge-Knoten von Websites ausgeführt werden kann.

<!-- more -->

## Wie bereitstellen

Klicken Sie auf die Schaltfläche [Fork](https://github.com/walinejs/netlify-starter/fork), um ein Netlify-Startgerüst zu erstellen.

![netlify](../../../assets/netlify-1.png)

<https://app.netlify.com> Melden Sie sich bei der Netlify-Konsole an, wählen Sie <kbd>Add new site</kbd> - <kbd>Import an exist project</kbd>, um die Site hinzuzufügen. Wählen Sie GitHub Certified aus, um unsere Liste der GitHub-Projekte zu lesen. Durchsuchen Sie die Liste nach dem Warehouse-Namen, der gerade von Fork generiert wurde, und klicken Sie auf das Projekt, um unsere Netlify-Website basierend auf diesem Warehouse zu erstellen.

![netlify](../../../assets/netlify-2.png) ![netlify](../../../assets/netlify-3.png)

Bevor wir eine Netlify-Website erstellen, müssen wir einige Konfigurationsinformationen eingeben. Neben Umgebungsvariablen können wir die Standardeinstellung für andere Informationen verwenden. Lesen Sie [Multi Database Support](../database.md), um die entsprechenden Speicherdienst-Umgebungsvariablen hinzuzufügen, und klicken Sie dann unten auf <kbd>Deploy site</kbd>, um mit der Bereitstellung der Site zu beginnen.

![netlify](../../../assets/netlify-4.png)

Nach einer Weile ist unsere Netlify-Website erfolgreich bereitgestellt. Wir können oben auf die Navigationsleiste <kbd>Functions</kbd> klicken, um zur Cloud-Funktionsliste zu wechseln, wobei `comment` unser bereitgestellter Waline-Dienst ist. Klicken Sie darauf, um die Detailseite der Cloud-Funktion aufzurufen.

![netlify](../../../assets/netlify-5.png)

Auf der Detailseite ist die unter `Endpoint` aufgeführte Adresse die Bereitstellungsadresse unseres Waline-Dienstes. Klicken Sie auf die Kopierschaltfläche rechts, öffnen Sie sie in einer neuen Registerkarte, testen Sie das Veröffentlichen von Kommentaren, und alles ist erfolgreich~ Konfigurieren Sie als Nächstes diesen Domainnamen im Client, und Sie können fröhlich kommentieren!

![netlify](../../../assets/netlify-6.png) ![netlify](../../../assets/netlify-8.png)

## Aktualisierung

Gehen Sie zum GitHub-Repository und ändern Sie die Versionsnummer von `@waline/vercel` in der Datei package.json auf die neueste Version.

## Umgebungsvariablen ändern

Klicken Sie oben auf die Navigationsleiste `Site settings`, wählen Sie die Seitenleiste `Environments variables` und rufen Sie die Verwaltungsseite für Umgebungsvariablen auf. Klicken Sie auf die Schaltfläche `Add a variable`, um eine Umgebungsvariable hinzuzufügen.

Nach dem Bearbeiten der Umgebungsvariablen müssen wir die Seite `Deploys` aufrufen, `Trigger deploy` - `Deploy site` auswählen, um die Website erneut bereitzustellen, damit die Umgebungsvariablen wirksam werden.

![netlify](../../../assets/netlify-9.png) ![netlify](../../../assets/netlify-10.png)
