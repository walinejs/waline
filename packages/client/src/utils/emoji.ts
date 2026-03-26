import { useStorage } from '@vueuse/core';

import type { WalineEmojiConfig } from './config.js';
import { removeEndingSplash } from './path.js';
import { isString } from './type.js';
import type { WalineEmojiFactory, WalineEmojiInfo } from '../typings/index.js';

const EMOJI_STORE_KEY = 'WALINE_EMOJI';

const emojiStore = useStorage<Record<string, WalineEmojiInfo | undefined>>(EMOJI_STORE_KEY, {});

const checkVersionAnnotation = (url: string): boolean => /@[0-9]+\.[0-9]+\.[0-9]+/.test(url);

const fetchEmoji = (link: string): Promise<WalineEmojiInfo> => {
  const containsVersion = checkVersionAnnotation(link);

  // if the link contains version annotation, check if it's in the cache store
  if (containsVersion) {
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

      // cache the emoji info if the link contains version annotation
      if (containsVersion) emojiStore.value[link] = info;

      return info;
    });
};

const getLink = (name: string, folder = '', prefix = '', type = ''): string =>
  `${folder ? `${folder}/` : ''}${prefix}${name}${type ? `.${type}` : ''}`;

export const getEmojisInfo = (
  emojis: (string | WalineEmojiInfo | WalineEmojiFactory)[] | null,
): Promise<WalineEmojiConfig> =>
  Promise.all(
    emojis
      ? emojis.map((emoji) =>
          isString(emoji)
            ? fetchEmoji(removeEndingSplash(emoji))
            : typeof emoji === 'function'
              ? emoji()
              : Promise.resolve(emoji),
        )
      : [],
  ).then((emojiInfos) => {
    const emojisConfig: WalineEmojiConfig = {
      tabs: [],
      map: {},
    };

    emojiInfos.forEach((emojiInfo) => {
      if ('tabs' in emojiInfo) {
        emojisConfig.tabs.push(...emojiInfo.tabs);
        emojisConfig.map = { ...emojisConfig.map, ...emojiInfo.map };
        return;
      }

      const { name, folder, icon, prefix = '', type, items } = emojiInfo;

      emojisConfig.tabs.push({
        name,
        icon: getLink(icon, folder, prefix, type),
        items: items.map((item) => {
          const key = `${prefix}${item}`;

          emojisConfig.map[key] = getLink(item, folder, prefix, type);

          return key;
        }),
      });
    });

    return emojisConfig;
  });
