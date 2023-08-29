import { useScriptTag } from '@vueuse/core';

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
}
interface TurnstileInstance {
  ready: (fn: () => void) => void;
  excute: (className: string, options?: TurnstileOptions) => void;
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
  const execute = async (action: string): Promise<string> => {
    const { load } = useScriptTag(
      'https://challenges.cloudflare.com/turnstile/v0/api.js',
      undefined,
      { async: false },
    );

    await load();

    const turnstile = window?.turnstile;

    return new Promise((resolve) => {
      turnstile?.ready(() => {
        turnstile?.render('.wl-captcha-container', {
          sitekey: key,
          action,
          size: 'compact',
          callback: resolve,
        });
      });
    });
  };

  return { execute };
};
