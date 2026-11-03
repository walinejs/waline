import { createRequire } from 'node:module';

import { describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

describe('database adapter config', () => {
  it('should not log the PostgreSQL password on connect', () => {
    vi.stubEnv('PG_HOST', 'db.example.com');
    vi.stubEnv('PG_USER', 'waline');
    vi.stubEnv('PG_PASSWORD', 'super-secret-password');
    vi.stubEnv('PG_DB', 'waline');

    try {
      // The adapter config reads env vars when it's first required.
      const { model } = require('../src/config/adapter.js');
      const PostgresSocket = require('think-model-postgresql/lib/socket.js');

      const logger = vi.fn();
      // think-model merges `common` into the selected adapter's config.
      const socket = new PostgresSocket({ ...model.common, ...model.postgresql, logger });

      // Creating the pool is what triggers the connect log; it doesn't open a connection.
      void socket.pool;

      expect(logger.mock.calls.flat().join('\n')).not.toContain('super-secret-password');
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
