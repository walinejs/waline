export const getQuery = (element: HTMLElement): string | null => {
  const { path } = element.dataset;

  // oxlint-disable-next-line typescript/strict-boolean-expressions
  return path?.length ? path : null;
};
