export default {
  cooldown: (pkg) => {
    if (
      [
        '@mdit/',
        '@mr-hope/',
        '@oxfmt/',
        '@oxlint/',
        '@oxlint-tsgolint/',
        '@vercel/',
        '@vitest/',
        '@vue/',
        '@vuepress/',
        '@waline/',
        'vuepress-',
      ].some((prefix) => pkg.startsWith(prefix)) ||
      [
        'oxc-config-hope',
        'oxfmt',
        'oxlint',
        'oxlint-tsgolint',
        'stylelint-config-hope',
        'tsdown',
        'vercel',
        'vitest',
        'vue',
        'vuepress',
      ].includes(pkg)
    ) {
      return 0;
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
