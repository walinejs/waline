import type { WalineLocale } from '../../typings';

const localeKeys = [
  'nick',
  'nickError',
  'mail',
  'mailError',
  'link',
  'optional',
  'placeholder',
  'sofa',
  'submit',
  'reply',
  'cancelReply',
  'comment',
  'refresh',
  'more',
  'preview',
  'emoji',
  'uploadImage',
  'seconds',
  'minutes',
  'hours',
  'days',
  'now',
  'uploading',
  'login',
  'logout',
  'admin',
  'sticky',
  'word',
  'wordHint',
  'anonymous',
  'level0',
  'level1',
  'level2',
  'level3',
  'level4',
  'level5',
];

export const generateLocale = (locale: string[]): WalineLocale =>
  Object.fromEntries(
    locale.map((item, index) => [localeKeys[index], item])
  ) as unknown as WalineLocale;
