import { ReCaptchaV3 } from '@better-captcha/vue/provider/recaptcha-v3';
import type { ReCaptchaV3Handle } from '@better-captcha/vue/provider/recaptcha-v3';
import { Turnstile } from '@better-captcha/vue/provider/turnstile';
import type { TurnstileHandle } from '@better-captcha/vue/provider/turnstile';

export const CaptchaProviders = {
  recaptchaV3: ReCaptchaV3,
  turnstile: Turnstile,
};

export type CaptchaHandle = ReCaptchaV3Handle | TurnstileHandle;
