---
title: Dokploy Deployment
icon: docker
---

[Dokploy](https://dokploy.com/) is an open-source deployment platform that can deploy Waline with Docker Compose.

<!-- more -->

## How to Deploy

Create a <kbd>Compose</kbd> service in Dokploy, then copy the [Dokploy Compose template](https://github.com/walinejs/waline/blob/main/packages/server/docker-compose.dokploy.yml) into its <kbd>Compose</kbd> configuration.

Set the following environment variables under <kbd>Environment</kbd>:

| Variable | Description |
| --- | --- |
| `JWT_TOKEN` | A random string used to sign login tokens. Use a strong random value and keep it secret. |
| `SITE_NAME` | Your site name. |
| `SITE_URL` | Your site URL, for example `https://example.com`. |
| `SECURE_DOMAINS` | Domains permitted to access the Waline server, for example `example.com`. |
| `AUTHOR_EMAIL` | Administrator email address. |
| `TZ` | Time zone, for example `Asia/Shanghai`. |

Under <kbd>Domains</kbd>, add a domain for the `waline` service with port `8360`, then deploy the service.

The template uses the `waline-data` Docker volume to persist the SQLite database. Do not delete this volume, or existing comment data will be lost.
