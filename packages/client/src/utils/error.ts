export const errorHandler = (err: Error): void => {
  // eslint-disable-next-line no-console
  if (err.name !== 'AbortError') console.error(err.message);
};
