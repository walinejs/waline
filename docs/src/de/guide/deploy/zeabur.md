---
title: Zeabur-Bereitstellung
icon: zeabur
---

[Zeabur](https://zeabur.com) ist eine Plattform, die Entwicklern hilft, ihre eigenen Dienste mit einem Klick bereitzustellen. Das Ganze ist ähnlich wie Railway, aber es hat mehr Funktionen als es, keine Notwendigkeit, eine Kreditkarte zu binden, und das kostenlose Limit ist höher als es.

<!-- more -->

## Mit einem Klick bereitstellen

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/1IBY26?utm_source=waline)

## Von Grund auf bereitstellen

Klicken Sie auf die Schaltfläche [Fork](https://github.com/walinejs/zeabur-starter/fork), um ein Zeabur-Startgerüst zu erstellen.

![zeabur1](../../../assets/zeabur-1.png)

<https://dash.zeabur.com> Melden Sie sich bei der Zeabur-Konsole an. Wenn es kein Projekt gibt, müssen Sie zuerst einen Namen für das neue Projekt festlegen.

![zeabur2](../../../assets/zeabur-2.png)

Klicken Sie nach dem Eintreten auf <kbd>Add New Service</kbd>, um einen Dienst zu erstellen, wählen Sie <kbd>Deploy Other Service</kbd> - <kbd>Deploy MongoDB</kbd>, um zuerst einen Datenbankdienst zu erstellen.

Geben Sie unserem MongoDB-Datenbankdienst einen Namen, klicken Sie auf die Schaltfläche <kbd>Deploy</kbd>, und unser Datenbankdienst wird bereitgestellt.

![zeabur2](../../../assets/zeabur-3.png) ![zeabur4](../../../assets/zeabur-4.png)

Als Nächstes klicken wir weiter auf <kbd>Add New Service</kbd>, um den Waline-Dienst zu erstellen. Diesmal wählen wir, auf <kbd>Deploy Your Source Code</kbd> zu klicken. Suchen Sie in der folgenden GitHub-Projektliste das Projekt, das wir am Anfang geforkt haben, und klicken Sie auf die entsprechende Schaltfläche <kbd>Import</kbd>.

Geben Sie unserem Waline-Dienst einen Namen, klicken Sie auf die Schaltfläche <kbd>Deploy</kbd>, und unser Waline-Dienst wird bereitgestellt.

![zeabur6](../../../assets/zeabur-6.png) ![zeabur7](../../../assets/zeabur-7.png)

Schließen Sie das Waline-Dienstpanel nicht zu schnell. Nachdem der Dienst bereitgestellt wurde, müssen wir dem Dienst einen Zugriffs-Domainnamen hinzufügen. Klicken Sie unter der Registerkarte <kbd>Domains</kbd> auf die Schaltfläche <kbd>Generate Domain</kbd>, geben Sie das gewünschte Domainname-Präfix ein und klicken Sie auf die Schaltfläche <kbd>Save</kbd>, um es unserem Dienst hinzuzufügen. Besuchen Sie den Domainnamen.

![zeabur8](../../../assets/zeabur-8.png) ![zeabur9](../../../assets/zeabur-9.png)

Alles ist bereit, und der nächste Schritt ist, das Wunder zu bezeugen. Öffnen Sie den Zugriffs-Domainnamen, den wir gerade eingerichtet haben, testen Sie das Veröffentlichen von Kommentaren, alles ist erfolgreich~ Als Nächstes konfigurieren Sie diesen Domainnamen im Client, und Sie können fröhlich kommentieren!

![zeabur2](../../../assets/zeabur-10.png)

## Aktualisierung

Gehen Sie zum GitHub-Repository und ändern Sie die Versionsnummer von `@waline/vercel` in der Datei package.json auf die neueste Version.

## Umgebungsvariablen ändern

Sie können über die Registerkarte <kbd>Variables</kbd> die Verwaltungsseite für Umgebungsvariablen aufrufen, und es wird nach der Änderung automatisch erneut bereitgestellt.

![zeabur11](../../../assets/zeabur-11.png)
