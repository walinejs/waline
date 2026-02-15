---
title: 자체 호스팅
icon: server
order: -1
---

서버를 Vercel에 배포하고 싶지 않다면, 자체 서버에 배포할 수도 있습니다.

<!-- more -->

## Docker 배포

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

이것은 waline을 실행하는 방법에 대한 데모입니다. 모든 댓글 기능이 정상적으로 작동하려면 데이터베이스 환경 변수도 추가해야 합니다.

::: tip 이미지를 빌드하는 방법은?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 또는 [docker-compose](https://github.com/docker/compose) 사용

여기서는 SQLite를 예시로 사용합니다. SQLite 및 지원되는 데이터베이스 서비스에 대해서는 [다중 데이터베이스 서비스 지원](../database.md#sqlite)을 참고하세요.

`waline`을 위한 `docker-compose.yml` 예시:

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

## 직접 실행 (권장)

Docker 배포를 사용하지 않고도 쉽게 실행할 수 있습니다. 환경 변수를 설정한 후, 모듈을 설치하고 `vanilla.js` 파일을 실행하면 됩니다.

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

## Nginx 설정

서버 URL에 포트를 사용하고 싶지 않다면, Nginx 프록시 패스를 사용하여 80 및 443 포트로 전달할 수 있습니다. 다음 설정을 참고하세요:

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
