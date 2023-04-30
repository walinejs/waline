import { useScriptTag } from '@vueuse/core';

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
}
interface TurnstileInstance {
  ready: (fn: () => void) => void;
  render: (className: string, options?: TurnstileOptions) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

interface Turnstile {
  execute: (action: string) => Promise<string>;
}

export const useTurnstile = (key: string): Turnstile => {
  const execute = (action: string): Promise<string> =>
    new Promise((resolve) => {
      useScriptTag(
        'https://challenges.cloudflare.com/turnstile/v0/api.js',
        () => {
          const turnstile = window?.turnstile;

          const options: TurnstileOptions = {
            sitekey: key,
            action,
            size: 'compact',
            callback(token: string): void {
              resolve(token);
            },
          };

          turnstile?.ready(() =>
            turnstile?.render('.wl-captcha-container', options)
          );
        },
        {
          async: false,
        }
      );
    });

  return { execute };
};
