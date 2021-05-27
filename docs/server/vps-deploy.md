# 独立部署

如果你不想将服务端部署在 Vercel 上的话，你也可以选择部署在自己的服务器上。

## Docker 部署

```bash
docker run -d \
  -e LEAN_ID=xxx \
  -e LEAN_KEY=xxx \
  -e LEAN_SERVER=https://xxx.com \
  -p 8360:8360 \
  lizheming/waline
```

`LEAN_ID` 和 `LEAN_KEY` 分别对应的是后台得到的 App Id 和 App Key。如果非 LeanCloud 国际版用户的话需要在后台绑定已备案域名并配置 `LEAN_SERVER`。

::: tip 如何构建镜像？

```bash
git clone https://github.com/walinejs/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### 使用 [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 或者 [docker-compose](https://github.com/docker/compose)

这里使用了 SQLite 数据库作为例子。关于 SQLite 和支持的数据库服务，请参考[多数据库服务支持](https://waline.js.org/server/databases.html#sqlite)。

`docker-compose.yml` 示例:

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

## 直接运行（推荐）

不使用容器部署的话运行也很简单，安装好模块后直接运行模块内的 `vanilla.js` 文件即可。

```bash
npm install @waline/vercel
node node_modules/@waline/vercel/vanilla.js
```

## Nginx 配置

如果你不想带端口访问的话，可以增加 Nginx 80 和 443 端口的反代。可参考如下配置:

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
