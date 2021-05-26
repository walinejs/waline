export const decodePath = (path: string): string => {
  try {
    path = decodeURI(path);
  } catch (err) {
    // ignore error
  }

  return path;
};

export const removeEndingSplash = (content = ''): string =>
  content.replace(/\/$/u, '');

export const isLinkHttp = (link: string): boolean =>
  /^(https?:)?\/\//.test(link);
