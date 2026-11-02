import { useScriptTag } from '@vueuse/core';

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const TURNSTILE_TIMEOUT = 10_000;

interface TurnstileOptions {
  sitekey: string;
  action?: string;
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'error-callback'?: () => void;
}

interface TurnstileInstance {
  ready: (fn: () => void) => void;
  render: (container: string | HTMLElement, options?: TurnstileOptions) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

interface Turnstile {
  execute: (action: string) => Promise<string>;
}

let scriptPromise: Promise<unknown> | null = null;

const loadTurnstile = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    throw new TypeError('Turnstile requires a browser environment');
  }

  if (window.turnstile) return;

  if (!scriptPromise) {
    const { load } = useScriptTag(TURNSTILE_SCRIPT, undefined, {
      async: false,
      immediate: false,
    });

    scriptPromise = (async (): Promise<unknown> => {
      try {
        return await load();
      } catch (err) {
        // Allow a later submit to retry loading the script.
        scriptPromise = null;
        throw err;
      }
    })();
  }

  await scriptPromise;
};

export const useTurnstile = (key: string): Turnstile => {
  const execute = async (action: string): Promise<string> => {
    await loadTurnstile();

    const { turnstile } = window;

    if (!turnstile) {
      throw new Error('Turnstile failed to load');
    }

    const container = document.querySelector<HTMLElement>('.wl-captcha-container');

    if (!container) {
      throw new Error('Turnstile container not found');
    }

    return new Promise<string>((resolve, reject) => {
      const state: { settled: boolean; timer?: ReturnType<typeof setTimeout> } = {
        settled: false,
      };

      const finish = (token?: string, error?: Error): void => {
        if (state.settled) return;

        state.settled = true;
        if (state.timer !== undefined) clearTimeout(state.timer);

        if (error) reject(error);
        else if (token != null) resolve(token);
      };

      state.timer = setTimeout(() => {
        finish(undefined, new Error('Turnstile render timed out'));
      }, TURNSTILE_TIMEOUT);

      try {
        turnstile.ready(() => {
          if (state.settled) return;

          try {
            turnstile.render(container, {
              sitekey: key,
              action,
              size: 'compact',
              callback: (token: string) => {
                finish(token);
              },
              'error-callback': () => {
                finish(undefined, new Error('Turnstile verification failed'));
              },
            });
          } catch (err) {
            finish(undefined, err instanceof Error ? err : new Error('Turnstile render failed'));
          }
        });
      } catch (err) {
        finish(undefined, err instanceof Error ? err : new Error('Turnstile render failed'));
      }
    });
  };

  return { execute };
};
