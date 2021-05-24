export const removeEndingSplash = (content = ''): string =>
  content.replace(/\/$/u, '');
