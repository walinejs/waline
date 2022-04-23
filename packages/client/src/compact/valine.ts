import type {
  WalineEmojiInfo,
  WalineEmojiMaps,
  WalineLocale,
  WalineMeta,
} from '../typings';

export type DeprecatedAvatar =
  | ''
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'hide';

export type DeprecatedEmojiMaps = Record<string, string>;

export interface DeprecatedValineOptions {
  /**
   * @deprecated Use `locale.placeholder` instead, dropped in V2
   */
  placeholder?: string;

  /**
   * @deprecated Use `locale` instead, dropped in V2
   */
  langMode?: Partial<WalineLocale>;

  /**
   * @deprecated Use `requiredMeta` instead, dropped in V2
   */
  requiredFields?: WalineMeta[];

  /**
   * @deprecated Please use `AVATAR_PROXY` in server, dropped in V2
   *
   * [Gravatar](http://cn.gravatar.com/) 头像展示方式
   *
   * 可选值:
   *
   * - `''`
   * - `'mp'`
   * - `'identicon'`
   * - `'monsterid'`
   * - `'wavatar'`
   * - `'retro'`
   * - `'robohash'`
   * - `'hide'`
   *
   * [Gravatar](http://gravatar.com/) type
   *
   * Optional value:
   *
   * - `''`
   * - `'mp'`
   * - `'identicon'`
   * - `'monsterid'`
   * - `'wavatar'`
   * - `'retro'`
   * - `'robohash'`
   * - `'hide'`
   *
   * @default 'mp'
   */
  avatar?: DeprecatedAvatar;

  /**
   * @deprecated no longer needed, dropped in V2
   *
   * 每次访问是否**强制**拉取最新的*评论列表头像*
   *
   * Whether **force** pulling the latest avatar each time
   *
   * @default false
   */
  avatarForce?: boolean;

  /**
   * @deprecated Use `emojis` instead, dropped in V2
   *
   * 设置**表情包 CDN**
   *
   * @see [自定义表情包](https://waline.js.org/client/emoji.html)
   *
   * Set **Emoji Pack CDN**
   *
   * @see [Custom Emoji](https://waline.js.org/en/client/emoji.html)
   *
   * @default 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/'
   */
  emojiCDN?: string;

  /**
   * @deprecated Use `emojis` instead, dropped in V2
   *
   * 设置**表情包映射**
   *
   * @see [自定义表情](https://waline.js.org/client/emoji.html)
   *
   * Set **emoji maps**
   *
   * @see [Custom Emoji](https://waline.js.org/en/client/emoji.html)
   *
   * @default 微博表情包
   */

  emojiMaps?: DeprecatedEmojiMaps;
}

// TODO: remove
export const resolveOldEmojiMap = (
  emojiMaps: DeprecatedEmojiMaps,
  emojiCDN = ''
): WalineEmojiInfo[] => {
  const resolvedEmojiMaps: WalineEmojiMaps = {};

  for (const key in emojiMaps) {
    resolvedEmojiMaps[key] = /(?:https?:)?\/\//.test(emojiMaps[key])
      ? emojiMaps[key]
      : `${emojiCDN}${emojiMaps[key]}`;
  }

  return [
    {
      name: 'Emoji',
      icon: Object.values(resolvedEmojiMaps).pop() || '',
      items: Object.keys(resolvedEmojiMaps),
    },
  ];
};
