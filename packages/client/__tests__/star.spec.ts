import { describe, expect, it } from 'vitest';

import { clampScore, getInitialScore, normalizeDistribution } from '../src/widgets/star/utils.js';

describe(clampScore, () => {
  it('returns 0 for NaN', () => {
    expect(clampScore(Number.NaN)).toBe(0);
  });

  it('rounds and clamps scores to 0-5', () => {
    expect(clampScore(-1)).toBe(0);
    expect(clampScore(1.4)).toBe(1);
    expect(clampScore(3.6)).toBe(4);
    expect(clampScore(10)).toBe(5);
  });
});

describe(getInitialScore, () => {
  it('returns 0 when the user has not rated yet', () => {
    expect(getInitialScore()).toBe(0);
    expect(getInitialScore(undefined)).toBe(0);
  });

  it('maps a stored 0-based index to the 1-based score', () => {
    expect(getInitialScore(0)).toBe(1);
    expect(getInitialScore(3)).toBe(4);
    expect(getInitialScore(4)).toBe(5);
  });

  it('clamps out-of-range stored values', () => {
    expect(getInitialScore(-2)).toBe(0);
    expect(getInitialScore(9)).toBe(5);
  });
});

describe(normalizeDistribution, () => {
  it('always returns five non-negative numbers', () => {
    expect(normalizeDistribution()).toStrictEqual([0, 0, 0, 0, 0]);
    expect(
      normalizeDistribution([1, undefined, -2, Number.NaN, 3] as unknown as number[]),
    ).toStrictEqual([1, 0, 0, 0, 3]);
  });
});
