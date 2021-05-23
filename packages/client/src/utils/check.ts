import type { WalineOptions } from '../config/options';

export const checkOptions = (options: WalineOptions): boolean => {
  const { el, serverURL } = options;

  if (!el) {
    console.error("Required option 'el' is missing!");

    return false;
  }

  // check root element
  const root = document.querySelector(el);

  if (!root) {
    console.error("Option 'el' is invalid!");

    return false;
  }

  // check serverURL
  if (!serverURL) {
    console.error("Required option 'serverURL' is missing!");

    return false;
  }

  return true;
};
