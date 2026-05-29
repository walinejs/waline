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
    if (name.startsWith('@vuepress/') || name === 'vuepress') {
      return '@next';
    }

    // jsdom v20+ are ESM only
    if (name === 'jsdom') return 'minor';
    if (name === '@types/node') return 'minor';

    return 'latest';
  },
};
