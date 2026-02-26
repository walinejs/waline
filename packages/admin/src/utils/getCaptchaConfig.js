export default function () {
  if (window.captcha) {
    return window.captcha;
  }

  if (window.recaptchaV3Key) {
    return {
      provider: 'recaptchaV3',
      siteKey: window.recaptchaV3Key,
    };
  }

  if (window.turnstileKey) {
    return {
      provider: 'turnstile',
      siteKey: window.turnstileKey,
    };
  }
}
