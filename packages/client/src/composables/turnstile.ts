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

interface LoadScriptParameters {
  src: string;
  async?: boolean;
  defer?: boolean;
}

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

async function loadScript(
  options: LoadScriptParameters
): Promise<Event | undefined> {
  if (!isBrowser) {
    return Promise.resolve(undefined);
  }

  const el = document.createElement('script');

  el.async = Boolean(options.async);
  el.defer = Boolean(options.defer);

  return new Promise((resolve, reject) => {
    el.onload = resolve;
    el.onerror = reject;
    el.src = options.src;

    document.head.appendChild(el);
  });
}

const turnstileScriptPromise = loadScript({
  src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
  async: false,
});

export const useTurnstile = (key: string): Turnstile => {
  async function execute(action: string): Promise<string> {
    await turnstileScriptPromise;
    const turnstile = window?.turnstile;

    return new Promise((resolve) => {
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
    });
  }

  return { execute };
};
