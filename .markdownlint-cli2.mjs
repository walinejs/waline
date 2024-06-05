export default {
  config: {
    default: true,
    MD003: {
      style: 'atx',
    },
    MD004: {
      style: 'dash',
    },
    MD013: false,
    MD024: {
      siblings_only: true,
    },
    MD033: {
      allowed_elements: [
        'br',
        'kbd',
        'script',
        'span',
        'BiliBili',
        'Catalog',
        'MigrationTool',
        'VidStack',
      ],
    },
    MD035: {
      style: '---',
    },
    MD040: false,
    MD046: false,
  },
  ignores: ['**/node_modules/**', '**/__tests__/**', 'CHANGELOG.md', 'LICENSE'],
};
