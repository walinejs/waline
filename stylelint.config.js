import { defineHopeConfig } from 'stylelint-config-hope';

export default defineHopeConfig({
  scss: true,
  rules: {
    'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: ['/inset/'] }],
    'media-feature-range-notation': 'prefix',
    'no-descending-specificity': null,
  },
});
