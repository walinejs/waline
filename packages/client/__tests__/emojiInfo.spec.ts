import { describe, expect, it, vi } from 'vitest';

import { getEmojisInfo } from '../src/utils/emoji.js';

const emojiInfo = {
  name: 'Test',
  icon: 'icon.png',
  items: ['a', 'b'],
};

describe(getEmojisInfo, () => {
  it('keeps available presets when one preset fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockReturnValue(undefined);

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(Response.json(emojiInfo)),
    );

    const result = await getEmojisInfo([
      'https://emoji.example/broken',
      'https://emoji.example/ok',
    ]);

    vi.unstubAllGlobals();
    consoleError.mockRestore();

    expect(result).toStrictEqual({
      tabs: [
        {
          name: 'Test',
          icon: 'https://emoji.example/ok/icon.png',
          items: ['a', 'b'],
        },
      ],
      map: {
        a: 'https://emoji.example/ok/a',
        b: 'https://emoji.example/ok/b',
      },
    });
  });

  it('returns an empty config when no preset is configured', async () => {
    await expect(getEmojisInfo(null)).resolves.toStrictEqual({ tabs: [], map: {} });
  });
});
