import { createApp, ref } from 'vue';
import {
  checkOptions,
  getConfig,
  getEvent,
  injectDarkStyle,
  registerMathML,
  updateCommentCount,
  updateVisitor,
} from './utils';
import { RecentComments } from './widget';
import App from './App.vue';

import type { WalineOptions } from './config';
import type { Config } from './utils';

export type { Locale as WalineLocale, WalineOptions } from './config';
export type { Comment as WalineComment } from './typings';

import '@style';

declare const VERSION: string;

const domRender = (config: Config, signal: AbortSignal): void => {
  const { path, serverURL, visitor } = config;

  // visitor count
  if (visitor) void updateVisitor({ serverURL, path, signal });

  // comment count
  updateCommentCount(serverURL, signal);
};

export interface WalineInstance {
  update: (options: Partial<WalineOptions>) => void;
  destroy: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function Waline(options: WalineOptions): WalineInstance | void {
  let prevOptions = options;
  let controller = new AbortController();
  const event = getEvent();
  const config = ref(getConfig(options));

  if (!checkOptions(options)) return;

  // darkmode support
  if (options.dark) injectDarkStyle(options.dark);

  // mathml
  window.addEventListener('load', registerMathML);

  domRender(config.value, controller.signal);

  // mount waline
  const app = createApp(App, { signal: controller.signal })
    .provide('config', config)
    .provide('event', event)
    .provide('version', VERSION);

  app.mount(options.el || '#waline');

  return {
    update: (newOptions: Partial<WalineOptions> = {}): void => {
      prevOptions = { ...prevOptions, ...newOptions };

      config.value = getConfig(prevOptions);

      // abort previous requests and update controller
      controller.abort();
      controller = new AbortController();

      event.emit('render', controller.signal);
      domRender(config.value, controller.signal);
    },
    destroy: (): void => {
      app.unmount();
    },
  };
}

Waline.Widget = {
  RecentComments,
};

Waline.version = VERSION;

export default Waline;
