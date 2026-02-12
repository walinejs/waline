import { useRecaptcha } from './useRecaptchaV3.js';
import { useTurnstile } from './useTurnstile.js';

export const useCaptcha = (config) => {
  const recaptchaV3 = useRecaptcha(config);
  const turnstile = useTurnstile(config);

  if (window.turnstileKey) {
    return turnstile;
  }
  if (window.recaptchaV3Key) {
    return recaptchaV3;
  }

  return () => {
    // do nothing
  };
};
