import { describe, expect, it } from 'vitest';

import { REACTION_STORAGE_KEY } from '../src/composables/reaction.js';
import { STAR_STORAGE_KEY } from '../src/composables/star.js';

describe('comment vote storage', () => {
  it('keeps article reactions and star ratings in separate storage keys', () => {
    expect(REACTION_STORAGE_KEY).not.toBe(STAR_STORAGE_KEY);
  });
});
