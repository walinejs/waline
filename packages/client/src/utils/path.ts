export const decodePath = (path: string): string => {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
};

export const removeEndingSplash = (content = ''): string => content.replace(/\/$/u, '');

export const isLinkHttp = (link: string): boolean => /^(https?:)?\/\//.test(link);
