import { describe, expect, it, vi } from 'vitest';

describe('server config', () => {
  it('maps LIKE_INC_MAX from the environment to likeIncMax', () => {
    vi.stubEnv('SQLITE_PATH', '/tmp/waline-config-test.sqlite');
    vi.stubEnv('LIKE_INC_MAX', '7');
    vi.stubGlobal('think', { env: 'development' });

    try {
      // The config module reads process.env when it is first required.
      expect(require('../src/config/config.js').likeIncMax).toBe(7);
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
    }
  });
});
