import { createApp } from 'vue';
import { useConfig } from './composables';
import {
  getEvent,
  injectDarkStyle,
  registerMathML,
  updateCommentCount,
  updateVisitor,
} from './utils';
import { RecentComments } from './widget';
import App from './App.vue';

import type { DeepReadonly } from 'vue';
import type { WalineOptions } from './config';
import type { Update } from './composables';
import type { Config } from './utils';

export type { Update as WalineUpdate } from './composables';
export type { Locale as WalineLocale, WalineOptions } from './config';
export type { Comment as WalineComment } from './typings';

import '@style';

declare const VERSION: string;

const domRender = (config: DeepReadonly<Config>, signal: AbortSignal): void => {
  const { path, serverURL, visitor } = config;

  // visitor count
  if (visitor) void updateVisitor({ serverURL, path, signal });

  // comment count
  updateCommentCount(serverURL, signal);
};

export interface WalineInstance {
  update: Update;
  destroy: () => void;
}

function waline(options: WalineOptions): WalineInstance | void {
  const { el = '#waline', serverURL } = options;

  // check el element
  if (
    el !== null &&
    !(el instanceof HTMLElement) &&
    !document.querySelector(el)
  ) {
    console.error("Option 'el' is invalid!");

    return;
  }

  // check serverURL
  if (!serverURL) {
    console.error("Required option 'serverURL' is missing!");

    return;
  }

  const event = getEvent();
  const { config, update } = useConfig(options);

  // darkmode support
  if (options.dark) injectDarkStyle(options.dark);

  // mathml
  window.addEventListener('load', registerMathML);

  const commentController = new AbortController();
  const counterController = new AbortController();

  domRender(config.value, counterController.signal);

  // mount waline
  const app = createApp(App, { signal: commentController.signal })
    .provide('config', config)
    .provide('event', event)
    .provide('version', VERSION);

  app.mount(options.el || '#waline');

  // store for update use
  const state = {
    options,
    path: config.value.path,
    comment: commentController,
    counter: counterController,
  };

  return {
    update: (newOptions): void => {
      update(newOptions);

      const { path } = config.value;

      // comment should not rerender
      if (state.path !== path) {
        state.comment.abort();
        state.comment = new AbortController();
        state.path = path;
        event.emit('render', state.comment.signal);
      }

      // abort previous requests and update controller
      state.counter.abort();
      state.counter = new AbortController();

      domRender(config.value, state.counter.signal);
    },
    destroy: (): void => app.unmount(),
  };
}

waline.Widget = {
  RecentComments,
};

waline.version = VERSION;

export default waline;
