---
title: Datenbank auf TiDB erstellen
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) ist eine Open-Source-NewSQL-Datenbank. [TiDB Cloud](https://tidbcloud.com/) ist die offizielle Online-Version, die jedem 5 GB kostenlosen Speicherplatz zur Verfügung stellt. Im Folgenden wird beschrieben, wie Sie eine Waline-Datenbank auf TiDB Cloud erstellen.

## Datenbank erstellen

1. Nach der Anmeldung bei [TiDB Cloud](https://tidbcloud.com) wird automatisch eine TiDB-Instanz erstellt. Klicken Sie direkt auf <kbd>cluster0</kbd>, um die Instanz aufzurufen

   ![Enter instance](../../../assets/tidb-1.png)

2. Wählen Sie <kbd>Chat2Query</kbd> in der Liste auf der linken Seite aus und ändern Sie den Inhalt von [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) in `;` Die Verteilung der Anweisungen wird nahe an der Schnittstelle ausgeführt. Klicken Sie für jeden Satz auf die blaue Schaltfläche <kbd>Run</kbd> oben rechts oder verwenden Sie die Tastenkombination <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd> zum Ausführen
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

Bisher wurde die Waline-Datenbank erstellt!

## Verbindungskonfiguration abrufen

Klicken Sie links auf die Schaltfläche <kbd>Overview</kbd>, um die Startseite aufzurufen, und wählen Sie oben rechts <kbd>Connect</kbd> aus, um Verbindungsinformationen abzurufen.

Wählen Sie unter "Connect with" die Option `Allgemein`. Außerdem müssen Sie in der nächsten Zeile auf <kbd>Passwort zurücksetzen</kbd> klicken, um ein neues Passwort zu generieren.

Auf diese Weise können Sie die Konfiguration im Zusammenhang mit der Verbindung abrufen.

![Verbindungskonfiguration abrufen](../../assets/tidb-7.png)

## Vercel-Bereitstellung

Erstellen Sie ein Vercel-Konto, erstellen Sie ein Projekt und stellen Sie den Waline-Dienst bereit. Klicken Sie dann im Menü auf der linken Seite auf <kbd>Einstellungen</kbd>, suchen Sie die Konfigurationsoption `Umgebungsvariablen`, klicken Sie auf die Schaltfläche <kbd>Umgebungsvariable hinzufügen</kbd> oben rechts und geben Sie nacheinander die Parameterinformationen für `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` und `TIDB_PASSWORD` ein. Danach können Sie den Dienst erneut bereitstellen.

![TiDB-Datenbankverbindung konfigurieren](../../assets/tidb-8.png)