import { covertOptions, warning } from '../compact';
import { init, WalineInstance } from '../init';

import type {
  DeprecatedValineOptions,
  DeprecatedWalineOptions,
} from '../compact';
import type { WalineInitOptions } from '../typings';

export { WalineInstance } from '../init';

warning(
  ' This is a legacy package compatable with Valine and Waline@v1, please switch to Waline@v2 using https://<CDN.LINK>/@waline/client/dist/waline.js instead!'
);

// inject css styles

const link = document.createElement('link');

link.rel = 'stylesheet';
link.href = '//cdn.jsdelivr.net/npm/@waline/client/dist/waline.css';

document.head.appendChild(link);

export default function legacyWaline(
  options: WalineInitOptions & DeprecatedValineOptions & DeprecatedWalineOptions
): WalineInstance | null {
  return init(covertOptions(options));
}
