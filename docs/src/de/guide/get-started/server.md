---
title: Server-Einführung
icon: server
order: 2
---

## Bereitstellung

Neben der kostenlosen Bereitstellung auf Vercel können Sie über Docker oder direkt in einer selbst gehosteten Umgebung sowie auf anderen gängigen Cloud-Plattformen bereitstellen. Weitere Informationen finden Sie unter:

- [Eigenständige Bereitstellung](../deploy/vps.md)

- [Railway](../deploy/railway.md)

- [Alibaba Cloud Compute Nest](../deploy/aliyun-computenest.md)

## Unterstützung für mehrere Datenbanken

Waline unterstützt eine Vielzahl von Datenbanken, einschließlich MySQL, PostgreSQL, SQLite und MongoDB.

Sie müssen nur die Umgebungsvariablen der entsprechenden Datenbank konfigurieren, und Waline wechselt automatisch zum entsprechenden Datenspeicherdienst.

Siehe [Unterstützung für mehrere Datenbanken](../database.md) für weitere Details.

## Konfiguration

Die meisten Konfigurationen auf der Serverseite können über Umgebungsvariablen vorgenommen werden, und Sie können auch einige erweiterte Optionen in der Haupteingabedatei konfigurieren.

Weitere Informationen zur Konfiguration finden Sie unter [Server-Referenz → Umgebungsvariablen](../../reference/server/env.md) und [Server-Referenz → Konfiguration](../../reference/server/config.md).

## Kommentarbenachrichtigung

Wir unterstützen mehrere Möglichkeiten, Sie oder Ihre Kommentatoren zu benachrichtigen, wenn jemand kommentiert oder antwortet. Siehe [Kommentarbenachrichtigungen](../features/notification.md) für weitere Details.

## Benutzerkontoregistrierung und Social Login

Waline unterstützt die In-App-Kontoerstellung und Social Login mit GitHub, Twitter und Facebook.

::: tip

Bleiben Sie dran: Wir planen, in zukünftigen Versionen mehr Social-Application-Unterstützung hinzuzufügen.

:::
