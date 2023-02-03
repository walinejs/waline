import { load } from 'recaptcha-v3';

import type { ReCaptchaInstance as TurnstileInstance } from 'recaptcha-v3';

const turnstileStore: Record<string, Promise<TurnstileInstance>> = {};

interface Turnstile {
  execute: (action: string) => Promise<string>;
}

export const useTurnstile = (key: string): Turnstile => {
  const init = (turnstileStore[key] ??= load(key, {
    customUrl:
      'https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha',
    autoHideBadge: true,
  }));

  return {
    execute: (action: string) =>
      init.then((instance) => instance.execute(action)),
  };
};
