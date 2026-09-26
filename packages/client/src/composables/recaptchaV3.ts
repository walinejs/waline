import type { ReCaptchaInstance } from 'recaptcha-v3';
import { load } from 'recaptcha-v3';

const recaptchaStore: Record<string, Promise<ReCaptchaInstance>> = {};

interface ReCaptcha {
  execute: (action: string) => Promise<string>;
}

export const useReCaptcha = (key: string): ReCaptcha => {
  // oxlint-disable-next-line no-multi-assign
  const init = (recaptchaStore[key] ??= load(key, {
    useRecaptchaNet: true,
    autoHideBadge: true,
  }));

  return {
    execute: (action: string) => init.then((instance) => instance.execute(action)),
  };
};
