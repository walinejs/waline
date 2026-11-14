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

  if (
    (typeof value !== 'number' && typeof value !== 'string') ||
    (typeof value === 'string' && !/^\d+$/u.test(value))
  ) {
    badRequest({ rule: 'int', max });
  }
  const result = Number(value);

  if (!Number.isSafeInteger(result) || result < 1 || result > max) {
    badRequest({ rule: 'int', max });
  }

  return result;
};

export const requiredCapability = <T>(value: T | undefined, name: string): T =>
  value ?? capability(name);

export const levelFor = (levels: number[], count?: number): number => {
  let result = 0;

  if (!count) {
    return result;
  }

  for (let index = 0; index < levels.length; index += 1) {
    if (levels[index] <= count) result = index;
  }

  return result;
};

export const optionalString = (value: unknown, field: string): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') badRequest({ field, rule: 'string' });
  return value as string;
};

export const stringList = (value: unknown, field: string): string[] => {
  if (value === undefined || value === '') return [];
  const items = typeof value === 'string' ? value.split(',') : value;
  if (!Array.isArray(items) || !items.every((item) => typeof item === 'string')) {
    badRequest({ field, rule: 'stringArray' });
  }
  return items as string[];
};

export const requiredRecord = (value: unknown, field: string): void => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    badRequest({ field, rule: 'object' });
  }
};

export const emailString = (value: unknown): string => {
  const email = requiredString(value, 'email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) badRequest({ field: 'email', rule: 'email' });
  return email;
};
