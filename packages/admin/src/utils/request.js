import I18n from 'i18next';

export default async function request(url, opts = {}) {
  if (typeof url === 'object') {
    opts = url;
  } else if (typeof url === 'string') {
    opts.url = url;
  }

  if (!opts.headers) {
    opts.headers = {};
  }
  if (opts.body && !(opts.body instanceof FormData)) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  let token = window.TOKEN || sessionStorage.getItem('TOKEN');

  if (!token) {
    token = localStorage.getItem('TOKEN');
  }
  if (token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }

  let baseUrl = window.serverURL;

  if (!baseUrl) {
    const match = location.pathname.match(/(.*?\/)ui/);

    baseUrl = match ? match[1] : '/';
  }

  const joiner = opts.url.includes('?') ? '&' : '?';
  const resp = await fetch(
    `${baseUrl}${opts.url}${joiner}lang=${I18n.language}`,
    opts,
  );

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

    throw new Error(`${resp.status}: ${result?.errmsg || resp.statusText}`);
  }

  const result = await resp.json();

  if (result.errno !== 0) {
    throw new Error(result.errmsg);
  }

  const __version = resp.headers.get('x-waline-version');

  return { __version, ...result.data };
}
