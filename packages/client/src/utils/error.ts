export const errorHandler = (err: Error): void => {
  if (err.name !== 'AbortError') console.error(err.message);
};
