export default function () {
  if (window.captcha) {
    return window.captcha;
  }

  if (window.recaptchaV3Key) {
    return {
      provider: 'recaptchaV3',
      sitekey: window.recaptchaV3Key,
      options: {
        action: 'login',
      },
    };
  }

  if (window.turnstileKey) {
    return {
      provider: 'turnstile',
      sitekey: window.turnstileKey,
    };
  }
}
