import { describe, expect, it } from 'vitest';

import akismet from '../src/service/akismet';

describe('server startup', () => {
  it('exports an akismet helper compatible with the service loader', () => {
    expect(akismet).toBeTypeOf('function');
    expect(() => {
      akismet.prototype.__filename =
        '/tmp/workspace/walinejs/waline/packages/server/src/service/akismet.js';
    }).not.toThrow();
  });
});
