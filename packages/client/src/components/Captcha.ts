import { ReCaptchaV3 } from '@better-captcha/vue/provider/recaptcha-v3';
import { Turnstile } from '@better-captcha/vue/provider/turnstile';

interface RecaptchaV3Provider {
  name: 'recaptchaV3';
  component: typeof ReCaptchaV3;
  // handleType: RecaptchaV3Handle;
}

interface TurnstileProvider {
  name: 'turnstile';
  component: typeof Turnstile;
  // handleType: TurnstileHandle;
}

export type CaptchaProvider = RecaptchaV3Provider | TurnstileProvider;

export const CaptchaProviders: CaptchaProvider[] = [
  {
    name: 'recaptchaV3',
    component: ReCaptchaV3,
  },
  {
    name: 'turnstile',
    component: Turnstile,
  },
];
