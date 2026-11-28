import { describe, expect, it, vi } from 'vitest';

import { userAgent } from '../src/utils/userAgent.js';

const windowsUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

describe(userAgent, () => {
  it('returns the basic user agent when high entropy values are unavailable', async () => {
    vi.stubGlobal('navigator', {
      userAgent: windowsUserAgent,
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: () => Promise.reject(new Error('Not allowed')),
      },
    });

    await expect(userAgent()).resolves.toBe(windowsUserAgent);

    vi.unstubAllGlobals();
  });

  it('uses the platform version when available', async () => {
    vi.stubGlobal('navigator', {
      userAgent: windowsUserAgent,
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: () => Promise.resolve({ platformVersion: '15.0.0' }),
      },
    });

    await expect(userAgent()).resolves.toBe('Mozilla/5.0 (Windows NT 11.0; Win64; x64)');

    vi.unstubAllGlobals();
  });

  it('returns the basic user agent when client hints are not supported', async () => {
    vi.stubGlobal('navigator', { userAgent: windowsUserAgent });

    await expect(userAgent()).resolves.toBe(windowsUserAgent);

    vi.unstubAllGlobals();
  });
});
