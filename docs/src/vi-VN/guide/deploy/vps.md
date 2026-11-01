---
title: Tự triển khai
icon: server
order: -1
---

Nếu bạn không muốn triển khai máy chủ trên Vercel, bạn cũng có thể chọn triển khai trên máy chủ của riêng mình.

<!-- more -->

## Triển khai bằng Docker

```bash
docker run -d \
  -p 8360:8360 \
  lizheming/waline
```

Đây là một ví dụ minh họa cách chạy Waline. Bạn còn cần thêm một số biến môi trường cơ sở dữ liệu nếu muốn mọi chức năng bình luận hoạt động tốt.

::: tip Làm thế nào để build image?

```bash
git clone https://github.com/lizheming/waline.git
cd waline
docker build -t lizheming/waline -f packages/server/Dockerfile .
```

:::

### qua [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/) hoặc [docker-compose](https://github.com/docker/compose)

Ở đây sử dụng SQLite làm ví dụ. Về SQLite và các dịch vụ cơ sở dữ liệu được hỗ trợ, vui lòng tham khảo [Hỗ trợ nhiều dịch vụ cơ sở dữ liệu](../database.md#sqlite).

Ví dụ `docker-compose.yml` cho `waline`:

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

## Chạy trực tiếp (khuyên dùng)

Rất dễ để chạy mà không cần dùng Docker: sau khi đặt biến môi trường, chỉ cần chạy tệp `vanilla.js` trong mô-đun sau khi cài đặt.

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

## Cấu hình Nginx

Nếu bạn không muốn dùng cổng trong URL máy chủ, bạn có thể dùng Nginx proxy pass sang 80 và 443. Tham khảo cấu hình sau:

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
