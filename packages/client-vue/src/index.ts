import { createApp, ref } from 'vue';
import { checkOptions, getConfig } from './config';
import {
  injectDarkStyle,
  registerMathML,
  updateCommentCount,
  updateVisitor,
} from './utils';
import { RecentComments } from './widget';
import App from './App.vue';

import type { Config, WalineOptions } from './config';

import './styles/index.scss';

declare const VERSION: string;

const domRender = (config: Config): void => {
  const { path, serverURL, visitor } = config;

  // visitor count
  if (visitor) updateVisitor({ path, serverURL });

  // comment count
  updateCommentCount(serverURL);
};

export interface WalineInstance {
  update: (options: Partial<WalineOptions>) => void;
  destroy: () => void;
}

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
    .provide('version', VERSION);

  app.mount(options.el || '#waline');

  return {
    update: (newOptons: Partial<WalineOptions>): void => {
      temp = { ...temp, ...newOptons };

      config.value = getConfig(temp);
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
