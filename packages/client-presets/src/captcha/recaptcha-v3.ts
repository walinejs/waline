import { type ReCaptchaInstance, load } from 'recaptcha-v3';

import { CaptchaValidator } from '../typings.js';

const recaptchaStore: Record<string, Promise<ReCaptchaInstance>> = {};

export const getReCaptcha = (key: string): CaptchaValidator => {
  const init = (recaptchaStore[key] ??= load(key, {
    useRecaptchaNet: true,
    autoHideBadge: true,
  }));

  return (action) => init.then((instance) => instance.execute(action));
};
