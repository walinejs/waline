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

class Controller {
  private controller;

  constructor() {
    this.controller = new AbortController();
  }

  get signal(): AbortSignal {
    return this.controller.signal;
  }

  abort(): void {
    this.controller.abort();
  }

  new(): void {
    this.abort();
    this.controller = new AbortController();
  }
}

const domRender = (config: DeepReadonly<Config>, signal: AbortSignal): void => {
  const { path, serverURL, visitor } = config;

  // visitor count
  if (visitor) void updateVisitor({ serverURL, path, signal });

  // comment count
  updateCommentCount(serverURL, signal);
};

const getRoot = (el: string | HTMLElement | undefined): HTMLElement | null => {
  if (!el) return null;
  if (el instanceof HTMLElement) return el;

  const root = document.querySelector<HTMLElement>(el);

  return root || null;
};

export interface WalineErrorInstance {
  errMsg: string;
}

const getErrorInstance = (errMsg: string): WalineErrorInstance => {
  console.warn(errMsg);

  return { errMsg };
};

export interface WalineInstance {
  el: HTMLElement | null;
  update: Update;
  destroy: () => void;
}

function waline(options: WalineOptions): WalineInstance | WalineErrorInstance {
  const { el, serverURL } = options;

  // check serverURL
  if (!serverURL) return getErrorInstance("Option 'serverURL' is missing!");

  // darkmode support
  if (options.dark) injectDarkStyle(options.dark);

  // mathml
  if (options.mathTagSupport) window.addEventListener('load', registerMathML);

  const commentController = new Controller();
  const counterController = new Controller();

  const event = getEvent();
  const { config, update } = useConfig(options);

  domRender(config.value, counterController.signal);

  // check el element
  const root = getRoot(el);

  if (el && !root)
    return getErrorInstance(`Option 'el' do not match any domElement!`);

  // mount waline
  let app: App;

  if (root) {
    app = createApp(Waline, { signal: commentController.signal })
      .provide('config', config)
      .provide('event', event)
      .provide('version', VERSION);

    app.mount(root);
  }

  // store for update use
  const state = {
    options,
    path: config.value.path,
  };

  return {
    el: root,
    update: (newOptions): void => {
      update(newOptions);

      const { path } = config.value;

      // comment should not rerender
      if (state.path !== path) {
        commentController.new();
        state.path = path;
        event.emit('render', commentController.signal);
      }

      // abort previous requests and update controller
      counterController.new();

      domRender(config.value, counterController.signal);
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
