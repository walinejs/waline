import { useStorage } from '@vueuse/core';
import { removeEndingSplash } from './path';

import type { WalineEmojiConfig } from './config';
import type { WalineEmojiInfo } from '../typings';

const hasVersion = (url: string): boolean =>
  Boolean(/@[0-9]+\.[0-9]+\.[0-9]+/.test(url));

const fetchEmoji = (link: string): Promise<WalineEmojiInfo> => {
  const emojiStore = useStorage<Record<string, WalineEmojiInfo>>(
    'WALINE_EMOJI',
    {}
  );

  const result = hasVersion(link);

  if (result) {
    const info = emojiStore.value[link];

    if (info) return Promise.resolve(info);
  }

  return fetch(`${link}/info.json`)
    .then((resp) => resp.json() as Promise<Omit<WalineEmojiInfo, 'folder'>>)
    .then((emojiInfo) => {
      const info = {
        folder: link,
        ...emojiInfo,
      };

      if (result) emojiStore.value[link] = info;

      return info;
    });
};

const getLink = (name: string, folder = '', prefix = '', type = ''): string =>
  `${folder ? `${folder}/` : ''}${prefix}${name}${type ? `.${type}` : ''}`;

export const getEmojis = (
  emojis: (string | WalineEmojiInfo)[]
): Promise<WalineEmojiConfig> =>
  Promise.all(
    emojis.map((emoji) =>
      typeof emoji === 'string'
        ? fetchEmoji(removeEndingSplash(emoji))
        : Promise.resolve(emoji)
    )
  ).then((emojiInfos) => {
    const emojiConfig: WalineEmojiConfig = {
      tabs: [],
      map: {},
    };

    emojiInfos.forEach((emojiInfo) => {
      const { name, folder, icon, prefix, type, items } = emojiInfo;

      emojiConfig.tabs.push({
        name,
        icon: getLink(icon, folder, prefix, type),
        items: items.map((item) => {
          const key = `${prefix || ''}${item}`;

          emojiConfig.map[key] = getLink(item, folder, prefix, type);

          return key;
        }),
      });
    });

    return emojiConfig;
  });
