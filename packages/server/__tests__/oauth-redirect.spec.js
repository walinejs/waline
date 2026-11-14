/* oxlint-disable unicorn/prefer-string-raw, eslint/no-script-url */
import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const validate = require('../src/utils/oauth-redirect.js');
const config = { serverUrl: 'https://server.example/api', secureDomains: ['blog.example'] };

describe('oauth redirect destinations', () => {
  it.each([
    'https://attacker.example',
    '//attacker.example',
    '/\\attacker.example',
    'javascript:alert(1)',
    'https://blog.example.attacker.example',
    'https://user@blog.example',
    'https://blog.example:8443',
  ])('rejects %s', (url) => {
    expect(validate(url, config)).toBeNull();
  });

  it.each(['/ui/profile', 'https://server.example/ui/profile', 'https://blog.example/callback'])(
    'allows trusted destination %s',
    (url) => {
      expect(validate(url, config)).toBe(url);
    },
  );

  it('does not trust an external origin when configuration is absent', () => {
    expect(validate('https://attacker.example')).toBeNull();
  });
});
