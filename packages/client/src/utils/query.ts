export const getQuery = (element: HTMLElement): string | null => {
  const { path } = element.dataset;

  return path?.length ? path : null;
};
