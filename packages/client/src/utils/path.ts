export const decodePath = (path: string): string => {
  try {
    path = decodeURI(path);
  } catch (err) {
    // ignore error
  }

  return path;
};
