import { load } from 'recaptcha-v3';

import type { ReCaptchaInstance } from 'recaptcha-v3';

const recaptchaStore: Record<string, Promise<ReCaptchaInstance>> = {};

interface ReCaptcha {
  execute: (action: string) => Promise<string>;
}

export const useReCaptcha = (key: string): ReCaptcha => {
  const init =
    recaptchaStore[key] ??
    (recaptchaStore[key] = load(key, {
      useRecaptchaNet: true,
      autoHideBadge: true,
    }));

  return {
    execute: (action: string) =>
      init.then((instance) => instance.execute(action)),
  };
};
