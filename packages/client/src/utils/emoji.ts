import { removeEndingSplash } from './string';

import type { EmojiConfig, EmojiInfo, EmojiMaps } from '../config';

// TODO: remove
export const resolveOldEmojiMap = (
  emojiMaps: EmojiMaps,
  emojiCDN = ''
): EmojiConfig => {
  const resolvedEmojiMaps: EmojiMaps = {};

  for (const key in emojiMaps) {
    resolvedEmojiMaps[key] = /(?:https?:)?\/\//.test(emojiMaps[key])
      ? emojiMaps[key]
      : `${emojiCDN}${emojiMaps[key]}`;
  }

  return {
    tabs: [
      {
        name: 'Emoji',
        icon: Object.values(resolvedEmojiMaps).pop() || '',
        items: Object.keys(resolvedEmojiMaps),
      },
    ],
    map: resolvedEmojiMaps,
  };
};

export const fetchEmoji = (link: string): Promise<EmojiInfo> =>
  fetch(`${link}/info.json`)
    .then((resp) => resp.json() as Promise<Omit<EmojiInfo, 'folder'>>)
    .then((emojiInfo) => ({
      folder: link,
      ...emojiInfo,
    }));

export const getEmojis = (
  emojis: (string | EmojiInfo)[]
): Promise<EmojiConfig> =>
  Promise.all(
    emojis.map((emoji) =>
      typeof emoji === 'string'
        ? fetchEmoji(removeEndingSplash(emoji))
        : Promise.resolve(emoji)
    )
  ).then((emojiInfos) => {
    const emojiConfig: EmojiConfig = {
      tabs: [],
      map: {},
    };

    emojiInfos.forEach((emojiInfo) => {
      const { name, folder, icon, prefix, type, items } = emojiInfo;

      emojiConfig.tabs.push({
        name,
        icon: `${folder}/${prefix}${icon}.${type}`,
        items: items.map((item) => {
          const key = `${prefix}${item}`;

          emojiConfig.map[key] = `${folder}/${prefix}${item}.${type}`;

          return key;
        }),
      });
    });

    return emojiConfig;
  });
