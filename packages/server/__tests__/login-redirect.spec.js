import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const controllerExtension = require('../src/extend/controller.js');

const validateLoginRedirect = (redirectUrl, config = {}) =>
  controllerExtension.validateLoginRedirect.call(
    {
      config: (key) => config[key],
      ctx: {},
    },
    redirectUrl,
  );

describe('validateLoginRedirect', () => {
  it('returns the original redirect when no allowlist is configured', () => {
    expect(validateLoginRedirect('https://evil.example.com/callback')).toBe(
      'https://evil.example.com/callback',
    );
    expect(validateLoginRedirect('/ui/profile')).toBe('/ui/profile');
    expect(validateLoginRedirect()).toBeUndefined();
  });

  it('allows complete http and https URLs from configured origins', () => {
    expect(
      validateLoginRedirect('https://blog.example.com/callback?foo=bar', {
        loginRedirectAllowlist: ['https://blog.example.com'],
      }),
    ).toBe('https://blog.example.com/callback?foo=bar');

    expect(
      validateLoginRedirect('http://localhost:5173/ui/profile', {
        loginRedirectAllowlist: ['http://localhost:5173'],
      }),
    ).toBe('http://localhost:5173/ui/profile');
  });

  it('returns non-complete redirects even when an allowlist is configured', () => {
    expect(
      validateLoginRedirect('/ui/profile', {
        loginRedirectAllowlist: ['https://blog.example.com'],
      }),
    ).toBe('/ui/profile');

    expect(
      validateLoginRedirect('not a url', {
        loginRedirectAllowlist: ['https://blog.example.com'],
      }),
    ).toBe('not a url');
  });

  it('throws for complete URLs that fail allowlist validation', () => {
    const config = { loginRedirectAllowlist: ['https://blog.example.com'] };
    const javascriptUrl = 'java' + 'script:alert(1)';

    for (const redirect of [
      'https://evil.example.com/callback',
      'https://blog.example.com.evil.com/callback',
      'https://blog.example.com@evil.example.com/callback',
      'https:\\evil.example.com/callback',
      javascriptUrl,
      'data:text/html;base64,PHNjcmlwdD4=',
    ]) {
      expect(() => validateLoginRedirect(redirect, config)).toThrow(
        'Invalid login redirect URL.',
      );
    }
  });

  it('throws for ambiguous or header-unsafe redirects when an allowlist is configured', () => {
    const config = { loginRedirectAllowlist: ['https://blog.example.com'] };

    for (const redirect of [
      '//evil.example.com/callback',
      '\\evil.example.com/callback',
      '/\\evil.example.com/callback',
      '\\/evil.example.com/callback',
      ' https://blog.example.com/callback',
      'https://blog.example.com/callback ',
      'https://blog.example.com/callback\nnext',
    ]) {
      expect(() => validateLoginRedirect(redirect, config)).toThrow(
        'Invalid login redirect URL.',
      );
    }
  });
});
