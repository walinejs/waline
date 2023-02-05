import { useRecaptcha } from './useRecaptchaV3';
import { useTurnstile } from './useTurnstile';

export function useCaptcha(config) {
  const recaptchaV3 = useRecaptcha(config);
  const turnstile = useTurnstile(config);

  return turnstile || recaptchaV3;
}
