import { useState, useEffect } from 'react';
import useScript from './useScript';

export function useRecaptcha({
  sitekey,
  hideDefaultBadge = false,
  checkForExisting = true,
}) {
  const [recaptcha, setRecaptcha] = useState();

  useEffect(() => {
    if (isBrowser && hideDefaultBadge) {
      injectStyle('.grecaptcha-badge { visibility: hidden; }');
    }
  }, [hideDefaultBadge]);

  useScript({
    src: `https://recaptcha.net/recaptcha/api.js?render=${sitekey}`,
    onload: () =>
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha);
      }),
    checkForExisting,
  });

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha);
      });
    }
  }, []);

  return (action) => {
    return new Promise((resolve, reject) => {
      if (recaptcha) {
        resolve(recaptcha.execute(sitekey, { action }));
      } else {
        reject(new Error('Recaptcha script not available'));
      }
    });
  };
}

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const injectStyle = (rule) => {
  const styleEl = document.createElement('style');

  document.head.appendChild(styleEl);

  const styleSheet = styleEl.sheet;

  if (styleSheet) styleSheet.insertRule(rule, styleSheet.cssRules.length);
};
