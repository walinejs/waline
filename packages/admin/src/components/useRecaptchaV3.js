import { useEffect, useState } from 'react';

import useScript from './useScript.js';

export const useRecaptcha = ({ sitekey, hideDefaultBadge = false, checkForExisting = true }) => {
  const [recaptcha, setRecaptcha] = useState();

  useEffect(() => {
    if (isBrowser && hideDefaultBadge) {
      injectStyle('.grecaptcha-badge { visibility: hidden; }');
    }
  }, [hideDefaultBadge]);

  useScript({
    src: window.recaptchaV3Key
      ? `https://recaptcha.net/recaptcha/api.js?render=${sitekey}`
      : undefined,
    onload: () =>
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha);
      }),
    checkForExisting,
  });

  useEffect(() => {
    if (window.grecaptcha && window.recaptchaV3Key) {
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha);
      });
    }
  }, []);

  return (action) =>
    new Promise((resolve, reject) => {
      if (recaptcha) {
        resolve(recaptcha.execute(sitekey, { action }));
      } else {
        reject(new Error('Recaptcha script not available'));
      }
    });
};

const isBrowser = typeof window !== 'undefined' && Boolean(window.document);

const injectStyle = (rule) => {
  const styleEl = document.createElement('style');

  document.head.append(styleEl);

  const styleSheet = styleEl.sheet;

  if (styleSheet) styleSheet.insertRule(rule, styleSheet.cssRules.length);
};
