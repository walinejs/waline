import { useEffect, useState } from 'react';

import useScript from './useScript.js';

export const useTurnstile = ({ sitekey, checkForExisting = true }) => {
  const [turnstile, setTurnstile] = useState();

  useScript({
    src: window.turnstileKey ? `https://challenges.cloudflare.com/turnstile/v0/api.js` : undefined,
    onload: () =>
      window.turnstile.ready(() => {
        setTurnstile(window.turnstile);
      }),
    async: false,
    checkForExisting,
  });

  useEffect(() => {
    if (!window.turnstile) {
      return;
    }

    window.turnstile.ready(() => {
      setTurnstile(window.turnstile);
    });
  }, []);

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
