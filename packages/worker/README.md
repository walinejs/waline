# `@waline/worker`

Waline server for Web Runtime environments. It uses [Hono](https://hono.dev/) for HTTP handling and delegates business rules to `@waline/core`.

## Cloudflare Workers with D1

```ts
import { createWalineWorker } from '@waline/worker';
import type { D1Database } from '@waline/worker';

interface Env {
  DB: D1Database;
  JWT_TOKEN: string;
}

export default createWalineWorker<Env>();
```

Bind a D1 database as `DB`, apply `node_modules/@waline/worker/migrations/0001_initial.sql` with Wrangler, and configure a strong `JWT_TOKEN` secret.

## Other Web Runtime platforms

Provide the framework-neutral model contract when D1 bindings are unavailable:

```ts
import type { WalineModels } from '@waline/core';
import { createWalineWorker } from '@waline/worker';

interface Bindings {
  models: WalineModels;
}

const app = createWalineWorker({
  models: ({ bindings }) => bindings.models,
  services: {
    notification: myNotificationService,
    spam: mySpamService,
  },
});

export default app.fetch;
```

On Vercel, pass environment variables to the Fetch handler explicitly:

```ts
export default (request: Request) => app.fetch(request, { JWT_TOKEN: process.env.JWT_TOKEN });
```

`models`, `config`, `services`, `hooks`, and `logger` can be values or per-request resolver functions. Resolvers receive `{ bindings, context, request }`.

The package includes Worker-safe authentication, TOTP, basic safe Markdown, OAuth, Turnstile/reCAPTCHA and the Waline dashboard shell. Email, advanced notification, spam detection, region lookup and advanced Markdown can be added through the corresponding `@waline/core` service interfaces.

## Environment bindings

The common `@waline/vercel` options `JWT_TOKEN`, `SECURE_DOMAINS`, `SITE_NAME`, `SITE_URL`, `OAUTH_URL`, `LOGIN`, `COMMENT_AUDIT`, `LEVELS`, `TURNSTILE_*`, `RECAPTCHA_V3_*`, and `WALINE_ADMIN_MODULE_ASSET_URL` are recognized as Worker bindings.
