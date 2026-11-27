export const normalizeServerURL = (input: string): string => {
  let url: URL;

  try {
    url = new URL(input);
  } catch {
    throw new TypeError(`Invalid server URL: ${input}`);
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new TypeError('Waline server URL must use HTTP or HTTPS');
  }

  url.hash = '';
  url.search = '';
  url.pathname = url.pathname.replace(/\/+$/u, '');

  return url.toString().replace(/\/$/u, '');
};

export const apiURL = (serverURL: string, path: string): string =>
  `${serverURL}/api/${path.replace(/^\//u, '')}`;
