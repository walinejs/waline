---
title: FAQ
icon: faq
order: 4
---

Waline hat seit seiner Geburt eine sehr klare Position:

::: info Ein einfaches Kommentarsystem mit Backend.

:::

Alle später veröffentlichten Versionen sind Änderungen, die sich um diese Position drehen.

## Was ist die Beziehung zu Valine?

::: info Waline = With backend Valine

:::

In Anlehnung an die Open-Source-Version von Valine wurde die Kommentarliste im Frontend mit React neu geschrieben. Der Stil und die Struktur sowie einige interne Tools und Methoden stammen alle von Valine.

## Muss ich noch Valine-Admin auf LeanCloud bereitstellen?

Nein. Waline ist eine Drei-in-Eins-Bereitstellung aus Datenspeicherung, Server und Client. Die Serverschnittstelle entspricht bereits der LeanCloud Cloud Engine von Valine. Der Server enthält bereits Kommentarverwaltung und E-Mail-Benachrichtigungsfunktionen, die zuvor von der Cloud Engine bereitgestellt wurden. Er benötigt keine zusätzliche LeanCloud Cloud Engine und wird daher nicht durch die Sleep-Strategie der LeanCloud Cloud Engine eingeschränkt.

## Wie kann ich aktualisieren?

Waline besteht hauptsächlich aus zwei Teilen: dem Frontend und dem Server.

### Frontend

Das Frontend fügt Kommentarlisten und Kommentarfelder ein, indem JS-Skripte in die Webseite eingebunden werden. In den meisten Szenarien verwendet der Link die Adresse der neuesten Version des Online-CDN, und die neueste Version wird automatisch angewendet, ohne dass Benutzer manuell aktualisieren müssen.

::: note Manuelle Aktualisierung erforderlich in folgenden Situationen

1. Die Versionsnummer wird in der CDN-Adresse zwangsweise angegeben. In dieser Situation müssen Sie die Versionsnummer manuell auf die neueste ändern.
1. Verwenden Sie NPM, um das Modul zu benötigen und in den Code zu packen. In dieser Situation müssen Sie die Versionsnummer in der Abhängigkeit ändern, um sicherzustellen, dass die neueste Version der Abhängigkeit während der Installation abgerufen werden kann.

:::

### Server

Der Server bezieht sich auf den Backend-Dienst, der der im Frontend-Skript konfigurierten `serverURL` entspricht, und seine Aktualisierung wird je nach Bereitstellungsumgebung leicht unterschiedlich sein. Server-Updates erfolgen häufiger.

#### Vercel

Gehen Sie zum entsprechenden GitHub-Repository und ändern Sie die Versionsnummer von `@waline/vercel` in der package.json-Datei auf die neueste.

![vercel](./assets/vercel-update.png)

#### CloudBase

Geben Sie die Code-Bearbeitungsseite ein und klicken Sie auf <kbd>Speichern und Abhängigkeiten neu installieren</kbd>. Wenn es immer noch nicht funktioniert, geben Sie <kbd>Meine Anwendung</kbd> ein und wählen Sie <kbd>Bereitstellen</kbd>, um erneut bereitzustellen.

::: caution

Eine erneute Bereitstellung löscht die vorherigen Dateien. Wenn es eine Konfiguration in der vorherigen Datei gibt, muss sie zuerst gesichert werden.

:::

![cloudBase](./assets/cloudbase-update.jpg)

#### Docker

Führen Sie direkt `docker pull lizheming/waline` aus, um das neueste Image zu ziehen.

## Warum ist das Posten von Kommentaren langsam?

Aus einigen technischen Gründen sind Spam-Erkennung und Kommentarbenachrichtigung alle seriellen Operationen beim Posten von Kommentaren. Die Spam-Erkennung verwendet den von Akismet im Ausland bereitgestellten Dienst, dessen Zugriff möglicherweise langsam ist. Benutzer können die Spam-Erkennungsfunktion über die Umgebungsvariable `AKISMET_KEY=false` deaktivieren. Neben dem Spam-Erkennungsdienst kann auch die E-Mail-Benachrichtigung in der Kommentarbenachrichtigung zu einem Timeout führen. Sie können die Kommentarbenachrichtigung deaktivieren, um zu testen, ob dies die Ursache ist.
