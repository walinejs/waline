export const errorHandler = (err: Error): void => {
  // oxlint-disable-next-line no-console
  if (err.name !== 'AbortError') console.error(err.message);
};
