import { badRequest, capability } from '../error.js';

export const requiredString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || value.length === 0) badRequest({ field, rule: 'required' });

  return value as string;
};

export const positiveInt = (
  value: unknown,
  fallback: number,
  max = Number.MAX_SAFE_INTEGER,
): number => {
  if (value === undefined) return fallback;

  const result = Number(value);

  if (!Number.isInteger(result) || result < 1 || result > max) {
    badRequest({ rule: 'int', max });
  }

  return result;
};

export const requiredCapability = <T>(value: T | undefined, name: string): T =>
  value ?? capability(name);

export const levelFor = (levels: number[], count: number): number => {
  let result = 0;

  for (let index = 0; index < levels.length; index += 1) {
    if (levels[index] <= count) result = index;
  }

  return result;
};
