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

function Waline(
  options: WalineOptions
): { update: (options: Partial<WalineOptions>) => void } | void {
  let temp = options;
  const config = ref(getConfig(options));

  if (checkOptions(options)) {
    // darkmode support
    if (options.dark) injectDarkStyle(options.dark);

    // mathml
    window.addEventListener('load', registerMathML);

    domRender(config.value);

    // mount waline
    createApp(App)
      .provide('config', config)
      .provide('version', VERSION)
      .mount(options.el || '#waline');
  }

  return {
    update: (newOptons: Partial<WalineOptions>): void => {
      temp = { ...temp, ...newOptons };

      config.value = getConfig(temp);
      domRender(config.value);
    },
  };
}

Waline.Widget = {
  RecentComments,
};

Waline.version = VERSION;

export default Waline;
