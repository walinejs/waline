import { RecaptchaV3 as Recaptcha } from '@better-captcha/react/provider/recaptcha-v3';
import { Turnstile } from '@better-captcha/react/provider/turnstile';

export const CaptchaProviders = {
  recaptchaV3: Recaptcha,
  turnstile: Turnstile,
};
