import { isString } from './type.js';

export const getRoot = (
  el: string | HTMLElement | undefined,
): HTMLElement | null =>
  el instanceof HTMLElement
    ? el
    : isString(el)
      ? document.querySelector(el)
      : null;
