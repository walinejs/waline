import I18n from 'i18next';

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

  let baseUrl = window.serverURL;

  if (!baseUrl) {
    const match = location.pathname.match(/(.*?\/)ui/);

    baseUrl = match ? match[1] : '/';
  }

  const joiner = options.url.includes('?') ? '&' : '?';
  const resp = await fetch(`${baseUrl}${options.url}${joiner}lang=${I18n.language}`, options);

  if (!resp.ok) {
    if (resp.status === 401) {
      throw new Error(401);
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

  if (result.errno !== 0) {
    throw new Error(result.errmsg);
  }

  const __version = resp.headers.get('x-waline-version');

  return { __version, ...result.data };
}
