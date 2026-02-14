import { createApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import StarWidget from './star-widget.vue';
import { getRoot } from '../../utils/index.js';

/**
 * Options for the star rating widget.
 */
export interface WalineStarOptions {
  /**
   * Element or CSS selector on which to mount the widget.
   */
  el?: string | HTMLElement;
  /**
   * Path identifying the current page or article.
   */
  path: string;
  /**
   * Language code used by the widget, such as `en` or `zh-CN`.
   */
  lang?: string;
  /**
   * Waline server URL.
   */
  serverURL: string;
  /**
   * Callback invoked after the user submits a rating.
   *
   * @param score The score selected by the user.
   */
  onRate?: (score: number) => void;
}
/**
 * Star widget result.
 */
export interface WalineStarResult {
  /**
   * Destroy star widget instance.
   */
  destroy: () => void;
}

export const Star = ({
  el,
  path,
  lang = navigator.language,
  serverURL,
  onRate,
}: WalineStarOptions): WalineStarResult => {
  const root = getRoot(el);

  if (!root)
    return {
      destroy: () => {},
    };

  const app = createApp(StarWidget, {
    path,
    lang,
    serverURL,
    onRate,
  });

  app.mount(root) as ComponentPublicInstance;

  return {
    destroy: (): void => {
      app.unmount();
      root.innerHTML = '';
    },
  };
};
