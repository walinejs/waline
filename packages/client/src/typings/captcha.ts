import type { RenderParameters as AltchaRenderParameters } from '@better-captcha/vue/provider/altcha';
import type { RenderParameters as CapWidgetRenderParameters } from '@better-captcha/vue/provider/cap-widget';
import type { RenderParameters as CaptchaFoxRenderParameters } from '@better-captcha/vue/provider/captcha-fox';
import type { RenderParameters as FriendlyCaptchaRenderParameters } from '@better-captcha/vue/provider/friendly-captcha';
import type { RenderParameters as HCaptchaRenderParameters } from '@better-captcha/vue/provider/hcaptcha';
import type { RenderParameters as PrivateCaptchaRenderParameters } from '@better-captcha/vue/provider/private-captcha';
import type { RenderParameters as ProsopoRenderParameters } from '@better-captcha/vue/provider/prosopo';
import type { RenderParameters as ReCaptchaRenderParameters } from '@better-captcha/vue/provider/recaptcha';
import type { RenderParameters as ReCaptchaV3RenderParameters } from '@better-captcha/vue/provider/recaptcha-v3';
import type { RenderParameters as TurnstileRenderParameters } from '@better-captcha/vue/provider/turnstile';


export interface BaseWalineCaptchaOptions {
  /**
   * captcha provider site key
   */
  sitekey: string;
}

export interface AltchaCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'altcha';
  /**
   * captcha provider options
   */
  options?: AltchaRenderParameters;
}

export interface CapWidgetCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'cap-widget';
  /**
   * captcha provider options
   */
  options?: CapWidgetRenderParameters;
}

export interface CaptchaFoxCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'captcha-fox';
  /**
   * captcha provider options
   */
  options?: CaptchaFoxRenderParameters;
}

export interface FriendlyCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'friendly-captcha';
  /**
   * captcha provider options
   */
  options?: FriendlyCaptchaRenderParameters;
}

export interface HCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'h-captcha';
  /**
   * captcha provider options
   */
  options?: HCaptchaRenderParameters;
}

export interface PrivateCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'private-captcha';
  /**
   * captcha provider options
   */
  options?: PrivateCaptchaRenderParameters;
}

export interface ProsopoCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'prosopo';
  /**
   * captcha provider options
   */
  options?: ProsopoRenderParameters;
}

export interface ReCaptchaCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'recaptcha';
  /**
   * captcha provider options
   */
  options?: ReCaptchaRenderParameters;
}

export interface ReCaptchaV3CaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'recaptchaV3';
  /**
   * captcha provider options
   */
  options: ReCaptchaV3RenderParameters;
}

export interface TurnstileCaptchaOptions extends BaseWalineCaptchaOptions {
  /**
   * captcha provider name
   */
  provider: 'turnstile';
  /**
   * captcha provider options
   */
  options?: TurnstileRenderParameters;
}

export type WalineCaptchaOptions = ReCaptchaV3CaptchaOptions | TurnstileCaptchaOptions | AltchaCaptchaOptions | CapWidgetCaptchaOptions | CaptchaFoxCaptchaOptions | FriendlyCaptchaOptions | HCaptchaOptions | PrivateCaptchaOptions | ProsopoCaptchaOptions | ReCaptchaCaptchaOptions;