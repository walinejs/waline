export const uiBase = /\/ui(?:\/|$)/u.test(location.pathname) ? '/ui' : '';

export const getUiPath = (path = '') => {
  const normalizedPath = path ? `/${path.replace(/^\/+/u, '')}` : '';

  return `${uiBase}${normalizedPath}` || '/';
};
