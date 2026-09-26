---
title: Eigene Emoji-Vorlagen erstellen
icon: emoji
---

Dieses Kochbuch zeigt Ihnen, wie Sie Ihre eigenen Emoji-Vorlagen erstellen und verwenden.

<!-- more -->

## Erstellen Sie Ihre eigenen Vorlagen

Zunächst müssen Sie einige Emoji-Bilder vorbereiten. Folgen Sie dann den Schritten, um Ihre Vorlage zu erstellen.

### Benennen Sie das Emoji und laden Sie es hoch

Der Einfachheit halber verwendet Waline direkt den Namen des Emoji-Bildes als Schlüssel des Emojis. Das bedeutet, dass, wenn Sie zwei verschiedene Vorlagen importieren und beide ein laugh.png-Bild enthalten, beide Emotes demselben Emoji `:laugh:` entsprechen.

Daher ist die Best Practice, dass jeder Emoji-Vorlagen-Ersteller allen Namen in Emoji-Dateien ein vorlagennamenbezogenes Präfix hinzufügen sollte.

Nachdem Sie sie entsprechend benannt haben, müssen Sie sie auf Ihren Server hochladen.

### Vorlageninformationen schreiben

Wir gehen davon aus, dass Sie einige Emoji-Bilder im folgenden Verzeichnis abgelegt haben:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

An diesem Punkt müssen Sie auch eine `info.json`-Datei für diesen Ordner erstellen, um Waline mitzuteilen, welche Emojis die Emoji-Vorlagen enthalten.

Lassen Sie uns zunächst einen Namen für die Emoji-Vorlage festlegen, z. B. `My Emoji`. Da Sie das Präfix `my_` für das Bild festgelegt haben und die Dateien im `png`-Format vorliegen, müssen Sie dies in `info.json` hinzufügen.

Ihre `info.json` kann sein:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

Listen Sie dann alle Emoji-Namen in `items` in der gewünschten Reihenfolge auf. Denken Sie daran, das Präfix und Suffix zu ignorieren, die Sie in `prefix` und `type` festgelegt haben.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

Wählen Sie danach ein repräsentatives Emoji als Symbol aus, das in der Registerkarte angezeigt wird:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

Damit sind Sie mit dem Schreiben von `info.json` fertig. Bitte laden Sie es in denselben Ordner hoch.

Sie haben jetzt erfolgreich eine `my-emoji`-Vorlage mit `https://example.com/my-emoji/` erstellt.

## GitHub-Spiegel mit Tags verwenden

Normalerweise finden Sie es möglicherweise etwas umständlich, Ihren eigenen Domainnamen zu haben und Bilder auf den Domainnamen hochzuladen, und der Link kann im Laufe der Zeit ablaufen. Ein fortgeschrittener Ansatz besteht daher darin, ein GitHub-Repository zu verwenden und die Tag-Funktion in Git zu verwenden, um das GitHub-Repo zu spiegeln und eine Emoji-Vorlage bereitzustellen.

Ähnlich wie bei den obigen Schritten müssen Sie ein neues GitHub-Repository erstellen, das Emoji wie oben benennen, `info.json` mit denselben Schritten erstellen und in das Repository hochladen.

Erstellen Sie dann ein Tag für das Repository zu diesem Zeitpunkt. Wir empfehlen, es im Format `vx.x.x` festzulegen, z. B. `v1.0.0`.

Nachdem Sie Tags hinzugefügt haben, können Sie den CDN-Link mit der Version auf [cdn.jsdelivr.net](https://www.jsdelivr.com/) als Ihre Vorlage verwenden, im Format `https://cdn.jsdelivr.net/gh/user/repo@version/file`.

Wir gehen davon aus, dass Sie das Repository `example/emoji` erstellt haben, die Emoji-Bilder und `info.json` direkt hochgeladen haben und das Tag `v1.0.0` erstellt haben. Dann können Sie `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` als Ihre Vorlage verwenden.

::: tip

Es ist notwendig, ein Tag mit Link anzugeben, um zu verhindern, dass der Bildlink, auf den der historische Kommentar verweist, durch Änderungen an Ihrer Vorlage ungültig wird.

Die offizielle Emoji-Vorlage wird durch Erstellen des Repositorys [walinejs/emojis](https://github.com/walinejs/emojis) und Verwendung des CDN-Links erreicht. Derzeit verwenden wir die Version `v1.1.0`.

:::

::: warning

Da cdn.jsdelivr.net in China verschmutzt ist, können Sie `cdn.jsdelivr.net` durch `gcore.jsdelivr.net` ersetzen.

:::
