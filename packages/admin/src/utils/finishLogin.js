import { validateRedirect } from '../services/auth.js';

const getDefaultRedirect = (user) => (user?.type === 'administrator' ? '/ui' : '/ui/profile');

const normalizeRedirect = (redirect) => {
  if (!redirect) {
    return '';
  }

  try {
    return new URL(redirect, location.origin).href;
  } catch {
    return '';
  }
};

const getTargetOrigin = (redirect) => {
  const normalizedRedirect = normalizeRedirect(redirect);

  if (normalizedRedirect) {
    return new URL(normalizedRedirect).origin;
  }

  if (document.referrer) {
    return new URL(document.referrer).origin;
  }

  return location.origin;
};

export const finishLogin = async ({ token, user, remember }) => {
  if (window.opener) {
    const redirect = new URLSearchParams(location.search).get('redirect');

    window.opener.postMessage(
      { type: 'userInfo', data: { token, remember, ...user } },
      getTargetOrigin(redirect),
    );

    return;
  }

  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect');
  const fallback = getDefaultRedirect(user);

  if (!redirect) {
    location.href = fallback;

    return;
  }

  const { valid, url } = await validateRedirect(redirect).catch(() => ({ valid: false }));

  if (valid && url) {
    const redirectUrl = new URL(url, location.origin);

    redirectUrl.searchParams.set('token', token);
    location.href = redirectUrl.href;

    return;
  }

  location.href = fallback;
};
