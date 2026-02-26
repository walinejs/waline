import { ReCaptchaV3 as ReCaptcha } from '@better-captcha/vue/provider/recaptcha-v3';
import type { ReCaptchaV3Handle as ReCaptchaHandle } from '@better-captcha/vue/provider/recaptcha-v3';
import { Turnstile } from '@better-captcha/vue/provider/turnstile';
import type { TurnstileHandle } from '@better-captcha/vue/provider/turnstile';

export const CaptchaProviders = {
  recaptchaV3: ReCaptcha,
  turnstile: Turnstile,
};

export type CaptchaHandle = ReCaptchaHandle | TurnstileHandle;
