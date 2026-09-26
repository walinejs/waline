export const getQuery = (element: HTMLElement): string | null => {
  const { identifier } = element.dataset;

  // oxlint-disable-next-line typescript/strict-boolean-expressions
  return identifier?.length ? identifier : null;
};
