---
title: セルフホスト
icon: server
order: -1
---

Vercelでサーバーをデプロイしたくない場合は、自前のサーバーにデプロイすることもできます。

<!-- more -->

## Dockerでのデプロイ

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

Walineを実行するためのデモです。コメント機能をすべて正常に動作させるには、データベース関連の環境変数も追加する必要があります。

::: tip イメージのビルド方法は？

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/)または[docker-compose](https://github.com/docker/compose)を使用する

ここではSQLiteを例として使用します。SQLiteおよびサポートされているデータベースサービスについては、[複数データベースサービスのサポート](../database.md#sqlite)を参照してください。

`waline`用の`docker-compose.yml`の例：

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

## 直接実行する（推奨）

Dockerを使わずにデプロイするのは簡単です。環境変数を設定した後、インストールしたモジュール内の`vanilla.js`ファイルを実行するだけです。

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

## Nginxの設定

サーバーURLにポートを含めたくない場合は、Nginxで80と443にプロキシできます。以下の設定を参照してください：

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
