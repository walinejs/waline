const os = require('os');
const path = require('path');
const Application = require('thinkjs');
const Loader = require('thinkjs/lib/loader');

const ROOT_PATH = path.dirname(require.resolve('@waline/vercel'));
const instance = new Application({
  ROOT_PATH,
  APP_PATH: path.join(ROOT_PATH, 'src'),
  RUNTIME_PATH: path.join(os.tmpdir(), 'runtime'),
  proxy: true,
  env: 'cloudbase',
});

module.exports = function (config = {}) {
  const loader = new Loader(instance.options);
  loader.loadAll('worker');

  for (const k in config) {
    think.config(k, config[k]);
  }

  return {
    async tcbGetApp() {
      await think.beforeStartServer().catch((err) => think.logger.error(err));
      await instance._getWorkerInstance(instance.parseArgv());
      think.app.emit('appReady');

      return think.app;
    },
  };
};
