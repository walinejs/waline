import I18n from '../i18n.js';

const getBasename = () => location.pathname.match(/(.*)\/ui(?:\/|$)/u)?.[1] ?? '';

const isLoginPage = () => location.pathname.includes('/ui/login');

const clearAuth = () => {
  window.TOKEN = undefined;
  sessionStorage.removeItem('TOKEN');
  localStorage.removeItem('TOKEN');
};

const redirectToLogin = () => {
  if (isLoginPage()) {
    return;
  }

  const basename = getBasename();
  const redirectPath = location.pathname.replace(basename, '') || '/';

  location.href = `${basename}/ui/login?redirect=${encodeURIComponent(redirectPath)}`;
};

const unauthorizedError = () => {
  const error = new Error('Unauthorized');

  error.status = 401;

  return error;
};

const handleUnauthorized = () => {
  if (!isLoginPage()) {
    clearAuth();
    redirectToLogin();
  }

  return unauthorizedError();
};

export default async function request(url, opts = {}) {
  const options = typeof url === 'object' ? { ...url } : { ...opts, url };

  options.headers ??= {};
  if (options.body && !(options.body instanceof FormData)) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  let token = window.TOKEN ?? sessionStorage.getItem('TOKEN');

  token ??= localStorage.getItem('TOKEN');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const baseUrl = window.serverURL || (location.pathname.match(/(.*?\/)ui/u)?.[1] ?? '/');

  const joiner = options.url.includes('?') ? '&' : '?';
  const resp = await fetch(`${baseUrl}${options.url}${joiner}lang=${I18n.language}`, options);

  if (!resp.ok) {
    if (resp.status === 401) {
      throw handleUnauthorized();
    }

    let result;

    try {
      result = await resp.json();
    } catch {
      // ignore
    }

    throw new Error(`${resp.status}: ${result?.errmsg ?? resp.statusText}`);
  }

  const result = await resp.json();

  if (result.errno === 401) {
    throw handleUnauthorized();
  }

  if (result.errno !== 0) {
    throw new Error(result.errmsg);
  }

  // oxlint-disable-next-line no-underscore-dangle
  const __version = resp.headers.get('x-waline-version');

  return { __version, ...result.data };
}
