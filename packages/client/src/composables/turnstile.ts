import { load } from 'recaptcha-v3';

import type { ReCaptchaInstance as TurnstileInstance } from 'recaptcha-v3';

const turnstileStore: Record<string, Promise<TurnstileInstance>> = {};

interface Turnstile {
  execute: (action: string) => Promise<string>;
}

export const useTurnstile = (key: string): Turnstile => {
  const _createElement = document.createElement.bind(document);

  document.createElement = function (
    tag: string,
    options?: ElementCreationOptions
  ): HTMLElement {
    const el = _createElement(tag, options);

    if (el.tagName === 'SCRIPT') {
      (el as HTMLScriptElement).async = false;
    }

    return el;
  };

  const init = (turnstileStore[key] ??= load(key, {
    customUrl:
      'https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha',
    autoHideBadge: true,
    explicitRenderParameters: {
      container: document.body,
    },
  }));

  return {
    execute: (action: string) =>
      init.then((instance) => instance.execute(action)),
  };
};
