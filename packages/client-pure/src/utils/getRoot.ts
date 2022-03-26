export const getRoot = (
  el: string | HTMLElement | undefined
): HTMLElement | null =>
  el instanceof HTMLElement
    ? el
    : typeof el === 'string'
    ? document.querySelector(el)
    : null;
