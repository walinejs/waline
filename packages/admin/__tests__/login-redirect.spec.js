import { describe, expect, it } from 'vitest';

import { getAdminRedirect } from '../src/utils/login-redirect.js';

const origin = 'https://example.com';

describe('admin login return path', () => {
  it('keeps a router-relative admin path for deployments under a prefix', () => {
    expect(getAdminRedirect('/ui/profile?tab=settings#account', origin)).toBe(
      '/ui/profile?tab=settings#account',
    );
    expect(getAdminRedirect('/ui', origin)).toBe('/ui');
  });

  it.each(['//example.com/ui', '/other', '/uix', '/ui/../other', '/ui/%2e%2e/other'])(
    'rejects %s as an admin return path',
    (path) => {
      expect(getAdminRedirect(path, origin)).toBeNull();
    },
  );
});
