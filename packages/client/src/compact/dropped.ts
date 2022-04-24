export const DROPPED_OPTIONS_WHICH_CAN_NOT_BE_POLYFILLED: string[] = [
  // valine
  'region',
  'appId',
  'appKey',
  'notify',
  'verify',
  'avatar',
  'avatarForce',
  'enableQQ',
  'recordIP',
  'serverURLs',

  // waline v1
  'avatarCDN',
  'mathTagSupport',
];

export const DROPPED_OPTIONS_WHICH_CAN_STILL_BE_POLYFILLED: [string, string][] =
  [
    // valine
    ['emojiCDN', 'emoji'],
    ['emojiMaps', 'emoji'],
    ['requiredFields', 'requiredMeta'],
    ['visitor', 'pageview'],
    ['langMode', 'locale'],
    ['placeholder', 'locale.placeholder'],

    // waline v1
    ['highlight', 'highlighter'],
    ['uploadImage', 'imageUploader'],
    ['previewMath', 'texRenderer'],
    ['anonymous', 'login'],
    ['copyRight', 'copyright'],
  ];
