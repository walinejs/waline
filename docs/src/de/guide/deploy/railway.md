---
title: Railway-Bereitstellung
icon: railway
---

[Railway](https://railway.app/) ist eine kostenlose Serverless-Plattform, auf der wir Waline einfach bereitstellen können.

<!-- more -->

## Wie bereitstellen

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Klicken Sie auf diese Schaltfläche, und Sie werden zur Railway.app-Plattform weitergeleitet, um schnell bereitzustellen. Sie können Ihren neuen GitHub-Repo-Namen eingeben oder nach dem Login einfach die Standardeinstellung verwenden und dann unten auf die Schaltfläche <kbd>Deploy</kbd> klicken, um bereitzustellen. Sie sollten beachten, dass der Teil der Umgebungsvariablen nicht geändert werden sollte.

![railway1](../../../assets/railway-1.jpg)

Nach einem Moment werden Sie zur Dashboard-Seite weitergeleitet. Klicken Sie auf <kbd>PostgreSQL</kbd> - <kbd>Query</kbd> und fügen Sie den Inhalt der Datei [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) in den Textbereich ein. Klicken Sie dann unten auf die Schaltfläche <kbd>Run Query</kbd>, um die Datenbank zu initialisieren.

![railway2](../../../assets/railway-2.jpg)

Zuletzt können Sie auf <kbd>Deployments</kbd> - <kbd>Domains</kbd> klicken, um die Server-URL zu erhalten. Kopieren Sie die Site-URL und geben Sie sie in die Client-Konfiguration `serverURL` ein. Dann können Sie Waline genießen!

![railway3](../../../assets/railway-3.jpg)

## Aktualisierung

Gehen Sie zum entsprechenden GitHub-Repository und ändern Sie die Versionsnummer von `@waline/vercel` in der Datei package.json auf die neueste.

## Umgebungsvariablen ändern

Klicken Sie auf die Registerkarte <kbd>Variables</kbd>, um zur Verwaltungsseite für Umgebungsvariablen zu gelangen. Es wird automatisch bereitgestellt, nachdem die Variable geändert wurde.

![railway4](../../../assets/railway-4.jpg)
