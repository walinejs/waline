export default {
  cooldown: 1,
  workspaces: true,
  peer: true,
  upgrade: true,
  timeout: 360000,
  filter: (name) => {
    if (name === 'think-model-postgresql') return false;

    return true;
  },
  target: (name) => {
    // FIXME: now we should be able to upgrade jsdom to v20
    // as our node engine supports require(esm) in cjs
    // jsdom v20+ are ESM only
    if (name === 'jsdom') return 'minor';

    if (name.startsWith('@vuepress/') || name === 'vuepress') {
      return '@next';
    }

    if (name === '@types/node') return 'minor';

    return 'latest';
  },
};
