/* oxlint-disable unicorn/max-nested-calls, import/no-named-as-default-member, eslint/no-bitwise, eslint/no-plusplus, eslint/curly, typescript/explicit-function-return-type, typescript/no-non-null-assertion, typescript/no-misused-spread, typescript/require-await, typescript/no-unnecessary-type-conversion, typescript/no-unsafe-return */
import type { WalineServices } from '@waline/core';
import bcrypt from 'bcryptjs';
import md5 from 'md5';

import type { WalineWorkerBindings } from './types.js';

const encoder = new TextEncoder();
const asBuffer = (value: Uint8Array): ArrayBuffer =>
  value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer;
const base64Url = (value: Uint8Array): string => {
  let binary = '';
  for (const byte of value) binary += String.fromCodePoint(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
};
const decodeBase64Url = (value: string): Uint8Array => {
  const binary = atob(value.replaceAll('-', '+').replaceAll('_', '/'));
  return Uint8Array.from(binary, (character) => character.codePointAt(0) ?? 0);
};
const timingSafeEqual = (left: Uint8Array, right: Uint8Array): boolean => {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left[index] ^ right[index];
  return result === 0;
};
const phpassAlphabet = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const phpassEncode = (input: number[]): string => {
  let output = '';
  let index = 0;
  while (index < 16) {
    let value = input[index++];
    output += phpassAlphabet[value & 63];
    if (index < 16) value |= input[index] << 8;
    output += phpassAlphabet[(value >> 6) & 63];
    if (index++ >= 16) break;
    if (index < 16) value |= input[index] << 16;
    output += phpassAlphabet[(value >> 12) & 63];
    if (index++ >= 16) break;
    output += phpassAlphabet[(value >> 18) & 63];
  }
  return output;
};
const verifyPhpass = (password: string, encoded: string): boolean => {
  if (!encoded.startsWith('$P$') && !encoded.startsWith('$H$')) return false;
  const countLog2 = phpassAlphabet.indexOf(encoded[3]);
  if (countLog2 < 7 || countLog2 > 30) return false;
  const salt = encoded.slice(4, 12);
  if (salt.length !== 8) return false;
  const passwordBytes = [...encoder.encode(password)];
  let digest = md5([...encoder.encode(salt), ...passwordBytes], { asBytes: true });
  for (let count = 1 << countLog2; count > 0; count -= 1) {
    digest = md5([...digest, ...passwordBytes], { asBytes: true });
  }
  return encoded.slice(0, 34) === `${encoded.slice(0, 12)}${phpassEncode(digest)}`;
};
const hmac = async (secret: string, value: string, hash: 'SHA-1' | 'SHA-256' = 'SHA-256') => {
  const key = await crypto.subtle.importKey(
    'raw',
    asBuffer(encoder.encode(secret)),
    { name: 'HMAC', hash },
    false,
    ['sign'],
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
};

const tokenService = (secret?: string): NonNullable<WalineServices['token']> => ({
  async sign(subject) {
    if (!secret) throw new Error('JWT_TOKEN is required for authentication');
    const header = base64Url(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
    const payload = base64Url(
      encoder.encode(JSON.stringify({ sub: subject, iat: Math.floor(Date.now() / 1000) })),
    );
    return `${header}.${payload}.${base64Url(await hmac(secret, `${header}.${payload}`))}`;
  },
  async verify(token) {
    if (!secret) throw new Error('JWT_TOKEN is required for authentication');
    const [header, payload, signature] = token.split('.');
    if (
      !header ||
      !payload ||
      !signature ||
      !timingSafeEqual(await hmac(secret, `${header}.${payload}`), decodeBase64Url(signature))
    )
      throw new Error('Invalid token');
    const decoded = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as {
      sub?: string;
    };
    if (!decoded.sub) throw new Error('Invalid token subject');
    return decoded.sub;
  },
});

const passwordService: NonNullable<WalineServices['password']> = {
  async hash(value) {
    return bcrypt.hash(value, 10);
  },
  async verify(value, encoded) {
    if (encoded.startsWith('$P$') || encoded.startsWith('$H$')) return verifyPhpass(value, encoded);
    if (/^\$2[aby]\$/u.test(encoded)) return bcrypt.compare(value, encoded);
    const [, marker, iterations, salt, expected] = encoded.split('$');
    if (marker !== 'waline' || !iterations || !salt || !expected) return false;
    const key = await crypto.subtle.importKey(
      'raw',
      asBuffer(encoder.encode(value)),
      'PBKDF2',
      false,
      ['deriveBits'],
    );
    const digest = new Uint8Array(
      await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          hash: 'SHA-256',
          salt: asBuffer(decodeBase64Url(salt)),
          iterations: Number(iterations),
        },
        key,
        256,
      ),
    );
    return timingSafeEqual(digest, decodeBase64Url(expected));
  },
};

const base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const decodeBase32 = (value: string): Uint8Array => {
  const bits = [...value.replaceAll('=', '').toUpperCase()]
    .map((char) => base32.indexOf(char).toString(2).padStart(5, '0'))
    .join('');
  return Uint8Array.from(bits.match(/.{8}/gu) ?? [], (byte) => Number.parseInt(byte, 2));
};
const encodeBase32 = (value: Uint8Array): string => {
  const bits = [...value].map((byte) => byte.toString(2).padStart(8, '0')).join('');
  return (bits.match(/.{1,5}/gu) ?? [])
    .map((part) => base32[Number.parseInt(part.padEnd(5, '0'), 2)])
    .join('');
};
const otp = async (secret: string, counter: number): Promise<string> => {
  const buffer = new Uint8Array(8);
  new DataView(buffer.buffer).setBigUint64(0, BigInt(counter));
  const key = await crypto.subtle.importKey(
    'raw',
    asBuffer(decodeBase32(secret)),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );
  const digest = new Uint8Array(await crypto.subtle.sign('HMAC', key, buffer));
  const offset = digest.at(-1)! & 15;
  const number =
    (((digest[offset] & 127) << 24) |
      (digest[offset + 1] << 16) |
      (digest[offset + 2] << 8) |
      digest[offset + 3]) %
    1_000_000;
  return String(number).padStart(6, '0');
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
const renderMarkdown = (value: string): string =>
  `<p>${escapeHtml(value)
    .replaceAll(/\n{2,}/gu, '</p><p>')
    .replaceAll('\n', '<br>')}</p>`;

export const createDefaultServices = (bindings: WalineWorkerBindings): WalineServices => ({
  token: tokenService(typeof bindings.JWT_TOKEN === 'string' ? bindings.JWT_TOKEN : undefined),
  password: passwordService,
  twoFactor: {
    async create(email) {
      const secret = encodeBase32(crypto.getRandomValues(new Uint8Array(20)));
      return {
        secret,
        otpauth_url: `otpauth://totp/waline_${encodeURIComponent(email ?? 'user')}?secret=${secret}`,
      };
    },
    async verify(secret, code) {
      const current = Math.floor(Date.now() / 30_000);
      return (
        await Promise.all([-2, -1, 0, 1, 2].map((offset) => otp(secret, current + offset)))
      ).includes(code);
    },
  },
  markdown: { render: renderMarkdown },
  avatar: {
    stringify(value) {
      if (typeof value.avatar === 'string' && value.avatar) return value.avatar;
      const nick = 'nick' in value ? value.nick : value.display_name;
      const mail = 'mail' in value ? value.mail : value.email;
      if (typeof nick === 'string' && /^\d+$/u.test(nick))
        return `https://q1.qlogo.cn/g?b=qq&nk=${encodeURIComponent(nick)}&s=100`;
      if (typeof mail === 'string' && /^\d+@qq\.com$/iu.test(mail))
        return `https://q1.qlogo.cn/g?b=qq&nk=${encodeURIComponent(mail.replace(/@qq\.com$/iu, ''))}&s=100`;
      return typeof mail === 'string'
        ? `https://seccdn.libravatar.org/avatar/${md5(mail.trim().toLowerCase())}`
        : '';
    },
  },
  userAgent: {
    parse(value = '') {
      const browser = /(?:Chrome|CriOS)\/(?<version>[\d.]+)/u.exec(value)?.groups?.version;
      const firefox = /Firefox\/(?<version>[\d.]+)/u.exec(value)?.groups?.version;
      const safari = /Version\/(?<version>[\d.]+).*Safari/u.exec(value)?.groups?.version;
      return {
        browser: browser
          ? { name: 'Chrome', version: browser }
          : firefox
            ? { name: 'Firefox', version: firefox }
            : safari
              ? { name: 'Safari', version: safari }
              : {},
        os: {},
      };
    },
  },
  captcha: {
    async verify(input, context) {
      const data = input as { turnstile?: string; recaptchaV3?: string } | undefined;
      const turnstile =
        typeof bindings.TURNSTILE_SECRET === 'string' ? bindings.TURNSTILE_SECRET : undefined;
      const recaptcha =
        typeof bindings.RECAPTCHA_V3_SECRET === 'string' ? bindings.RECAPTCHA_V3_SECRET : undefined;
      if (!turnstile && !recaptcha) return true;
      const secret = turnstile ?? recaptcha!;
      const response = data?.[turnstile ? 'turnstile' : 'recaptchaV3'];
      if (!response) return false;
      const body = new URLSearchParams({ secret, response, remoteip: context.ip ?? '' });
      const endpoint = turnstile
        ? 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        : 'https://recaptcha.net/recaptcha/api/siteverify';
      const result = (await fetch(endpoint, { method: 'POST', body }).then((item) =>
        item.json(),
      )) as { success?: boolean };
      return result.success === true;
    },
  },
  oauth: {
    async authorize(input) {
      const endpoint = new URL(
        `${String(bindings.OAUTH_URL ?? 'https://oauth.lithub.cc').replace(/\/$/u, '')}/${input.type}`,
      );
      endpoint.searchParams.set('code', input.code);
      if (input.state) endpoint.searchParams.set('state', input.state);
      return fetch(endpoint, { headers: { 'user-agent': '@waline/worker' } }).then((response) =>
        response.json(),
      );
    },
  },
  fetch,
});
