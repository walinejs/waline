---
title: Самостоятельное развёртывание
icon: server
order: -1
---

Если вы не хотите развёртывать сервер на Vercel, можно развернуть его на собственном сервере.

<!-- more -->

## Развёртывание в Docker

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

Это демонстрационный пример запуска Waline. Чтобы все функции комментариев работали корректно, также нужно добавить переменные окружения базы данных.

::: tip Как собрать образ?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### через [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) или [docker-compose](https://github.com/docker/compose)

Здесь в качестве примера используется SQLite. Об SQLite и поддерживаемых базах данных см. в разделе [Поддержка нескольких баз данных](../database.md#sqlite).

Пример `docker-compose.yml` для `waline`:

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

## Прямой запуск (рекомендуется)

Запустить Waline можно и без Docker: после установки и настройки переменных окружения достаточно запустить файл `vanilla.js` из модуля.

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

## Конфигурация Nginx

Если вы не хотите указывать порт в URL сервера, можно настроить проксирование через Nginx на порты 80 и 443. См. конфигурацию ниже:

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

  # SSL setting
  ssl_certificate fullchain.pem;
  ssl_certificate_key privkey.pem;
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
  ssl_prefer_server_ciphers on;
  ssl_session_cache shared:SSL:10m;
  ssl_session_timeout 10m;
  add_header Strict-Transport-Security "max-age=31536000";

  # proxy to 8360
  location / {
    proxy_pass http://127.0.0.1:8360;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header REMOTE-HOST $remote_addr;
    add_header X-Cache $upstream_cache_status;
    # cache
    add_header Cache-Control no-cache;
    expires 12h;
  }
}
```
