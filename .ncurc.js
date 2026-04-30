export default {
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

    // for markdown-it plugins, we should use cjs version
    if (name.startsWith('@mdit/')) return '@cjs';
    // jsdom v20+ are ESM only
    if (name === 'jsdom') return 'minor';
    if (name === '@types/node') return 'minor';

    return 'latest';
  },
};
