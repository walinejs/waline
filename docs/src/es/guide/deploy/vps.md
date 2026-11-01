---
title: Autoalojamiento
icon: server
order: -1
---

Si no quieres desplegar el servidor en Vercel, también puedes desplegarlo en tu propio servidor.

<!-- more -->

## Despliegue con Docker

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

Este es un ejemplo de cómo ejecutar Waline. También tienes que añadir las variables de entorno de la base de datos si quieres que todas las funciones de comentarios funcionen correctamente.

::: tip ¿Cómo construir la imagen?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### con [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) o [docker-compose](https://github.com/docker/compose)

Aquí se usa SQLite como ejemplo. Para SQLite y los servicios de base de datos compatibles, consulta [Soporte para múltiples servicios de base de datos](../database.md#sqlite).

Ejemplo de `docker-compose.yml` para `waline`:

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

## Ejecutar directamente (recomendado)

Ejecutarlo sin usar Docker es sencillo: después de configurar las variables de entorno, solo tienes que ejecutar el archivo `vanilla.js` del módulo una vez instalado.

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

## Configuración de Nginx

Si no quieres usar un puerto en la URL del servidor, puedes usar el proxy de Nginx hacia los puertos 80 y 443. Consulta la siguiente configuración:

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
