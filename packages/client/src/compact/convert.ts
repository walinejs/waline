import { warning } from './logger';
import { resolveOldEmojiMap } from './valine';

import type { DeprecatedValineOptions } from './valine';
import {
  DROPPED_OPTIONS_WHICH_CAN_NOT_BE_POLYFILLED,
  DROPPED_OPTIONS_WHICH_CAN_STILL_BE_POLYFILLED,
} from './dropped';
import type { DeprecatedWalineOptions } from './v1';
import type { WalineInitOptions } from '../typings';

export const covertOptions = (
  options: WalineInitOptions & DeprecatedValineOptions & DeprecatedWalineOptions
): WalineInitOptions => {
  const {
    // Options which needs to be polyfilled
    placeholder,
    langMode = {},
    emojiCDN,
    emojiMaps,
    requiredFields = [],
    anonymous,
    previewMath,
    uploadImage,
    highlight,
    copyRight,
    visitor,

    pageview = visitor === true
      ? '.leancloud_visitors,.waline-visitor-count,.waline-pageview-count'
      : visitor,
    locale = langMode,
    emoji,
    requiredMeta = requiredFields,
    highlighter = highlight,
    imageUploader = uploadImage,
    texRenderer = previewMath,
    copyright = copyRight,
    login = anonymous === true
      ? 'disable'
      : anonymous === false
      ? 'force'
      : 'enable',
    ...more
  } = options;

  // error with those which can no longr be handled
  DROPPED_OPTIONS_WHICH_CAN_NOT_BE_POLYFILLED.filter((item) =>
    Object.keys(options).includes(item)
  ).forEach((item) =>
    warning(`Option "${item}" is REMOVED and CAN NOT be polyfilled!`)
  );

  // warnings with those which is being polyfilled
  DROPPED_OPTIONS_WHICH_CAN_STILL_BE_POLYFILLED.filter(([oldOption]) =>
    Object.keys(options).includes(oldOption)
  ).forEach(([oldOption, newOption]) =>
    warning(
      `Deprecated option "${oldOption}" is currently being polyfilled, Please switch to option "${newOption}" in v2!`
    )
  );

  if (placeholder) locale.placeholder = placeholder;

  return {
    locale,
    emoji:
      emojiCDN && typeof emojiMaps === 'object'
        ? resolveOldEmojiMap(emojiMaps, emojiCDN)
        : emoji,
    requiredMeta,
    imageUploader,
    highlighter,
    texRenderer,
    copyright,
    login,
    pageview,
    ...more,
  };
};
