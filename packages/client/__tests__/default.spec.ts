import { describe, expect, it } from 'vitest';

import { DEFAULT_EMOJI, DEFAULT_REACTION } from '../src/config/default.js';

const MAJOR_VERSION_PATTERN = /@waline\/emojis@(?<major>\d+)\//u;

describe('default emoji assets', () => {
  it('pins the default emoji preset to a major version', () => {
    expect(DEFAULT_EMOJI.length).toBeGreaterThan(0);

    for (const preset of DEFAULT_EMOJI) expect(preset).toMatch(MAJOR_VERSION_PATTERN);
  });

  it('pins the default reaction images to the same major version', () => {
    expect(DEFAULT_REACTION.length).toBeGreaterThan(0);

    for (const reaction of DEFAULT_REACTION) expect(reaction).toMatch(MAJOR_VERSION_PATTERN);

    const majors = new Set(
      [...DEFAULT_EMOJI, ...DEFAULT_REACTION].map(
        (url) => MAJOR_VERSION_PATTERN.exec(url)?.groups?.major,
      ),
    );

    expect(majors).toStrictEqual(new Set(['1']));
  });
});
