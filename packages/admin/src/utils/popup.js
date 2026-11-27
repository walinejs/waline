export const isTrustedOrigin = (origin) => {
  const domains = window.SECURE_DOMAINS;

  if (!domains) return true;

  try {
    const url = new URL(origin);

    if (!['http:', 'https:'].includes(url.protocol)) return false;
    if (url.origin === window.location.origin) return true;

    return (Array.isArray(domains) ? domains : [domains]).some((domain) => {
      if (typeof domain !== 'string') return false;

      if (domain.startsWith('/') && domain.endsWith('/')) {
        try {
          return new RegExp(domain.slice(1, -1), 'u').test(url.hostname);
        } catch {
          return false;
        }
      }

      return domain === url.hostname;
    });
  } catch {
    return false;
  }
};

export const postToOpener = (message) => {
  if (!window.opener) return;

  if (!window.SECURE_DOMAINS) {
    window.opener.postMessage(message, '*');
    return;
  }

  try {
    const { origin } = new URL(document.referrer);

    if (isTrustedOrigin(origin)) {
      window.opener.postMessage(message, origin);
    }
  } catch {
    // Without a valid referrer there is no trusted destination for credentials.
  }
};
