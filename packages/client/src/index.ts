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
import Waline from './Waline.vue';

import type { App, DeepReadonly } from 'vue';
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

const getRoot = (
  el: string | HTMLElement | null | undefined
): HTMLElement | null | false => {
  if (el === null || el instanceof HTMLElement) return el;

  const root = document.querySelector<HTMLElement>(el || '#waline');

  if (root) return root;

  return false;
};

export interface WalineInstance {
  el: HTMLElement | null;
  update: Update;
  destroy: () => void;
}

export interface WalineErrorInstance {
  errMsg: string;
}

function waline(options: WalineOptions): WalineInstance | WalineErrorInstance {
  const { el, serverURL } = options;

  // check el element and serverURL
  const root = getRoot(el);

  if (root === false || !serverURL) {
    const errMsg = `Option '${
      !serverURL ? "serverURL' is missing" : "el' is invalid"
    }!`;
    const errorFunction = (): void => {
      console.error(
        'Waline failed when initializing, this method has no effect!'
      );
    };

    console.error(errMsg);

    return { errMsg, update: errorFunction, destroy: errorFunction };
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
  let app: App;

  if (el) {
    app = createApp(Waline, { signal: commentController.signal })
      .provide('config', config)
      .provide('event', event)
      .provide('version', VERSION);

    app.mount(el);
  }

  // store for update use
  const state = {
    options,
    path: config.value.path,
    comment: commentController,
    counter: counterController,
  };

  return {
    el: root,
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
    destroy: (): void => {
      if (el) app.unmount();
    },
  };
}

waline.Widget = {
  RecentComments,
};

waline.version = VERSION;

export default waline;
