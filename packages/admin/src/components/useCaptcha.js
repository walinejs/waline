import { useEffect, useMemo, useState } from 'react';

import useScript from './useScript.js';

const injectStyle = (rule) => {
  const styleEl = document.createElement('style');

  document.head.append(styleEl);

  const styleSheet = styleEl.sheet;

  if (styleSheet) styleSheet.insertRule(rule, styleSheet.cssRules.length);
};

const useRecaptchaExecutor = ({ sitekey, hideDefaultBadge = false }) => {
  const [recaptcha, setRecaptcha] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && hideDefaultBadge) {
      injectStyle('.grecaptcha-badge { visibility: hidden; }');
    }
  }, [hideDefaultBadge]);

  useScript({
    src: sitekey ? `https://recaptcha.net/recaptcha/api.js?render=${sitekey}` : undefined,
    onload: () =>
      window.grecaptcha?.ready(() => {
        setRecaptcha(window.grecaptcha);
      }),
    checkForExisting: true,
  });

  useEffect(() => {
    if (!window.grecaptcha || !sitekey) return;

    window.grecaptcha.ready(() => {
      setRecaptcha(window.grecaptcha);
    });
  }, [sitekey]);

  return (action) =>
    new Promise((resolve, reject) => {
      if (!recaptcha) {
        reject(new Error('Recaptcha script not available'));

        return;
      }

      resolve(recaptcha.execute(sitekey, { action }));
    });
};

const useTurnstileExecutor = ({ sitekey }) => {
  const [turnstile, setTurnstile] = useState();

  useScript({
    src: sitekey ? 'https://challenges.cloudflare.com/turnstile/v0/api.js' : undefined,
    onload: () =>
      window.turnstile?.ready(() => {
        setTurnstile(window.turnstile);
      }),
    async: false,
    checkForExisting: true,
  });

  useEffect(() => {
    if (!window.turnstile || !sitekey) return;

    window.turnstile.ready(() => {
      setTurnstile(window.turnstile);
    });
  }, [sitekey]);

  return (action) =>
    new Promise((resolve, reject) => {
      if (!turnstile) {
        reject(new Error('Turnstile script not available'));

        return;
      }

      turnstile.render('.captcha-container', {
        sitekey,
        action,
        callback: resolve,
      });
    });
};

export const getCaptchaConfig = () =>
  window.betterCaptcha ??
  (window.recaptchaV3Key
    ? { provider: 'recaptchaV3', siteKey: window.recaptchaV3Key }
    : window.turnstileKey
      ? { provider: 'turnstile', siteKey: window.turnstileKey }
      : null);

export const useCaptcha = ({ hideDefaultBadge = false } = {}) => {
  const captchaConfig = useMemo(() => getCaptchaConfig(), []);

  const executeRecaptcha = useRecaptchaExecutor({
    sitekey: captchaConfig?.provider === 'recaptchaV3' ? captchaConfig.siteKey : undefined,
    hideDefaultBadge,
  });
  const executeTurnstile = useTurnstileExecutor({
    sitekey: captchaConfig?.provider === 'turnstile' ? captchaConfig.siteKey : undefined,
  });

  if (captchaConfig?.provider === 'recaptchaV3') {
    return executeRecaptcha;
  }

  if (captchaConfig?.provider === 'turnstile') {
    return executeTurnstile;
  }

  return async () => {};
};
