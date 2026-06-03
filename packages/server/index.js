import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Application from 'thinkjs';
import Loader from 'thinkjs/lib/loader';

const dirName = import.meta.dirname;

export default function main(configParams = {}) {
  const { env, ...config } = configParams;

  const app = new Application({
    ROOT_PATH: dirName,
    APP_PATH: path.join(dirName, 'src'),
    VIEW_PATH: path.join(dirName, 'view'),
    RUNTIME_PATH: path.join(os.tmpdir(), 'runtime'),
    proxy: true, // use proxy
    env: env || 'vercel',
  });

  const loader = new Loader(app.options);

  loader.loadAll('worker');

  // oxlint-disable-next-line func-names
  return function (req, res) {
    for (const key in config) {
      // fix https://github.com/walinejs/waline/issues/2649 with alias model config name
      think.config(key === 'model' ? 'customModel' : key, config[key]);
    }

    return think
      .beforeStartServer()
      .catch((err) => {
        think.logger.error(err);
      })
      .then(() => {
        const callback = think.app.callback();

        return callback(req, res);
      })
      .then(() => {
        think.app.emit('appReady');
      });
  };
}
