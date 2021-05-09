# Independent deployment

If you don't want to deploy the server on Vercel, you can also choose to deploy on your own server.

## Docker Deploy

```bash
docker run -d \
  -e LEAN_ID=xxx \
  -e LEAN_KEY=xxx \
  -e LEAN_SERVER=https://xxx.com \
  -p 8360:8360 \
  lizheming/waline
```

`LEAN_ID` and `LEAN_KEY` correspond to the App Id and App Key obtained in the background respectively. If you are not a LeanCloud International version user, you need to bind the registered domain name in the background and configure `LEAN_SERVER`.

::: tip How to build image?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### via [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) or [docker-compose](https://github.com/docker/compose)

The SQLite is used here as an example. For SQLite and supported database services, please refer to [Multi-database service support](https://waline.js.org/en/server/databases.html#sqlite).

Example `docker-compose.yml` for `waline`:

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

## Run directly

It's easy to run without using docker deployment, just run the `vanilla.js` file in the module after installing.

```bash
npm install @waline/vercel
node node_modules/@waline/vercel/vanilla.js
```

## Nginx config

If you don't want to use port in server url, you can use Nginx proxy pass to 80 and 443. Refer to the following configuration:

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
