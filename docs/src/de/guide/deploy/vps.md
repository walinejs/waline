---
title: Selbst hosten
icon: server
order: -1
---

Wenn Sie den Server nicht auf Vercel bereitstellen möchten, können Sie auch wählen, auf Ihrem eigenen Server bereitzustellen.

<!-- more -->

## Docker-Bereitstellung

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

Dies ist eine Demo für das Ausführen von Waline. Sie müssen auch einige Datenbankumgebungsvariablen hinzufügen, wenn Sie möchten, dass alle Kommentarfunktionen ordnungsgemäß funktionieren.

::: tip Wie erstelle ich ein Image?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### über [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) oder [docker-compose](https://github.com/docker/compose)

SQLite wird hier als Beispiel verwendet. Für SQLite und unterstützte Datenbankdienste siehe [Multi-Datenbankdienst-Unterstützung](../database.md#sqlite).

Beispiel `docker-compose.yml` für `waline`:

```yaml
# docker-compose.yml
version: '3'

services:
  waline:
    container_name: waline
    image: lizheming/waline:latest
    restart: always
    ports:
      - 127.0.0.1:8360:8360
    volumes:
      - ${PWD}/data:/app/data
    environment:
      TZ: 'Asia/Shanghai'
      SQLITE_PATH: '/app/data'
      JWT_TOKEN: 'Your token'
      SITE_NAME: 'Your site name'
      SITE_URL: 'https://example.com'
      SECURE_DOMAINS: 'example.com'
      AUTHOR_EMAIL: 'mail@example.com'
```

## Direkt ausführen (Empfohlen)

Es ist einfach, ohne Docker-Bereitstellung auszuführen. Nach dem Festlegen der Umgebungsvariablen führen Sie einfach die Datei `vanilla.js` im Modul nach der Installation aus.

::: code-tabs#shell

@tab npm

```bash
npm install @waline/vercel
node node_modules/@waline/vercel/vanilla.js
```

@tab yarn

```bash
yarn add @waline/vercel
node node_modules/@waline/vercel/vanilla.js
```

:::

## Nginx-Konfiguration

Wenn Sie keinen Port in der Server-URL verwenden möchten, können Sie Nginx-Proxy-Pass zu 80 und 443 verwenden. Siehe die folgende Konfiguration:

```nginx
server
{
  listen 80;
  listen 443 ssl http2;
  server_name your.domain.server.name;
  root /www/wwwroot/your.domain.server.name;
  if ($server_port !~ 443){
    rewrite ^(/.*)$ https://$host$1 permanent;
  }

  # SSL-Einstellung
  ssl_certificate fullchain.pem;
  ssl_certificate_key privkey.pem;
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
  ssl_prefer_server_ciphers on;
  ssl_session_cache shared:SSL:10m;
  ssl_session_timeout 10m;
  add_header Strict-Transport-Security "max-age=31536000";

  # Proxy zu 8360
  location / {
    proxy_pass http://127.0.0.1:8360;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header REMOTE-HOST $remote_addr;
    add_header X-Cache $upstream_cache_status;
    # Cache
    add_header Cache-Control no-cache;
    expires 12h;
  }
}
```
