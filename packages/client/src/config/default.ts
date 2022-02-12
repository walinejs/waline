import type { Avatar, Meta } from './options';

const availableAvatar: Avatar[] = [
  'mp',
  'identicon',
  'monsterid',
  'wavatar',
  'robohash',
  'retro',
  '',
];

const availableMeta: Meta[] = ['nick', 'mail', 'link'];

export const getAvatar = (avatar?: Avatar): Avatar =>
  avatar && availableAvatar.includes(avatar) ? avatar : 'mp';

export const getMeta = (meta: Meta[]): Meta[] =>
  meta.filter((item) => availableMeta.includes(item));

export const defaultGravatarCDN = 'https://seccdn.libravatar.org/avatar/';

export const defaultLang = 'zh-CN';

export const defaultUploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });
};

export const defaultTexRenderer = (blockMode: boolean): string =>
  blockMode === true
    ? '<p class="vtex">Tex is not available in preview</p>'
    : '<span class="vtex">Tex is not available in preview</span>';
