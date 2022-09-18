import { IReCaptchaLoaderOptions } from 'recaptcha-v3/dist/ReCaptchaLoader';

export interface IReCaptchaOptions {
  siteKey: string;
  loaderOptions: IReCaptchaLoaderOptions;
}
