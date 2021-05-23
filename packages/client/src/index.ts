import mitt from 'mitt';
import { createApp, ref } from 'vue';
import { getConfig } from './config';
import {
  checkOptions,
  injectDarkStyle,
  registerMathML,
  updateCommentCount,
  updateVisitor,
} from './utils';
import { RecentComments } from './widget';
import App from './App.vue';
import type { Config, WalineOptions } from './config';

export type { Locale as WalineLocale, WalineOptions } from './config';
export type { Comment as WalineComment } from './typings';

import './styles/index.scss';

declare const VERSION: string;

const event = mitt();

const domRender = (config: Config): void => {
  const { path, serverURL, visitor } = config;

  // visitor count
  if (visitor) updateVisitor({ serverURL, path });

  // comment count
  updateCommentCount(serverURL);
};

export interface WalineInstance {
  update: (options: Partial<WalineOptions>) => void;
  destroy: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function Waline(options: WalineOptions): WalineInstance | void {
  let temp = options;
  const config = ref(getConfig(options));

  if (!checkOptions(options)) return;

  // darkmode support
  if (options.dark) injectDarkStyle(options.dark);

  // mathml
  window.addEventListener('load', registerMathML);

  domRender(config.value);

  // mount waline
  const app = createApp(App)
    .provide('config', config)
    .provide('event', event)
    .provide('version', VERSION);

  app.mount(options.el || '#waline');

  return {
    update: (newOptions: Partial<WalineOptions> = {}): void => {
      temp = { ...temp, ...newOptions };

      config.value = getConfig(temp);
      event.emit('update');
      domRender(config.value);
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
