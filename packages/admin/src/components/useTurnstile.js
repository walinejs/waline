import { useState, useEffect } from 'react';
import useScript from './useScript';

export function useTurnstile({
  sitekey,
  hideDefaultBadge = false,
  checkForExisting = true,
}) {
  const [turnstile, setTurnstile] = useState();

  useEffect(() => {
    if (isBrowser && hideDefaultBadge) {
      injectStyle('.grecaptcha-badge { visibility: hidden; }');
    }
  }, [hideDefaultBadge]);

  useScript({
    src: window.turnstileKey
      ? `https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha&render=${sitekey}`
      : undefined,
    onload: () =>
      window.grecaptcha.ready(() => {
        setTurnstile(window.grecaptcha);
      }),
    checkForExisting,
  });

  useEffect(() => {
    if (window.grecaptcha && window.turnstileKey) {
      window.grecaptcha.ready(() => {
        setTurnstile(window.turnstile);
      });
    }
  }, []);

  return (action) => {
    return new Promise((resolve, reject) => {
      if (turnstile) {
        resolve(turnstile.execute(sitekey, { action }));
      } else {
        reject(new Error('Turnstile script not available'));
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
