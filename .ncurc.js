export default {
  cooldown: (pkg) => {
    if (
      ['@oxlint/', '@oxfmt', '@oxlint-tsgolint/', '@vercel', '@vitest/', '@vue/'].some((item) =>
        pkg.startsWith(item),
      ) ||
      [
        'oxc-config-hope',
        'oxfmt',
        'oxlint',
        'oxlint-tsgolint',
        'tsdown',
        'vercel',
        'vitest',
        'vue',
      ].includes(pkg)
    ) {
      return false;
    }

    return 1;
  },
  workspaces: true,
  peer: true,
  upgrade: true,
  timeout: 360000,
  filter: (name) => {
    if (name === 'think-model-postgresql') return false;

    return true;
  },
  target: (name) => {
    if (name.startsWith('@vuepress/') || name === 'vuepress') return '@next';

    if (name === '@types/node') return 'minor';

    return 'latest';
  },
};
