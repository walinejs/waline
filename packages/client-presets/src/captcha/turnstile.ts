import { CaptchaValidator } from '../typings.js';

export interface TurnstileOptions {
  sitekey: string;
  action?: string;
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
}
export interface TurnstileInstance {
  ready: (fn: () => void) => void;
  render: (className: string, options?: TurnstileOptions) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

export const initTurnstile =
  (key: string): CaptchaValidator =>
  (action) =>
    new Promise((resolve) => {
      const script = document.createElement('script');

      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

      script.onload = (): void => {
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
      };
    });
