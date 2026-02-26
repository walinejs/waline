import { useScriptTag } from '@vueuse/core';

interface ReCaptchaWindow {
  ready: (fn: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
}

interface TurnstileWindow {
  ready: (fn: () => void) => void;
  render: (selector: string, options?: TurnstileOptions) => void;
}

declare global {
  interface Window {
    grecaptcha?: ReCaptchaWindow;
    turnstile?: TurnstileWindow;
  }
}

export interface CaptchaResult {
  provider: string;
  token: string;
}

export interface CaptchaAdapter {
  execute: (action: string) => Promise<CaptchaResult>;
}

const recaptchaScriptStore: Record<string, Promise<void>> = {};

const loadRecaptcha = (siteKey: string): Promise<void> =>
  (recaptchaScriptStore[siteKey] ??= (async () => {
    const { load } = useScriptTag(
      `https://recaptcha.net/recaptcha/api.js?render=${siteKey}`,
      undefined,
      { async: true },
    );

    await load();
  })());

export const createRecaptchaAdapter = (siteKey: string): CaptchaAdapter => ({
  execute: async (action: string) => {
    await loadRecaptcha(siteKey);

    return new Promise((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        void window.grecaptcha
          ?.execute(siteKey, { action })
          .then((token) => {
            resolve({ provider: 'recaptchaV3', token });
          })
          .catch((err: unknown) => {
            reject(err);
          });
      });

      if (!window.grecaptcha)
        reject(new Error('Recaptcha script is not available, please check your site key.'));
    });
  },
});

export const createTurnstileAdapter = (siteKey: string): CaptchaAdapter => ({
  execute: async (action: string) => {
    const { load } = useScriptTag(
      'https://challenges.cloudflare.com/turnstile/v0/api.js',
      undefined,
      { async: false },
    );

    await load();

    return new Promise((resolve, reject) => {
      window.turnstile?.ready(() => {
        window.turnstile?.render('.wl-captcha-container', {
          sitekey: siteKey,
          action,
          size: 'compact',
          callback: (token) => {
            resolve({ provider: 'turnstile', token });
          },
        });
      });

      if (!window.turnstile)
        reject(new Error('Turnstile script is not available, please check your site key.'));
    });
  },
});
