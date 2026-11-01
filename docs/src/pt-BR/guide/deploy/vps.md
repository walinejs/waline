---
title: Auto-hospedagem
icon: server
order: -1
---

Se você não quiser implantar o servidor no Vercel, também pode optar por implantá-lo em um servidor próprio.

<!-- more -->

## Implantação com Docker

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

É um exemplo de como executar o Waline. Você também precisa adicionar algumas variáveis de ambiente de banco de dados se quiser que todas as funcionalidades de comentários funcionem corretamente.

::: tip Como criar a imagem?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### via [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) ou [docker-compose](https://github.com/docker/compose)

O SQLite é usado aqui como exemplo. Para o SQLite e os demais serviços de banco de dados suportados, consulte [Suporte a múltiplos bancos de dados](../database.md#sqlite).

Exemplo de `docker-compose.yml` para o `waline`:

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

## Execução direta (recomendado)

É fácil executar sem usar a implantação com Docker: depois de definir as variáveis de ambiente, basta executar o arquivo `vanilla.js` do módulo após a instalação.

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

## Configuração do Nginx

Se você não quiser usar porta na URL do servidor, pode usar o proxy do Nginx para as portas 80 e 443. Consulte a configuração a seguir:

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
